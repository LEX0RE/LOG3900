import { FAKE_USER_1, FAKE_USER_2, FAKE_USER_3, FAKE_USER_4, FAKE_USER_5, FAKE_USER_6 } from '@app/test/constants/fake-user';
import { GameHistories } from '@common/interfaces/replay/game-histories';
import { GameInfoHistory } from '@common/interfaces/replay/game-history';

export const FAKE_GAME_INFO_HISTORY_1 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 1,
        gameId: '1',
        realPlayers: [FAKE_USER_1(), FAKE_USER_2()],
        losers: [FAKE_USER_1(), FAKE_USER_2()],
        winners: [FAKE_USER_3()],
        scores: [],
    };
};

export const FAKE_GAME_INFO_HISTORY_2 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 1,
        gameId: '2',
        realPlayers: [FAKE_USER_2(), FAKE_USER_3()],
        losers: [FAKE_USER_2(), FAKE_USER_3()],
        winners: [FAKE_USER_4()],
        scores: [],
    };
};

export const FAKE_GAME_INFO_HISTORY_3 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 1,
        gameId: '3',
        realPlayers: [FAKE_USER_3(), FAKE_USER_4()],
        losers: [FAKE_USER_3(), FAKE_USER_4()],
        winners: [FAKE_USER_5()],
        scores: [],
    };
};

export const FAKE_GAME_INFO_HISTORY_4 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 1,
        gameId: '4',
        realPlayers: [FAKE_USER_4(), FAKE_USER_5()],
        losers: [FAKE_USER_4(), FAKE_USER_5()],
        winners: [FAKE_USER_6()],
        scores: [],
    };
};

export const FAKE_GAME_INFO_HISTORY_5 = (): GameInfoHistory => {
    return {
        beginningDate: new Date(),
        duration: 1,
        gameId: '5',
        realPlayers: [FAKE_USER_5(), FAKE_USER_6()],
        losers: [FAKE_USER_5(), FAKE_USER_6()],
        winners: [FAKE_USER_6()],
        scores: [],
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
        ],
    };
};
