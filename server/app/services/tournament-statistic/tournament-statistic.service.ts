import { Tournament } from '@app/classes/tournament/tournament';
import { DATABASE_COLLECTION_TOURNAMENT_STATISTIC } from '@app/constants/database';
import { DEFAULT_TOURNAMENT_STATISTIC } from '@app/constants/default/user-statistic';
import {
    FIRST_PLACE_REWARD,
    FOURTH_PLACE_REWARD,
    MIN_TOURNAMENT_POINTS,
    SECOND_PLACE_REWARD,
    THIRD_PLACE_REWARD,
} from '@app/constants/user/tournament-statistic';
import { DatabaseService } from '@app/services/database/database.service';
import { User } from '@common/interfaces/user/user';
import { UserTournamentStatistic } from '@common/interfaces/user/user-tournament-statistic';
import { Collection } from 'mongodb';
import { Container, Service } from 'typedi';

@Service()
export class TournamentStatisticService {
    private databaseService: DatabaseService;
    private databaseCollection: string;

    get collection(): Collection<UserTournamentStatistic> {
        return this.databaseService.database.collection(this.databaseCollection);
    }

    constructor() {
        this.databaseService = Container.get(DatabaseService);
        this.databaseCollection = DATABASE_COLLECTION_TOURNAMENT_STATISTIC;
    }

    async updateTournamentStatistic(tournament: Tournament): Promise<void> {
        try {
            const allPayers = tournament.players.map((player) => player.user);

            await this.updateStatistic(
                allPayers.map((user: User) => user.id),
                (statistic: UserTournamentStatistic) => {
                    statistic.nTournamentPlayed++;
                    return statistic;
                },
            );
            const bracket = tournament.brackets[0];

            await this.updateFirstPlace(bracket.winnersId);
            await this.updateSecondPlace(bracket.losersId);
            if (tournament.brackets.length > 1) {
                const secondBracket = tournament.brackets[1];

                await this.updateThirdPlace(secondBracket.winnersId);
                await this.updateFourthPlace(secondBracket.losersId);
            }
            // eslint-disable-next-line no-empty
        } catch (error) {}
    }

    async getStatisticForUser(userId: string): Promise<UserTournamentStatistic> {
        const statistic = await this.collection.findOne({ userId });

        if (statistic) return statistic;
        const newStatistic = DEFAULT_TOURNAMENT_STATISTIC(userId);

        await this.collection.insertOne(newStatistic);
        return newStatistic;
    }

    private async updateFirstPlace(userIds: string[]): Promise<void> {
        return this.updateStatistic(userIds, (statistic: UserTournamentStatistic) => {
            statistic.nFirstPlace++;
            statistic.nPoints = this.updatePoints(statistic.nPoints, FIRST_PLACE_REWARD);
            return statistic;
        });
    }

    private async updateSecondPlace(userIds: string[]): Promise<void> {
        return this.updateStatistic(userIds, (statistic: UserTournamentStatistic) => {
            statistic.nSecondPlace++;
            statistic.nPoints = this.updatePoints(statistic.nPoints, SECOND_PLACE_REWARD);
            return statistic;
        });
    }

    private async updateThirdPlace(userIds: string[]): Promise<void> {
        return this.updateStatistic(userIds, (statistic: UserTournamentStatistic) => {
            statistic.nThirdPlace++;
            statistic.nPoints = this.updatePoints(statistic.nPoints, THIRD_PLACE_REWARD);
            return statistic;
        });
    }

    private async updateFourthPlace(userIds: string[]): Promise<void> {
        return this.updateStatistic(userIds, (statistic: UserTournamentStatistic) => {
            statistic.nFourthPlace++;
            statistic.nPoints = this.updatePoints(statistic.nPoints, FOURTH_PLACE_REWARD);

            return statistic;
        });
    }

    private async updateStatistic(userIds: string[], modification: (statistic: UserTournamentStatistic) => UserTournamentStatistic): Promise<void> {
        return userIds.forEach(async (userId: string) => {
            try {
                const statistic = modification(await this.getStatisticForUser(userId));

                await this.collection.updateOne({ userId }, { $set: statistic });
                // eslint-disable-next-line no-empty
            } catch (error) {}
        });
    }

    private updatePoints(currentPoints: number, reward: number): number {
        const newPoints = currentPoints + reward;

        if (newPoints <= MIN_TOURNAMENT_POINTS) return MIN_TOURNAMENT_POINTS;
        return newPoints;
    }
}
