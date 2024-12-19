import { Application } from '@app/app';
import { FAILED_GET_HISTORY } from '@app/constants/error/error-messages';
import { FAKE_GAME_HISTORIES } from '@app/test/constants/fake-game-histories';
import { FAKE_BEARER_TOKEN } from '@app/test/constants/fake-token';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { AUTHENTICATION_HEADER } from '@common/constants/authentication';
import { GameHistories } from '@common/interfaces/replay/game-histories';
import { GameInfoHistory } from '@common/interfaces/replay/game-history';
import * as chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import { beforeEach } from 'mocha';
import { WithId } from 'mongodb';
import { restore } from 'sinon';
import * as supertest from 'supertest';

describe('GameHistoryController', () => {
    let expressApp: Express.Application;
    let gameHistories: GameHistories;
    let stubs: ServiceStubHelper;
    const url = '/api/gameHistory';

    beforeEach((done: Mocha.Done) => {
        restore();
        gameHistories = FAKE_GAME_HISTORIES();
        stubs = new ServiceStubHelper();
        const app = new Application();

        app.init();
        expressApp = app.app;
        done();
    });

    afterEach(() => restore());

    it('should return a message on service fail for GET', async () => {
        stubs.gameHistoryDatabase.getHistory.rejects();
        return supertest(expressApp)
            .get(url)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)
            .then((response) => chai.expect(response.text).to.deep.equal(FAILED_GET_HISTORY));
    });

    it('should return game History on get request', async () => {
        stubs.gameHistoryDatabase.getHistory.resolves(gameHistories.gameHistories as unknown as WithId<GameInfoHistory>[]);
        return supertest(expressApp)
            .get(url)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.OK)
            .then((response) => chai.expect(JSON.stringify(response.body)).to.deep.equal(JSON.stringify(gameHistories)));
    });
});
