import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ROUTING_TESTING_MODULE } from '@app/modules/app-routing.module';
import { BracketUpdaterService } from '@app/services/bracket-updater/bracket-updater.service';
import { EndGameService } from '@app/services/end-game/end-game.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { FAKE_END_GAME } from '@app/test/constants/fake-common-end-game';
import { SocketClientServiceMock } from '@app/test/mocks/socket-client-mock';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { bracketUpdaterStub } from '@app/test/mocks/stubs/bracket-updater-stub';
import { END_GAME, SURRENDER_EVENT } from '@common/constants/communication';
import { Socket } from 'socket.io-client';

describe('EndGameService', () => {
    let service: EndGameService;
    let socketServiceMock: SocketClientServiceMock;
    let socketHelper: SocketTestHelper;
    let bracketUpdate: jasmine.SpyObj<BracketUpdaterService>;

    beforeEach(async () => {
        socketHelper = new SocketTestHelper();
        socketServiceMock = new SocketClientServiceMock();
        bracketUpdate = bracketUpdaterStub();

        // eslint-disable-next-line dot-notation -- Propriété privée
        socketServiceMock['socket'] = socketHelper as unknown as Socket;
        // eslint-disable-next-line dot-notation -- Propriété privée
        socketServiceMock['socket'].connected = true;
        await TestBed.configureTestingModule({
            imports: [FormsModule, ROUTING_TESTING_MODULE()],
            providers: [
                { provide: SocketClientService, useValue: socketServiceMock },
                { provide: BracketUpdaterService, useValue: bracketUpdate },
            ],
            declarations: [],
        }).compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(EndGameService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should change update endgame', () => {
        socketHelper.peerSideEmit(END_GAME, FAKE_END_GAME());
        expect(service.endGame).toEqual(FAKE_END_GAME());
    });

    it('reset should set endGame to NotFinish', () => {
        service.reset();
        expect(service.endGame).toBeNull();
    });

    it('should call sendToServer when service call surrender', () => {
        const spy = spyOn(socketServiceMock, 'send');

        service.surrender();
        expect(spy).toHaveBeenCalledWith(SURRENDER_EVENT);
    });
});
