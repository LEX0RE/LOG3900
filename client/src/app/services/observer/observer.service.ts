import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { ADD_OBSERVER_TO_GAME, BOARD_UPDATE, EASEL_UPDATE, GAME_UPDATE, NEW_TURN, REDIRECT_TO_OBSERVE } from '@common/constants/communication';
import { Turn } from '@common/interfaces/replay/turn';
import { TurnInfo } from '@common/interfaces/replay/turn-info';

@Injectable({
    providedIn: 'root',
})
export class ObserverService {
    private socketManager: SocketClientService;
    private router: Router;
    constructor(socketManager: SocketClientService, router: Router) {
        this.socketManager = socketManager;
        this.router = router;
        this.configureSocket();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    wakeUp(): void {}

    observeTournamentGame(gameId: string) {
        this.socketManager.send(ADD_OBSERVER_TO_GAME, gameId);
    }

    private configureSocket(): void {
        this.socketManager.on(REDIRECT_TO_OBSERVE, async () => {
            if (!/observe/.test(this.router.url)) this.router.navigate(['/observe']);
        });

        this.socketManager.on(NEW_TURN, (turn: Turn) => {
            this.handleTurn(turn);
        });
    }

    private handleTurn(turn: Turn): void {
        const turnInfos: [string, TurnInfo][] = turn.infos;

        const gameUpdateHandlers = this.socketManager.onHandlers.get(GAME_UPDATE);
        const easelUpdateHandlers = this.socketManager.onHandlers.get(EASEL_UPDATE);
        const boardUpdateHandlers = this.socketManager.onHandlers.get(BOARD_UPDATE);

        if (!gameUpdateHandlers) return;
        gameUpdateHandlers.forEach((handler) => handler(turnInfos[0][1].gameUpdate));

        if (!easelUpdateHandlers) return;
        easelUpdateHandlers.forEach((handler) =>
            turnInfos.forEach((turnInfo) => handler({ easel: turnInfo[1].easelUpdate.easel, userId: turnInfo[0] })),
        );

        if (!boardUpdateHandlers) return;
        boardUpdateHandlers.forEach((handler) => handler(turn.boardUpdate));
    }
}
