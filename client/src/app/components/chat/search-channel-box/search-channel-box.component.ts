import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { MessageSenderService } from '@app/services/messages-sender/messages-sender.service';
import { JOIN_CHAT } from '@common/constants/communication';
import { ChatName } from '@common/interfaces/chat/chat-name';

@Component({
    selector: 'app-search-channel-box',
    templateUrl: './search-channel-box.component.html',
    styleUrls: ['./search-channel-box.component.scss'],
})
export class SearchChannelBoxComponent {
    @ViewChild('scrollBar') scrollElement: ElementRef;
    chatBoxInteractionService: ChatBoxInteractionService;
    readonly chatBoxService: MessageSenderService;

    constructor(chatBoxInteractionService: ChatBoxInteractionService, chatBoxService: MessageSenderService) {
        this.chatBoxInteractionService = chatBoxInteractionService;
        this.chatBoxService = chatBoxService;
    }

    get chatAvailable(): ChatName[] {
        return this.chatBoxInteractionService.othersChatName;
    }

    // eslint-disable-next-line no-unused-vars
    addChat(chat: ChatName) {
        this.chatBoxService.sendToServer(JOIN_CHAT, chat.id, chat.id);
    }
}
