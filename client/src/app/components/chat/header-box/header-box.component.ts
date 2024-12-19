import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { SocialManagerService } from '@client/src/app/services/social-manager/social-manager.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header-box',
    templateUrl: './header-box.component.html',
    styleUrls: ['./header-box.component.scss'],
})
export class HeaderBoxComponent {
    chatBoxInteractionService: ChatBoxInteractionService;
    searchChannel: string;
    socialManagerService: SocialManagerService;
    translationsContainer: TranslateContainer;

    constructor(chatBoxInteractionService: ChatBoxInteractionService, socialManagerService: SocialManagerService, translate: TranslateService) {
        this.translationsContainer = new TranslateContainer(translate, ['searchChannel']);
        this.searchChannel = this.translationsContainer.get('searchChannel');
        this.chatBoxInteractionService = chatBoxInteractionService;
        this.socialManagerService = socialManagerService;
    }

    get channel(): string {
        if (this.chatBoxInteractionService.isMessageChat) return this.chatBoxInteractionService.actualChat?.name ?? this.searchChannel;
        return this.searchChannel;
    }

    closeChat() {
        this.chatBoxInteractionService.closeChat();
    }

    goToChannelJoined() {
        this.chatBoxInteractionService.goToChatJoined();
    }

    friendRequestScreen() {
        if (this.socialManagerService.hasNewFriendRequest)
            this.socialManagerService.friendRequestScreen = !this.socialManagerService.friendRequestScreen;
    }
}
