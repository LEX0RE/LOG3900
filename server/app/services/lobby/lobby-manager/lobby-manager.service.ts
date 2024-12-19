import { LobbyClassic } from '@app/classes/lobby/classic/classic-lobby';
import { LobbyCooperative } from '@app/classes/lobby/cooperative/cooperative-lobby';
import { Lobby, LobbyOptions } from '@app/classes/lobby/lobby-abstract';
import { LobbyTournament } from '@app/classes/lobby/tournament/tournament-lobby';
import { INVALID_DICTIONARY, INVALID_GAMEMODE, INVALID_TURN_TIME } from '@app/constants/error/error-messages';
import { EMPTY, ON_CHANGE } from '@app/constants/events/lobby-manager-events';
import { ChatManager2 } from '@app/services/chat-manager2/chat-manager2.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { UsersManager } from '@app/services/users-manager/users-manager';
import { JoinResponse } from '@common/interfaces/join-response';

import {
    CANCEL_JOIN_REQUEST,
    DECISION_TO_JOIN,
    HEY_I_WANNA_JOIN_THIS_GAME,
    INVITE_FRIEND,
    JOIN_GAME_CONFIRMATION_PLAYER,
    JOIN_LOBBY,
    LEAVE_LOBBY,
    NOT_AVAILABLE,
    PUBLISH_LOBBY_INFO,
    REJECT_THAT_PLAYER_FROM_JOINING,
    SEND_INVITATION,
    YOU_WERE_REJECTED,
} from '@common/constants/communication';
import { GameModes } from '@common/enums/game-modes';
import { LobbyDecisionToJoin } from '@common/interfaces/lobby/lobby-decision-to-join';
import { LobbySendInvitation } from '@common/interfaces/lobby/lobby-send-invitation';
import { LobbySendInvitationList } from '@common/interfaces/lobby/lobby-send-invitation-list';

import { LobbyCreation } from '@common/interfaces/lobby/lobby-creation';
import { LobbyFriendInvitation } from '@common/interfaces/lobby/lobby-friend-invitation';
import { UserProfile } from '@common/interfaces/user-profile';
import { User } from '@common/interfaces/user/user';
import { EventEmitter } from 'stream';
import { Container, Service } from 'typedi';
import { v4 as idGenerator } from 'uuid';

@Service()
export class LobbyManager {
    lobbies: Map<string, Lobby>;
    waitResponse: Map<string, string[]>;
    userManager: UsersManager;
    eventEmitter: EventEmitter;
    chatManager: ChatManager2;
    private readonly lobbyEvents: EventEmitter;
    private readonly socketManager: SocketManager;

    constructor() {
        this.socketManager = Container.get(SocketManager);
        this.chatManager = Container.get(ChatManager2);
        this.lobbies = new Map<string, Lobby>();
        this.waitResponse = new Map<string, string[]>();
        this.userManager = Container.get(UsersManager);
        this.eventEmitter = new EventEmitter();
        this.lobbyEvents = new EventEmitter();
        this.configureSocketListeners();
        this.configureLobbyEvents();
    }

    async createLobby(lobbyCreation: LobbyCreation, creator: User): Promise<void> {
        lobbyCreation.gameConfig.creator = creator;
        const lobby = await this.createLobbyObject(lobbyCreation);

        this.lobbies.set(lobby.lobbyId, lobby);
        await lobby.addPlayer(creator);
        this.eventEmitter.emit(ON_CHANGE);
    }

    deleteLobby(lobbyId: string): void {
        const lobby = this.getLobby(lobbyId);

        if (!lobby) return;
        lobby.delete();
        this.lobbies.delete(lobbyId);
        this.eventEmitter.emit(ON_CHANGE);
    }

    getLobby(lobbyId: string): Lobby | undefined {
        return this.lobbies.get(lobbyId);
    }

    async joinLobby(user: User, lobbyId?: string): Promise<void> {
        if (!lobbyId) return;
        const lobby = this.getLobby(lobbyId);

        if (!lobby) return;
        if (!lobby.visibilityManager.isAllowedToJoinLobby(user, lobbyId)) return;

        if (lobby.players.length + lobby.playerResponse.length < lobby.maxPlayers) {
            const playerAdded = await lobby.addPlayer(user);

            if (playerAdded) await this.chatManager.joinChat(user, lobby.chatId);
        }
    }

    // eslint-disable-next-line max-lines-per-function
    async leaveLobby(user: User, lobbyId: string | null): Promise<void> {
        if (!lobbyId) {
            this.lobbies.forEach((lobby: Lobby) => {
                lobby.removePlayer(user);
            });
        } else {
            const lobby = this.getLobby(lobbyId);

            if (!lobby) return;
            lobby.removePlayer(user);
            lobby.removePlayerToWait(user.id);

            await this.chatManager.leaveChat(user, lobby.chatId);
        }
    }

    async inviteFriend(user: User, lobbyFriendInvitation: LobbyFriendInvitation): Promise<void> {
        const lobby = this.getLobby(lobbyFriendInvitation.lobbyId);

        if (!lobby) return;

        if (this.socketManager.isConnected(lobbyFriendInvitation.friendId)) {
            if (!lobby.playerResponse.includes(lobbyFriendInvitation.friendId)) {
                lobby.addPlayerToWait(lobbyFriendInvitation.friendId);
                this.sendInvitation(lobbyFriendInvitation.friendId);
            }
        } else this.socketManager.sendPrivate(NOT_AVAILABLE, user.id, lobbyFriendInvitation.friendId);
    }

    // eslint-disable-next-line max-lines-per-function
    async sendInvitation(friendId: string) {
        const invitationList: LobbySendInvitation[] = [];

        for (const [lobbyId, lobby] of this.lobbies) {
            if (lobby.playerResponse.includes(friendId) && lobby.gameConfig.creator) {
                const creator: User | undefined = lobby.gameConfig.creator;

                const profilePicture = await this.userManager.getProfilePicture(creator.name);

                if (!profilePicture) return;

                invitationList.push({
                    lobbyId,
                    creator,
                    profilePicture,
                });
            }
        }

        const invitation: LobbySendInvitationList = { lobbySendInvitation: invitationList };

        this.socketManager.sendPrivate(SEND_INVITATION, friendId, invitation);
    }

    async decisionToJoin(user: User, lobbyDecisionToJoin: LobbyDecisionToJoin): Promise<void> {
        if (lobbyDecisionToJoin.decision) await this.joinLobby(user, lobbyDecisionToJoin.lobbyId);
        const lobby = this.getLobby(lobbyDecisionToJoin.lobbyId);

        if (!lobby) return;

        lobby.removePlayerToWait(user.id);

        this.sendInvitation(user.id);
    }

    observeLobby(user: User, lobbyId: string): void {
        const lobby = this.getLobby(lobbyId);

        if (!lobby) return;
        lobby.addObserver(user);
    }

    removeObserver(user: User, lobbyId: string) {
        const lobby = this.getLobby(lobbyId);

        if (!lobby) return;
        lobby.removeObserver(user);
    }

    requestJoinLobby(user: User, lobbyId: string): void {
        const lobby: Lobby | undefined = this.getLobby(lobbyId);

        if (!lobby) return;
        const creator: User | undefined = lobby.gameConfig.creator;

        if (!creator) return;
        lobby.addAsker(user);
    }

    rejectJoinLobby(user: User, lobbyId?: string): void {
        if (!lobbyId) return;
        const lobby: Lobby | undefined = this.getLobby(lobbyId);

        if (!lobby) return;
        lobby.removeAsker(user);
        this.socketManager.sendPrivate(YOU_WERE_REJECTED, user.id);
    }

    cancelJoinLobby(user: User, lobbyId: string): void {
        const lobby: Lobby | undefined = this.getLobby(lobbyId);

        if (!lobby) return;
        const creator: User | undefined = lobby.gameConfig.creator;

        if (!creator) return;
        lobby.removeAsker(user);
    }

    private configureSocketListeners(): void {
        this.socketManager.on(JOIN_LOBBY, (user: User) => async (lobbyId: string) => this.joinLobby(user, lobbyId));
        this.socketManager.on(LEAVE_LOBBY, (user: User) => async (lobbyId: string) => this.leaveLobby(user, lobbyId));
        this.socketManager.on(HEY_I_WANNA_JOIN_THIS_GAME, (user: User) => (lobbyId: string) => this.requestJoinLobby(user, lobbyId));
        this.socketManager.on(
            REJECT_THAT_PLAYER_FROM_JOINING,
            () => (rejection: JoinResponse) => this.rejectJoinLobby(rejection.user, rejection.lobbyId),
        );
        this.socketManager.on(CANCEL_JOIN_REQUEST, (user: User) => (lobbyId: string) => this.cancelJoinLobby(user, lobbyId));
        this.socketManager.on(JOIN_GAME_CONFIRMATION_PLAYER, () => async (approval: JoinResponse) => this.joinLobby(approval.user, approval.lobbyId));
        this.socketManager.onDisconnect((user: User) => async () => this.leaveLobby(user, null));
        this.socketManager.on(INVITE_FRIEND, (user: User) => async (lobbyFriendInvitation: LobbyFriendInvitation) => {
            await this.inviteFriend(user, lobbyFriendInvitation);
        });
        this.socketManager.on(
            DECISION_TO_JOIN,
            (user: User) => async (lobbyDecisionToJoin: LobbyDecisionToJoin) => this.decisionToJoin(user, lobbyDecisionToJoin),
        );
    }

    private configureLobbyEvents(): void {
        this.lobbyEvents.on(ON_CHANGE, (lobbyId: string) => {
            const lobby = this.getLobby(lobbyId);

            if (!lobby) return;
            lobby.players.forEach((player: UserProfile) => this.socketManager.sendPrivate(PUBLISH_LOBBY_INFO, player.id, lobby.getInfo()));
            lobby.observers.forEach((observer: UserProfile) => this.socketManager.sendPrivate(PUBLISH_LOBBY_INFO, observer.id, lobby.getInfo()));
            this.eventEmitter.emit(ON_CHANGE);
        });

        this.lobbyEvents.on(EMPTY, async (lobbyId: string) => {
            const lobby = this.getLobby(lobbyId);

            if (!lobby) return;
            await this.chatManager.deleteChat(lobby.chatId);
            this.deleteLobby(lobbyId);
        });
    }

    // eslint-disable-next-line max-lines-per-function
    private async createLobbyObject(lobbyCreation: LobbyCreation): Promise<Lobby> {
        let chatId: string;

        if (!lobbyCreation.gameConfig.creator) chatId = '';
        else if (lobbyCreation.gameMode === GameModes.Tournament)
            chatId = await this.chatManager.createChatForGame(
                `${lobbyCreation.gameConfig.creator.name}'s tournament`,
                lobbyCreation.gameConfig.creator,
            );
        else chatId = await this.chatManager.createChatForGame(`${lobbyCreation.gameConfig.creator.name}'s game`, lobbyCreation.gameConfig.creator);
        if (!lobbyCreation.gameConfig.turnTimer) throw new Error(INVALID_TURN_TIME);
        if (!lobbyCreation.gameConfig.dictionaryTitle) throw new Error(INVALID_DICTIONARY);
        const lobbyId = idGenerator();
        const lobbyOptions: LobbyOptions = {
            lobbyCreation,
            lobbyId,
            chatId,
            eventEmitter: this.lobbyEvents,
        };

        switch (lobbyCreation.gameMode) {
            case GameModes.Classic:
                return new LobbyClassic(lobbyOptions);
            case GameModes.Cooperative:
                return new LobbyCooperative(lobbyOptions);
            case GameModes.Tournament:
                return new LobbyTournament(lobbyOptions);
            default:
                throw new Error(INVALID_GAMEMODE);
        }
    }
}
