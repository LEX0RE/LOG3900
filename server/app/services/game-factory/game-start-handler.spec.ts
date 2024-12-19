import { Game } from '@app/classes/game/game';
import { GameStartHandler } from '@app/services/game-factory/game-start-handler';
import { FAKE_LOBBY_ID_1 } from '@app/test/constants/lobby/fake-lobby';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { FAKE_LOBBY_1 } from '@app/test/services-stubs/lobby-manager-stub';
import { START_GAME } from '@common/constants/communication';
import { expect } from 'chai';
import * as Sinon from 'sinon';

describe('GameStartHandler', () => {
    let stubs: ServiceStubHelper;
    let service: GameStartHandler;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        service = new GameStartHandler();
        stubs.socketManager.connectClient(stubs.clientSocket);
    });

    afterEach(() => Sinon.restore());

    it('should create gameStartHandler', () => {
        expect(service).to.not.be.eql(undefined);
    });

    it('should create game and start it when START_GAME is received', () => {
        const game = Sinon.createStubInstance(Game);
        const lobby = FAKE_LOBBY_1();

        stubs.gameFactoryClassic.createGame.returns(game as unknown as Game);
        stubs.lobbyManager.getLobby.returns(lobby);

        stubs.clientSocket.emit(START_GAME, FAKE_LOBBY_ID_1);

        Sinon.assert.calledOnce(stubs.gameManager.addGame);
        Sinon.assert.calledOnce(stubs.lobbyManager.deleteLobby);
        Sinon.assert.calledOnce(stubs.gameFactoryClassic.createGame);
        Sinon.assert.calledOnce(game.start);
    });
});
