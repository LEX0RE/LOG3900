import { Application } from '@app/app';
import { FAILED_GET_REPLAY } from '@app/constants/error/error-messages';
import { FAKE_REPLAY } from '@app/test/constants/fake-replay';
import { FAKE_BEARER_TOKEN } from '@app/test/constants/fake-token';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { AUTHENTICATION_HEADER } from '@common/constants/authentication';
import { Replay } from '@common/interfaces/replay/replay';
import * as chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import { beforeEach } from 'mocha';
import { restore } from 'sinon';
import * as supertest from 'supertest';

describe('ReplayController ', () => {
    let expressApp: Express.Application;
    let stubs: ServiceStubHelper;
    let replay: Replay;
    const url = '/api/replay/gameid';

    beforeEach((done: Mocha.Done) => {
        restore();
        replay = FAKE_REPLAY();
        stubs = new ServiceStubHelper();
        const app = new Application();

        app.init();
        expressApp = app.app;
        done();
    });

    afterEach(() => restore());

    it('should return a message on service fail for GET', async () => {
        stubs.replayDatabaseManager.getReplay.rejects();
        return supertest(expressApp)
            .get(url)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)
            .then((response) => chai.expect(response.text).to.deep.equal(FAILED_GET_REPLAY));
    });

    it('should return replay on get request', async () => {
        stubs.replayDatabaseManager.getReplay.resolves(replay);
        return supertest(expressApp)
            .get(url)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.OK)
            .then((response) => chai.expect(JSON.stringify(response.body)).to.deep.equal(JSON.stringify(replay)));
    });

    it('should return not found on get request', async () => {
        stubs.replayDatabaseManager.getReplay.resolves(null);
        return supertest(expressApp)
            .get(url)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.NOT_FOUND)
            .then((response) => chai.expect(response.text).to.deep.equal(FAILED_GET_REPLAY));
    });
});
