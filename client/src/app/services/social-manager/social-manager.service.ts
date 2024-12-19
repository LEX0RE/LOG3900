import { Injectable } from '@angular/core';
import { MessageSenderService } from '@app/services/messages-sender/messages-sender.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
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
import { Social } from '@common/interfaces/user/social';

@Injectable({
    providedIn: 'root',
})
export class SocialManagerService {
    socketService: SocketClientService;
    messageSenderService: MessageSenderService;
    friends: UserProfile[];
    newFriends: UserProfile[];
    userBlock: UserProfile[];
    users: UserProfile[];
    player: string;
    friendRequestScreen: boolean;

    constructor(socketService: SocketClientService, messageSenderService: MessageSenderService) {
        this.socketService = socketService;
        this.configureSocket();
        this.messageSenderService = messageSenderService;
        this.friends = [];
        this.newFriends = [];
        this.userBlock = [];
        this.users = [];
        this.player = '';
        this.friendRequestScreen = false;
        this.needSocial();
    }

    get allUser() {
        return this.users.filter(
            (user) =>
                user.name.length >= this.player.length &&
                this.player.toLocaleLowerCase() === user.name.substring(0, this.player.length).toLocaleLowerCase(),
        );
    }

    get hasNewFriendRequest(): boolean {
        return this.newFriends.length > 0;
    }

    needSocial() {
        this.socketService.send(GET_SOCIAL, '');
    }

    sendRequest(userId: string) {
        this.socketService.send(SEND_REQUEST, userId);
    }

    removeFromBlock(userId: string) {
        this.socketService.send(REMOVE_USER_FROM_BLOCK, userId);
    }

    addUserToBlock(userId: string) {
        this.socketService.send(ADD_USER_TO_BLOCK, userId);
    }

    removeFriend(friendId: string) {
        this.socketService.send(REMOVE_FRIEND, friendId);
    }

    refuseFriend(friendId: string) {
        this.socketService.send(REFUSE_FRIEND, friendId);
    }

    acceptFriend(friendId: string) {
        this.socketService.send(ACCEPT_FRIEND, friendId);
    }

    private configureSocket(): void {
        this.socketService.on(GET_SOCIAL, (social: Social) => {
            this.users = social.allUser;
            this.friends = social.friends;
            this.newFriends = social.friendsRequest;
            this.userBlock = social.usersBlock;
        });
        this.socketService.on(UPDATE_FRIENDS, (social: Social) => {
            this.users = social.allUser;
            this.friends = social.friends;
        });
        this.socketService.on(UPDATE_FRIENDS_REQUEST, (social: Social) => {
            this.users = social.allUser;
            this.newFriends = social.friendsRequest;
        });
        this.socketService.on(UPDATE_USER_BLOCK, (social: Social) => {
            this.users = social.allUser;
            this.newFriends = social.friendsRequest;
            this.userBlock = social.usersBlock;
        });
    }
}
