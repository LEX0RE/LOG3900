import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { NewGameConfigurationService } from '@app/services/new-game-configuration/new-game-configuration.service';
import { FAKE_DICTIONARIES } from '@app/test/constants/fake-dictionary';
import { FAKE_TURN_TIMES } from '@app/test/constants/fake-timer';
import { Difficulty } from '@common/enums/difficulty';
import { of } from 'rxjs';
export class NewGameServiceStub extends NewGameConfigurationService {
    openDictionaryOverlay: boolean;
    openErrorCreatingGameOverlay: boolean;
    fetchTurnTimes: jasmine.Spy;
    fetchDictionaries: jasmine.Spy;
    fetchTurnTimes2: jasmine.Spy;
    difficulty: Difficulty;

    constructor() {
        // eslint-disable-next-line no-undefined -- Pour mocker le HttpRequestManagerService
        super(undefined as unknown as HttpRequestManagerService);
        this.openDictionaryOverlay = false;
        this.openErrorCreatingGameOverlay = false;
        this.fetchTurnTimes = jasmine.createSpy('fetchTurnTimes').and.returnValue(of(FAKE_TURN_TIMES()));
        this.fetchDictionaries = jasmine.createSpy('fetchDictionaries').and.returnValue(of(FAKE_DICTIONARIES()));
        // eslint-disable-next-line no-undefined -- Pour mocker la méthode
        this.fetchTurnTimes2 = jasmine.createSpy('fetchTurnTimes').and.returnValue(undefined);
        this.difficulty = Difficulty.NotDefine;
    }
}
