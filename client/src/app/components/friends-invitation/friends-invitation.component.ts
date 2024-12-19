import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateContainer } from '@client/src/app/classes/translate-container/translate-container';
import { InvitationManagerService } from '@client/src/app/services/invitation-manager/invitation-manager.service';
import { LobbyService } from '@client/src/app/services/lobby/lobby/lobby.service';
import { SocialManagerService } from '@client/src/app/services/social-manager/social-manager.service';
import { SocketClientService } from '@client/src/app/services/socket-client/socket-client.service';
import { INVITE_FRIEND } from '@common/constants/communication';
import { LobbyFriendInvitation } from '@common/interfaces/lobby/lobby-friend-invitation';
import { UserProfile } from '@common/interfaces/user-profile';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-friends-invitation',
    templateUrl: './friends-invitation.component.html',
    styleUrls: ['./friends-invitation.component.scss'],
})
export class FriendsInvitationComponent {
    @ViewChild('scrollBar') scrollElement: ElementRef;
    translationsContainer: TranslateContainer;
    private readonly social: SocialManagerService;
    private readonly invitation: InvitationManagerService;
    private readonly lobbyManager: LobbyService;
    private readonly socketManager: SocketClientService;

    // eslint-disable-next-line max-params
    constructor(
        socialManagerService: SocialManagerService,
        invitation: InvitationManagerService,
        lobbyManager: LobbyService,
        socketManager: SocketClientService,
        translate: TranslateService,
    ) {
        this.social = socialManagerService;
        this.invitation = invitation;
        this.lobbyManager = lobbyManager;
        this.socketManager = socketManager;
        this.translationsContainer = new TranslateContainer(translate, ['friendList', 'notAvailable']);
    }

    get friends(): UserProfile[] {
        return this.social.friends;
    }

    get isPlayerNotAvailable(): boolean {
        return this.invitation.notAvailable;
    }

    inviteFriend(friendId: string): void {
        if (!this.lobbyManager.lobby?.lobbyId) return;
        const friendToInvite: LobbyFriendInvitation = {
            lobbyId: this.lobbyManager.lobby?.lobbyId,
            friendId,
        };

        this.socketManager.send(INVITE_FRIEND, friendToInvite);
    }
}
