import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { UsersManager } from '@app/services/users-manager/users-manager';
import {
    ACCEPT_FRIEND,
    ADD_USER_TO_BLOCK,
    GET_SOCIAL,
    REFUSE_FRIEND,
    REMOVE_FRIEND,
    REMOVE_USER_FROM_BLOCK,
    SEND_REQUEST,
    UPDATE_FRIENDS,
    UPDATE_FRIENDS_REQUEST,
    UPDATE_USER_BLOCK,
} from '@common/constants/communication';
import { UserProfile } from '@common/interfaces/user-profile';
import { UserDatabase } from '@common/interfaces/user/database-user';
import { Social } from '@common/interfaces/user/social';
import { User } from '@common/interfaces/user/user';
import { ObjectId, WithId } from 'mongodb';
import { Container, Service } from 'typedi';

@Service()
export class SocialManager {
    private socketManager: SocketManager;
    private usersManager: UsersManager;

    constructor() {
        this.socketManager = Container.get(SocketManager);
        this.usersManager = Container.get(UsersManager);
        this.configureSocket();
    }

    // eslint-disable-next-line max-lines-per-function
    private configureSocket(): void {
        this.socketManager.on(GET_SOCIAL, (user: User) => async () => {
            await this.getSocial(user);
        });

        this.socketManager.on(SEND_REQUEST, (user: User) => async (userId: string) => {
            await this.sendRequest(user, userId);
        });

        this.socketManager.on(ACCEPT_FRIEND, (user: User) => async (userId: string) => {
            await this.chooseFriend(user, userId, true);
        });

        this.socketManager.on(REFUSE_FRIEND, (user: User) => async (userId: string) => {
            await this.chooseFriend(user, userId, false);
        });

        this.socketManager.on(REMOVE_FRIEND, (user: User) => async (userId: string) => {
            await this.removeFriend(user, userId);
        });

        this.socketManager.on(ADD_USER_TO_BLOCK, (user: User) => async (userId: string) => {
            await this.addUserToBlock(user, userId);
        });
        this.socketManager.on(REMOVE_USER_FROM_BLOCK, (user: User) => async (userId: string) => {
            await this.removeUserToBlock(user, userId);
        });
    }

    private async getSocial(user: User) {
        const userInfo = await this.usersManager.getUser(user.name);

        if (!userInfo) return;

        const allUser = await this.getAllUser(user, userInfo.usersBlock);

        if (!allUser) return;

        const friends = await this.getFriends(userInfo.friends);

        const usersBlock = await this.getUsersBlock(userInfo.usersBlock);

        const friendsRequest = await this.getFriendsRequest(userInfo.friendsRequest);

        if (!friends || !usersBlock || !friendsRequest) return;

        const social: Social = {
            allUser: this.convertToUserProfile(allUser),
            friends: this.convertToUserProfile(friends),
            friendsRequest: this.convertToUserProfile(friendsRequest),
            usersBlock: this.convertToUserProfile(usersBlock),
        };

        this.socketManager.sendPrivate(GET_SOCIAL, user.id, social);
    }

    private convertToUserProfile(list: WithId<UserDatabase>[]): UserProfile[] {
        return list.map((user) => {
            // eslint-disable-next-line no-underscore-dangle
            return { name: user.userName, profilePicture: user.profilePicture, id: user._id.toString() };
        });
    }

    private async sendRequest(user: User, requestId: string) {
        await this.addUserToFriendsRequest(requestId, user.id);
        const userInfo = await this.usersManager.getUserById(requestId);

        if (!userInfo) return;

        await this.sendUpdateFriendsRequest(
            {
                // eslint-disable-next-line no-underscore-dangle
                id: userInfo._id.toString(),
                name: userInfo.userName,
            },
            userInfo.friendsRequest,
            userInfo.usersBlock,
        );
    }

    private async chooseFriend(user: User, userFriendId: string, choice: boolean) {
        await this.removeUserToFriendsRequest(user.id, userFriendId);

        if (choice) await this.newFriend(user, userFriendId);

        const userInfo: WithId<UserDatabase> | null = await this.usersManager.getUser(user.name);

        if (!userInfo) return;
        await this.sendUpdateFriendsRequest(user, userInfo.friendsRequest, userInfo.usersBlock);

        await this.sendUpdateFriends(
            {
                id: user.id,
                name: userInfo.userName,
            },
            userInfo.friends,
            userInfo.usersBlock,
        );
    }

    private async newFriend(user: User, userFriendId: string) {
        await this.addUserToFriends(userFriendId, user.id);
        await this.addUserToFriends(user.id, userFriendId);
        await this.removeUserToFriendsRequest(userFriendId, user.id);

        const friendUserInfo: WithId<UserDatabase> | null = await this.usersManager.getUserById(userFriendId);

        if (!friendUserInfo) return;
        await this.sendUpdateFriendsRequest(
            { id: userFriendId, name: friendUserInfo.userName },
            friendUserInfo.friendsRequest,
            friendUserInfo.usersBlock,
        );

        await this.sendUpdateFriends(
            {
                id: userFriendId,
                name: friendUserInfo.userName,
            },
            friendUserInfo.friends,
            friendUserInfo.usersBlock,
        );
    }

    private async removeFriend(user: User, userFriendId: string) {
        await this.removeUserToFriends(user.id, userFriendId);
        await this.removeUserToFriends(userFriendId, user.id);

        const userInfo: WithId<UserDatabase> | null = await this.usersManager.getUser(user.name);
        const friendRemove = await this.usersManager.getUserById(userFriendId);

        if (!userInfo || !friendRemove) return;

        await this.sendUpdateFriends(user, userInfo.friends, userInfo.usersBlock);
        await this.sendUpdateFriends(
            {
                id: userFriendId,
                name: friendRemove.userName,
            },
            friendRemove.friends,
            friendRemove.usersBlock,
        );
    }

    private async addUserToBlock(user: User, userId: string) {
        await this.addUserToUsersBlock(user.name, userId);

        await this.removeUserToFriendsRequest(user.id, userId);
        await this.removeUserToFriendsRequest(userId, user.id);

        await this.sendNewUsersBlock(user, userId);
    }

    private async removeUserToBlock(user: User, userId: string) {
        await this.removeUserToUsersBlock(user.id, userId);
        await this.sendNewUsersBlock(user, userId);
    }

    private async sendNewUsersBlock(user: User, userId: string) {
        const userInfo: WithId<UserDatabase> | null = await this.usersManager.getUser(user.name);
        const userBlockInfo: WithId<UserDatabase> | null = await this.usersManager.getUserById(userId);

        if (!userInfo || !userBlockInfo) return;

        this.sendUpdateUsersBlock(userInfo);
        this.sendUpdateUsersBlock(userBlockInfo);
    }

    private async sendUpdateFriends(user: User, friends: string[], userBlock: string[]) {
        const allUser = await this.getAllUser(user, userBlock);
        const friendsList = await this.getFriends(friends);

        if (!friendsList || !allUser) return;

        const social: Social = {
            allUser: this.convertToUserProfile(allUser),
            friends: this.convertToUserProfile(friendsList),
            friendsRequest: [],
            usersBlock: [],
        };

        this.socketManager.sendPrivate(UPDATE_FRIENDS, user.id, social);
    }

    private async sendUpdateFriendsRequest(user: User, friendRequest: string[], userBlock: string[]) {
        const friendsRequestList = await this.getFriendsRequest(friendRequest);
        const allUser = await this.getAllUser(user, userBlock);

        if (!friendsRequestList || !allUser) return;

        const social: Social = {
            allUser: this.convertToUserProfile(allUser),
            friends: [],
            friendsRequest: this.convertToUserProfile(friendsRequestList),
            usersBlock: [],
        };

        this.socketManager.sendPrivate(UPDATE_FRIENDS_REQUEST, user.id, social);
    }

    private async sendUpdateUsersBlock(userInfo: WithId<UserDatabase>) {
        // eslint-disable-next-line no-underscore-dangle
        const user: User = { id: userInfo._id.toString(), name: userInfo.userName };
        const allUser = await this.getAllUser(user, userInfo.usersBlock);
        const usersBlockList = await this.getUsersBlock(userInfo.usersBlock);
        const friendRequest = await this.getFriendsRequest(userInfo.friendsRequest);

        if (!usersBlockList || !allUser || !friendRequest) return;

        const social: Social = {
            allUser: this.convertToUserProfile(allUser),
            friends: [],
            friendsRequest: this.convertToUserProfile(friendRequest),
            usersBlock: this.convertToUserProfile(usersBlockList),
        };

        this.socketManager.sendPrivate(UPDATE_USER_BLOCK, user.id, social);
    }

    private async addUserToFriends(userId: string, friendId: string) {
        await this.usersManager.collection.updateOne({ _id: new ObjectId(userId), friends: { $ne: friendId } }, { $addToSet: { friends: friendId } });
    }

    private async removeUserToFriends(userId: string, friendId: string) {
        await this.usersManager.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { friends: friendId } });
    }

    private async addUserToFriendsRequest(userId: string, friendRequestId: string) {
        await this.usersManager.collection.updateOne(
            { _id: new ObjectId(userId), friendsRequest: { $ne: friendRequestId } },
            { $addToSet: { friendsRequest: friendRequestId } },
        );
    }

    private async removeUserToFriendsRequest(userId: string, friendRequestId: string) {
        await this.usersManager.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { friendsRequest: friendRequestId } });
    }

    private async addUserToUsersBlock(username: string, userId: string) {
        await this.usersManager.collection.updateOne({ userName: username, usersBlock: { $ne: userId } }, { $addToSet: { usersBlock: userId } });
    }

    private async removeUserToUsersBlock(userId: string, userBlockId: string) {
        await this.usersManager.collection.updateOne({ _id: new ObjectId(userId) }, { $pull: { usersBlock: userBlockId } });
    }

    private async getFriends(friendList: string[]): Promise<WithId<UserDatabase>[] | undefined> {
        return this.usersManager.collection
            .find(
                {
                    _id: { $in: this.convertStringListToObjectId(friendList) },
                },
                { projection: { userName: 1, _id: 1, profilePicture: 1 } },
            )
            .toArray();
    }

    private async getUsersBlock(userBlocList: string[]): Promise<WithId<UserDatabase>[] | undefined> {
        return this.usersManager.collection
            .find(
                {
                    _id: { $in: this.convertStringListToObjectId(userBlocList) },
                },
                { projection: { userName: 1, _id: 1, profilePicture: 1 } },
            )
            .toArray();
    }

    private async getFriendsRequest(friendsRequestList: string[]): Promise<WithId<UserDatabase>[] | undefined> {
        return this.usersManager.collection
            .find(
                {
                    _id: { $in: this.convertStringListToObjectId(friendsRequestList) },
                },
                { projection: { userName: 1, _id: 1, profilePicture: 1 } },
            )
            .toArray();
    }

    private async getAllUser(user: User, userBlock: string[]): Promise<WithId<UserDatabase>[] | undefined> {
        return this.usersManager.collection
            .find({
                $and: [
                    { friends: { $nin: [user.id] } },
                    {
                        userName: { $ne: user.name },
                    },
                    { usersBlock: { $nin: [user.id] } },
                    { _id: { $nin: this.convertStringListToObjectId(userBlock) } },
                ],
            })
            .sort({ userName: 1 })
            .toArray();
    }

    private convertStringListToObjectId(list: string[]) {
        return list.map((string) => new ObjectId(string));
    }
}
