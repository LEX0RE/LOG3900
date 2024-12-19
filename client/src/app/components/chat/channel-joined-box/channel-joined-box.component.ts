import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { MessageSenderService } from '@app/services/messages-sender/messages-sender.service';
import { CREATE_CHAT, DELETE_CHAT, LEAVE_CHAT, NEED_CHAT } from '@common/constants/communication';
import { GAME_USER } from '@common/constants/game-user';
import { Chat } from '@common/interfaces/chat/chat';
import { DEFAULT_CHAT } from '@common/interfaces/chat/default-chat';

@Component({
    selector: 'app-channel-joined-box',
    templateUrl: './channel-joined-box.component.html',
    styleUrls: ['./channel-joined-box.component.scss'],
})
export class ChannelJoinedBoxComponent {
    @ViewChild('scrollBar') scrollElement: ElementRef;
    chatBoxInteractionService: ChatBoxInteractionService;
    needNewChannel: boolean;
    chatToSend: string;
    readonly chatBoxService: MessageSenderService;

    constructor(chatBoxInteractionService: ChatBoxInteractionService, chatBoxService: MessageSenderService) {
        this.chatBoxInteractionService = chatBoxInteractionService;
        this.needNewChannel = false;
        this.chatBoxService = chatBoxService;
        this.chatToSend = '';
        this.chatBoxService.socketService.send(NEED_CHAT, '');
    }

    createChannel(): void {
        this.needNewChannel = true;
    }

    isDefaultChat(chatId: string): boolean {
        return DEFAULT_CHAT.id === chatId;
    }

    isGameChat(creatorId: string): boolean {
        return GAME_USER.id === creatorId;
    }

    goToSearchChat(): void {
        this.chatBoxInteractionService.goToSearchChat();
    }

    // eslint-disable-next-line no-unused-vars
    onEnter(event: Event): void {
        if (this.chatToSend && this.chatToSend.replace(/\s/g, '')) this.chatBoxService.sendToServer(CREATE_CHAT, this.chatToSend.trim());
        this.chatToSend = '';
        this.cancelNewChat();
    }

    cancelNewChat(): void {
        this.needNewChannel = false;
    }

    quitChat(chat: Chat) {
        this.chatBoxService.sendToServer(this.chatBoxInteractionService.isPlayer(chat.creator.id) ? DELETE_CHAT : LEAVE_CHAT, chat.id, chat.id);
    }

    joinedChat(chat: Chat): void {
        this.chatBoxInteractionService.joinedChat(chat);
    }
}
