import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { MIDDLE_POSITION } from '@app/constants/game';
import { Hint } from '@app/interface/hint';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { FAKE_LETTERS, FAKE_LETTERS_3 } from '@app/test/constants/fake-letter-easel';
import { Orientation } from '@common/enums/orientation';

export const FAKE_BEGIN_POSITION = (): Vector2D => {
    return { x: 2, y: 4 };
};
export const FAKE_BEGIN_POSITION_2 = (): Vector2D => {
    return MIDDLE_POSITION;
};
export const FAKE_BEGIN_POSITION_3 = (): Vector2D => {
    return { x: 12, y: 10 };
};
export const FAKE_BEGIN_POSITION_4 = (): Vector2D => {
    return { x: 1, y: 1 };
};

export const FAKE_PLACE_ACTION = (): PlaceLetters => new PlaceLetters(FAKE_LETTERS(), FAKE_BEGIN_POSITION(), Orientation.Vertical);
export const FAKE_PLACE_ACTION_2 = (): PlaceLetters => new PlaceLetters(FAKE_LETTERS(), FAKE_BEGIN_POSITION_2(), Orientation.Horizontal);
export const FAKE_PLACE_ACTION_3 = (): PlaceLetters => new PlaceLetters(FAKE_LETTERS(), FAKE_BEGIN_POSITION_3(), Orientation.Horizontal);
export const FAKE_PLACE_ACTION_4 = (): PlaceLetters => new PlaceLetters(FAKE_LETTERS(), FAKE_BEGIN_POSITION_4(), Orientation.Vertical);
export const FAKE_PLACE_ACTION_5 = (): PlaceLetters => new PlaceLetters(FAKE_LETTERS_3(), FAKE_BEGIN_POSITION_4(), Orientation.Horizontal);

export const FAKE_SCORE = 15;
export const FAKE_SCORE_2 = 1;
export const FAKE_SCORE_3 = 23;
export const FAKE_SCORE_4 = 33;

export const FAKE_HINTS = (): Hint[] => [
    { action: FAKE_PLACE_ACTION(), score: FAKE_SCORE },
    { action: FAKE_PLACE_ACTION_2(), score: FAKE_SCORE_2 },
];
export const LONG_FAKE_HINTS = (): Hint[] => [
    { action: FAKE_PLACE_ACTION_4(), score: FAKE_SCORE_4 },
    { action: FAKE_PLACE_ACTION(), score: FAKE_SCORE },
    { action: FAKE_PLACE_ACTION_2(), score: FAKE_SCORE_2 },
    { action: FAKE_PLACE_ACTION_3(), score: FAKE_SCORE_3 },
];

export const FAKE_THREE_HINTS = (): Hint[] => [
    { action: FAKE_PLACE_ACTION_4(), score: FAKE_SCORE_4 },
    { action: FAKE_PLACE_ACTION_2(), score: FAKE_SCORE_2 },
    { action: FAKE_PLACE_ACTION_3(), score: FAKE_SCORE_3 },
];

export const EXPECTED_HINTS_MESSAGE = '\n!placer E3v *james*\n!placer H8h *james*';
