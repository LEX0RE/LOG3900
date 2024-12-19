import { Game } from '@app/classes/game/game';
import { Tournament } from '@app/classes/tournament/tournament';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { LobbyManager } from '@app/services/lobby/lobby-manager/lobby-manager.service';
import { VisibilityManagerPublicPass } from '@app/services/lobby/visibility-manager/public-with-password/public-with-password-manager.service';
import { ObserverManager } from '@app/services/observer-manager/observer-manager';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { TournamentManager } from '@app/services/tournament-manager/tournament-manager.service';
import { REDIRECT_TO_GAME, REDIRECT_TO_TOURNAMENT, START_GAME, START_TOURNAMENT } from '@common/constants/communication';
import { UserProfile } from '@common/interfaces/user-profile';
import { User } from '@common/interfaces/user/user';
import { Container, Service } from 'typedi';

@Service()
export class GameStartHandler {
    protected gameManager: GameManager;
    protected tournamentManager: TournamentManager;
    protected socketManager: SocketManager;
    protected lobbyManager: LobbyManager;
    protected observerManager: ObserverManager;

    constructor() {
        this.gameManager = Container.get(GameManager);
        this.tournamentManager = Container.get(TournamentManager);
        this.socketManager = Container.get(SocketManager);
        this.lobbyManager = Container.get(LobbyManager);
        this.observerManager = Container.get(ObserverManager);
        this.configureSocketFeatures();
    }

    private onCreateGame(user: User, lobbyId: string): void {
        const lobby = this.lobbyManager.getLobby(lobbyId);

        if (!lobby || !lobby.gameConfig.creator || lobby.gameConfig.creator.id !== user.id) return;
        const game = lobby.gameFactory.createGame(lobby) as Game;

        this.gameManager.addGame(game);
        const players = lobby.players;

        this.observerManager.switchLobbyToGame(lobbyId, game.gameId);
        if (lobby.visibilityManager instanceof VisibilityManagerPublicPass) lobby.visibilityManager.switchLobbyToGame(lobbyId, game.gameId);
        lobby.chatId = '';
        this.lobbyManager.lobbies.set(lobbyId, lobby);
        this.lobbyManager.deleteLobby(lobby.lobbyId);
        players.forEach((userProfile: UserProfile) => this.socketManager.sendPrivate(REDIRECT_TO_GAME, userProfile.id));
        game.start();
    }

    private onCreateTournament(user: User, lobbyId: string): void {
        const lobby = this.lobbyManager.getLobby(lobbyId);

        if (!lobby || !lobby.gameConfig.creator || lobby.gameConfig.creator.id !== user.id) return;
        const tournament = lobby.gameFactory.createGame(lobby) as Tournament;

        this.tournamentManager.addTournament(tournament);
        const users = lobby.players;

        this.observerManager.switchLobbyToTournament(lobbyId, tournament.tournamentId);
        if (lobby.visibilityManager instanceof VisibilityManagerPublicPass)
            lobby.visibilityManager.switchLobbyToGame(lobbyId, tournament.tournamentId);
        lobby.chatId = '';
        this.lobbyManager.lobbies.set(lobbyId, lobby);
        this.lobbyManager.deleteLobby(lobby.lobbyId);
        users.forEach((userProfile: UserProfile) => this.socketManager.sendPrivate(REDIRECT_TO_TOURNAMENT, userProfile.id));
        tournament.start();
    }

    private configureSocketFeatures(): void {
        this.socketManager.on(START_GAME, (user: User) => (lobbyId: string) => this.onCreateGame(user, lobbyId));
        this.socketManager.on(START_TOURNAMENT, (user: User) => (lobbyId: string) => this.onCreateTournament(user, lobbyId));
    }
}
