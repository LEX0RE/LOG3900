import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BRACKET, GAME, HOME } from '@app/constants/router-path';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { REDIRECT_TO_GAME, REDIRECT_TO_HOME, REDIRECT_TO_TOURNAMENT, TOURNAMENT_UPDATE } from '@common/constants/communication';
import { CommonBracket } from '@common/interfaces/tournament/common-bracket';
import { CommonTournament } from '@common/interfaces/tournament/common-tournament';

@Injectable({
    providedIn: 'root',
})
export class BracketUpdaterService {
    socketService: SocketClientService;
    brackets: CommonBracket[];
    private readonly gameUpdater: GameUpdaterService;
    private readonly router: Router;

    constructor(socketService: SocketClientService, gameUpdater: GameUpdaterService, router: Router) {
        this.socketService = socketService;
        this.gameUpdater = gameUpdater;
        this.router = router;
        this.configureSocket();
        this.reset();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    wakeUp() {}

    reset(): void {
        this.brackets = [];
    }

    private configureSocket(): void {
        this.socketService.on(REDIRECT_TO_TOURNAMENT, async () => {
            if (!/bracket/.test(this.router.url)) this.router.navigate([BRACKET]);
            this.gameUpdater.reset();
        });
        this.socketService.on(REDIRECT_TO_GAME, async () => {
            if (!/game/.test(this.router.url)) this.router.navigate([GAME]);
        });
        this.socketService.on(REDIRECT_TO_HOME, async () => {
            if (!/home/.test(this.router.url)) this.router.navigate([HOME]);
        });
        this.socketService.on(TOURNAMENT_UPDATE, (update: CommonTournament) => {
            this.brackets = update.brackets;
        });
    }
}
