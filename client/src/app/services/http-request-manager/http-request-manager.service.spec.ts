import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { FAKE_PROFILE } from '@app/test/constants/fake-profile';
import { LobbyCreation } from '@common/interfaces/lobby/lobby-creation';

describe('HttpRequestManagerService', () => {
    let service: HttpRequestManagerService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpRequestManagerService],
        }).compileComponents();
        service = TestBed.inject(HttpRequestManagerService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => expect(service).toBeTruthy());

    it('getTurnTimes() should return something', () => expect(service.getTurnTimes()).toBeTruthy());

    it('getDictionaries() should return something', () => expect(service.getDictionaries()).toBeTruthy());

    it('getHistory() should return something', () => {
        expect(service.getHistory()).toBeTruthy();
    });

    it('getHistory() should return something', () => expect(service.getHistory()).toBeTruthy());

    it('getDictionary() should return something', () => {
        const title = 'title';

        expect(service.getDictionary(title)).toBeTruthy();
    });

    it('register() should return something', () => {
        const profile = FAKE_PROFILE();

        expect(service.register(profile)).toBeTruthy();
    });

    it('login() should return something', () => {
        const userLogin = {
            userName: FAKE_PROFILE().userName,
            password: FAKE_PROFILE().password,
        };

        expect(service.login(userLogin)).toBeTruthy();
    });

    it('getReplay should return something', () => {
        const gameId = 'gameId';

        expect(service.getReplay(gameId)).toBeTruthy();
    });

    it('createLobby should return something', () => {
        const lobby = {} as unknown as LobbyCreation;

        expect(service.createLobby(lobby)).toBeTruthy();
    });
});
