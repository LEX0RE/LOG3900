/* eslint-disable max-lines -- it is a fake*/
import { Replay } from '@common/interfaces/replay/replay';

// eslint-disable-next-line max-lines-per-function -- this is a fake
export const FAKE_REPLAY = (): Replay => {
    return {
        date: new Date(),
        gameId: '3aa2a30a-cd4f-47bb-a80e-fd2e7dc685ed',
        realPlayers: [
            {
                name: 'dep3',
                id: '64174c38e351849c01a1c626',
            },
            {
                name: 'dep4',
                id: '641848a7bbbdf52433deaf5a',
            },
        ],
        turns: [
            {
                turn: 0,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: { letter: 'l', point: 1 },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'l',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 0, nLetterLeft: 7, turn: false },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 68,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: '*',
                                            point: 0,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'd',
                                            point: 2,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 0,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: true },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 0, nLetterLeft: 7, turn: false },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 68,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 0,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 68,
                                },
                            },
                        },
                    ],
                    [
                        '641848a7bbbdf52433deaf5a',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep4',
                                    userId: '641848a7bbbdf52433deaf5a',
                                    score: 0,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 68,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 1,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'l',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 0, nLetterLeft: 7, turn: false },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 62,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'z',
                                            point: 10,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 0, nLetterLeft: 7, turn: false },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 62,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 0,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 62,
                                },
                            },
                        },
                    ],
                    [
                        '641848a7bbbdf52433deaf5a',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep4',
                                    userId: '641848a7bbbdf52433deaf5a',
                                    score: 0,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 62,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 2,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'l',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'z',
                                            point: 10,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                    [
                        '641848a7bbbdf52433deaf5a',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep4',
                                    userId: '641848a7bbbdf52433deaf5a',
                                    score: 0,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 3,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'l',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: true },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'z',
                                            point: 10,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: true },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep4', userId: '641848a7bbbdf52433deaf5a', score: 0, nLetterLeft: 7, turn: true },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                    [
                        '641848a7bbbdf52433deaf5a',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep4',
                                    userId: '641848a7bbbdf52433deaf5a',
                                    score: 0,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 4,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'z',
                                            point: 10,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: true },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 0,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 14,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 61,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 5,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 59,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'z',
                                            point: 10,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 59,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 59,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 0,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 59,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 6,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 59,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'z',
                                            point: 10,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 59,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 0,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 59,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 0,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                ],
                                stash: {
                                    nLettersLeft: 59,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 7,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'b',
                                            point: 3,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 14,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 56,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'z',
                                            point: 10,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 56,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 56,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 10,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 14, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 56,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 8,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 31,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'z',
                                            point: 10,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: true },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 10,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 9,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 31,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 10,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 10,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 31,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 10,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 10,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                ],
                                stash: {
                                    nLettersLeft: 54,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 11,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 31,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 52,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 52,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 52,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'j',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 16,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 31, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 52,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 12,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'h',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 41,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 50,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: true },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 50,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 50,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'j',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 16,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 50,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 13,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'f',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'h',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 41,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 47,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'y',
                                            point: 10,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 35,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 47,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 47,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'j',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 16,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 47,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 14,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'f',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'h',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 41,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 47,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'y',
                                            point: 10,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 35,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 47,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 16,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 47,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'j',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 16,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                ],
                                stash: {
                                    nLettersLeft: 47,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 15,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'f',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'h',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'C',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 't',
                                            point: 1,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 41,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 46,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'y',
                                            point: 10,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 35,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 46,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 46,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'j',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 41, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 46,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 16,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'f',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'h',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'C',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'C',
                                    column: 12,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 12,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 12,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'l',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 59,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 43,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'y',
                                            point: 10,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 35,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 59, nLetterLeft: 7, turn: true },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 43,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 59, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 43,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'j',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 59, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 35,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 43,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 17,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'f',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'h',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'C',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'C',
                                    column: 12,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 12,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 12,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'l',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 59,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 39,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'y',
                                            point: 10,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 39,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 59, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 59, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 39,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'j',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 59, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 39,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 18,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'f',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'h',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'C',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'C',
                                    column: 12,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 12,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 12,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'l',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 59,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 39,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'y',
                                            point: 10,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 39,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 59, nLetterLeft: 7, turn: false },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: 2,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 59, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 39,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: 18,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'j',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: 18,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 59, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 39,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: 2, nLetterLeft: 7, turn: true },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                ],
            },
            {
                turn: 19,
                boardUpdate: {
                    board: {
                        tiles: [
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 3,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 4,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'd',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 5,
                                },
                            },
                            {
                                letter: {
                                    letter: 'f',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'I',
                                    point: 0,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 6,
                                },
                            },
                            {
                                letter: {
                                    letter: 'h',
                                    point: 4,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 7,
                                },
                            },
                            {
                                letter: {
                                    letter: 'l',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'G',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'm',
                                    point: 2,
                                },
                                coordinate: {
                                    row: 'H',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'I',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'J',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 8,
                                },
                            },
                            {
                                letter: {
                                    letter: 'b',
                                    point: 3,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'u',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'K',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'a',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'L',
                                    column: 9,
                                },
                            },
                            {
                                letter: {
                                    letter: 'r',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'C',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'i',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'F',
                                    column: 10,
                                },
                            },
                            {
                                letter: {
                                    letter: 'o',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 11,
                                },
                            },
                            {
                                letter: {
                                    letter: 'e',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'C',
                                    column: 12,
                                },
                            },
                            {
                                letter: {
                                    letter: 's',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'D',
                                    column: 12,
                                },
                            },
                            {
                                letter: {
                                    letter: 't',
                                    point: 1,
                                },
                                coordinate: {
                                    row: 'E',
                                    column: 12,
                                },
                            },
                        ],
                    },
                },
                infos: [
                    [
                        'LoveGrammar',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'x',
                                            point: 10,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                        {
                                            letter: 'l',
                                            point: 1,
                                        },
                                        {
                                            letter: 'f',
                                            point: 4,
                                        },
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LoveGrammar',
                                    userId: 'LoveGrammar',
                                    score: 37,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 13,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'dep3',
                                        userId: '64174c38e351849c01a1c626',
                                        score: -8,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: -1,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                    [
                        'VocabularyVestige',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'q',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'y',
                                            point: 10,
                                        },
                                        {
                                            letter: 'h',
                                            point: 4,
                                        },
                                        {
                                            letter: 'i',
                                            point: 1,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'VocabularyVestige',
                                    userId: 'VocabularyVestige',
                                    score: 13,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 37, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'dep3',
                                        userId: '64174c38e351849c01a1c626',
                                        score: -8,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: -1,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                    [
                        '64174c38e351849c01a1c626',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'n',
                                            point: 1,
                                        },
                                        {
                                            letter: 'u',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'g',
                                            point: 2,
                                        },
                                        {
                                            letter: 'a',
                                            point: 1,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'dep3',
                                    userId: '64174c38e351849c01a1c626',
                                    score: -8,
                                    nLetterLeft: 7,
                                    turn: false,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 37, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 13,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    {
                                        name: 'LinguistLearner',
                                        userId: 'LinguistLearner',
                                        score: -1,
                                        nLetterLeft: 7,
                                        turn: true,
                                    },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                    [
                        'LinguistLearner',
                        {
                            easelUpdate: {
                                easel: {
                                    letters: [
                                        {
                                            letter: 'v',
                                            point: 4,
                                        },
                                        {
                                            letter: 'c',
                                            point: 3,
                                        },
                                        {
                                            letter: 's',
                                            point: 1,
                                        },
                                        {
                                            letter: 'r',
                                            point: 1,
                                        },
                                        {
                                            letter: 'j',
                                            point: 8,
                                        },
                                        {
                                            letter: 'e',
                                            point: 1,
                                        },
                                        {
                                            letter: 'o',
                                            point: 1,
                                        },
                                    ],
                                },
                            },
                            gameUpdate: {
                                playerInfo: {
                                    name: 'LinguistLearner',
                                    userId: 'LinguistLearner',
                                    score: -1,
                                    nLetterLeft: 7,
                                    turn: true,
                                },
                                otherPlayersInfo: [
                                    { name: 'LoveGrammar', userId: 'LoveGrammar', score: 37, nLetterLeft: 7, turn: false },
                                    {
                                        name: 'VocabularyVestige',
                                        userId: 'VocabularyVestige',
                                        score: 13,
                                        nLetterLeft: 7,
                                        turn: false,
                                    },
                                    { name: 'dep3', userId: '64174c38e351849c01a1c626', score: -8, nLetterLeft: 7, turn: false },
                                ],
                                stash: {
                                    nLettersLeft: 41,
                                },
                            },
                        },
                    ],
                ],
            },
        ],
        endGame: { losers: [], winners: [] },
    };
};
