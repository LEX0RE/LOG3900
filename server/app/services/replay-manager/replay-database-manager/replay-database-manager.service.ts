import { Game } from '@app/classes/game/game';
import { DATABASE_COLLECTION_REPLAY } from '@app/constants/database';
import { NO_REPLAY_FOUND_ERROR } from '@app/constants/error/error-messages';
import { DatabaseService } from '@app/services/database/database.service';
import { ObserverManager } from '@app/services/observer-manager/observer-manager';
import { BoardUpdate } from '@common/interfaces/board-update';
import { Replay } from '@common/interfaces/replay/replay';
import { Turn } from '@common/interfaces/replay/turn';
import { TurnInfo } from '@common/interfaces/replay/turn-info';
import { Collection, InsertOneResult, WithId } from 'mongodb';
import { Container, Service } from 'typedi';

@Service()
export class ReplayDatabaseManager {
    private databaseService: DatabaseService;
    private databaseCollection: string;
    private observerManager: ObserverManager;

    constructor() {
        this.databaseService = Container.get(DatabaseService);
        this.databaseCollection = DATABASE_COLLECTION_REPLAY;
        this.observerManager = Container.get(ObserverManager);
    }

    get collection(): Collection<Replay> {
        return this.databaseService.database.collection(this.databaseCollection);
    }

    async createEmptyReplay(game: Game): Promise<InsertOneResult<Replay>> {
        const replay: Replay = {
            date: new Date(),
            gameId: game.gameId,
            realPlayers: game.realUsers,
            turns: [],
            endGame: {
                losers: [],
                winners: [],
            },
        };

        return this.collection.insertOne(replay);
    }

    async addTurnToReplay(gameId: string, playersTurnInfos: Map<string, TurnInfo>, boardUpdate: BoardUpdate): Promise<void> {
        const replay = await this.getReplay(gameId);

        if (!replay) return Promise.reject(NO_REPLAY_FOUND_ERROR);

        const turn: Turn = {
            turn: replay.turns.length,
            boardUpdate,
            infos: Array.from(playersTurnInfos.entries()),
        };

        replay.turns.push(turn);
        this.observerManager.sendTurn(gameId, turn);
        await this.collection.replaceOne({ gameId }, replay);
    }

    async getReplay(gameId: string): Promise<Replay | null> {
        return this.collection.findOne({ gameId }).then((replay: WithId<Replay> | null) => replay);
    }
}
