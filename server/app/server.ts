/* eslint-disable no-console -- Pour les logs du serveur ainsi que les erreurs */
import { Application } from '@app/app';
import { BASE_TEN } from '@app/constants/miscellaneous';
import { ApprovalManager } from '@app/services/approval/approval-manager.service';
import { ChatManager2 } from '@app/services/chat-manager2/chat-manager2.service';
import { CommandService } from '@app/services/command/command.services';
import { ConnectionManager } from '@app/services/connection-manager/connection-manager';
import { DatabaseService } from '@app/services/database/database.service';
import { DisplayPlacementFormatter } from '@app/services/display-placement-formatter/display-placement-formatter.service';
import { EndGameManager } from '@app/services/end-game-manager/end-game-manager.service';
import { EndTournamentManager } from '@app/services/end-tournament-manager/end-tournament-manager.service';
import { GameFactoryClassic } from '@app/services/game-factory/classic-game-factory/classic-game-factory.service';
import { GameFactoryCooperative } from '@app/services/game-factory/cooperative-game-factory/cooperative-game-factory.service';
import { GameStartHandler } from '@app/services/game-factory/game-start-handler';
import { GameHistoryDatabase } from '@app/services/game-history-manager/game-history-database/game-history-database.service';
import { GameHistoryManager } from '@app/services/game-history-manager/game-history-manager';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { Gameplay } from '@app/services/gameplay/gameplay.service';
import { LobbyManager } from '@app/services/lobby/lobby-manager/lobby-manager.service';
import { LobbyUpdateManager } from '@app/services/lobby/lobby-update-manager/lobby-update-manager.service';
import { VisibilityManagerPrivate } from '@app/services/lobby/visibility-manager/private/private-visibility-manger.service';
import { VisibilityManagerPublicNoPass } from '@app/services/lobby/visibility-manager/public-no-password/public-no-password-manager.service';
import { VisibilityManagerPublicPass } from '@app/services/lobby/visibility-manager/public-with-password/public-with-password-manager.service';
import { ObserverManager } from '@app/services/observer-manager/observer-manager';
import { ReplayDatabaseManager } from '@app/services/replay-manager/replay-database-manager/replay-database-manager.service';
import { ReplayManager } from '@app/services/replay-manager/replay-manager.service';
import { ScrabbleAlgo } from '@app/services/scrabble-algorithm/scrabble-algorithm.service';
import { SocialManager } from '@app/services/social-manager/social-manager.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { TournamentStatisticService } from '@app/services/tournament-statistic/tournament-statistic.service';
import { UsersManager } from '@app/services/users-manager/users-manager';
import { VirtualPlayerNameService } from '@app/services/virtual-player-name/virtual-player-name.service';
import * as http from 'http';
import { AddressInfo } from 'net';
import { Container, Service } from 'typedi';

@Service()
export class Server {
    private static readonly appPort: string | number | boolean = Server.normalizePort(process.env.PORT || '3000');
    server!: http.Server;
    private readonly application: Application;
    private readonly socketManager: SocketManager;

    // eslint-disable-next-line max-lines-per-function -- needs all services
    constructor() {
        Container.set(Server, this);
        this.application = Container.get(Application);
        this.socketManager = Container.get(SocketManager);
    }

    private static normalizePort(val: number | string): number | string | boolean {
        const port: number = typeof val === 'string' ? parseInt(val, BASE_TEN) : val;

        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        return false;
    }

    async init(): Promise<void> {
        this.application.app.set('port', Server.appPort);
        this.server = http.createServer(this.application.app);
        this.socketManager.init(this);
        this.initContainer();
        this.application.init();
        await this.connectDatabase();
        this.server.listen(Server.appPort);
        this.server.on('error', (error: NodeJS.ErrnoException) => this.onError(error));
        this.server.on('listening', () => this.onListening());
    }

    // eslint-disable-next-line max-lines-per-function -- sert juste a initialiser les containers
    private initContainer(): void {
        Container.get(SocketManager);
        Container.get(GameManager);
        Container.get(LobbyManager);
        Container.get(LobbyUpdateManager);
        Container.get(VisibilityManagerPrivate);
        Container.get(VisibilityManagerPublicNoPass);
        Container.get(VisibilityManagerPublicPass);
        Container.get(GameStartHandler);
        Container.get(GameFactoryClassic);
        Container.get(GameFactoryCooperative);
        Container.get(Gameplay);
        Container.get(CommandService);
        Container.get(ChatManager2);
        Container.get(SocialManager);
        Container.get(ScrabbleAlgo);
        Container.get(EndTournamentManager);
        Container.get(EndGameManager);
        Container.get(VirtualPlayerNameService);
        Container.get(GameHistoryDatabase);
        Container.get(UsersManager);
        Container.get(ApprovalManager);
        Container.get(GameHistoryManager);
        Container.get(ReplayDatabaseManager);
        Container.get(ReplayManager);
        Container.get(ObserverManager);
        Container.get(ConnectionManager);
        Container.get(TournamentStatisticService);
        Container.get(ApprovalManager);
        Container.get(DisplayPlacementFormatter);
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind: string = typeof Server.appPort === 'string' ? 'Pipe ' + Server.appPort : 'Port ' + Server.appPort;

        this.handleErrorCode(error, bind);
    }

    private handleErrorCode(error: NodeJS.ErrnoException, bind: string): void {
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
            // eslint-disable-next-line no-fallthrough -- traiter le exit
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
            // eslint-disable-next-line no-fallthrough -- traiter le exit
            default:
                throw error;
        }
    }

    private onListening(): void {
        const addr = this.server.address() as AddressInfo;
        const bind: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

        console.log(`Listening on ${bind}`);
    }

    private async connectDatabase(): Promise<void> {
        try {
            await Container.get(DatabaseService).start();
            console.log('Database connection successful.');
        } catch {
            console.error('Database connection failed.');
        }
    }
}
