import { DATABASE_COLLECTION_CONNECTION } from '@app/constants/database';
import { DatabaseService } from '@app/services/database/database.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { ConnectionStatus } from '@common/enums/connection-status';
import { User } from '@common/interfaces/user/user';
import { UserConnectionInfo } from '@common/interfaces/user/user-connection-info';
import { UserConnections } from '@common/interfaces/user/user-connections';
import { Collection } from 'mongodb';
import { Container, Service } from 'typedi';

@Service()
export class ConnectionManager {
    private databaseService: DatabaseService;
    private databaseCollection: string;
    private socketManager: SocketManager;

    constructor() {
        this.databaseService = Container.get(DatabaseService);
        this.socketManager = Container.get(SocketManager);
        this.databaseCollection = DATABASE_COLLECTION_CONNECTION;
        this.configureSockets();
    }

    get collection(): Collection<UserConnections> {
        return this.databaseService.database.collection(this.databaseCollection);
    }

    async addConnection(user: User): Promise<unknown> {
        const connectionInfo: UserConnectionInfo = {
            date: new Date(),
            status: ConnectionStatus.Connected,
        };

        const existingConnections = await this.getConnections(user);

        if (existingConnections)
            return this.collection.updateOne({ userId: user.id }, { $set: { connections: [...existingConnections.connections, connectionInfo] } });
        return this.collection.insertOne({ userId: user.id, connections: [connectionInfo] });
    }

    async addDisconnection(user: User): Promise<unknown> {
        const connectionInfo: UserConnectionInfo = {
            date: new Date(),
            status: ConnectionStatus.Disconnected,
        };

        const existingConnections = await this.getConnections(user);

        if (existingConnections)
            return this.collection.updateOne({ userId: user.id }, { $set: { connections: [...existingConnections.connections, connectionInfo] } });
        return this.collection.insertOne({ userId: user.id, connections: [connectionInfo] });
    }

    async getConnections(user: User): Promise<UserConnections | null> {
        return this.collection.findOne({ userId: user.id });
    }

    private configureSockets(): void {
        this.socketManager.onConnection((user: User) => async () => this.addConnection(user));
        this.socketManager.onDisconnect((user: User) => async () => this.addDisconnection(user));
    }
}
