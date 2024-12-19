import { ViewLetter } from '@app/classes/view-letter';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';

export const FAKE_VIEW_LETTERS = (): ViewLetter[] => {
    return [
        new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'J', point: 3 }, EaselSelectionType.Manipulation),
        new ViewLetter({ letter: 'A', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'M', point: 3 }, EaselSelectionType.Trade),
        new ViewLetter({ letter: 'E', point: 3 }, EaselSelectionType.Hidden),
        new ViewLetter({ letter: 'S', point: 3 }, EaselSelectionType.Hidden),
        new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
    ];
};

export const FAKE_COMMON_TO_VIEW_LETTERS = (): ViewLetter[] => {
    return [
        new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'J', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'A', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'M', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'E', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'S', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
    ];
};

export const FIRST_SWITCH = (): ViewLetter[] => {
    return [
        new ViewLetter({ letter: 'J', point: 3 }, EaselSelectionType.Manipulation),
        new ViewLetter({ letter: 'A', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'M', point: 3 }, EaselSelectionType.Trade),
        new ViewLetter({ letter: 'E', point: 3 }, EaselSelectionType.Hidden),
        new ViewLetter({ letter: 'S', point: 3 }, EaselSelectionType.Hidden),
        new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
    ];
};

export const FAKE_COMMON_LETTERS = (): CommonLetter[] => {
    return [
        { letter: '*', point: 3 },
        { letter: 'J', point: 3 },
        { letter: 'A', point: 3 },
        { letter: 'M', point: 3 },
        { letter: 'E', point: 3 },
        { letter: 'S', point: 3 },
        { letter: '*', point: 3 },
    ];
};

export const LAST_SWITCH = (): ViewLetter[] => {
    return [
        new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'J', point: 3 }, EaselSelectionType.Manipulation),
        new ViewLetter({ letter: 'A', point: 3 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'M', point: 3 }, EaselSelectionType.Trade),
        new ViewLetter({ letter: 'E', point: 3 }, EaselSelectionType.Hidden),
        new ViewLetter({ letter: 'S', point: 3 }, EaselSelectionType.Hidden),
    ];
};

export const FAKE_TRADE_LETTER = 'M';

export const FAKE_SIZE = 5;

export const FAKE_VIEW_LETTERS_GRID = (): ViewLetter[] => {
    return [
        new ViewLetter({ letter: 'a', point: 2 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'a', point: 2 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: 'a', point: 2 }, EaselSelectionType.Unselected),
        new ViewLetter({ letter: '*', point: 0 }, EaselSelectionType.Unselected),
    ];
};
