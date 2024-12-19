import { Application } from '@app/app';
import { ERROR } from '@app/constants/error/controller';
import { DictionaryService } from '@app/services/dictionary/dictionary.service';
import { FAKE_CLIENT_DICTIONARY, FAKE_DICTIONARY_WITH_WORDS } from '@app/test/constants/fake-dictionary';
import { FAKE_BEARER_TOKEN } from '@app/test/constants/fake-token';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { AUTHENTICATION_HEADER } from '@common/constants/authentication';
import * as chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import { beforeEach } from 'mocha';
import { restore, SinonStubbedInstance } from 'sinon';
import * as supertest from 'supertest';

describe('DictionaryController', () => {
    let service: SinonStubbedInstance<DictionaryService>;
    let expressApp: Express.Application;
    const url = '/api/dictionaries/';
    const title = 'Français';
    let servicesStubs: ServiceStubHelper;

    beforeEach((done: Mocha.Done) => {
        restore();

        servicesStubs = new ServiceStubHelper();
        const app = new Application();

        service = servicesStubs.dictionaryService;
        app.init();
        expressApp = app.app;
        done();
    });

    afterEach(() => restore());

    it('should return an error as a message on service fail', async () => {
        service.getDictionaries.rejects();
        return supertest(expressApp)
            .get(url)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.INTERNAL_SERVER_ERROR)
            .then((response) => {
                chai.expect(response.body.title).to.equal(ERROR);
            });
    });

    it('should return dictionaries on get request', async () => {
        const expected = FAKE_CLIENT_DICTIONARY();

        service.getDictionaries.resolves([expected]);
        return supertest(expressApp)
            .get(url)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.OK)
            .then((response) => {
                chai.expect(response.body).to.deep.equal([expected]);
            });
    });

    it('get request should have status code not found if getDictionaryDownload throw an error', async () => {
        const path = url + title;

        service.getDictionaryDownload.callsFake(async () => Promise.reject(new Error()));
        return supertest(expressApp).get(path).set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN()).expect(StatusCodes.NOT_FOUND);
    });

    it('should return a dictionary on get request', async () => {
        const path = url + title;
        const expected = FAKE_DICTIONARY_WITH_WORDS();

        service.getDictionaryDownload.resolves(expected);
        return supertest(expressApp)
            .get(path)
            .set(AUTHENTICATION_HEADER, FAKE_BEARER_TOKEN())
            .expect(StatusCodes.OK)
            .then((response) => {
                chai.expect(response.body).to.deep.equal(expected);
            });
    });
});
