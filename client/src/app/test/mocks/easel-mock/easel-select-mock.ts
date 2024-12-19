import { mockEaselCancel } from '@app/test/mocks/easel-mock/easel-cancel-mock';
import { mockSelectionAlgo } from '@app/test/mocks/easel-mock/easel-selection-algo-mock';

export const mockEaselSelect = () =>
    jasmine.createSpyObj(
        'EaselSelect',
        [
            'selectManipulationByString',
            'selectHiddenLetterByString',
            'selectManipulationByIndex',
            'selectTradeLetter',
            'unselectHiddenLetterByString',
        ],
        {
            viewLetters: [],
            algo: mockSelectionAlgo(),
            cancel: mockEaselCancel(),
        },
    );
