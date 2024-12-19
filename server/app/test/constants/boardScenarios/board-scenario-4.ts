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

// eslint-disable-next-line max-lines-per-function -- ne fait que retourner les tuiles du scenario 4
export const SCENARIO_4_TILES = (): Tile[][] => [
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [lx2(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std(), std(), wx2(), std(), std(), lx2()],
    [std(), std(), std(), std(), wx2(), std(), std(), std(), std(), std(), wx2(), std(), std(), std(), std()],
    [std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std().placeLetter(l.b), std(), std(), lx3(), std()],
    [std(), std(), lx2(), std(), std(), std(), lx2(), std(), lx2(), std().placeLetter(l.d), std().placeLetter(l.e), std(), lx2(), std(), std()],
    [wx3(), std(), std(), lx2(), std(), std(), std(), std(), std(), std().placeLetter(l.e), std().placeLetter(l.t), lx2(), std(), std(), wx3()],
    [
        std(),
        std(),
        lx2(),
        std(),
        std(),
        std(),
        lx2(),
        std(),
        lx2(),
        std().placeLetter(l.r),
        std().placeLetter(l.i),
        std().placeLetter(l.t),
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
        lx3(),
        std(),
        std(),
        std(),
        ((): Tile => {
            const tile = lx3().placeLetter(l.o);

            tile.isBonusActive = false;
            return tile;
        })(),
        std().placeLetter(l.s),
        std().placeLetter(l.a),
        std().placeLetter(l.i),
        (() => {
            const tile = lx3().placeLetter(l.t);

            tile.isBonusActive = false;
            return tile;
        })(),
        std(),
    ],
    [
        std(),
        std(),
        std(),
        std(),
        wx2(),
        std(),
        std(),
        std(),
        std(),
        std().placeLetter(l.b),
        wx2().placeLetter(l.e),
        std().placeLetter(l.c),
        std(),
        std(),
        std(),
    ],
    [lx2(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std().placeLetter(l.e), std().placeLetter(l.s), wx2(), std(), std(), lx2()],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()],
];

// eslint-disable-next-line max-lines-per-function -- ne fait que retourner les nouveaux mots formés
export const NEW_WORDS_4 = (): Tile[][] => [
    [std().placeLetter(l.d), std().placeLetter(l.e)],
    [std().placeLetter(l.e), std().placeLetter(l.t)],

    [std().placeLetter(l.r), std().placeLetter(l.i), std().placeLetter(l.t)],
    [
        ((): Tile => {
            const tile = lx3().placeLetter(l.o);

            tile.isBonusActive = false;
            return tile;
        })(),
        std().placeLetter(l.s),
        std().placeLetter(l.a),
        std().placeLetter(l.i),
        ((): Tile => {
            const tile = lx3().placeLetter(l.t);

            tile.isBonusActive = false;
            return tile;
        })(),
    ],

    [std().placeLetter(l.b), wx2().placeLetter(l.e), std().placeLetter(l.c)],

    [std().placeLetter(l.e), std().placeLetter(l.s)],

    [
        std().placeLetter(l.b),
        std().placeLetter(l.e),
        std().placeLetter(l.t),
        std().placeLetter(l.i),
        std().placeLetter(l.s),
        wx2().placeLetter(l.e),
        std().placeLetter(l.s),
    ],
];

export const EXPECTED_SCORE_4 = 97;

export const BEGIN_POSITION_4: Vector2D = { x: 5, y: 10 };

export const WORD_PLACE_4 = (): Letter[] => [l.b, l.e, l.t, l.i, l.s, l.e, l.s];

export const EXPECTED_POSITION_4: Vector2D[] = [
    { x: 5, y: 10 },
    { x: 6, y: 10 },
    { x: 7, y: 10 },
    { x: 8, y: 10 },
    { x: 9, y: 10 },
    { x: 10, y: 10 },
    { x: 11, y: 10 },
];

// eslint-disable-next-line max-lines-per-function -- ne fait que retourner les nouveaux mots formés
export const EXPECTED_NEW_WORDS_4 = () => [
    [
        {
            isStared: false,
            letter: { letter: 'd', point: 2 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 'e', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
    ],
    [
        {
            isStared: false,
            letter: { letter: 'e', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 't', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
    ],
    [
        {
            isStared: false,
            letter: { letter: 'r', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 'i', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 't', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
    ],
    [
        {
            isStared: false,
            letter: { letter: 'o', point: 1 },
            letterBonus: 3,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 's', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 'a', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 'i', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 't', point: 1 },
            letterBonus: 3,
            wordBonus: 1,
            isBonusActive: false,
        },
    ],
    [
        {
            isStared: false,
            letter: { letter: 'b', point: 3 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 'e', point: 1 },
            letterBonus: 1,
            wordBonus: 2,
            isBonusActive: true,
        },
        {
            isStared: false,
            letter: { letter: 'c', point: 3 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
    ],
    [
        {
            isStared: false,
            letter: { letter: 'e', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 's', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
    ],
    [
        {
            isStared: false,
            letter: { letter: 'b', point: 3 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 'e', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 't', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 'i', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 's', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
        {
            isStared: false,
            letter: { letter: 'e', point: 1 },
            letterBonus: 1,
            wordBonus: 2,
            isBonusActive: true,
        },
        {
            isStared: false,
            letter: { letter: 's', point: 1 },
            letterBonus: 1,
            wordBonus: 1,
            isBonusActive: false,
        },
    ],
];
