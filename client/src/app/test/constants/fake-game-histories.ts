import { FAKE_USER_1, FAKE_USER_2, FAKE_USER_3, FAKE_USER_4 } from '@app/test/constants/fake-user';
import { GameHistories } from '@common/interfaces/replay/game-histories';
import { GameInfoHistory } from '@common/interfaces/replay/game-history';

export const FAKE_GAME_INFO_HISTORY_1 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 0,
        gameId: '1',
        losers: [FAKE_USER_1(), FAKE_USER_2()],
        realPlayers: [FAKE_USER_1(), FAKE_USER_2()],
        winners: [FAKE_USER_3(), FAKE_USER_4()],
    };
};

export const FAKE_GAME_INFO_HISTORY_2 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 6000,
        gameId: '2',
        losers: [FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        realPlayers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        winners: [FAKE_USER_1()],
    };
};

export const FAKE_GAME_INFO_HISTORY_3 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 12000,
        gameId: '3',
        losers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_4()],
        realPlayers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        winners: [FAKE_USER_3()],
    };
};

export const FAKE_GAME_INFO_HISTORY_4 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 18000,
        gameId: '4',
        losers: [FAKE_USER_2(), FAKE_USER_3()],
        realPlayers: [FAKE_USER_1(), FAKE_USER_3(), FAKE_USER_4()],
        winners: [FAKE_USER_1()],
    };
};

export const FAKE_GAME_INFO_HISTORY_5 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 24000,
        gameId: '5',
        losers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        realPlayers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        winners: [],
    };
};

export const FAKE_GAME_INFO_HISTORY_6 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 30000,
        gameId: '6',
        losers: [FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        realPlayers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        winners: [FAKE_USER_1()],
    };
};

export const FAKE_GAME_INFO_HISTORY_7 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 36000,
        gameId: '7',
        losers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        realPlayers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        winners: [],
    };
};

export const FAKE_GAME_INFO_HISTORY_8 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 42000,
        gameId: '8',
        losers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_4()],
        realPlayers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        winners: [FAKE_USER_3()],
    };
};

export const FAKE_GAME_INFO_HISTORY_9 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 48000,
        gameId: '9',
        losers: [FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        realPlayers: [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()],
        winners: [FAKE_USER_1()],
    };
};

export const FAKE_GAME_HISTORIES = (): GameHistories => {
    return {
        gameHistories: [
            FAKE_GAME_INFO_HISTORY_1(),
            FAKE_GAME_INFO_HISTORY_2(),
            FAKE_GAME_INFO_HISTORY_3(),
            FAKE_GAME_INFO_HISTORY_4(),
            FAKE_GAME_INFO_HISTORY_5(),
            FAKE_GAME_INFO_HISTORY_6(),
            FAKE_GAME_INFO_HISTORY_7(),
            FAKE_GAME_INFO_HISTORY_8(),
            FAKE_GAME_INFO_HISTORY_9(),
        ],
    };
};
