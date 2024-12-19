import { TestBed } from '@angular/core/testing';
import { GamesService } from '@app/services/lobby/games/games.service';
import { SocketTestHelper } from '@client/src/app/test/mocks/socket-helper/socket-test-helper';
import { Socket } from 'socket.io-client';

describe('GamesService', () => {
    let service: GamesService;
    let clientFakeSocket: SocketTestHelper;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GamesService],
        });
        service = TestBed.inject(GamesService);
        clientFakeSocket = new SocketTestHelper();
        service['socketManager']['socket'] = clientFakeSocket as unknown as Socket;

        service['socketManager']['socket'].connected = true;

        service['configureSocket']();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });
});
