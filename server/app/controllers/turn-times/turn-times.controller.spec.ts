import { Application } from '@app/app';
import { ERROR } from '@app/constants/error/controller';
import { TURN_TIMES } from '@app/constants/turn-times';
import { TurnTimesService } from '@app/services/turn-times/turn-times.service';
import { FAKE_BEARER_TOKEN } from '@app/test/constants/fake-token';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { AUTHENTICATION_HEADER } from '@common/constants/authentication';
import * as chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import { restore, SinonStubbedInstance } from 'sinon';
import * as supertest from 'supertest';

describe('TurnTimesController', () => {
    let service: SinonStubbedInstance<TurnTimesService>;
    let expressApp: Express.Application;
    const url = '/api/turnTimes';
    let servicesStubs: ServiceStubHelper;

    beforeEach((done: Mocha.Done) => {
        restore();

        servicesStubs = new ServiceStubHelper();
        const app = new Application();

        service = servicesStubs.turnTimesService;
        app.init();
        expressApp = app.app;
        done();
    });

    afterEach(() => restore());

    it('should return an error as a message on service fail', async () => {
        service.getTurnTimes.callsFake(async () => Promise.reject());
        return supertest(expressApp)
            .get(url)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)
            .then((response) => {
                chai.expect(response.body.title).to.equal(ERROR);
            });
    });

    it('should return timers on get request', async () => {
        service.getTurnTimes.callsFake(async () => Promise.resolve(TURN_TIMES));
        return supertest(expressApp)
            .get(url)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.OK)
            .then((response) => {
                chai.expect(response.body).to.deep.equal(TURN_TIMES);
            });
    });
});
