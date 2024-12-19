import { ALGORITHM, JWT_SECRET } from '@app/constants/database';
import { AUTHENTICATION_ERROR } from '@app/constants/error/error-messages';
import { Server } from '@app/server';
import { TokenManager } from '@app/services/token/token-manager';
import { UserToSocketManager } from '@app/services/user-to-socket-manager/user-to-socket-manager';
import { CONNECTION, DISCONNECT } from '@common/constants/communication';
import { User } from '@common/interfaces/user/user';
import { verify } from 'jsonwebtoken';
import * as io from 'socket.io';
import { Container, Service } from 'typedi';
@Service()
export class SocketManager {
    private sio!: io.Server;
    private userToSocketId!: UserToSocketManager;
    private tokenManager!: TokenManager;

    init(server: Server) {
        this.tokenManager = Container.get(TokenManager);
        this.userToSocketId = Container.get(UserToSocketManager);
        this.sio = new io.Server(server.server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
        this.sio.setMaxListeners(0);
        this.configureAuthentication();
    }

    onConnection(actionFactory: (user: User) => () => void): void {
        this.sio.on(CONNECTION, (socket: io.Socket) => {
            // eslint-disable-next-line dot-notation -- On veut accéder à la propriété privée
            const user: User = socket['user'];

            try {
                actionFactory(user)();
                // eslint-disable-next-line no-empty -- On ne veut rien faire en cas d'erreur
            } catch (error) {}
        });
    }

    on<T>(event: string, actionFactory: (user: User) => (data: T) => void | Promise<void>): void {
        this.sio.on(CONNECTION, (socket: io.Socket) => {
            // eslint-disable-next-line dot-notation -- On veut accéder à la propriété privée
            const user: User = socket['user'];

            if (!user) return;
            this.userToSocketId.mapSocketIdToUser(user, socket.id);

            if (typeof actionFactory === 'function' && actionFactory.constructor.name === 'AsyncFunction') {
                const actionErrorWarp = async (data: T): Promise<void> => {
                    try {
                        await actionFactory(user)(data);
                        // eslint-disable-next-line no-empty -- On ne veut rien faire en cas d'erreur
                    } catch (error) {}
                };

                socket.on(event, actionErrorWarp);
            } else {
                const actionErrorWarp = (data: T): void => {
                    try {
                        actionFactory(user)(data);
                        // eslint-disable-next-line no-empty -- On ne veut rien faire en cas d'erreur
                    } catch (error) {}
                };

                socket.on(event, actionErrorWarp);
            }
        });
    }

    onDisconnect(actionFactory: (user: User) => () => void): void {
        this.sio.on(CONNECTION, (socket) => {
            socket.on(DISCONNECT, () => {
                // eslint-disable-next-line dot-notation -- On veut accéder à la propriété privée
                const user = socket['user'];
                const token: string = socket.handshake.auth.key;

                if (user) {
                    this.tokenManager.addTokenToBlackList(token);
                    this.userToSocketId.removeSocketIdFromUser(user, socket.id);
                    actionFactory(user)();
                }
            });
        });
    }

    send<T>(event: string, data?: T): void {
        if (data) this.sio.emit(event, data);
        else this.sio.emit(event);
    }

    sendPrivate<T>(event: string, userId: string, data?: T): void {
        const socketId = this.userToSocketId.getSocketIdFromUserId(userId);

        if (!socketId) return;
        const socket = this.sio.sockets.sockets.get(socketId);

        if (socket) {
            if (data) socket.emit(event, data);
            else socket.emit(event);
        }
    }

    broadcast<T>(event: string, userId: string, data?: T): void {
        const socketId = this.userToSocketId.getSocketIdFromUserId(userId);

        if (!socketId) return;
        const socket = this.sio.sockets.sockets.get(socketId);

        if (socket) {
            if (data) socket.broadcast.emit(event, data);
            else socket.broadcast.emit(event);
        }
    }

    to<T>(event: string, room: string, data?: T): void {
        if (data) this.sio.to(room).emit(event, data);
        else this.sio.to(room).emit(event);
    }

    join(userId: string, room: string): void {
        const socketId = this.userToSocketId.getSocketIdFromUserId(userId);

        if (!socketId) return;
        const socket = this.sio.sockets.sockets.get(socketId);

        if (socket) socket.join(room);
    }

    leave(userId: string, room: string): void {
        const socketId = this.userToSocketId.getSocketIdFromUserId(userId);

        if (!socketId) return;
        const socket = this.sio.sockets.sockets.get(socketId);

        if (socket) socket.leave(room);
    }

    getRoomsFromUser(userId: string): string[] {
        const socketId = this.userToSocketId.getSocketIdFromUserId(userId);

        if (!socketId) return [];
        const socket = this.sio.sockets.sockets.get(socketId);

        if (socket) return Array.from(socket.rooms);
        return [];
    }

    getUsersFromRoom(room: string): string[] {
        const socket = this.sio.sockets.adapter.rooms.get(room);

        if (socket) return Array.from(socket);
        return [];
    }

    getRoomSize(room: string): number {
        const roomSocket = this.sio.sockets.adapter.rooms.get(room);

        if (!roomSocket) return 0;
        return roomSocket.size;
    }

    isConnected(userId: string): boolean {
        const socketId = this.userToSocketId.getSocketIdFromUserId(userId);

        if (!socketId) return false;
        const socket = this.sio.sockets.sockets.get(socketId);

        if (socket) return socket.connected;
        return false;
    }

    private configureAuthentication(): void {
        this.sio.use((socket, next) => {
            const token: string = socket.handshake.auth.key;

            if (!token) next(new Error(AUTHENTICATION_ERROR));
            try {
                if (this.tokenManager.isTokenInBlackList(token)) next(new Error(AUTHENTICATION_ERROR));
                const decoded = verify(token, JWT_SECRET, { algorithms: [ALGORITHM] }) as User;

                // eslint-disable-next-line dot-notation -- On veut accéder à la propriété privée
                socket['user'] = decoded;
                next();
            } catch (err) {
                next(new Error(AUTHENTICATION_ERROR));
            }
        });
    }
}
