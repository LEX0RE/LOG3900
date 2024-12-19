import { UserGameStatistic } from '@common/interfaces/user/user-game-statistic';
import { UserTournamentStatistic } from '@common/interfaces/user/user-tournament-statistic';

export const FAKE_USER_GAME_STATISTIC = (): UserGameStatistic => {
    return {
        meanDuration: 67890,
        meanScore: 56,
        nPlayedGames: 4,
        nWonGames: 2,
        userId: 'fakeUserId',
    };
};

export const FAKE_USER_GAME_STATISTIC_2 = (): UserGameStatistic => {
    return {
        meanDuration: 12345,
        meanScore: 12,
        nPlayedGames: 8,
        nWonGames: 4,
        userId: 'fakeUserId2',
    };
};

export const FAKE_TOURNAMENT_STATISTIC = (): UserTournamentStatistic => {
    return {
        nFirstPlace: 1,
        nFourthPlace: 2,
        nPoints: 3,
        nSecondPlace: 4,
        nTournamentPlayed: 15,
        nThirdPlace: 6,
        userId: 'fakeUserId',
    };
};

export const FAKE_TOURNAMENT_STATISTIC_2 = (): UserTournamentStatistic => {
    return {
        nFirstPlace: 7,
        nFourthPlace: 8,
        nPoints: 9,
        nSecondPlace: 10,
        nTournamentPlayed: 11,
        nThirdPlace: 12,
        userId: 'fakeUserId2',
    };
};
