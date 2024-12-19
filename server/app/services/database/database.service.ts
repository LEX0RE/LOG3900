import {
    DATABASE_COLLECTION_CLASSIC,
    DATABASE_COLLECTION_VIRTUAL_PLAYER_BEGINNER,
    DATABASE_COLLECTION_VIRTUAL_PLAYER_EXPERT,
    DATABASE_NAME,
    DATABASE_URL,
} from '@app/constants/database';
import { DEFAULT_VIRTUAL_PLAYER_BEGINNER, DEFAULT_VIRTUAL_PLAYER_EXPERT } from '@app/constants/default-virtual-player-name';
import { DATABASE_CONNECTION } from '@app/constants/error/error-messages';
import { CommonVirtualPlayerName } from '@common/game-view-related/common-virtual-player-name';
import { Db, MongoClient } from 'mongodb';
import 'reflect-metadata';
import { Service } from 'typedi';

@Service()
export class DatabaseService {
    private _database!: Db;
    private client!: MongoClient;

    get database(): Db {
        // eslint-disable-next-line no-underscore-dangle -- Pour retourner la propriété privée _database
        return this._database;
    }

    async start(url: string = DATABASE_URL): Promise<MongoClient | null> {
        await this.connectDb(url);
        await this.verifyPopulateDB(DATABASE_COLLECTION_CLASSIC);
        await this.verifyPopulateDB(DATABASE_COLLECTION_VIRTUAL_PLAYER_BEGINNER);
        await this.verifyPopulateDB(DATABASE_COLLECTION_VIRTUAL_PLAYER_EXPERT);
        return this.client;
    }

    async connectDb(url: string): Promise<void> {
        try {
            const client = await MongoClient.connect(url);

            this.client = client;
            // eslint-disable-next-line no-underscore-dangle -- Pour assigner une valeur à la propriété privée _database
            this._database = client.db(DATABASE_NAME);
        } catch {
            throw new Error(DATABASE_CONNECTION);
        }
    }

    async closeConnection(): Promise<void> {
        return this.client.close();
    }

    async verifyPopulateDB(collection: string): Promise<void> {
        if (!(await this.database.collection(collection).countDocuments())) await this.populateDB(collection);
    }

    async populateDB(collection: string): Promise<void> {
        for (const data of this.defaultData(collection)) await this.database.collection(collection).insertOne(data);
    }

    defaultData(collection: string): CommonVirtualPlayerName[] {
        switch (collection) {
            case DATABASE_COLLECTION_CLASSIC:
            case DATABASE_COLLECTION_VIRTUAL_PLAYER_BEGINNER:
                return DEFAULT_VIRTUAL_PLAYER_BEGINNER;
            case DATABASE_COLLECTION_VIRTUAL_PLAYER_EXPERT:
                return DEFAULT_VIRTUAL_PLAYER_EXPERT;
            default:
                return DEFAULT_VIRTUAL_PLAYER_BEGINNER; // a enlever
        }
    }
}
