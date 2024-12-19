import { UserGameStatistic } from '@common/interfaces/user/user-game-statistic';
import { UserTournamentStatistic } from '@common/interfaces/user/user-tournament-statistic';

export const DEFAULT_USER_STATISTIC = (userId: string): UserGameStatistic => {
    return {
        userId,
        nPlayedGames: 0,
        nWonGames: 0,
        meanScore: 0,
        meanDuration: 0,
    };
};

export const DEFAULT_TOURNAMENT_STATISTIC = (userId: string): UserTournamentStatistic => {
    return {
        userId,
        nTournamentPlayed: 0,
        nPoints: 10,
        nFirstPlace: 0,
        nSecondPlace: 0,
        nThirdPlace: 0,
        nFourthPlace: 0,
    };
};
