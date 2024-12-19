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

// eslint-disable-next-line max-lines-per-function -- ne fait que retourner les tuiles du scenario 3
export const SCENARIO_3_TILES = (): Tile[][] => [
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [lx2(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std(), std(), wx2(), std(), std(), lx2()],
    [std(), std(), std(), std(), wx2(), std(), std(), std(), std(), std(), wx2(), std(), std(), std(), std()],
    [std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std()],
    [std(), std(), lx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), lx2(), std(), std()],
    [
        wx3(),
        std(),
        std(),
        lx2(),
        std(),
        std(),
        std(),
        std().placeLetter(l.e),
        std().placeLetter(l.g),
        std().placeLetter(l.o),
        std(),
        lx2(),
        std(),
        std(),
        wx3(),
    ],
    [
        std(),
        std(),
        lx2(),
        std(),
        std(),
        std().placeLetter(l.a),
        lx2(),
        std(),
        ((): Tile => {
            const tile = lx2().placeLetter(l.a);

            tile.isBonusActive = false;
            return tile;
        })(),
        std(),
        std(),
        std(),
        lx2(),
        std(),
        std(),
    ],
    [
        std(),
        lx3(),
        std(),
        std(),
        std(),
        lx3().placeLetter(l.l),
        std().placeLetter(l.u),
        std().placeLetter(l.i),
        std().placeLetter(l.r),
        lx3().placeLetter(l.e),
        std(),
        std(),
        std(),
        lx3(),
        std(),
    ],
    [std(), std(), std(), std(), wx2(), std().placeLetter(l.l), std(), std(), std().placeLetter(l.e), std(), wx2(), std(), std(), std(), std()],
    [
        lx2(),
        std(),
        std(),
        wx2().placeLetter(l.a),
        std().placeLetter(l.d),
        std().placeLetter(l.o),
        std().placeLetter(l.n),
        lx2().placeLetter(l.n),
        std().placeLetter(l.e),
        std().placeLetter(l.r),
        std().placeLetter(l.a),
        wx2().placeLetter(l.i),
        std(),
        std(),
        lx2(),
    ],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()],
];

// eslint-disable-next-line max-lines-per-function -- ne fait que retourner les nouveaux mots formés
export const NEW_WORD_3 = (): Tile[][] => [
    [
        wx2().placeLetter(l.a),
        std().placeLetter(l.d),
        std().placeLetter(l.o),
        std().placeLetter(l.n),
        lx2().placeLetter(l.n),
        std().placeLetter(l.e),
        std().placeLetter(l.r),
        std().placeLetter(l.a),
        wx2().placeLetter(l.i),
    ],
    [
        std().placeLetter(l.g),
        ((): Tile => {
            const tile = lx2().placeLetter(l.a);

            tile.isBonusActive = false;
            return tile;
        })(),
        std().placeLetter(l.r),
        std().placeLetter(l.e),
        std().placeLetter(l.e),
    ],
];

export const EXPECTED_SCORE_3 = 50;

export const BEGIN_POSITION_3: Vector2D = { x: 11, y: 3 };

export const WORD_PLACE_3: Letter[] = [l.a, l.n, l.e, l.r, l.a, l.i];

export const EXPECTED_POSITION_3: Vector2D[] = [
    { x: 11, y: 3 },
    { x: 11, y: 7 },
    { x: 11, y: 8 },
    { x: 11, y: 9 },
    { x: 11, y: 10 },
    { x: 11, y: 11 },
];

// eslint-disable-next-line max-lines-per-function -- ne fait que retourner les nouveaux mots formés
export const EXPECTED_NEW_WORD_3 = () => [
    [
        {
            isStared: false,
            letter: {
                letter: 'g',
                point: 2,
            },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: {
                letter: 'a',
                point: 1,
            },
            letterBonus: 2,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: {
                letter: 'r',
                point: 1,
            },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: {
                letter: 'e',
                point: 1,
            },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: {
                letter: 'e',
                point: 1,
            },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
    ],
    [
        {
            isStared: false,
            letter: {
                letter: 'a',
                point: 1,
            },
            letterBonus: 1,
            wordBonus: 2,
            isBonusActive: true,
        },
        {
            isStared: false,
            letter: {
                letter: 'd',
                point: 2,
            },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: {
                letter: 'o',
                point: 1,
            },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: {
                letter: 'n',
                point: 1,
            },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: {
                letter: 'n',
                point: 1,
            },
            letterBonus: 2,
            wordBonus: 1,
            isBonusActive: true,
        },
        {
            isStared: false,
            letter: {
                letter: 'e',
                point: 1,
            },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: {
                letter: 'r',
                point: 1,
            },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: {
                letter: 'a',
                point: 1,
            },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: {
                letter: 'i',
                point: 1,
            },
            letterBonus: 1,
            wordBonus: 2,
            isBonusActive: true,
        },
    ],
];
