import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Game } from '@app/classes/game/game';
import { Player } from '@app/classes/players/player-abstract';
import { DELAY_INVALID_WORD } from '@app/constants/game';
import { EndGameManager } from '@app/services/end-game-manager/end-game-manager.service';
import { Gameplay } from '@app/services/gameplay/gameplay.service';
import { ReplayManager } from '@app/services/replay-manager/replay-manager.service';
import { BoardUpdate } from '@common/interfaces/board-update';
import { CommonEndGame } from '@common/interfaces/common-end-game';
import { CommonPlayerInfo } from '@common/interfaces/common-player-info';
import { EaselUpdate } from '@common/interfaces/easel-update';
import { GameUpdate } from '@common/interfaces/game-update';
import { Container } from 'typedi';

export class GameWatchTower {
    game: Game;
    gameplay: Gameplay;
    endGameManager: EndGameManager;
    replayManager: ReplayManager;

    constructor(game: Game) {
        this.game = game;
        this.gameplay = Container.get(Gameplay);
        this.endGameManager = Container.get(EndGameManager);
        this.replayManager = Container.get(ReplayManager);
    }

    async prepareReplay(): Promise<void> {
        await this.replayManager.createReplay(this.game);
    }

    update(): void {
        this.game.players.forEach((player: Player) => {
            if (player.requiredUpdates) {
                this.gameplay.sendGameInfo(player.id, this.setGameUpdate(player));
                this.updateBoard(player);
            }
        });
    }

    updateBoard(player: Player): void {
        if (player.requiredUpdates) this.gameplay.sendBoard(player.id, this.setBoardUpdate());
    }

    updateEasel(player: Player): void {
        if (player.requiredUpdates) this.gameplay.sendEasel(player.id, this.setEaselUpdate(player));
    }

    // eslint-disable-next-line max-lines-per-function
    async sendEndGame(): Promise<void> {
        const players: CommonPlayerInfo[] = this.game.players.map((player) => {
            return {
                name: player.name,
                nLetterLeft: player.easel.size,
                score: player.score,
                userId: player.id,
                turn: false,
                profilePicture: player.user.profilePicture,
            };
        });
        const endGame: CommonEndGame = {
            winners: players.filter((player) => this.game.winners.find((winner) => winner.id === player.userId)),
            losers: players.filter((player) => !this.game.winners.find((winner) => winner.id === player.userId)),
        };

        this.game.players.forEach((player) => {
            if (player.requiredUpdates) this.endGameManager.sendEndGame(player.user, endGame);
        });
        this.game.observers.forEach((observer) => {
            this.endGameManager.sendEndGame(observer, endGame);
        });

        this.endGameManager.deleteFromGameManager(this.game);
        await this.endGameManager.chatManager.deleteChat(this.game.gameConfig.chatId);
        this.endGameManager.deleteFromGameManager(this.game);
    }

    async errorInTurn(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.game.outsideResolveError = resolve;
        });
    }

    async delayWordEasel(action: PlaceLetters, invalidPlacement: boolean): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            const newBoard = this.game.board.clone();
            const player = this.game.activePlayer;

            this.executeFakeAction(action, invalidPlacement);
            this.updateBoard(player);

            setTimeout(() => {
                if (invalidPlacement) this.game.board = newBoard;
                this.updateEasel(player);
                this.game.timer.stop();
                resolve(true);
            }, DELAY_INVALID_WORD);
        });
    }

    setGameUpdate(player: Player): GameUpdate {
        const playerInfo: CommonPlayerInfo[] = [];
        const otherPlayersInfo: CommonPlayerInfo[] = [];

        this.game.players.forEach((aPlayer: Player, index: number) => {
            const info: CommonPlayerInfo = {
                name: aPlayer.name,
                userId: aPlayer.id,
                score: aPlayer.score,
                nLetterLeft: aPlayer.easel.size,
                turn: index === this.game.activePlayerIndex,
                profilePicture: aPlayer.user.profilePicture,
            };

            if (aPlayer.id === player.id) playerInfo.push(info);
            else otherPlayersInfo.push(info);
        });

        return {
            playerInfo: playerInfo[0],
            otherPlayersInfo,
            stash: { nLettersLeft: this.game.letterStash.size },
        };
    }

    setBoardUpdate(): BoardUpdate {
        const board = this.game.board.toCommonBoard;

        return { board };
    }

    setEaselUpdate(player: Player): EaselUpdate {
        const easel = player.easel;

        return { easel };
    }

    private executeFakeAction(action: PlaceLetters, invalidPlacement: boolean): void {
        if (invalidPlacement) this.game.board.placeLetters(action);
    }
}
