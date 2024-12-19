import { HttpClient } from '@angular/common/http';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { FAKE_DICTIONARIES, FAKE_DICTIONARY } from '@app/test/constants/fake-dictionary';
import { FAKE_HISTORY } from '@app/test/constants/fake-game-history';
import { FAKE_PROFILE } from '@app/test/constants/fake-profile';
import { FAKE_REPLAY } from '@app/test/constants/fake-replay';
import { FAKE_BEST_SCORE } from '@app/test/constants/fake-scores';
import { FAKE_NAME } from '@app/test/constants/fake-virtual-players';
import { Observable, of } from 'rxjs';
export class NewHttpRequestManagerStub extends HttpRequestManagerService {
    fakeBestScore: Observable<
        {
            score: number;
            playerName: string[];
        }[]
    >;

    fakeNames: Observable<
        {
            playerName: string;
        }[]
    >;

    fakeHistory: Observable<
        {
            beginningDate: Date;
            duration: number;
            player1: { name: string; score: number };
            player2: { name: string; score: number };
            gameModeName: string;
            isSurrendered: boolean;
        }[]
    >;

    fakeDictionary: Observable<{
        title: string;
        description: string;
        dictionaryId: number;
        words: string[];
    }>;

    fakeProfile: Observable<{
        userName: string;
        email: string;
        password: string;
        profilePicture: string;
        theme: string;
        language: string;
        token: string;
    }>;

    voidResponse: Observable<undefined>;

    getHistory: jasmine.Spy;
    deleteHistory: jasmine.Spy;
    getDictionaries: jasmine.Spy;
    getDictionary: jasmine.Spy;
    register: jasmine.Spy;
    login: jasmine.Spy;
    getReplay: jasmine.Spy;

    // eslint-disable-next-line max-lines-per-function -- Pour bien stub chaque réponse
    constructor() {
        // eslint-disable-next-line no-undefined -- Pour mocker le HttpClient
        super(undefined as unknown as HttpClient);
        this.fakeBestScore = of(FAKE_BEST_SCORE());
        this.fakeNames = of(FAKE_NAME());
        this.fakeHistory = of(FAKE_HISTORY());
        this.getHistory = jasmine.createSpy('getHistory').and.returnValue(this.fakeHistory);
        this.voidResponse = of(void 0);
        this.deleteHistory = jasmine.createSpy('deleteHistory').and.returnValue(this.voidResponse);
        this.getDictionaries = jasmine.createSpy('getDictionaries').and.returnValue(of(FAKE_DICTIONARIES()));
        this.deleteHistory = jasmine.createSpy('deleteHistory').and.returnValue(this.voidResponse);
        this.fakeDictionary = of(FAKE_DICTIONARY());
        this.getDictionary = jasmine.createSpy('getDictionary').and.returnValue(this.fakeDictionary);
        this.fakeProfile = of(FAKE_PROFILE());
        this.register = jasmine.createSpy('register').and.returnValue(this.fakeProfile);
        this.login = jasmine.createSpy('register').and.returnValue(this.fakeProfile);
        this.createLobby = jasmine.createSpy('createLobby').and.returnValue(this.voidResponse);
        this.getTurnTimes = jasmine.createSpy('getTurnTimes').and.returnValue(of([]));
        this.getReplay = jasmine.createSpy('getReplay').and.returnValue(of(FAKE_REPLAY()));
    }
}
