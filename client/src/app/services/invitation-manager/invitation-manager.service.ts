import { Injectable } from '@angular/core';
import { MessageSenderService } from '@app/services/messages-sender/messages-sender.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { DECISION_TO_JOIN, INVITE_FRIEND, NOT_AVAILABLE, SEND_INVITATION } from '@common/constants/communication';
import { LobbyDecisionToJoin } from '@common/interfaces/lobby/lobby-decision-to-join';
import { LobbyFriendInvitation } from '@common/interfaces/lobby/lobby-friend-invitation';
import { LobbySendInvitation } from '@common/interfaces/lobby/lobby-send-invitation';
import { LobbySendInvitationList } from '@common/interfaces/lobby/lobby-send-invitation-list';

@Injectable({
    providedIn: 'root',
})
export class InvitationManagerService {
    socketService: SocketClientService;
    messageSenderService: MessageSenderService;
    notAvailable: boolean;
    lobbyInvitation: LobbySendInvitation[];

    constructor(socketService: SocketClientService) {
        this.socketService = socketService;
        this.configureSocket();

        this.notAvailable = false;
        this.lobbyInvitation = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    wakeUp() {}

    inviteFriend(friendId: string, lobbyId: string | undefined) {
        if (!lobbyId) return;
        const friendToInvite: LobbyFriendInvitation = {
            lobbyId,
            friendId,
        };

        this.socketService.send(INVITE_FRIEND, friendToInvite);
    }

    invitationDecision(decision: boolean, invitation: LobbySendInvitation) {
        const lobbyDecisionToJoin: LobbyDecisionToJoin = {
            lobbyId: invitation.lobbyId,
            decision,
        };

        this.socketService.send(DECISION_TO_JOIN, lobbyDecisionToJoin);
    }

    private configureSocket(): void {
        this.socketService.on(NOT_AVAILABLE, () => (this.notAvailable = true));
        this.socketService.on(
            SEND_INVITATION,
            (lobbyInvitation: LobbySendInvitationList) => (this.lobbyInvitation = lobbyInvitation.lobbySendInvitation),
        );
    }
}
