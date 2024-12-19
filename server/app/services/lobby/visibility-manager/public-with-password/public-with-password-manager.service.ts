import { ON_REMOVE_GAME } from '@app/constants/events/game-manager-events';
import { EMPTY } from '@app/constants/events/lobby-manager-events';
import { VisibilityManager } from '@app/interface/visibility-manager';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { LobbyManager } from '@app/services/lobby/lobby-manager/lobby-manager.service';
import { GameVisibilities } from '@common/enums/game-visibilities';
import { LobbyPassword } from '@common/interfaces/lobby/lobby-password';
import { User } from '@common/interfaces/user/user';
import { Container, Service } from 'typedi';

@Service()
export class VisibilityManagerPublicPass implements VisibilityManager {
    visibility = GameVisibilities.PublicPassword;
    readonly password: Map<string, string>;
    private lobbyManager: LobbyManager;
    private gameManager: GameManager;

    constructor() {
        this.lobbyManager = Container.get(LobbyManager);
        this.gameManager = Container.get(GameManager);
        this.password = new Map<string, string>();
        this.configureLobbyEvents();
        this.configureGameEvents();
    }

    // eslint-disable-next-line no-unused-vars
    isAllowedToJoinLobby(user: User, lobbyId: string): boolean {
        return true;
    }

    addPassword(lobbyId: string, password: string): void {
        this.password.set(lobbyId, password);
    }

    verifyPassword(lobbyPassword: LobbyPassword): boolean {
        return this.password.get(lobbyPassword.lobbyId) === lobbyPassword.password;
    }

    switchLobbyToGame(lobbyId: string, gameId: string): void {
        const password = this.password.get(lobbyId);

        if (!password) return;

        this.password.delete(lobbyId);
        this.password.set(gameId, password);
    }

    private configureLobbyEvents(): void {
        this.lobbyManager.eventEmitter.on(EMPTY, (lobbyId: string) => {
            this.password.delete(lobbyId);
        });
    }

    private configureGameEvents(): void {
        this.gameManager.eventEmitter.on(ON_REMOVE_GAME, (gameId: string) => {
            this.password.delete(gameId);
        });
    }
}
