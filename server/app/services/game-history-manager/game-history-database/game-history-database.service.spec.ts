import { DatabaseService } from '@app/services/database/database.service';
import { GameHistoryDatabase } from '@app/services/game-history-manager/game-history-database/game-history-database.service';
import { DatabaseStub } from '@app/test/classes-stubs/database-stub';
import { FAKE_GAME_INFO_HISTORY_1 } from '@app/test/constants/fake-game-histories';
import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { GameInfoHistory } from '@common/interfaces/replay/game-history';
import { expect } from 'chai';
import { describe } from 'mocha';
import * as Sinon from 'sinon';
import { Container, Token } from 'typedi';

describe('GameHistoryDatabase', () => {
    let service: GameHistoryDatabase;
    let gameInfoHistory: GameInfoHistory;

    beforeEach(() => {
        Sinon.restore();
        gameInfoHistory = FAKE_GAME_INFO_HISTORY_1();
        const getStub = Sinon.stub(Container, 'get');
        const databaseService = Sinon.createStubInstance(DatabaseService);
        const database = new DatabaseStub<GameInfoHistory>();

        Sinon.stub(databaseService, 'database').get(() => database);
        getStub.withArgs(DatabaseService as Token<unknown>).returns(databaseService);

        service = new GameHistoryDatabase();
        service.collection.insertOne(gameInfoHistory);
    });

    afterEach(() => Sinon.restore());

    it('should be created', () => {
        expect(service).to.not.eql(undefined);
    });

    it('should return a game history', async () => {
        const result = await service.getHistory(FAKE_USER_1());

        expect(result).to.eql([gameInfoHistory]);
    });

    it('should call insert one on addGameToHistory', async () => {
        const stub = Sinon.stub(service.collection, 'insertOne');

        await service.addGameToHistory(gameInfoHistory);

        Sinon.assert.calledOnce(stub);
    });
});
