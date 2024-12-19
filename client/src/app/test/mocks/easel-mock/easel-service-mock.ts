import { FAKE_VIEW_LETTERS } from '@app/test/constants/fake-view-letters';

export const mockEaselService = () =>
    jasmine.createSpyObj('EaselService', ['setLetters'], {
        viewLetters: FAKE_VIEW_LETTERS(),
        logicOccurrencesMap: new Map<string, number>(),
        viewOccurrencesMap: new Map<string, number>(),
    });
