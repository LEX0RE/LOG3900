import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { SocketClientStub } from '@app/test/services-stubs/socket-manager/socket-client/socket-client-stub';
import * as Communication from '@common/constants/communication';
import { User } from '@common/interfaces/user/user';

export class SocketManagerStub {
    private clientsList: Map<string, SocketClientStub>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Pour recevoir n'importe quel objet
    private _events: Map<string, (data: any) => void>;
    private rooms: Map<string, SocketClientStub[]>;
    private nextId: number;

    constructor() {
        this.clientsList = new Map();
        // eslint-disable-next-line no-underscore-dangle -- Pour initialiser la propriété privée _events
        this._events = new Map();
        this.rooms = new Map();
        this.nextId = 0;
    }

    createClient(): SocketClientStub {
        const socketId = (this.nextId++).toString();
        const client = new SocketClientStub(socketId, this);

        client.connect();
        return client;
    }

    connectClient(client: SocketClientStub): void {
        if (!this.isConnected(client.id)) {
            this.join(client.id, client.id);
            this.clientsList.set(client.id, client);
        }
    }

    disconnectClient(client: SocketClientStub): void {
        if (this.isConnected(client.id)) {
            this.executeFunction(Communication.DISCONNECT, client, client.id);
            this.rooms.forEach((list, key) => {
                this.rooms.set(
                    key,
                    list.filter((clientIterator) => clientIterator.id !== client.id),
                );
            });
        }
        this.clientsList.delete(client.id);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Pour recevoir n'importe quel object
    executeFunction<T>(event: string, client: SocketClientStub, data: T): void {
        if (this.clientsList.has(client.id)) {
            // eslint-disable-next-line no-underscore-dangle -- Pour stub le socketManager
            const func = this._events.get(event);

            if (func) func(data);
        }
    }

    on<T>(event: string, actionFactory: (user: User) => (data: T) => void): void {
        const action = actionFactory(FAKE_USER_1());

        // eslint-disable-next-line no-underscore-dangle -- Pour stub le socketManager
        this._events.set(event, (data: T): void => {
            try {
                action(data);
                // eslint-disable-next-line no-empty -- On ne veut rien faire en cas d'erreur
            } catch (error) {}
        });
    }

    onDisconnect(actionFactory: (user: User) => () => void): void {
        const action = actionFactory(FAKE_USER_1());

        // eslint-disable-next-line no-underscore-dangle -- Pour stub le socketManager
        this._events.set(Communication.DISCONNECT, (): void => {
            try {
                action();
                // eslint-disable-next-line no-empty -- On ne veut rien faire en cas d'erreur
            } catch (error) {}
        });
    }

    sendPrivate<T>(event: string, socketId: string, data?: T): void {
        this.clientsList.forEach((client) => {
            if (client.id === socketId) client.executeFunction(event, data);
        });
    }

    send<T>(event: string, data?: T): void {
        this.clientsList.forEach((client) => {
            client.executeFunction(event, data);
        });
    }

    broadcast<T>(event: string, socketId: string, data?: T): void {
        this.clientsList.forEach((client) => {
            if (client.id !== socketId) client.executeFunction(event, data);
        });
    }

    to<T>(event: string, room: string, data?: T): void {
        this.rooms.forEach((clients) => {
            clients.forEach((client) => client.executeFunction(event, data));
        });
    }

    join(socketId: string, room: string): void {
        if (this.isConnected(socketId)) {
            const roomFound = this.rooms.get(room);
            const client = this.clientsList.get(socketId);

            if (roomFound && client) roomFound.push(client);
        }
    }

    leave(socketId: string, room: string): void {
        if (this.isConnected(socketId)) {
            const roomFound = this.rooms.get(room);
            const client = this.clientsList.get(socketId);

            if (roomFound && client)
                this.rooms.set(
                    room,
                    roomFound.filter((clientIterator) => clientIterator.id !== socketId),
                );
        }
    }

    getRoomsFromUser(socketId: string): string[] {
        const rooms: string[] = [];

        if (this.isConnected(socketId)) {
            this.rooms.forEach((list, key) => {
                if (list.find((clientIterator) => clientIterator.id === socketId)) rooms.push(key);
            });
        }

        return rooms;
    }

    getRoomSize(room: string): number {
        const roomFound = this.rooms.get(room);

        if (roomFound) return Object.keys(roomFound).length;
        return 0;
    }

    isConnected(socketId: string): boolean {
        return this.clientsList.has(socketId);
    }
}
