import { Component } from '@angular/core';
import { TranslateContainer } from '@client/src/app/classes/translate-container/translate-container';
import { LobbyService } from '@client/src/app/services/lobby/lobby/lobby.service';
import { SocketClientService } from '@client/src/app/services/socket-client/socket-client.service';
import { JOIN_GAME_CONFIRMATION_PLAYER, REJECT_THAT_PLAYER_FROM_JOINING } from '@common/constants/communication';
import { JoinResponse } from '@common/interfaces/join-response';
import { User } from '@common/interfaces/user/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-join-request',
    templateUrl: './join-request.component.html',
    styleUrls: ['./join-request.component.scss'],
})
export class JoinRequestComponent {
    open: boolean;
    translationsContainer: TranslateContainer;
    private readonly lobbyService: LobbyService;
    private readonly socketManager: SocketClientService;

    constructor(translate: TranslateService, lobbyService: LobbyService, socketManager: SocketClientService) {
        this.lobbyService = lobbyService;
        this.socketManager = socketManager;
        this.open = true;
        this.translationsContainer = new TranslateContainer(translate, ['wantsToJoin', 'accept', 'decline']);
    }

    get potentialPlayers(): User[] {
        return this.lobbyService.lobby ? this.lobbyService.lobby.potentialPlayers : [];
    }

    accept(potentialPlayer: User): void {
        const approval: JoinResponse = {
            user: potentialPlayer,
            lobbyId: this.lobbyService.lobby?.lobbyId,
        };

        this.socketManager.send(JOIN_GAME_CONFIRMATION_PLAYER, approval);
    }

    decline(potentialPlayer: User): void {
        const rejection: JoinResponse = {
            user: potentialPlayer,
            lobbyId: this.lobbyService.lobby?.lobbyId,
        };

        this.socketManager.send(REJECT_THAT_PLAYER_FROM_JOINING, rejection);
    }

    close(): void {
        this.open = false;
    }
}
