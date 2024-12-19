import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { Board } from '@app/classes/board/board';
import { ClassicMode } from '@app/classes/game-mode/classic-mode/classic-mode';
import { GameWatchTower } from '@app/classes/game/game-watch-tower/game-watch-tower';
import { LetterStash } from '@app/classes/letter-stash/letter-stash';
import { Player } from '@app/classes/players/player-abstract';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { VirtualPlayer } from '@app/classes/players/virtual-player/virtual-player-abstract';
import { PlacementMustBeValid } from '@app/classes/rules/placement-must-valid/placement-must-be-valid';
import { Timer } from '@app/classes/timer/timer';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { ERROR_IN_TURN } from '@app/constants/error/error-messages';
import { GAME_END_EVENT, GAME_START_EVENT, GAME_TURN_CHANGE_EVENT, GAME_WINNER } from '@app/constants/events/game-events';
import { EASEL_SIZE, INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { RuleName } from '@app/enum/rules';
import { Action } from '@app/interface/action-interface';
import { GameFlags } from '@app/interface/game-flags';
import { GameMode } from '@app/interface/game-mode';
import { HintUsed } from '@app/interface/hint-used';
import { VisibilityManager } from '@app/interface/visibility-manager';
import { DictionaryService } from '@app/services/dictionary/dictionary.service';
import { ActionType } from '@common/enums/action-type';
import { GameModes } from '@common/enums/game-modes';
import { CommonGameConfig } from '@common/interfaces/common-game-config';
import { UserProfile } from '@common/interfaces/user-profile';
import { User } from '@common/interfaces/user/user';
import { EventEmitter } from 'stream';
import { Container } from 'typedi';

export class Game {
    readonly gameId: string;
    gameConfig: CommonGameConfig;
    players: Player[];
    observers: User[];
    visibilityManager: VisibilityManager;
    letterStash: LetterStash;
    board: Board;
    invalidRuleError: string;
    noWinablePlayerId: string[];
    winners: Player[];
    watchTower: GameWatchTower;

    timer: Timer;
    events: EventEmitter;
    gameMode: GameMode;
    flags: GameFlags;
    activePlayerIndex: number;
    actionChoose: boolean;
    outsideResolveError!: (value: string | PromiseLike<string>) => void;
    hintUsed: HintUsed;
    private dictionaryService: DictionaryService;

    // eslint-disable-next-line max-params
    constructor(gameId: string, gameConfig: CommonGameConfig, players: Player[], visibilityManager: VisibilityManager, observers?: User[]) {
        MathUtils.shuffleArray(players);
        this.gameId = gameId;
        this.gameConfig = gameConfig;
        this.players = players;
        this.observers = observers ?? [];
        this.visibilityManager = visibilityManager;
        this.letterStash = new LetterStash();
        this.board = new Board();
        this.invalidRuleError = '';
        this.winners = [];
        this.noWinablePlayerId = [];
        this.timer = new Timer(this.gameConfig.turnTimer, players, observers);
        this.events = new EventEmitter();
        this.gameMode = new ClassicMode();
        this.watchTower = new GameWatchTower(this);
        this.flags = { firstTimePlacingLetter: true, isGameOver: false };
        this.hintUsed = { wasUsed: false, hint: [], hintInProgress: false };
        this.dictionaryService = Container.get(DictionaryService);
        this.actionChoose = false;
        this.activePlayerIndex = 0;
    }

    get activePlayer(): Player {
        return this.players[this.activePlayerIndex];
    }

    get otherPlayer(): Player[] {
        const activePlayer = this.activePlayer;

        return this.players.filter((player: Player) => player.id !== activePlayer.id);
    }

    get realUsers(): UserProfile[] {
        return this.players.map((player: Player) => (player instanceof RealPlayer ? player.user : null)).filter((user) => user) as UserProfile[];
    }

    get virtualPlayers(): User[] {
        return this.players.map((player: Player) => (!(player instanceof RealPlayer) ? player.user : null)).filter((user) => user) as User[];
    }

    get losers(): Player[] {
        return this.players.filter((player) => !this.winners.find((winner) => winner.id === player.id));
    }

    async start(): Promise<void> {
        await this.loadDictionary();
        await this.watchTower.prepareReplay();
        this.preparationGame();
        this.events.emit(GAME_START_EVENT);
        this.events.emit(GAME_TURN_CHANGE_EVENT);
        while (!this.flags.isGameOver) {
            if (this.gameConfig.gameModeName !== GameModes.Cooperative) this.timer.start();
            this.watchTower.update();
            await this.makeAction();
            this.changeTurn();
        }
        this.events.emit(GAME_END_EVENT);
        await this.preparationEndGame();
    }

    getPlayer(user: User): Player | null {
        return this.players.find((player: Player) => player.id === user.id) || null;
    }

    end() {
        if (!this.flags.isGameOver) {
            this.flags.isGameOver = true;
            let winablePlayer = this.remainingPlayer();

            if (!winablePlayer.length) winablePlayer = this.players;

            const maxScore = Math.max(...winablePlayer.map((player: Player) => player.score));

            this.winners = winablePlayer.filter((player: Player) => player.score === maxScore);

            this.events.emit(GAME_WINNER, this.players);
            this.players.forEach((virtualPlayer: Player) => {
                if (virtualPlayer instanceof VirtualPlayer && !virtualPlayer.requiredUpdates && virtualPlayer.outsideResolve)
                    virtualPlayer.outsideResolve(new SkipTurn());
            });
        }
    }

    forceEnd() {
        this.end();
        this.preparationEndGame();
    }

    remainingPlayer(): Player[] {
        return this.players.filter((player) => this.noWinablePlayerId.findIndex((playerId) => player.id === playerId) === INDEX_NOT_FOUND);
    }

    replacePlayer(player: Player, newPlayer: Player): void {
        const index = this.players.findIndex((playerToReplace: Player) => playerToReplace.id === player.id);

        this.players[index] = newPlayer;
        newPlayer.easel = player.easel;
        newPlayer.score = player.score;
        this.noWinablePlayerId.push(newPlayer.id);

        if (this.isAllVirtual()) this.forceEnd();
        this.watchTower.update();
    }

    removePlayer(player: Player): void {
        if (this.players.length > 1) {
            const index = this.players.findIndex((playerToReplace: Player) => playerToReplace.id === player.id);

            if (index === this.activePlayerIndex || this.activePlayerIndex >= this.players.length - 1) {
                this.activePlayerIndex = (this.activePlayerIndex + this.players.length - 2) % (this.players.length - 1);
            }

            this.players.splice(index, 1);
            if (this.isAllVirtual() || this.players.length <= 1) this.forceEnd();
            this.watchTower.update();
        }
    }

    isAllVirtual(): boolean {
        return this.players.every((player: Player) => player instanceof VirtualPlayer);
    }

    addObserver(user: User): void {
        if (this.observers.find((observer: User) => observer.id === user.id)) return;

        this.observers.push(user);
        this.timer.addObserver(user);
        this.events.emit(GAME_TURN_CHANGE_EVENT);
    }

    removeObserver(user: User): void {
        this.observers = this.observers.filter((observer: User) => observer.id !== user.id);
        this.timer.removeObserver(user);
    }

    getInfo() {
        return {
            lobbyId: this.gameId,
            gameConfig: { turnTimer: this.gameConfig.turnTimer, dictionaryTitle: this.gameConfig.dictionaryTitle, creator: this.gameConfig.creator },
            visibility: this.visibilityManager.visibility,
            players: this.realUsers,
            observers: this.observers,
            virtualPlayerNames: this.virtualPlayers.map((virtualPlayer: User) => virtualPlayer.name),
            isOngoing: true,
        };
    }

    private async executeTurn(action: Action): Promise<void> {
        const response = this.gameMode.verifyRules(action, this);

        this.board = response.newBoard;
        this.activePlayer.score += response.score;
        this.executeRulesVisitorCallBacks(response.gameModification);
        if (action.actionType === ActionType.PlaceLetters) await this.watchTower.delayWordEasel(action as unknown as PlaceLetters, false);
        if (this.gameConfig.gameModeName === GameModes.Cooperative) {
            this.updateCommonEasel();
            return;
        }
        this.watchTower.updateEasel(this.activePlayer);
    }

    private async makeAction(): Promise<void> {
        this.actionChoose = false;
        await this.activePlayer.nextAction().then(async (action: Action) => {
            this.actionChoose = true;
            await this.executeTurn(action)
                .then(() => {
                    if (this.flags.firstTimePlacingLetter) this.updateRules(action);
                })
                .catch(this.errorInTurnHandler(this, action));
        });
        if (this.outsideResolveError) this.outsideResolveError(this.invalidRuleError);
    }

    private errorInTurnHandler(game: Game, action: Action): (err: Error) => Promise<void> {
        return async (err: Error): Promise<void> => {
            if (err.message === ERROR_IN_TURN) await game.watchTower.delayWordEasel(action as unknown as PlaceLetters, true);

            await game.executeTurn(new SkipTurn());
            game.invalidRuleError = err.message;
        };
    }

    private executeRulesVisitorCallBacks(functions: ((g: Game) => void)[]): void {
        functions.forEach((func: (g: Game) => void) => func(this));
    }

    private preparationGame(): void {
        this.flags.isGameOver = false;
        this.winners = [];
        this.players.forEach((player: Player) => {
            const playerLetters = this.letterStash.removeLetters(EASEL_SIZE);

            try {
                player.easel.addLetters(playerLetters);
            } catch (error) {
                this.letterStash.addLetters(playerLetters);
            }
        });
        this.players.forEach((player: Player) => this.watchTower.updateEasel(player));
    }

    private changeTurn(): void {
        this.events.emit(GAME_TURN_CHANGE_EVENT);
        this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
        this.invalidRuleError = '';
        this.hintUsed = { wasUsed: false, hint: [], hintInProgress: false };
    }

    private updateRules(action: Action): void {
        if (action.actionType === ActionType.PlaceLetters) {
            this.flags.firstTimePlacingLetter = false;
            this.gameMode.removeRule(RuleName.MustFirstPlacementBeValid);
            this.gameMode.addRule(new PlacementMustBeValid());
        }
    }

    private async preparationEndGame(): Promise<void> {
        this.watchTower.update();
        this.timer.stop();
        this.watchTower.sendEndGame();
        this.dictionaryService.unloadDictionary(this.gameConfig.dictionaryId);
    }

    private async loadDictionary() {
        await this.dictionaryService
            .loadDictionary(this.gameConfig.dictionaryTitle)
            .then((dictionaryId) => (this.gameConfig.dictionaryId = dictionaryId));
    }

    private updateCommonEasel(): void {
        this.players.forEach((player) => this.watchTower.updateEasel(player));
    }
}
