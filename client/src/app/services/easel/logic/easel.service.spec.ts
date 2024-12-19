import { TestBed } from '@angular/core/testing';
import { ViewLetter } from '@app/classes/view-letter';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { EaselService } from '@app/services/easel/logic/easel.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { FAKE_VIEW_LETTERS } from '@app/test/constants/fake-view-letters';
import { gameUpdaterStub } from '@app/test/mocks/stubs/game-updater-stub';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';

describe('EaselService', () => {
    let service: EaselService;
    let gameUpdate: jasmine.SpyObj<GameUpdaterService>;

    beforeEach(() => {
        gameUpdate = gameUpdaterStub();
        TestBed.configureTestingModule({
            providers: [{ provide: GameUpdaterService, useValue: gameUpdate }],
        });
        service = TestBed.inject(EaselService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('setLetters should handle empty viewLetters', () => {
        const letters = service.setLetters([]);
        const expectedLetters = ViewLetter.commonToView(gameUpdate.easel.letters);

        expect(letters).toEqual(expectedLetters);
    });

    it('setLetters should not change of existing letters position when receiving new letters', () => {
        const viewLetters: CommonLetter[] = [
            { letter: 'A', point: 3 },
            { letter: 'B', point: 3 },
            { letter: 'C', point: 3 },
            { letter: 'D', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'F', point: 3 },
            { letter: 'G', point: 3 },
        ];

        gameUpdate.easel.letters = [
            { letter: 'A', point: 3 },
            { letter: 'B', point: 3 },
            { letter: 'D', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'F', point: 3 },
            { letter: 'G', point: 3 },
            { letter: '*', point: 3 },
        ];
        const expectedLetters: CommonLetter[] = [
            { letter: 'A', point: 3 },
            { letter: 'B', point: 3 },
            { letter: '*', point: 3 },
            { letter: 'D', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'F', point: 3 },
            { letter: 'G', point: 3 },
        ];

        expect(service.setLetters(ViewLetter.commonToView(viewLetters))).toEqual(ViewLetter.commonToView(expectedLetters));
    });

    it('setLetters should not change handle duplicate letters and change the left one', () => {
        const viewLetters: CommonLetter[] = [
            { letter: 'A', point: 3 },
            { letter: 'A', point: 3 },
            { letter: 'A', point: 3 },
            { letter: 'A', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'F', point: 3 },
            { letter: 'G', point: 3 },
        ];

        gameUpdate.easel.letters = [
            { letter: 'A', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'F', point: 3 },
            { letter: 'G', point: 3 },
            { letter: 'B', point: 3 },
            { letter: 'G', point: 3 },
            { letter: 'D', point: 3 },
        ];
        const expectedLetters: CommonLetter[] = [
            { letter: 'B', point: 3 },
            { letter: 'G', point: 3 },
            { letter: 'D', point: 3 },
            { letter: 'A', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'F', point: 3 },
            { letter: 'G', point: 3 },
        ];

        expect(service.setLetters(ViewLetter.commonToView(viewLetters))).toEqual(ViewLetter.commonToView(expectedLetters));
    });

    it('setLetters should in different positions', () => {
        const viewLetters: CommonLetter[] = [
            { letter: 'A', point: 3 },
            { letter: 'B', point: 3 },
            { letter: 'C', point: 3 },
            { letter: 'D', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'F', point: 3 },
            { letter: 'G', point: 3 },
        ];

        gameUpdate.easel.letters = [
            { letter: 'B', point: 3 },
            { letter: 'A', point: 3 },
            { letter: 'C', point: 3 },
            { letter: 'G', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'F', point: 3 },
            { letter: 'D', point: 3 },
        ];
        const expectedLetters: CommonLetter[] = [
            { letter: 'A', point: 3 },
            { letter: 'B', point: 3 },
            { letter: 'C', point: 3 },
            { letter: 'D', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'F', point: 3 },
            { letter: 'G', point: 3 },
        ];

        expect(service.setLetters(ViewLetter.commonToView(viewLetters))).toEqual(ViewLetter.commonToView(expectedLetters));
    });

    it('intersectionOfOccurrencesMap should handle undefined viewOccurrences', () => {
        const logicOccurrences = new Map<string, number>();
        const viewOccurrences = new Map<string, number>();

        gameUpdate.easel.letters = [{ letter: 'A', point: 3 }];
        viewOccurrences.set('A', 2);

        // eslint-disable-next-line dot-notation -- Propriété privée
        service['logicOccurrences'] = logicOccurrences;

        // eslint-disable-next-line dot-notation -- Propriété privée
        service['viewOccurrences'] = viewOccurrences;

        // eslint-disable-next-line dot-notation -- Méthode privée
        const result = service['intersectionOfOccurrencesMap']();
        const expectedLetters = [
            { letter: 'A', point: 3 },
            { letter: 'A', point: 3 },
        ];

        expect(result).toEqual(expectedLetters);
    });

    it('reMapLetters should add nothing if the there is no newLetters', () => {
        const letter = new ViewLetter({ letter: 'A', point: 3 }, EaselSelectionType.Unselected);

        service.viewLetters = [letter];

        // eslint-disable-next-line dot-notation -- Méthode privée
        const result = service['reMapLetters']([letter.toCommonLetter], []);

        expect(result).toEqual([letter]);
    });

    it('reMapLetters should reduce viewLetter length when truthSource has less letters', () => {
        service.viewLetters = FAKE_VIEW_LETTERS();
        const expectedLetters = FAKE_VIEW_LETTERS();

        expectedLetters.pop();
        const truthSource: CommonLetter[] = [
            { letter: '*', point: 3 },
            { letter: 'J', point: 3 },
            { letter: 'A', point: 3 },
            { letter: 'M', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'S', point: 3 },
        ];

        // eslint-disable-next-line dot-notation -- Méthode privée
        expect(service['reMapLetters'](truthSource, [])).toEqual(expectedLetters);
    });

    it('should update easel if the letter is least than letters in gameUpdate', () => {
        const viewLetters: CommonLetter[] = [
            { letter: 'A', point: 3 },
            { letter: 'B', point: 3 },
            { letter: 'C', point: 3 },
            { letter: 'D', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'F', point: 3 },
            { letter: 'G', point: 3 },
        ];

        gameUpdate.easel.letters = [
            { letter: 'B', point: 3 },
            { letter: 'A', point: 3 },
            { letter: 'C', point: 3 },
            { letter: 'G', point: 3 },
            { letter: 'E', point: 3 },
        ];
        const expectedLetters: CommonLetter[] = [
            { letter: 'A', point: 3 },
            { letter: 'B', point: 3 },
            { letter: 'C', point: 3 },
            { letter: 'E', point: 3 },
            { letter: 'G', point: 3 },
        ];

        expect(service.setLetters(ViewLetter.commonToView(viewLetters))).toEqual(ViewLetter.commonToView(expectedLetters));
    });
});
