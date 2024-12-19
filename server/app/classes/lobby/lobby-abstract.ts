import { MathUtils } from '@app/classes/utils/math/math-utils';
import { INVALID_VISIBILITY } from '@app/constants/error/error-messages';
import { EMPTY, ON_CHANGE } from '@app/constants/events/lobby-manager-events';
import { VIRTUAL_PLAYER } from '@app/constants/user/virtual-players';
import { GameFactory } from '@app/interface/game-factory';
import { VisibilityManager } from '@app/interface/visibility-manager';
import { GameFactoryClassic } from '@app/services/game-factory/classic-game-factory/classic-game-factory.service';
import { VisibilityManagerPrivate } from '@app/services/lobby/visibility-manager/private/private-visibility-manger.service';
import { VisibilityManagerPublicNoPass } from '@app/services/lobby/visibility-manager/public-no-password/public-no-password-manager.service';
import { VisibilityManagerPublicPass } from '@app/services/lobby/visibility-manager/public-with-password/public-with-password-manager.service';
import { UsersManager } from '@app/services/users-manager/users-manager';
import { GameModes } from '@common/enums/game-modes';
import { GameVisibilities } from '@common/enums/game-visibilities';
import { CommonGameConfig2 } from '@common/interfaces/lobby/common-game-config2';
import { Lobby as CommonLobby } from '@common/interfaces/lobby/lobby';
import { LobbyCreation } from '@common/interfaces/lobby/lobby-creation';
import { UserProfile } from '@common/interfaces/user-profile';
import { User } from '@common/interfaces/user/user';
import { EventEmitter } from 'stream';
import { Container } from 'typedi';

export interface LobbyOptions {
    lobbyCreation: LobbyCreation;
    lobbyId: string;
    chatId: string;
    eventEmitter: EventEmitter;
}
export abstract class Lobby {
    readonly lobbyId: string;
    chatId: string;
    gameConfig: CommonGameConfig2;
    players: UserProfile[];
    virtualPlayers: UserProfile[];
    visibilityManager: VisibilityManager;
    observers: UserProfile[];
    potentialPlayers: UserProfile[];
    eventEmitter: EventEmitter;
    gameFactory: GameFactory;
    playerResponse: string[];
    private usersManager: UsersManager;
    abstract maxPlayers: number;
    abstract gameMode: GameModes;

    constructor({ lobbyCreation, lobbyId, chatId, eventEmitter }: LobbyOptions) {
        this.lobbyId = lobbyId;
        this.chatId = chatId;
        this.eventEmitter = eventEmitter;
        this.observers = [];
        this.potentialPlayers = [];
        this.virtualPlayers = [];
        this.players = [];
        this.playerResponse = [];
        this.gameConfig = lobbyCreation.gameConfig;
        this.visibilityManager = this.createVisibilityManager(lobbyCreation);
        this.gameFactory = Container.get(GameFactoryClassic);
        this.usersManager = Container.get(UsersManager);
        this.fillSeats();
    }

    includesUser(user: User): boolean {
        return Boolean(this.players.find((player) => player.id === user.id));
    }

    async addPlayer(user: User): Promise<boolean> {
        if (this.players.length >= this.maxPlayers) return false;

        if (this.includesUser(user)) return false;

        await this.usersManager.getProfilePicture(user.name).then((picture) => {
            this.players.push({ ...user, profilePicture: picture });
            this.virtualPlayers.pop();
            this.potentialPlayers = this.potentialPlayers.filter((potentialPlayer: User) => potentialPlayer.id !== user.id);
            this.fillSeats();
            this.eventEmitter.emit(ON_CHANGE, this.lobbyId);
        });
        return true;
    }

    removePlayer(user: User): void {
        if (!this.includesUser(user)) return;

        this.players = this.players.filter((player: User) => player.id !== user.id);
        this.fillSeats();
        if (this.gameConfig.creator?.id === user.id && this.players.length) this.gameConfig.creator = this.players[0];

        this.eventEmitter.emit(ON_CHANGE, this.lobbyId);

        if (!this.players.length) this.eventEmitter.emit(EMPTY, this.lobbyId);
    }

    async addObserver(user: User): Promise<void> {
        if (this.observers.find((observer: User) => observer.id === user.id)) return;

        await this.usersManager.getProfilePicture(user.name).then((picture) => {
            this.observers.push({ ...user, profilePicture: picture });
            this.eventEmitter.emit(ON_CHANGE, this.lobbyId);
        });
    }

    removeObserver(user: User): void {
        this.observers = this.observers.filter((observer: User) => observer.id !== user.id);
        this.eventEmitter.emit(ON_CHANGE, this.lobbyId);
    }

    addPlayerToWait(playerId: string) {
        if (this.playerResponse.find((userId) => playerId === userId)) return;
        this.playerResponse.push(playerId);
        this.eventEmitter.emit(ON_CHANGE, this.lobbyId);
    }

    removePlayerToWait(playerId: string) {
        this.playerResponse = this.playerResponse.filter((userId) => playerId !== userId);
        this.eventEmitter.emit(ON_CHANGE, this.lobbyId);
    }

    delete(): void {
        this.players = [];
        this.observers = [];
        this.playerResponse = [];
    }

    addAsker(user: User): void {
        if (this.potentialPlayers.find((potentialPlayer: User) => potentialPlayer.id === user.id)) return;

        this.potentialPlayers.push(user);
        this.eventEmitter.emit(ON_CHANGE, this.lobbyId);
    }

    removeAsker(user: User): void {
        this.potentialPlayers = this.potentialPlayers.filter((potentialPlayer: User) => potentialPlayer.id !== user.id);
        this.eventEmitter.emit(ON_CHANGE, this.lobbyId);
    }

    protected fillSeats(): void {
        const nFreeSeats = this.maxPlayers - (this.players.length + this.virtualPlayers.length);

        this.virtualPlayers = [...this.virtualPlayers, ...MathUtils.randomInArray(VIRTUAL_PLAYER, nFreeSeats)];
    }

    private createVisibilityManager(lobbyCreation: LobbyCreation): VisibilityManager {
        let visibilityManager: VisibilityManagerPublicPass;

        switch (lobbyCreation.visibility) {
            case GameVisibilities.Private:
                return Container.get(VisibilityManagerPrivate);
            case GameVisibilities.PublicNoPassword:
                return Container.get(VisibilityManagerPublicNoPass);
            case GameVisibilities.PublicPassword:
                visibilityManager = Container.get(VisibilityManagerPublicPass);
                if (lobbyCreation.password) visibilityManager.addPassword(this.lobbyId, lobbyCreation.password);
                return visibilityManager;
            default:
                throw new Error(INVALID_VISIBILITY);
        }
    }

    abstract getInfo(): CommonLobby;
}
