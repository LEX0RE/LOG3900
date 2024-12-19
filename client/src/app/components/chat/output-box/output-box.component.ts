import { AfterViewChecked, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { SenderType } from '@app/constants/sender';
import { MessageSenderService } from '@app/services/messages-sender/messages-sender.service';
import { ChatBoxInteractionService } from '@client/src/app/services/chat-box-interaction/chat-box-interaction';
import { SocialManagerService } from '@client/src/app/services/social-manager/social-manager.service';
import { ServerMessage } from '@common/interfaces/chat/server-message';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-output-box',
    templateUrl: './output-box.component.html',
    styleUrls: ['./output-box.component.scss'],
})
export class OutputBoxComponent implements OnChanges, AfterViewChecked {
    @ViewChild('scrollBar') scrollElement: ElementRef;
    @Input() sender: string;
    nbMessages: number;
    translationsContainer: TranslateContainer;
    chatBoxInteractionService: ChatBoxInteractionService;
    socialManagerService: SocialManagerService;
    private readonly communicationService: MessageSenderService;

    // eslint-disable-next-line max-params
    constructor(
        translate: TranslateService,
        communication: MessageSenderService,
        chatBoxInteractionService: ChatBoxInteractionService,
        socialManagerService: SocialManagerService,
    ) {
        this.nbMessages = 0;
        this.communicationService = communication;
        this.sender = this.communicationService.socketService.socketId;
        this.translationsContainer = new TranslateContainer(translate, []);
        this.chatBoxInteractionService = chatBoxInteractionService;
        this.socialManagerService = socialManagerService;
    }

    ngOnChanges(): void {
        this.checkIfScrollToBottomNeeded();
    }

    ngAfterViewChecked(): void {
        this.checkIfScrollToBottomNeeded();
    }

    get messages(): ServerMessage[] {
        return this.chatBoxInteractionService.filterMessages(
            this.socialManagerService.users,
            this.socialManagerService.friends,
            this.socialManagerService.userBlock,
        );
    }

    get others(): SenderType {
        return SenderType.Others;
    }

    get client(): SenderType {
        return SenderType.Client;
    }

    createGroup(): void {
        // TODO a faire quand nous allons pouvoir créer des channels
    }

    goToSearchGroup(): void {
        this.chatBoxInteractionService.goToSearchChat();
    }

    checkIfScrollToBottomNeeded(): void {
        if (this.nbMessages !== this.messages.length) {
            this.scrollToBottom();
            this.nbMessages = this.messages.length;
        }
    }

    setCategory(senderId: string): string {
        return this.chatBoxInteractionService.isPlayer(senderId) ? SenderType.Client : SenderType.Others;
    }

    formatTime(dateToFormat: Date): string {
        const date = new Date(dateToFormat);

        return date.toLocaleTimeString('it-IT');
    }

    private scrollToBottom(): void {
        if (this.scrollElement) this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight;
    }
}
