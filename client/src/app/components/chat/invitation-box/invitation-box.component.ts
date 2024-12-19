import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { InvitationManagerService } from '@app/services/invitation-manager/invitation-manager.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { SocialManagerService } from '@client/src/app/services/social-manager/social-manager.service';
import { LobbySendInvitation } from '@common/interfaces/lobby/lobby-send-invitation';
import { UserProfile } from '@common/interfaces/user-profile';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-invitation-box',
    templateUrl: './invitation-box.component.html',
    styleUrls: ['./invitation-box.component.scss'],
})
export class InvitationBoxComponent {
    @ViewChild('scrollBar') scrollElement: ElementRef;
    @Input() sender: string;
    nbMessages: number;
    chatBoxInteractionService: ChatBoxInteractionService;
    invitationManagerService: InvitationManagerService;
    socketClientService: SocketClientService;
    socialManagerService: SocialManagerService;
    translationsContainer: TranslateContainer;

    // eslint-disable-next-line max-params
    constructor(
        invitationManagerService: InvitationManagerService,
        socketClientService: SocketClientService,
        socialManagerService: SocialManagerService,
        translate: TranslateService,
    ) {
        this.invitationManagerService = invitationManagerService;
        this.socketClientService = socketClientService;
        this.socialManagerService = socialManagerService;
        this.translationsContainer = new TranslateContainer(translate, ['yes', 'no']);
    }

    get invitations(): LobbySendInvitation[] {
        return this.invitationManagerService.lobbyInvitation;
    }

    get friendsRequest(): UserProfile[] {
        return this.socialManagerService.newFriends;
    }

    get friendRequestOpen(): boolean {
        return this.socialManagerService.hasNewFriendRequest && this.socialManagerService.friendRequestScreen;
    }

    invitationDecision(decision: boolean, invitation: LobbySendInvitation) {
        this.invitationManagerService.invitationDecision(decision, invitation);
    }

    friendRequestDecision(decision: boolean, userId: string) {
        if (decision) this.socialManagerService.acceptFriend(userId);
        else this.socialManagerService.refuseFriend(userId);
    }
}
