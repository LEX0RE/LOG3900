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

export const SCENARIO_5_TILES = (): Tile[][] => [
    [wx3().placeLetter(l.x), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3().placeLetter(l.x)],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [lx2(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std(), std(), wx2(), std(), std(), lx2()],
    [std(), std(), std(), std(), wx2(), std(), std(), std(), std(), std(), wx2(), std(), std(), std(), std()],
    [std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std()],
    [std(), std(), lx2(), std(), std(), std(), lx2(), std().placeLetter(l.k), lx2(), std(), std(), std(), lx2(), std(), std()],
    [wx3(), std(), std(), lx2(), std(), std(), std(), std().placeLetter(l.i), std(), std(), std(), lx2(), std(), std(), wx3()],
    [std(), std(), lx2(), std(), std(), std(), lx2(), std().placeLetter(l.w), lx2(), std(), std(), std(), lx2(), std(), std()],
    [std(), lx3(), std(), std(), std(), lx3(), std(), std().placeLetter(l.i), std(), lx3(), std(), std(), std(), lx3(), std()],
    [std(), std(), std(), std(), wx2(), std(), std(), std(), std(), std(), wx2(), std(), std(), std(), std()],
    [lx2(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std(), std(), wx2(), std(), std(), lx2()],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [wx3().placeLetter(l.x), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3().placeLetter(l.x)],
];

export const NEW_WORDS_5 = (): Tile[][] => [[std().placeLetter(l.k), std().placeLetter(l.i), std().placeLetter(l.w), std().placeLetter(l.i)]];

export const EXPECTED_SCORE_5 = 22;

export const BEGIN_POSITION_5: Vector2D = { x: 6, y: 7 };

export const WORD_PLACE_5: Letter[] = [l.k, l.i, l.w, l.i];

export const EXPECTED_POSITION_5: Vector2D[] = [
    { x: 6, y: 7 },
    { x: 7, y: 7 },
    { x: 8, y: 7 },
    { x: 9, y: 7 },
];
