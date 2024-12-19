import { TestBed } from '@angular/core/testing';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { TimerService } from '@app/services/timer/timer.service';
import { FAKE_TIMERS } from '@app/test/constants/fake-timer';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { TIMER } from '@common/constants/communication';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { Socket } from 'socket.io-client';

describe('TimerService', () => {
    let service: TimerService;
    let clientFakeSocket: SocketTestHelper;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [SocketClientService] });
        service = TestBed.inject(TimerService);
        clientFakeSocket = new SocketTestHelper();

        // eslint-disable-next-line dot-notation -- Propriété privée
        service.socketService['socket'] = clientFakeSocket as unknown as Socket;

        service.socketService['socket'].connected = true;

        // eslint-disable-next-line dot-notation -- Méthode privée
        service['configureSocket']();

        FAKE_TIMERS.forEach((timer: CommonTimer) => {
            // eslint-disable-next-line dot-notation -- Propriété privée
            clientFakeSocket['callbacks'].get(TIMER)?.[0](timer);
        });
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should update value of timer when the timer_update event is emit from server', () => {
        expect(service.timer).toEqual(FAKE_TIMERS[FAKE_TIMERS.length - 1]);
    });
});
