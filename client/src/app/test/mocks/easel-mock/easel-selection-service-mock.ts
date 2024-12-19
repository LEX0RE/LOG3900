import { FAKE_SIZE, FAKE_TRADE_LETTER, FAKE_VIEW_LETTERS } from '@app/test/constants/fake-view-letters';
import { mockEaselCancel } from '@app/test/mocks/easel-mock/easel-cancel-mock';
import { mockEaselSelect } from '@app/test/mocks/easel-mock/easel-select-mock';
import { mockSelectionAlgo } from '@app/test/mocks/easel-mock/easel-selection-algo-mock';

// eslint-disable-next-line max-lines-per-function -- necessaire pour mock toutes les methodes
export const mockEaselSelectionService = () =>
    jasmine.createSpyObj(
        'EaselSelectionService',
        [
            'isInEasel',
            'cancelManipulation',
            'cancelTrade',
            'cancelHidden',
            'moveManipulationRight',
            'moveManipulationLeft',
            'selectManipulationByString',
            'selectHiddenByString',
            'unselectHiddenByString',
            'selectManipulationByIndex',
            'selectTrade',
        ],
        {
            viewLetters: FAKE_VIEW_LETTERS(),
            algo: mockSelectionAlgo(),
            cancelHandler: mockEaselCancel(),
            selectHandler: mockEaselSelect(),
            letters: [],
            tradeLetters: FAKE_TRADE_LETTER,
            size: FAKE_SIZE,
        },
    );
