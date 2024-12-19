import { Letter } from '@app/classes/letters/letter/letter';
import { LettersFactory as l } from '@app/classes/letters/letterFactory/letter-factory';
import { Tile } from '@app/classes/tiles/tile';
import {
    defaultLetterTimes2Tile as lx2,
    defaultLetterTimes3Tile as lx3,
    defaultStandardTile as std,
    defaultWordTimes2Tile as wx2,
    defaultWordTimes3Tile as wx3,
} from '@app/constants/default/default-tile';
import { Vector2D } from '@app/interface/vector-2d-interface';

export const SCENARIO_ONE_TILES = (): Tile[][] => [
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [lx2(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std(), std(), wx2(), std(), std(), lx2()],
    [std(), std().placeLetter(l.b), std(), std(), wx2(), std(), std(), std(), std(), std(), wx2(), std(), std(), std(), std()],
    [std(), lx3().placeLetter(l.a), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std()],
    [std(), std().placeLetter(l.l), lx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), lx2(), std(), std()],
    [wx3(), std().placeLetter(l.l), std(), lx2(), std(), std(), std(), std(), std(), std(), std(), lx2(), std(), std(), wx3()],
    [std(), std().placeLetter(l.e), lx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), lx2(), std(), std()],
    [std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std()],
    [std(), std(), std(), std(), wx2(), std(), std(), std(), std(), std(), wx2(), std(), std(), std(), std()],
    [lx2(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std(), std(), wx2(), std(), std(), lx2()],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()],
];

export const NEW_WORDS_1 = () => [
    [std().placeLetter(l.b), lx3().placeLetter(l.a), std().placeLetter(l.l), std().placeLetter(l.l), std().placeLetter(l.e)],
];

export const EXPECTED_SCORE_1 = 9;

export const BEGIN_POSITION_1: Vector2D = { x: 4, y: 1 };

export const WORD_PLACE_1: Letter[] = [l.b, l.a, l.l, l.l, l.e];

export const EXPECTED_POSITION_1: Vector2D[] = [
    { x: 4, y: 1 },
    { x: 5, y: 1 },
    { x: 6, y: 1 },
    { x: 7, y: 1 },
    { x: 8, y: 1 },
];
