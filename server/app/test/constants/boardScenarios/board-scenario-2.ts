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

// eslint-disable-next-line max-lines-per-function -- ne fait que retourner les tuiles du scenario 2
export const SCENARIO_2_TILES = (): Tile[][] => [
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [
        std(),
        std(),
        wx2().placeLetter(l.v),
        std().placeLetter(l.e),
        std().placeLetter(l.n),
        std().placeLetter(l.t),
        ((): Tile => {
            const tile = lx2().placeLetter(l.r);

            tile.isBonusActive = false;
            return tile;
        })(),
        std().placeLetter(l.e),
        lx2(),
        std(),
        std(),
        std(),
        wx2(),
        std(),
        std(),
    ],
    [
        lx2(),
        std(),
        std().placeLetter(l.a),
        wx2(),
        std().placeLetter(l.u),
        std(),
        std(),
        lx2().placeLetter(l.t),
        std(),
        std(),
        std(),
        wx2(),
        std(),
        std(),
        lx2(),
    ],
    [
        std(),
        std(),
        std().placeLetter(l.s),
        std().placeLetter(l.e),
        wx2().placeLetter(l.l),
        std(),
        std(),
        std().placeLetter(l.a),
        std(),
        std(),
        wx2(),
        std(),
        std(),
        std(),
        std(),
    ],
    [std(), lx3(), std(), std(), std(), lx3(), std(), std().placeLetter(l.t), std(), lx3(), std(), std(), std(), lx3(), std()],
    [std(), std(), lx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), lx2(), std(), std()],
    [wx3(), std(), std(), lx2(), std(), std(), std(), std(), std(), std(), std(), lx2(), std(), std(), wx3()],
    [std(), std(), lx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), lx2(), std(), std()],
    [std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std()],
    [std(), std(), std(), std(), wx2(), std(), std(), std(), std(), std(), wx2(), std(), std(), std(), std()],
    [lx2(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std(), std(), wx2(), std(), std(), lx2()],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()],
];

export const NEW_WORD_2 = (): Tile[][] => [
    [
        wx2().placeLetter(l.v),
        std().placeLetter(l.e),
        std().placeLetter(l.n),
        std().placeLetter(l.t),
        ((): Tile => {
            const tile = lx2().placeLetter(l.r);

            tile.isBonusActive = false;
            return tile;
        })(),
        std().placeLetter(l.e),
    ],
    [wx2().placeLetter(l.v), std().placeLetter(l.a), std().placeLetter(l.s)],
];

export const EXPECTED_SCORE_2 = 30;

export const BEGIN_POSITION_2: Vector2D = { x: 2, y: 2 };

export const WORD_PLACE_2: Letter[] = [l.v];

export const EXPECTED_POSITION_2: Vector2D[] = [{ x: 2, y: 2 }];

// eslint-disable-next-line max-lines-per-function -- ne fait que retourner les nouveaux mots formés
export const EXPECTED_NEW_WORD_2 = () => [
    [
        {
            isStared: false,
            letter: {
                letter: 'v',
                point: 4,
            },
            letterBonus: 1,
            wordBonus: 2,
            isBonusActive: true,
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
                letter: 's',
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
                letter: 'v',
                point: 4,
            },
            letterBonus: 1,
            wordBonus: 2,
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
                letter: 't',
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
            letterBonus: 2,
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
];
