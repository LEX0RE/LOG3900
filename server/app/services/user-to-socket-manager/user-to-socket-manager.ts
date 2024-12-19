import { User } from '@common/interfaces/user/user';
import { Service } from 'typedi';

@Service()
export class UserToSocketManager {
    private socketIdToUser: Map<string, User>;
    private userIdToSocketId: Map<string, string>;

    constructor() {
        this.socketIdToUser = new Map<string, User>();
        this.userIdToSocketId = new Map<string, string>();
    }

    mapSocketIdToUser(user: User, socketId: string): void {
        if (this.socketIdToUser.get(socketId)) return;

        this.setSocketIdToUser(user.id, socketId);
    }

    getSocketIdFromUserId(userId: string): string | null {
        return this.userIdToSocketId.get(userId) || null;
    }

    removeSocketIdFromUser(user: User, socketId: string): void {
        this.socketIdToUser.delete(socketId);
        this.userIdToSocketId.delete(user.id);
    }

    private setSocketIdToUser(userId: string, socketId: string): void {
        this.userIdToSocketId.set(userId, socketId);
        this.userIdToSocketId.set(socketId, userId);
    }
}
