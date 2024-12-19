import { EventEmitter, Injectable } from '@angular/core';
import { CLOSE_CHAT, CLOSE_PORTAL, OPEN_CHAT, OPEN_PORTAL } from '@app/constants/chat';
import { ChatState } from '@app/enum/chat-state';
import { IdentityService } from '@app/services/identity/identity.service';
import { GAME_USER } from '@common/constants/game-user';
import { AllChat } from '@common/interfaces/chat/all-chat';
import { Chat } from '@common/interfaces/chat/chat';
import { ChatName } from '@common/interfaces/chat/chat-name';
import { MessageFromChat } from '@common/interfaces/chat/messages';
import { ServerMessage } from '@common/interfaces/chat/server-message';
import { UserProfile } from '@common/interfaces/user-profile';

@Injectable({
    providedIn: 'root',
})
export class ChatBoxInteractionService {
    searchChat: string;
    chatJoined: Chat[];
    othersChat: ChatName[];
    actualChat: Chat | null;
    identityService: IdentityService;
    eventEmitter: EventEmitter<string>;

    private showChat: boolean;
    private showPortal: boolean;
    private chatState: ChatState;

    constructor(identityService: IdentityService) {
        this.showChat = false;
        this.showPortal = false;
        this.chatState = ChatState.MessageChat;
        this.searchChat = '';
        this.chatJoined = [];
        this.othersChat = [];
        this.identityService = identityService;
        this.actualChat = null;
        this.eventEmitter = new EventEmitter();
    }

    get state() {
        return this.chatState;
    }

    get othersChatName(): ChatName[] {
        return this.searchChat.length ? this.othersChat.filter((value) => this.containName(value.name)) : this.othersChat;
    }

    get chatJoinedName(): Chat[] {
        return this.searchChat.length ? this.chatJoined.filter((value) => this.containName(value.name)) : this.chatJoined;
    }

    get isMessageChat(): boolean {
        return this.state === ChatState.MessageChat;
    }

    get isChatJoined(): boolean {
        return this.state === ChatState.ChatJoined;
    }

    get isSearchChat(): boolean {
        return this.state === ChatState.SearchChat;
    }

    get getSearchChat(): string {
        return this.searchChat;
    }

    get isChatShow(): boolean {
        return this.showChat;
    }

    get isPortalShow(): boolean {
        return this.showPortal;
    }

    set setSearchChat(searchChat: string) {
        this.searchChat = searchChat;
    }

    openChat() {
        if (!this.showChat) {
            this.showChat = true;
            this.eventEmitter.emit(OPEN_CHAT);
        }
    }

    closeChat() {
        if (this.showChat) {
            this.showChat = false;
            this.eventEmitter.emit(CLOSE_CHAT);
        }
    }

    openPortal() {
        if (this.showChat && !this.showPortal) {
            this.closeChat();
            this.showPortal = true;
            this.eventEmitter.emit(OPEN_PORTAL);
        }
    }

    closePortal() {
        if (!this.showChat && this.showPortal) {
            this.openChat();
            this.showPortal = false;
            this.eventEmitter.emit(CLOSE_PORTAL);
        }
    }

    filterMessages(allUser: UserProfile[], friends: UserProfile[], userBlock: UserProfile[]): ServerMessage[] {
        return (
            this.actualChat?.serverMessage.filter((message) => {
                if (this.isPlayer(message.user.id)) return true;
                if (userBlock.find((user) => user.id === message.user.id)) return false;
                return allUser.find((user) => user.id === message.user.id) || friends.find((user) => user.id === message.user.id);
            }) ?? []
        );
    }

    isPlayer(playerId: string): boolean {
        return playerId === this.identityService.getUser()?.userId;
    }

    goToChatJoined() {
        this.chatState = ChatState.ChatJoined;
    }

    goToSearchChat() {
        this.chatState = ChatState.SearchChat;
    }

    updateAllChat(allChat: AllChat) {
        this.chatJoined = allChat.chatJoined;
        this.othersChat = allChat.otherChat;
        this.actualChat = allChat.chatJoined[0];
    }

    updateChat(message: MessageFromChat): void {
        const chatToUpdate = this.chatJoined.find((chat: Chat) => message.chatId === chat.id);

        if (chatToUpdate) chatToUpdate.serverMessage = message.messages;
    }

    addNewOthersChat(chatName: ChatName) {
        this.othersChat.push(chatName);
    }

    joinedChat(chat: Chat) {
        this.actualChat = chat;
        this.chatState = ChatState.MessageChat;
    }

    leaveChat(otherChat: ChatName) {
        if (this.actualChat?.id === otherChat.id && this.isMessageChat) this.goToChatJoined();

        if (otherChat.creator.id !== GAME_USER.id && otherChat.creator.name !== GAME_USER.name) this.othersChat.push(otherChat);
        this.chatJoined = this.chatJoined.filter((chat) => chat.id !== otherChat.id);
    }

    deleteChat(deleteChat: ChatName) {
        if (this.actualChat?.id === deleteChat.id && this.isMessageChat) this.goToChatJoined();

        this.othersChat = this.othersChat.filter((chat) => chat.id !== deleteChat.id);
        this.chatJoined = this.chatJoined.filter((chat) => chat.id !== deleteChat.id);
    }

    private containName(name: string): boolean {
        return name.length >= this.searchChat.length && this.searchChat.toLowerCase() === name.substring(0, this.searchChat.length).toLowerCase();
    }
}
