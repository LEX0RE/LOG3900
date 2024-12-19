import { ON_REMOVE_GAME } from '@app/constants/events/game-manager-events';
import { EMPTY } from '@app/constants/events/lobby-manager-events';
import { ON_REMOVE_TOURNAMENT } from '@app/constants/events/tournament-manager-event';
import { ObserverType } from '@app/enum/observer';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { LobbyManager } from '@app/services/lobby/lobby-manager/lobby-manager.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { TournamentManager } from '@app/services/tournament-manager/tournament-manager.service';
import {
    ADD_OBSERVER_TO_GAME,
    ADD_OBSERVER_TO_LOBBY,
    ADD_OBSERVER_TO_TOURNAMENT,
    NEW_TURN,
    REDIRECT_TO_OBSERVE,
    REDIRECT_TO_TOURNAMENT,
    STOP_OBSERVING_GAME,
    STOP_OBSERVING_LOBBY,
    STOP_OBSERVING_TOURNAMENT,
} from '@common/constants/communication';
import { Turn } from '@common/interfaces/replay/turn';
import { User } from '@common/interfaces/user/user';
import { Container, Service } from 'typedi';

@Service()
export class ObserverManager {
    readonly observersByRoomLobby: Map<string, User[]>;
    readonly observersByRoomGame: Map<string, User[]>;
    readonly observersByRoomTournament: Map<string, User[]>;
    private socketManager: SocketManager;
    private lobbyManager: LobbyManager;
    private gameManager: GameManager;
    private tournamentManager: TournamentManager;

    constructor() {
        this.socketManager = Container.get(SocketManager);
        this.lobbyManager = Container.get(LobbyManager);
        this.gameManager = Container.get(GameManager);
        this.tournamentManager = Container.get(TournamentManager);
        this.observersByRoomLobby = new Map<string, User[]>();
        this.observersByRoomGame = new Map<string, User[]>();
        this.observersByRoomTournament = new Map<string, User[]>();
        this.configureSocketListeners();
        this.configureLobbyEvents();
        this.configureGameEvents();
        this.configureTournamentEvents();
    }

    switchLobbyToGame(lobbyId: string, gameId: string): void {
        const lobbyObservers = this.observersByRoomLobby.get(lobbyId);

        if (lobbyObservers) {
            lobbyObservers.forEach((user: User) => this.removeObserverFromLobby(user, lobbyId, false));
            lobbyObservers.forEach(async (user: User) => this.addObserverToGame(user, gameId, false));
        }
        this.observersByRoomLobby.delete(lobbyId);
    }

    switchLobbyToTournament(lobbyId: string, tournamentId: string): void {
        const lobbyObservers = this.observersByRoomLobby.get(lobbyId);

        if (lobbyObservers) {
            lobbyObservers.forEach((user: User) => this.removeObserverFromLobby(user, lobbyId, false));
            lobbyObservers.forEach(async (user: User) => this.addObserverTournament(user, tournamentId, false));
        }
        this.observersByRoomLobby.delete(lobbyId);
    }

    sendTurn(gameId: string, turn: Turn): void {
        const observers: User[] | undefined = this.observersByRoomGame.get(gameId);

        if (observers) observers.forEach((observer: User) => this.socketManager.sendPrivate(NEW_TURN, observer.id, turn));
    }

    private configureSocketListeners(): void {
        this.socketManager.on(ADD_OBSERVER_TO_LOBBY, (user: User) => async (lobbyId: string) => this.addObserverToLobby(user, lobbyId));
        this.socketManager.on(ADD_OBSERVER_TO_GAME, (user: User) => async (gameId: string) => this.addObserverToGame(user, gameId, true));
        this.socketManager.on(
            ADD_OBSERVER_TO_TOURNAMENT,
            (user: User) => async (tournamentId: string) => this.addObserverTournament(user, tournamentId, true),
        );
        this.socketManager.on(STOP_OBSERVING_LOBBY, (user: User) => (lobbyId?: string) => {
            if (lobbyId) this.removeObserverFromLobby(user, lobbyId, true);
        });
        this.socketManager.on(STOP_OBSERVING_GAME, (user: User) => () => this.removeObserverFromGame(user));
        this.socketManager.on(STOP_OBSERVING_TOURNAMENT, (user: User) => () => this.removeObserverFromTournament(user));
        this.socketManager.onDisconnect((user: User) => () => {
            this.observersByRoomLobby.forEach(async (observers: User[], roomId: string) =>
                this.removeObserver(user, roomId, true, ObserverType.Lobby),
            );
            this.observersByRoomGame.forEach(async (observers: User[], roomId: string) => this.removeObserver(user, roomId, true, ObserverType.Game));
            this.observersByRoomTournament.forEach(async (observers: User[], roomId: string) =>
                this.removeObserver(user, roomId, true, ObserverType.Tournament),
            );
        });
    }

    private getMapByType(observerType: ObserverType) {
        switch (observerType) {
            case ObserverType.Lobby:
                return this.observersByRoomLobby;
            case ObserverType.Game:
                return this.observersByRoomGame;
            case ObserverType.Tournament:
                return this.observersByRoomTournament;
        }
    }

    private configureLobbyEvents(): void {
        this.lobbyManager.eventEmitter.on(EMPTY, (lobbyId: string) => this.observersByRoomLobby.delete(lobbyId));
    }

    private configureGameEvents(): void {
        this.gameManager.eventEmitter.on(ON_REMOVE_GAME, (gameId: string) => this.observersByRoomGame.delete(gameId));
    }

    private configureTournamentEvents(): void {
        this.tournamentManager.eventEmitter.on(ON_REMOVE_TOURNAMENT, (tournamentId: string) => this.observersByRoomTournament.delete(tournamentId));
    }

    private getRoomIdsByObserverId(playerId: string, observerType: ObserverType): string[] {
        const gameIds: string[] = [];

        for (const [gameId, observers] of this.getMapByType(observerType).entries()) {
            for (const observer of observers) {
                if (observer.id === playerId) gameIds.push(gameId);
            }
        }
        return gameIds;
    }

    private addObserver(user: User, roomId: string, observerType: ObserverType): void {
        let currentObservers: User[] | undefined = this.getMapByType(observerType).get(roomId);

        if (currentObservers) {
            if (currentObservers.find((observer: User) => observer.id === user.id)) return;
            currentObservers.push(user);
        } else currentObservers = [user];

        this.getMapByType(observerType).set(roomId, currentObservers);
    }

    // eslint-disable-next-line max-params, max-lines-per-function
    private async removeObserver(user: User, roomId: string, needRemoveChat: boolean, observerType: ObserverType): Promise<void> {
        const observers: User[] | undefined = this.getMapByType(observerType).get(roomId);

        if (observers) {
            const currentObservers = observers.filter((observer: User) => observer.id !== user.id);

            if (currentObservers.length === 0) this.getMapByType(observerType).delete(roomId);
            else this.getMapByType(observerType).set(roomId, currentObservers);
            if (!needRemoveChat) return;
            let chatId: string | undefined;

            switch (observerType) {
                case ObserverType.Lobby: {
                    chatId = this.lobbyManager.getLobby(roomId)?.chatId;
                    break;
                }
                case ObserverType.Game: {
                    chatId = this.gameManager.getGame(roomId)?.gameConfig.chatId;
                    break;
                }
                case ObserverType.Tournament: {
                    chatId = this.tournamentManager.getTournament(roomId)?.gameConfig.chatId;
                    break;
                }
            }

            if (chatId) await this.lobbyManager.chatManager.leaveChat(user, chatId);
        }
    }

    private async addObserverToLobby(user: User, lobbyId: string): Promise<void> {
        this.lobbyManager.observeLobby(user, lobbyId);
        this.addObserver(user, lobbyId, ObserverType.Lobby);

        const lobby = this.lobbyManager.getLobby(lobbyId);

        if (!lobby) return;
        await this.lobbyManager.chatManager.joinChat(user, lobby.chatId);
    }

    private async addObserverToGame(user: User, gameId: string, needAddChat: boolean): Promise<void> {
        this.gameManager.observeGame(user, gameId);
        this.addObserver(user, gameId, ObserverType.Game);
        this.socketManager.sendPrivate(REDIRECT_TO_OBSERVE, user.id);

        if (needAddChat) {
            const game = this.gameManager.getGame(gameId);

            if (!game) return;
            await this.lobbyManager.chatManager.joinChat(user, game.gameConfig.chatId);
        }
    }

    private async addObserverTournament(user: User, tournamentId: string, needAddChat: boolean): Promise<void> {
        this.tournamentManager.observeTournament(user, tournamentId);
        this.addObserver(user, tournamentId, ObserverType.Tournament);
        this.socketManager.sendPrivate(REDIRECT_TO_TOURNAMENT, user.id);

        if (needAddChat) {
            const tournament = this.tournamentManager.getTournament(tournamentId);

            if (!tournament) return;
            await this.lobbyManager.chatManager.joinChat(user, tournament.gameConfig.chatId);
        }
    }

    private removeObserverFromLobby(user: User, lobbyId: string, needRemoveChat: boolean): void {
        this.lobbyManager.removeObserver(user, lobbyId);
        this.removeObserver(user, lobbyId, needRemoveChat, ObserverType.Lobby);
    }

    private removeObserverFromGame(user: User): void {
        const gameIds = this.getRoomIdsByObserverId(user.id, ObserverType.Game);

        if (gameIds) {
            gameIds.forEach((gameId: string) => {
                this.gameManager.removeObserver(user, gameId);
                this.removeObserver(user, gameId, true, ObserverType.Game);
            });
        }
    }

    private removeObserverFromTournament(user: User): void {
        const gameIds = this.getRoomIdsByObserverId(user.id, ObserverType.Tournament);

        if (gameIds) {
            gameIds.forEach((gameId: string) => {
                this.tournamentManager.removeObserver(user, gameId);
                this.removeObserver(user, gameId, true, ObserverType.Tournament);
            });
        }
    }
}
