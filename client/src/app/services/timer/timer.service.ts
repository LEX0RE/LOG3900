import { Injectable } from '@angular/core';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { TIMER } from '@common/constants/communication';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';

@Injectable({
    providedIn: 'root',
})
export class TimerService {
    timer: CommonTimer;
    socketService: SocketClientService;

    constructor(socketService: SocketClientService) {
        this.socketService = socketService;
        this.configureSocket();
        this.timer = { minute: 0, second: 0 };
    }

    private configureSocket(): void {
        this.socketService.on(TIMER, (timer: CommonTimer) => (this.timer = timer));
    }
}
