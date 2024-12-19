import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { IdentityService } from '@app/services/identity/identity.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { BOARD_UPDATE, EASEL_UPDATE, GAME_UPDATE } from '@common/constants/communication';
import { Replay } from '@common/interfaces/replay/replay';
import { User } from '@common/interfaces/user/user';

@Injectable({
    providedIn: 'root',
})
export class ReplayService {
    replay: Replay | null;
    userIdForPointOfView: string;
    turnIndex: number;
    private readonly httpManager: HttpRequestManagerService;
    private readonly router: Router;
    private readonly socketManager: SocketClientService;
    private readonly identity: IdentityService;

    // eslint-disable-next-line max-params -- only services
    constructor(
        httpManager: HttpRequestManagerService,
        router: Router,
        socketManager: SocketClientService,
        identity: IdentityService,
        gameUpdater: GameUpdaterService,
    ) {
        this.httpManager = httpManager;
        this.socketManager = socketManager;
        this.identity = identity;
        this.router = router;
        gameUpdater.reset();
        this.replay = null;
        this.userIdForPointOfView = identity.getUser()?.userId || '';
        this.turnIndex = 0;
    }

    get pointOfView(): User[] {
        if (!this.replay) return [];
        const currentGameUpdate = this.replay.turns[this.turnIndex].infos[0][1].gameUpdate;

        return [
            { name: currentGameUpdate.playerInfo.name, id: currentGameUpdate.playerInfo.userId },

            ...currentGameUpdate.otherPlayersInfo.map((player) => ({ name: player.name, id: player.userId })),
        ];
    }

    getReplay(gameId: string): void {
        this.httpManager.getReplay(gameId).subscribe({
            next: (value) => {
                this.setReplay(value);
                this.router.navigate(['/replay']);
            },
            error: () => {
                this.replay = null;
            },
        });
    }

    setTurn(turnIndex: number): void {
        this.turnIndex = turnIndex;
        this.showReplay();
    }

    setPointOfView(userId: string): void {
        this.userIdForPointOfView = userId;
        this.showReplay();
    }

    private setReplay(replay: Replay): void {
        this.userIdForPointOfView = this.identity.getUser()?.userId || '';
        this.replay = replay;
        this.turnIndex = 0;
        this.showReplay();
    }

    private showReplay(): void {
        if (!this.replay) return;

        const turnInfoEntry = this.replay.turns[this.turnIndex].infos.find((info) => info[0] === this.userIdForPointOfView);

        if (!turnInfoEntry) return;

        const gameUpdateHandlers = this.socketManager.onHandlers.get(GAME_UPDATE);

        if (!gameUpdateHandlers) return;
        gameUpdateHandlers.forEach((handler) => handler(turnInfoEntry[1].gameUpdate));

        const easelUpdateHandlers = this.socketManager.onHandlers.get(EASEL_UPDATE);

        if (!easelUpdateHandlers) return;
        easelUpdateHandlers.forEach((handler) => handler(turnInfoEntry[1].easelUpdate));

        const boardUpdateHandlers = this.socketManager.onHandlers.get(BOARD_UPDATE);

        if (!boardUpdateHandlers) return;
        boardUpdateHandlers.forEach((handler) => handler(this.replay?.turns[this.turnIndex].boardUpdate));
    }
}
