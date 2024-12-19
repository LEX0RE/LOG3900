import { GameFactoryClassic } from '@app/services/game-factory/classic-game-factory/classic-game-factory.service';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { expect } from 'chai';
import { restore } from 'sinon';

describe('GameFactoryClassic', () => {
    let stubs: ServiceStubHelper;
    let service: GameFactoryClassic;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        service = new GameFactoryClassic();
        stubs.socketManager.connectClient(stubs.clientSocket);
    });

    afterEach(() => restore());

    it('should create GameFactoryClassic', () => {
        expect(service).to.not.be.eql(undefined);
    });
});
