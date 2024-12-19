import { DATABASE_COLLECTION_HISTORY } from '@app/constants/database';
import { DEFAULT_USER_STATISTIC } from '@app/constants/default/user-statistic';
import { DatabaseService } from '@app/services/database/database.service';
import { GameInfoHistory } from '@common/interfaces/replay/game-history';
import { User } from '@common/interfaces/user/user';
import { UserGameStatistic } from '@common/interfaces/user/user-game-statistic';
import { Collection, WithId } from 'mongodb';
import { Container, Service } from 'typedi';

@Service()
export class GameHistoryDatabase {
    private databaseService: DatabaseService;
    private databaseCollection: string;

    constructor() {
        this.databaseService = Container.get(DatabaseService);
        this.databaseCollection = DATABASE_COLLECTION_HISTORY;
    }

    get collection(): Collection<GameInfoHistory> {
        return this.databaseService.database.collection(this.databaseCollection);
    }

    async getHistory(user: User): Promise<WithId<GameInfoHistory>[]> {
        return this.collection
            .find({ realPlayers: { $elemMatch: { name: user.name, id: user.id } } })
            .sort({ beginningDate: -1 })
            .toArray()
            .then((gameInfos: WithId<GameInfoHistory>[]) => gameInfos);
    }

    async addGameToHistory(gameToAdd: GameInfoHistory): Promise<void> {
        await this.collection.insertOne(gameToAdd);
    }

    async getUserGameStatistic(user: User): Promise<UserGameStatistic> {
        const games: GameInfoHistory[] = await this.collection.find({ 'realPlayers.id': user.id }).toArray();

        if (!games.length) return DEFAULT_USER_STATISTIC(user.id);

        const wins = games.filter((game: GameInfoHistory) => game.winners.find((winner: User) => winner.id === user.id)).length;
        const meanScore =
            games.reduce((totalScore: number, game: GameInfoHistory) => {
                const playerScore = game.scores.find((idScore: [string, number]) => idScore[user.id] === user.id);

                return totalScore + (playerScore?.[user.id] ?? 0);
            }, 0) / games.length;

        const meanDuration = games.reduce((totalDuration: number, game: GameInfoHistory) => totalDuration + game.duration, 0) / games.length;

        return {
            userId: user.id,
            nWonGames: wins,
            nPlayedGames: games.length,
            meanDuration,
            meanScore,
        };
    }
}
