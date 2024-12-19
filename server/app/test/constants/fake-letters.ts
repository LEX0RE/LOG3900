import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';

export const FAKE_LETTERS = (): CommonLetter[] => {
    return [
        { letter: '*', point: 0 },
        { letter: 'J', point: 3 },
        { letter: 'A', point: 3 },
        { letter: 'M', point: 10 },
        { letter: 'E', point: 3 },
        { letter: 'S', point: 3 },
        { letter: '*', point: 0 },
    ];
};

export const FAKE_LETTERS_2 = (): CommonLetter[] => {
    return [
        { letter: 'A', point: 0 },
        { letter: 'C', point: 3 },
        { letter: 'B', point: 3 },
        { letter: 'G', point: 10 },
        { letter: 'E', point: 3 },
        { letter: 'T', point: 3 },
    ];
};

export const FAKE_LETTERS_3 = (): CommonLetter[] => {
    return [
        { letter: 'G', point: 10 },
        { letter: 'E', point: 3 },
        { letter: 'T', point: 3 },
    ];
};

export const FAKE_LETTERS_4 = (): CommonLetter[] => {
    return [
        { letter: 'A', point: 0 },
        { letter: 'C', point: 3 },
        { letter: 'B', point: 3 },
    ];
};
