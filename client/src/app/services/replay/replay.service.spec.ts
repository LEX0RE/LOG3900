import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ROUTING_TESTING_MODULE } from '@app/modules/app-routing.module';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { ReplayService } from '@app/services/replay/replay.service';
import { FAKE_REPLAY } from '@app/test/constants/fake-replay';
import { SocketClientServiceMock } from '@app/test/mocks/socket-client-mock';
import { NewHttpRequestManagerStub } from '@app/test/mocks/stubs/new-http-request-manager-service-stub';
import { MOCK_TRANSLATION_MODULE } from '@app/test/mocks/translation-module';
import { BOARD_UPDATE, EASEL_UPDATE, GAME_UPDATE } from '@common/constants/communication';
import { Profile } from '@common/interfaces/profile';
import { Replay } from '@common/interfaces/replay/replay';

describe('ReplayService', () => {
    let service: ReplayService;
    let httpService: NewHttpRequestManagerStub;
    let replay: Replay;
    let socketClientService: SocketClientServiceMock;
    let gameUpdateHandler: jasmine.Spy;
    let easelUpdateHandler: jasmine.Spy;
    let boardUpdateHandler: jasmine.Spy;

    beforeEach(() => {
        replay = FAKE_REPLAY();
        httpService = new NewHttpRequestManagerStub();
        socketClientService = new SocketClientServiceMock();
        gameUpdateHandler = jasmine.createSpy();
        easelUpdateHandler = jasmine.createSpy();
        boardUpdateHandler = jasmine.createSpy();
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ROUTING_TESTING_MODULE(), MOCK_TRANSLATION_MODULE()],
            providers: [
                { provide: HttpRequestManagerService, useValue: httpService },
                {
                    provide: SocketClientServiceMock,
                    useValue: socketClientService,
                },
            ],
        }).compileComponents();
        service = TestBed.inject(ReplayService);
        service['identity']['getUser'] = (() => {
            return { userId: replay.turns[0].infos[0][1].gameUpdate.playerInfo.userId };
        }) as unknown as () => Profile | null;
        socketClientService.onHandlers = new Map<string, ((data: unknown) => void)[]>();
        socketClientService.onHandlers.set(GAME_UPDATE, [gameUpdateHandler]);
        socketClientService.onHandlers.set(EASEL_UPDATE, [easelUpdateHandler]);
        socketClientService.onHandlers.set(BOARD_UPDATE, [boardUpdateHandler]);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get getReplay', () => {
        service.getReplay(replay.gameId);
        expect(service.pointOfView).toEqual([
            { name: replay.turns[0].infos[0][1].gameUpdate.playerInfo.name, id: replay.turns[0].infos[0][1].gameUpdate.playerInfo.userId },

            ...replay.turns[0].infos[0][1].gameUpdate.otherPlayersInfo.map((player) => ({ name: player.name, id: player.userId })),
        ]);
    });

    it('should set turn', () => {
        service.getReplay(replay.gameId);
        service.setTurn(1);
        expect(service.turnIndex).toEqual(1);
    });

    it('should set point of view', () => {
        service.getReplay(replay.gameId);
        service.setPointOfView('fake');
        expect(service.userIdForPointOfView).toEqual('fake');
    });
});
