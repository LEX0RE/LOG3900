import { Game } from '@app/classes/game/game';
import { Player } from '@app/classes/players/player-abstract';
import { VirtualPlayer } from '@app/classes/players/virtual-player/virtual-player-abstract';
import { Timer } from '@app/classes/timer/timer';
import { GAME_WINNER } from '@app/constants/events/game-events';
import { BRACKET_FORCE_START, BRACKET_LOSER, BRACKET_WINNER, PLAYER_TO_OBSERVER } from '@app/constants/events/tournament-events';
import { SHOW_WIN_SCREEN, WAIT_FOR_NEXT_GAME } from '@app/constants/game';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { VisibilityManager } from '@app/interface/visibility-manager';
import { ChatManager2 } from '@app/services/chat-manager2/chat-manager2.service';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { REDIRECT_TO_GAME, REDIRECT_TO_TOURNAMENT, TOURNAMENT_UPDATE } from '@common/constants/communication';
import { CommonGameConfig } from '@common/interfaces/common-game-config';
import { PlayerGameState } from '@common/interfaces/tournament/bracket-profile';
import { CommonBracket } from '@common/interfaces/tournament/common-bracket';
import { EventEmitter } from 'stream';
import { Container } from 'typedi';

export class Bracket {
    children: Bracket[];
    currentPlayers: Player[];
    visibilityManager: VisibilityManager;
    winnersId: string[];
    losersId: string[];
    gameConfig: CommonGameConfig;
    events: EventEmitter;
    tournamentEvents: EventEmitter;
    gameId: string;
    isMatchInProgress: boolean;
    gameManager: GameManager;
    private socketManager: SocketManager;
    private chatManager: ChatManager2;

    // eslint-disable-next-line max-params, max-lines-per-function
    constructor(gameConfig: CommonGameConfig, players: Player[], tournamentEvents: EventEmitter, visibilityManager: VisibilityManager) {
        this.currentPlayers = [];
        this.visibilityManager = visibilityManager;
        this.children = [];
        this.winnersId = [];
        this.losersId = [];
        this.gameId = '';
        this.isMatchInProgress = false;
        this.gameConfig = gameConfig;
        this.events = new EventEmitter();
        this.tournamentEvents = tournamentEvents;
        this.gameManager = Container.get(GameManager);
        this.socketManager = Container.get(SocketManager);
        this.chatManager = Container.get(ChatManager2);

        if (players.length === 1) players.forEach((player) => this.winnersId.push(player.id));
        if (players.length <= 2) this.currentPlayers = players;
        else {
            this.children.push(new Bracket(this.gameConfig, players.slice(0, players.length / 2), this.tournamentEvents, this.visibilityManager));
            this.children.push(new Bracket(this.gameConfig, players.slice(players.length / 2), this.tournamentEvents, this.visibilityManager));
        }
    }

    toCommonBracket(): CommonBracket {
        const commonBracket: CommonBracket = {
            gameId: this.gameId,
            children: [],
            currentPlayers: [],
            isMatchInProgress: this.isMatchInProgress,
        };

        this.children.forEach((child: Bracket) => commonBracket.children.push(child.toCommonBracket()));
        this.currentPlayers.forEach((player: Player) => {
            let playerState = PlayerGameState.NO_RESULT;

            if (this.winnersId.includes(player.id)) playerState = PlayerGameState.WINNER;
            if (this.losersId.includes(player.id)) playerState = PlayerGameState.LOSER;

            commonBracket.currentPlayers.push({ ...player.user, winner: playerState });
        });

        return commonBracket;
    }

    async start(): Promise<void> {
        await Promise.all(this.children.map(async (bracket) => this.startChildGame(bracket)));
        this.tournamentEvents.emit(TOURNAMENT_UPDATE);
        const timer = new Timer({ minute: 0, second: WAIT_FOR_NEXT_GAME }, this.currentPlayers);
        let timeout = this.children.length ? SHOW_WIN_SCREEN : 0;

        if (this.currentPlayers.every((player: Player) => player instanceof VirtualPlayer)) timeout = 0;

        timer.setEndTimer(async () => this.startCurrentGame());

        this.events.once(BRACKET_FORCE_START, async () => {
            timer.stop();
            if (timer.remainingTime() > 0) {
                timer.setEndTimer(null);
                await this.startCurrentGame();
            }
        });

        setTimeout(async () => {
            await this.setupPlayerHandler();

            if (this.currentPlayersIn.length > 1) timer.start();
            else await this.startCurrentGame();
        }, timeout);
    }

    async setupPlayerHandler() {
        this.currentPlayersIn.forEach((player: Player) => {
            this.socketManager.sendPrivate(REDIRECT_TO_TOURNAMENT, player.user.id);
        });
    }

    get currentPlayersIn(): Player[] {
        return this.removeLosers(this.currentPlayers);
    }

    get winners(): Player[] {
        return this.currentPlayers.filter((player) => this.winnersId.includes(player.id));
    }

    get losers(): Player[] {
        return this.currentPlayers.filter((player) => this.losersId.includes(player.id));
    }

    removeLosers(players: Player[]): Player[] {
        return players.filter((player) => !this.losersId.includes(player.id));
    }

    private endGameHandler(players: Player[]): void {
        players.sort((playerA: Player, playerB: Player) => playerB.score - playerA.score);
        this.setWinners(players);
        this.setLosers();
        this.isMatchInProgress = false;

        this.tournamentEvents.emit(TOURNAMENT_UPDATE);
        this.tournamentEvents.emit(PLAYER_TO_OBSERVER, this.losers);
        this.events.emit(BRACKET_WINNER, this.winners);
        this.events.emit(BRACKET_LOSER, this.losers);
    }

    private setWinners(players: Player[]) {
        let currentScores = this.removeLosers(players);

        if (!currentScores.length) {
            currentScores = players.filter(
                (player: Player) => this.currentPlayers.findIndex((currentPlayer) => player.id === currentPlayer.id) === INDEX_NOT_FOUND,
            );
        }

        if (currentScores.length) {
            const maxScore = currentScores[0].score;

            this.winnersId = currentScores.filter((player: Player) => player.score === maxScore).map((player) => player.id);
        }
    }

    private setLosers() {
        this.currentPlayers.forEach((player) => {
            if (!this.winnersId.includes(player.id) && !this.losersId.includes(player.id)) this.losersId.push(player.id);
        });
    }

    private async startChildGame(bracket: Bracket): Promise<void> {
        return new Promise<void>((resolve) => {
            bracket.events.on(BRACKET_WINNER, (winners) => {
                winners.forEach((player: Player) => this.currentPlayers.push(player.copy()));
                this.tournamentEvents.emit(TOURNAMENT_UPDATE);
                resolve();
            });
            bracket.start();
        });
    }

    private async startCurrentGame(): Promise<void> {
        this.events.emit(BRACKET_FORCE_START);

        if (this.currentPlayersIn.length > 1) {
            this.currentPlayers.forEach((player: Player) => this.socketManager.sendPrivate(REDIRECT_TO_GAME, player.user.id));

            const playersCopy = this.currentPlayers.map((player) => player.copy());
            const newGameConfig = await this.createGameConfig(playersCopy);
            const game = this.createGame(newGameConfig, playersCopy);

            game.events.on(GAME_WINNER, (players: Player[]) => this.endGameHandler(players));

            this.isMatchInProgress = true;
            game.start();
            this.tournamentEvents.emit(TOURNAMENT_UPDATE);
        } else this.endGameHandler(this.currentPlayers);
    }

    private async createGameConfig(players: Player[]): Promise<CommonGameConfig> {
        const chatId = await this.chatManager.createChatForGameInTournament(
            players.map((player) => player.name).join(' VS '),
            players.map((player) => player.id),
        );

        return {
            ...this.gameConfig,
            chatId,
        } as CommonGameConfig;
    }

    private createGame(gameConfig: CommonGameConfig, players: Player[]): Game {
        this.gameId = this.gameManager.nextId();
        const game = new Game(this.gameId, gameConfig, players, this.visibilityManager);

        this.gameManager.addGame(game);

        return game;
    }
}
