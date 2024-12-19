import { Application } from '@app/app';
import { FAILED_TO_CREATE_LOBBY } from '@app/constants/error/error-messages';
import { LobbyManager } from '@app/services/lobby/lobby-manager/lobby-manager.service';
import { FAKE_BEARER_TOKEN } from '@app/test/constants/fake-token';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { AUTHENTICATION_HEADER } from '@common/constants/authentication';
import * as chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import { beforeEach } from 'mocha';
import { restore, SinonStubbedInstance } from 'sinon';
import * as supertest from 'supertest';

describe('LobbyController', () => {
    let service: SinonStubbedInstance<LobbyManager>;
    let expressApp: Express.Application;
    const lobbyUrl = '/api/lobby';
    let servicesStubs: ServiceStubHelper;

    beforeEach((done: Mocha.Done) => {
        restore();

        servicesStubs = new ServiceStubHelper();
        const app = new Application();

        service = servicesStubs.lobbyManager;
        app.init();
        expressApp = app.app;
        done();
    });

    afterEach(() => restore());

    it('should return a message on service fail for lobby creation', async () => {
        service.createLobby.rejects(FAILED_TO_CREATE_LOBBY);
        return supertest(expressApp)
            .post(lobbyUrl)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)
            .catch((error) => chai.expect(error.error).to.deep.equal(FAILED_TO_CREATE_LOBBY));
    });

    it('should return CREATED on lobby creation', async () => {
        service.createLobby.resolves();
        return supertest(expressApp).post(lobbyUrl).set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN()).expect(StatusCodes.CREATED);
    });
});
