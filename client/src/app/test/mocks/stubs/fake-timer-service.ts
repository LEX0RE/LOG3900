import { TimerService } from '@app/services/timer/timer.service';
import { FAKE_TIMERS } from '@app/test/constants/fake-timer';
import { SocketClientServiceMock } from '@app/test/mocks/socket-client-mock';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';

export class TimerServiceStub extends TimerService {
    timer: CommonTimer;

    constructor() {
        super(new SocketClientServiceMock());
        this.timer = FAKE_TIMERS[0];
    }
}
