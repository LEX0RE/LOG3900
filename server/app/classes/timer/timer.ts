import { Player } from '@app/classes/players/player-abstract';
import { TimeUtils } from '@app/classes/utils/time/time';
import { ONE_SECOND } from '@app/constants/miscellaneous';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { TIMER } from '@common/constants/communication';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { User } from '@common/interfaces/user/user';
import { Container } from 'typedi';

export class Timer {
    private timerId!: NodeJS.Timeout;
    private startTime!: number;
    private max!: number;
    private socketManager: SocketManager;
    private endTime: (() => void) | null;
    private readonly players: Player[];
    private observers: User[];

    constructor(time: CommonTimer, players: Player[], observers?: User[]) {
        this.socketManager = Container.get(SocketManager);
        this.max = TimeUtils.toMS(time);
        this.players = players;
        this.observers = observers ?? [];
        this.endTime = null;
    }

    setEndTimer(endTime: (() => void) | null): void {
        this.endTime = endTime;
    }

    start(): void {
        clearInterval(this.timerId);
        this.startTime = Date.now();
        this.emitTime();
        setTimeout(() => this.emitTime(), 1);
        this.timerId = setInterval(() => this.emitTime(), ONE_SECOND / 2);
    }

    stop(): void {
        clearInterval(this.timerId);
    }

    remainingTime(): number {
        return this.max - (Date.now() - this.startTime);
    }

    addObserver(user: User) {
        this.observers?.push(user);
    }

    removeObserver(user: User) {
        this.observers = this.observers.filter((observer: User) => observer.id !== user.id);
    }

    private emitTime(): void {
        const timeRemaining = this.remainingTime();

        if (timeRemaining > 0) {
            this.players.forEach((player) => {
                if (player.requiredUpdates) this.socketManager.sendPrivate(TIMER, player.id, TimeUtils.toCommonTimer(timeRemaining));
            });
            this.observers?.forEach((observer) => {
                if (observer) this.socketManager.sendPrivate(TIMER, observer.id, TimeUtils.toCommonTimer(timeRemaining));
            });
        } else {
            this.stop();
            if (this.endTime) this.endTime();
        }
    }
}
