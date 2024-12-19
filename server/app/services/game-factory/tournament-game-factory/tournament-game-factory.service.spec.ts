import { GameFactoryTournament } from '@app/services/game-factory/tournament-game-factory/tournament-game-factory.service';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { expect } from 'chai';
import * as Sinon from 'sinon';

describe('GameFactoryTournament', () => {
    let stubs: ServiceStubHelper;
    let service: GameFactoryTournament;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        service = new GameFactoryTournament();
        stubs.socketManager.connectClient(stubs.clientSocket);
    });

    afterEach(() => Sinon.restore());

    it('should create tournamentGameFactory', () => {
        expect(service).to.not.be.eql(undefined);
    });
});
