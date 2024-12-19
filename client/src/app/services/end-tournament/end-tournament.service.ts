import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HOME } from '@app/constants/router-path';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import {
    END_TOURNAMENT,
    LEAVE_TOURNAMENT,
    STOP_OBSERVING_TOURNAMENT,
    SURRENDER_TOURNAMENT_EVENT,
    TOURNAMENT_CONTINUE_EVENT,
} from '@common/constants/communication';
import { CommonEndTournament } from '@common/interfaces/tournament/common-end-tournament';

@Injectable({
    providedIn: 'root',
})
export class EndTournamentService {
    endTournament: CommonEndTournament | null;
    canEndTournament: boolean;
    private socketService: SocketClientService;
    private router: Router;

    constructor(socketService: SocketClientService, router: Router) {
        this.socketService = socketService;
        this.endTournament = null;
        this.canEndTournament = false;
        this.router = router;
        this.configureSocket();
    }

    get canLeave(): boolean {
        return this.endTournament !== null || this.canEndTournament;
    }

    reset() {
        this.endTournament = null;
        this.canEndTournament = false;
    }

    surrenderTournament(): void {
        this.router.navigate([HOME]);
        this.socketService.send(STOP_OBSERVING_TOURNAMENT);
        this.socketService.send(SURRENDER_TOURNAMENT_EVENT);
        this.reset();
    }

    leaveTournament(): void {
        this.router.navigate([HOME]);
        this.socketService.send(STOP_OBSERVING_TOURNAMENT);
        this.socketService.send(LEAVE_TOURNAMENT);
        this.reset();
    }

    private configureSocket(): void {
        this.socketService.on(END_TOURNAMENT, (endTournament: CommonEndTournament) => (this.endTournament = endTournament));
        this.socketService.on(TOURNAMENT_CONTINUE_EVENT, () => (this.canEndTournament = true));
    }
}
