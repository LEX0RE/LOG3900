import { Bracket } from '@app/classes/bracket/bracket';
import { Player } from '@app/classes/players/player-abstract';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { TournamentWatchTower } from '@app/classes/tournament/tournament-watch-tower/tournament-watch-tower';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { BRACKET_LOSER, BRACKET_WINNER, PLAYER_TO_OBSERVER } from '@app/constants/events/tournament-events';
import { SHOW_WIN_SCREEN } from '@app/constants/game';
import { VisibilityManager } from '@app/interface/visibility-manager';
import { TOURNAMENT_UPDATE } from '@common/constants/communication';
import { CommonGameConfig } from '@common/interfaces/common-game-config';
import { User } from '@common/interfaces/user/user';
import { EventEmitter } from 'stream';

export class Tournament {
    readonly tournamentId: string;
    readonly players: Player[];
    gameConfig: CommonGameConfig;
    watchTower: TournamentWatchTower;
    events: EventEmitter;
    brackets: Bracket[];
    playersIn: Player[];
    observers: User[];
    visibilityManager: VisibilityManager;
    private haveFirst: boolean;
    private haveThird: boolean;

    // eslint-disable-next-line max-params -- Ajout des observateurs nécessaires
    constructor(tournamentId: string, gameConfig: CommonGameConfig, players: Player[], visibilityManager: VisibilityManager, observers?: User[]) {
        MathUtils.shuffleArray(players);
        this.players = players.map((player) => player.copy());
        this.playersIn = players.map((player) => player.copy());
        this.observers = observers ?? [];
        this.visibilityManager = visibilityManager;
        this.tournamentId = tournamentId;
        this.gameConfig = gameConfig;
        this.events = new EventEmitter();
        this.haveFirst = false;
        this.haveThird = false;
        this.brackets = [new Bracket(this.gameConfig, this.players, this.events, this.visibilityManager)];
        this.watchTower = new TournamentWatchTower(this);
        this.configureHandler();
        this.setupConsolation();
    }

    get realUsers(): User[] {
        return this.playersIn.map((player: Player) => (player instanceof RealPlayer ? player.user : null)).filter((user) => user) as User[];
    }

    get virtualPlayers(): User[] {
        return this.playersIn.map((player: Player) => (!(player instanceof RealPlayer) ? player.user : null)).filter((user) => user) as User[];
    }

    async start(): Promise<void> {
        this.watchTower.update();
        this.brackets[0].start();
    }

    configureHandler() {
        this.events.on(TOURNAMENT_UPDATE, () => this.watchTower.update());
        this.brackets[0].events.on(BRACKET_WINNER, async () => {
            this.haveFirst = true;
            await this.prepareEndTournament();
        });
        this.events.on(PLAYER_TO_OBSERVER, (loserIds: string[]) => this.updateObserver(loserIds));
    }

    getInfo() {
        return {
            lobbyId: this.tournamentId,
            gameConfig: { turnTimer: this.gameConfig.turnTimer, dictionaryTitle: this.gameConfig.dictionaryTitle, creator: this.gameConfig.creator },
            visibility: this.visibilityManager.visibility,
            players: this.realUsers,
            observers: this.observers,
            virtualPlayerNames: this.virtualPlayers.map((virtualPlayer: User) => virtualPlayer.name),
            isOngoing: true,
        };
    }

    addObserver(user: User): void {
        if (this.observers.find((observer: User) => observer.id === user.id)) return;

        this.observers.push(user);
        this.events.emit(TOURNAMENT_UPDATE);
    }

    removeObserver(user: User): void {
        this.observers = this.observers.filter((observer: User) => observer.id !== user.id);
    }

    private updateObserver(loserIds: string[]) {
        loserIds.forEach((loserId) => {
            const loserFound = this.playersIn.find((player) => player.id === loserId);

            if (loserFound) {
                let isInConsolation = false;

                for (const bracket of this.brackets[0].children) {
                    if (bracket.currentPlayers.find((player) => player.id === loserFound.id)) isInConsolation = true;
                }

                if (!isInConsolation) this.playerToObserver(loserFound);
            }
        });
    }

    private async setupConsolation() {
        await Promise.all(this.brackets[0].children.map(async (bracket) => this.setupConsolationHandler(bracket)));
        if (this.brackets.length > 1) {
            this.brackets[1].events.on(BRACKET_WINNER, async () => {
                this.haveThird = true;
                await this.prepareEndTournament();
            });
            setTimeout(async () => this.brackets[1].start(), SHOW_WIN_SCREEN);
        } else this.haveThird = true;
    }

    private async setupConsolationHandler(bracket: Bracket) {
        return new Promise<void>((resolve) => {
            bracket.events.on(BRACKET_LOSER, (players) => {
                players.forEach((player: Player) => {
                    if (this.isPlayerIn(player)) {
                        if (this.brackets.length <= 1) this.brackets.push(new Bracket(this.gameConfig, [], this.events, this.visibilityManager));
                        this.brackets[1].currentPlayers.push(player.copy());
                    }
                });
                this.events.emit(TOURNAMENT_UPDATE);
                resolve();
            });
        });
    }

    private async prepareEndTournament(): Promise<void> {
        if (this.haveFirst) {
            this.brackets[0].currentPlayers.forEach((player: Player) => {
                if (this.isPlayerIn(player)) this.playerToObserver(player);
            });
        }
        if (this.haveThird && this.brackets.length > 1) {
            this.brackets[1].currentPlayers.forEach((player: Player) => {
                if (this.isPlayerIn(player)) this.playerToObserver(player);
            });
        }
        if (this.haveFirst && this.haveThird) {
            while (this.playersIn.length) this.playerToObserver(this.playersIn[0]);
            await this.watchTower.sendEndTournament();
        }
    }

    private playerToObserver(player: Player) {
        this.playersIn = this.playersIn.filter((playerIn) => playerIn.id !== player.id);
        if (player.requiredUpdates) {
            this.watchTower.sendTournamentContinue(player);
            this.observers.push(player.user);
        }
    }

    private isPlayerIn(player: Player): boolean {
        return this.playersIn.some((playerIn: Player) => playerIn.id === player.id);
    }
}
