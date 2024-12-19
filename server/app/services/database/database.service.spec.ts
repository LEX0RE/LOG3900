/* eslint-disable dot-notation -- Propriété privée */
import {
    DATABASE_COLLECTION_CLASSIC,
    DATABASE_COLLECTION_VIRTUAL_PLAYER_BEGINNER,
    DATABASE_COLLECTION_VIRTUAL_PLAYER_EXPERT,
} from '@app/constants/database';
import { DEFAULT_VIRTUAL_PLAYER_BEGINNER, DEFAULT_VIRTUAL_PLAYER_EXPERT } from '@app/constants/default-virtual-player-name';
import { DatabaseService } from '@app/services/database/database.service';
import { doNothing } from '@app/test/do-nothing-function';
import { fail } from 'assert';
import { expect } from 'chai';
import { describe } from 'mocha';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { assert, restore, stub } from 'sinon';

describe('DatabaseService', () => {
    let databaseService: DatabaseService;
    let mongoServer: MongoMemoryServer;

    const defaultNumberScores = 3;

    beforeEach(async () => {
        databaseService = new DatabaseService();

        mongoServer = await MongoMemoryServer.create();
    });

    afterEach(async () => {
        if (databaseService['client']) {
            await databaseService['client'].close();
        }
    });

    afterEach(() => restore());

    it('should connect to the database when start is called', async () => {
        const mongoUri = mongoServer.getUri();

        await databaseService.start(mongoUri);

        expect(databaseService['client']).to.not.equal(undefined);
        expect(databaseService['database'].databaseName).to.equal('scrabble');
    });

    it('should not connect to the database when start is called with wrong URL', async () => {
        const badURL = 'WRONG URL';

        try {
            await databaseService.start(badURL);
            fail();
        } catch {
            expect(databaseService['client']).to.deep.equal(undefined);
        }
    });

    it('should connect to the database with default URL when non provided', async () => {
        const connectDbSpy = stub(databaseService, 'connectDb').callsFake(doNothing);

        stub(databaseService, 'populateDB').callsFake(doNothing);
        stub(databaseService, 'verifyPopulateDB').callsFake(doNothing);
        await databaseService.start();
        assert.called(connectDbSpy);
    });

    it('should populate the database with a helper function', async () => {
        const mongoUri = mongoServer.getUri();
        const client = await MongoClient.connect(mongoUri);

        databaseService['_database'] = client.db('database');
        await databaseService.populateDB(DATABASE_COLLECTION_CLASSIC);
        const scores = await databaseService.database.collection(DATABASE_COLLECTION_CLASSIC).find({}).toArray();

        expect(scores.length).to.equal(defaultNumberScores);
    });

    it('should not populate the database with start function if it is already populated', async () => {
        const mongoUri = mongoServer.getUri();

        await databaseService.start(mongoUri);
        let scores = await databaseService.database.collection(DATABASE_COLLECTION_CLASSIC).find({}).toArray();

        expect(scores.length).to.equal(defaultNumberScores);
        await databaseService.closeConnection();
        await databaseService.start(mongoUri);
        scores = await databaseService.database.collection(DATABASE_COLLECTION_CLASSIC).find({}).toArray();
        expect(scores.length).to.equal(defaultNumberScores);
    });

    it('defaultData should return DEFAULT_VP_BEGINNER collection', () => {
        expect(databaseService.defaultData(DATABASE_COLLECTION_VIRTUAL_PLAYER_BEGINNER)).to.eql(DEFAULT_VIRTUAL_PLAYER_BEGINNER);
    });

    it('defaultData should return DEFAULT_VP_EXPERT collection', () => {
        expect(databaseService.defaultData(DATABASE_COLLECTION_VIRTUAL_PLAYER_EXPERT)).to.eql(DEFAULT_VIRTUAL_PLAYER_EXPERT);
    });
});
