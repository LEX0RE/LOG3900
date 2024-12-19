import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { LobbiesService } from '@app/services/lobby/lobbies/lobbies.service';
import { FAKE_CLASSIC_LOBBIES } from '@app/test/constants/fake-classic-lobbies';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { NewHttpRequestManagerStub } from '@app/test/mocks/stubs/new-http-request-manager-service-stub';
import { PUBLISH_CLASSIC_LOBBIES } from '@common/constants/communication';
import { Socket } from 'socket.io-client';

describe('LobbiesService', () => {
    let service: LobbiesService;
    let clientFakeSocket: SocketTestHelper;
    let httpService: NewHttpRequestManagerStub;

    beforeEach(() => {
        httpService = new NewHttpRequestManagerStub();
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: HttpRequestManagerService, useValue: httpService }, LobbiesService],
        });
        service = TestBed.inject(LobbiesService);
        clientFakeSocket = new SocketTestHelper();
        service['socketManager']['socket'] = clientFakeSocket as unknown as Socket;

        service['socketManager']['socket'].connected = true;

        service['configureSocket']();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should update lobby info when received from server', () => {
        expect(service.lobbiesClassic).toEqual([]);
        clientFakeSocket['callbacks'].get(PUBLISH_CLASSIC_LOBBIES)?.[0]({ availableLobbies: FAKE_CLASSIC_LOBBIES() });
        expect(service.lobbiesClassic).toEqual(FAKE_CLASSIC_LOBBIES());
    });
});
