import { MathUtils } from '@app/classes/utils/math/math-utils';
import { DATABASE_COLLECTION_VIRTUAL_PLAYER_BEGINNER, DATABASE_COLLECTION_VIRTUAL_PLAYER_EXPERT } from '@app/constants/database';
import { DEFAULT_VIRTUAL_PLAYER_BEGINNER } from '@app/constants/default-virtual-player-name';
import { DatabaseService } from '@app/services/database/database.service';
import { Difficulty } from '@common/enums/difficulty';
import { CommonVirtualPlayerName } from '@common/game-view-related/common-virtual-player-name';
import { Collection, Filter, Sort } from 'mongodb';
import 'reflect-metadata';
import { Container, Service } from 'typedi';

@Service()
export class VirtualPlayerNameService {
    private databaseService: DatabaseService;
    private databaseCollection: string;

    constructor() {
        this.databaseService = Container.get(DatabaseService);
        this.databaseCollection = DATABASE_COLLECTION_VIRTUAL_PLAYER_BEGINNER;
    }

    get collection(): Collection<CommonVirtualPlayerName> {
        return this.databaseService.database.collection(this.databaseCollection);
    }

    async changeName(difficulty: string, namePlayerOne: string): Promise<string> {
        let name = '';

        try {
            name = (await this.getName(difficulty, namePlayerOne)).playerName;
        } catch {
            const sameName: boolean = DEFAULT_VIRTUAL_PLAYER_BEGINNER[0].playerName === namePlayerOne;

            name = DEFAULT_VIRTUAL_PLAYER_BEGINNER[Number(sameName)].playerName;
        }
        return name;
    }

    async getAllNames(difficulty: string): Promise<CommonVirtualPlayerName[]> {
        this.difficultyToCollection(difficulty);
        return this.makeFindQuery({}, {});
    }

    async getName(difficulty: string, name: string): Promise<CommonVirtualPlayerName> {
        const names: CommonVirtualPlayerName[] = await this.getAllNames(difficulty);

        MathUtils.shuffleArray(names);
        if (names[0].playerName === name) return names[1];
        return names[0];
    }

    private difficultyToCollection(difficulty: string): void {
        this.databaseCollection =
            difficulty === Difficulty.Easy ? DATABASE_COLLECTION_VIRTUAL_PLAYER_BEGINNER : DATABASE_COLLECTION_VIRTUAL_PLAYER_EXPERT;
    }

    private async makeFindQuery(queryFilter: Filter<CommonVirtualPlayerName>, sortFilter: Sort): Promise<CommonVirtualPlayerName[]> {
        return this.collection
            .find(queryFilter)
            .sort(sortFilter)
            .toArray()
            .then((name: CommonVirtualPlayerName[]) => name);
    }
}
