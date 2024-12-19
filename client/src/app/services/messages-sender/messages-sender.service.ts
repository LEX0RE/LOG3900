import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_CHAT } from '@app/constants/default-chat';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { CREATE_CHAT, DELETE_CHAT, ID, JOIN_CHAT, LEAVE_CHAT, MESSAGE, NEED_CHAT } from '@common/constants/communication';
import { AllChat } from '@common/interfaces/chat/all-chat';
import { Chat } from '@common/interfaces/chat/chat';
import { ChatName } from '@common/interfaces/chat/chat-name';
import { ClientPushMessage } from '@common/interfaces/chat/client-push-message';
import { MessageFromChat } from '@common/interfaces/chat/messages';

@Injectable({
    providedIn: 'root',
})
export class MessageSenderService {
    socketService: SocketClientService;
    router: Router;
    chatBoxInteractionService: ChatBoxInteractionService;

    constructor(socketService: SocketClientService, router: Router, chatBoxInteractionService: ChatBoxInteractionService) {
        this.socketService = socketService;
        this.router = router;
        this.connect();
        this.configureSocket();
        this.saveSocket();
        this.chatBoxInteractionService = chatBoxInteractionService;
        this.socketService.send(NEED_CHAT, '');
    }

    disconnect(): void {
        this.socketService.disconnect();
        localStorage.clear();
    }

    sendToServer(event: string, content: string, chatId: string = DEFAULT_CHAT): void {
        if (content.length === 0) return;
        const data: ClientPushMessage = { content, time: new Date(), chatId };

        this.socketService.send(event, data);
    }

    private configureSocket(): void {
        this.socketService.on(MESSAGE, (message: MessageFromChat) => this.chatBoxInteractionService.updateChat(message));

        this.socketService.on(NEED_CHAT, (allChat: AllChat) => this.chatBoxInteractionService.updateAllChat(allChat));

        this.socketService.on(CREATE_CHAT, (chatName: ChatName) => this.chatBoxInteractionService.addNewOthersChat(chatName));

        this.socketService.on(JOIN_CHAT, (newChat: Chat) => {
            this.chatBoxInteractionService.chatJoined.push(newChat);
            this.chatBoxInteractionService.othersChat = this.chatBoxInteractionService.othersChat.filter((chat) => chat.id !== newChat.id);
        });
        this.socketService.on(LEAVE_CHAT, (otherChat: ChatName) => this.chatBoxInteractionService.leaveChat(otherChat));

        this.socketService.on(DELETE_CHAT, (deleteChat: ChatName) => this.chatBoxInteractionService.deleteChat(deleteChat));
    }

    private connect(): void {
        if (!this.socketService.isSocketAlive()) this.socketService.connect();
    }

    private saveSocket(): void {
        window.addEventListener('beforeunload', (): void => {
            localStorage.setItem(ID, this.socketService.socketId);
            window.onbeforeunload = null;
        });
    }
}
