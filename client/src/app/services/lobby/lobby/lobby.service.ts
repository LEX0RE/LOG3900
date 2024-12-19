import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { PUBLISH_LOBBY_INFO } from '@common/constants/communication';
import { Lobby } from '@common/interfaces/lobby/lobby';
@Injectable({
    providedIn: 'root',
})
export class LobbyService {
    lobby: Lobby | null;
    private readonly socketManager: SocketClientService;
    private readonly router: Router;

    constructor(socketManager: SocketClientService, router: Router) {
        this.socketManager = socketManager;
        this.router = router;
        this.lobby = null;
        this.configureSocket();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function -- sert a ce que ce service soit construit quand il recoit un update
    wakeUp(): void {}

    reset(): void {
        this.lobby = null;
    }

    private configureSocket(): void {
        this.socketManager.on(PUBLISH_LOBBY_INFO, (info: Lobby) => {
            if (!/lobby/.test(this.router.url)) this.router.navigate(['/lobby']);
            this.lobby = info;
        });
    }
}
