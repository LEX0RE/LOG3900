import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { NewGameConfigurationService } from '@app/services/new-game-configuration/new-game-configuration.service';
import { FAKE_TURN_TIMES } from '@app/test/constants/fake-timer';
import { NewHttpRequestManagerStub } from '@app/test/mocks/stubs/new-http-request-manager-service-stub';
import { GameModes } from '@common/enums/game-modes';

describe('NewGameConfigurationService', () => {
    let service: NewGameConfigurationService;
    let httpService: NewHttpRequestManagerStub;

    beforeEach(() => {
        httpService = new NewHttpRequestManagerStub();

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: HttpRequestManagerService, useValue: httpService }],
        }).compileComponents();
        service = TestBed.inject(NewGameConfigurationService);
    });

    it('should be created', () => expect(service).toBeTruthy());

    it('fetchTurnTime() should return something', () => expect(service.fetchTurnTimes()).toBeTruthy());

    it('fetchDictionaries() should return something', () => expect(service.fetchDictionaries()).toBeTruthy());

    it('should create lobby', () => {
        const form = {
            value: {
                dictionary: 'dictionnaire',
                gameModes: GameModes.Classic,
                isPublic: true,
            },
        };
        const turnTime = FAKE_TURN_TIMES()[0];

        service.createLobby(form as unknown as FormGroup, turnTime);
        expect(httpService.createLobby).toHaveBeenCalled();
    });
});
