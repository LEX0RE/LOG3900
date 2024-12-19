import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BRACKET, HOME } from '@app/constants/router-path';
import { BracketUpdaterService } from '@app/services/bracket-updater/bracket-updater.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { END_GAME, GAME_CONTINUE_EVENT, LEAVE_GAME, REDIRECT_TO_TOURNAMENT, SURRENDER_EVENT } from '@common/constants/communication';
import { CommonEndGame } from '@common/interfaces/common-end-game';

@Injectable({
    providedIn: 'root',
})
export class EndGameService {
    endGame: CommonEndGame | null;
    canEndGame: boolean;
    private socketService: SocketClientService;
    private bracketService: BracketUpdaterService;
    private router: Router;

    constructor(socketService: SocketClientService, bracketService: BracketUpdaterService, router: Router) {
        this.socketService = socketService;
        this.bracketService = bracketService;
        this.router = router;
        this.configureSocket();
        this.canEndGame = false;
    }

    get canLeave(): boolean {
        return Boolean(this.endGame) || this.canEndGame;
    }

    reset(): void {
        this.endGame = null;
        this.canEndGame = false;
    }

    surrender(): void {
        this.router.navigate([HOME]);
        this.socketService.send(SURRENDER_EVENT);
        this.reset();
    }

    leave(): void {
        if (this.bracketService.brackets && this.bracketService.brackets.length) this.router.navigate([BRACKET]);
        else this.router.navigate([HOME]);
        this.socketService.send(LEAVE_GAME);
        this.reset();
    }

    private configureSocket(): void {
        this.socketService.on(END_GAME, (endGame: CommonEndGame) => (this.endGame = endGame));
        this.socketService.on(GAME_CONTINUE_EVENT, () => (this.canEndGame = true));
        this.socketService.on(REDIRECT_TO_TOURNAMENT, async () => this.reset());
    }
}
