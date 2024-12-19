import { CommonEndGame } from '@common/interfaces/common-end-game';
import { CommonPlayerInfo } from '@common/interfaces/common-player-info';

export const FAKE_COMMON_INFO_1 = (): CommonPlayerInfo => {
    return {
        name: 'name1',
        nLetterLeft: 0,
        score: 0,
        turn: false,
        userId: 'id1',
    };
};

export const FAKE_COMMON_INFO_2 = (): CommonPlayerInfo => {
    return {
        name: 'name2',
        nLetterLeft: 4,
        score: 100,
        turn: true,
        userId: 'id2',
    };
};

export const FAKE_COMMON_INFO_3 = (): CommonPlayerInfo => {
    return {
        name: 'name3',
        nLetterLeft: 7,
        score: 200,
        turn: false,
        userId: 'id3',
    };
};

export const FAKE_COMMON_INFO_4 = (): CommonPlayerInfo => {
    return {
        name: 'name4',
        nLetterLeft: 10,
        score: 300,
        turn: false,
        userId: 'id4',
    };
};

export const FAKE_COMMON_INFO_5 = (): CommonPlayerInfo => {
    return {
        name: 'name5',
        nLetterLeft: 13,
        score: 400,
        turn: false,
        userId: 'id5',
    };
};

export const FAKE_END_GAME = (): CommonEndGame => {
    return {
        losers: [FAKE_COMMON_INFO_2(), FAKE_COMMON_INFO_3(), FAKE_COMMON_INFO_4()],
        winners: [FAKE_COMMON_INFO_1()],
    };
};
