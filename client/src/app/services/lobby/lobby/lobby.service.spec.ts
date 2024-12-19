import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LobbyComponent } from '@app/pages/lobby/lobby.component';
import { LobbyService } from '@app/services/lobby/lobby/lobby.service';
import { FAKE_CLASSIC_LOBBY_1 } from '@app/test/constants/fake-classic-lobbies';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { PUBLISH_LOBBY_INFO } from '@common/constants/communication';
import { Socket } from 'socket.io-client';

describe('LobbyService', () => {
    let service: LobbyService;
    let clientFakeSocket: SocketTestHelper;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([{ path: 'lobby', component: LobbyComponent }])],
            providers: [LobbyService],
        });
        service = TestBed.inject(LobbyService);
        clientFakeSocket = new SocketTestHelper();
        service['socketManager']['socket'] = clientFakeSocket as unknown as Socket;

        service['socketManager']['socket'].connected = true;
        service['configureSocket']();
    });

    it('should be created', () => {
        service.wakeUp();
        expect(service).toBeTruthy();
    });

    it('should update lobby info when received from server', () => {
        clientFakeSocket['callbacks'].get(PUBLISH_LOBBY_INFO)?.[0](FAKE_CLASSIC_LOBBY_1());
        expect(service.lobby).toEqual(FAKE_CLASSIC_LOBBY_1());
    });
});
