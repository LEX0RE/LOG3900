import { Application } from '@app/app';
import { USERNAME_ALREADY_USED, WRONG_USERNAME } from '@app/constants/error/error-messages';
import { UsersManager } from '@app/services/users-manager/users-manager';
import { FAKE_BEARER_TOKEN } from '@app/test/constants/fake-token';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { AUTHENTICATION_HEADER } from '@common/constants/authentication';
import * as chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import { beforeEach } from 'mocha';
import { restore, SinonStubbedInstance } from 'sinon';
import * as supertest from 'supertest';

describe('AuthenticationController', () => {
    let service: SinonStubbedInstance<UsersManager>;
    let expressApp: Express.Application;
    const loginUrl = '/api/authentication/login';
    const registerUrl = '/api/authentication/register';
    let servicesStubs: ServiceStubHelper;

    beforeEach((done: Mocha.Done) => {
        restore();

        servicesStubs = new ServiceStubHelper();
        const app = new Application();

        service = servicesStubs.usersManager;
        app.init();
        expressApp = app.app;
        done();
    });

    afterEach(() => restore());

    it('should return a message on service fail for login', async () => {
        service.validateUser.rejects(WRONG_USERNAME);
        return supertest(expressApp)
            .post(loginUrl)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.BAD_REQUEST)
            .catch((error) => chai.expect(error.error).to.deep.equal(WRONG_USERNAME));
    });

    it('should return ok on login', async () => {
        service.validateUser.resolves();
        return supertest(expressApp).post(loginUrl).set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN()).expect(StatusCodes.OK);
    });

    it('should return ok on register', async () => {
        service.addUser.resolves();
        return supertest(expressApp).post(registerUrl).set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN()).expect(StatusCodes.CREATED);
    });

    it('should return a message on service fail for register', async () => {
        service.addUser.rejects(USERNAME_ALREADY_USED);
        return supertest(expressApp)
            .post(registerUrl)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.CONFLICT)
            .catch((error) => chai.expect(error.error).to.deep.equal(USERNAME_ALREADY_USED));
    });
});
