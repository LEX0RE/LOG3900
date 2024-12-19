import { Game } from '@app/classes/game/game';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { EndGameManager } from '@app/services/end-game-manager/end-game-manager.service';
import { stubGame } from '@app/test/classes-stubs/game-stub';
import { FAKE_END_GAME } from '@app/test/constants/fake-common-end-game';
import { FAKE_PLAYER_1 } from '@app/test/constants/fake-player';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { FAKE_VIRTUAL } from '@app/test/services-stubs/lobby-manager-stub';
import { SURRENDER_EVENT } from '@common/constants/communication';
import { expect } from 'chai';
import { afterEach } from 'mocha';
import * as Sinon from 'sinon';

describe('EndGameManager', () => {
    let stubs: ServiceStubHelper;
    let service: EndGameManager;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        service = new EndGameManager();
        stubs.socketManager.connectClient(stubs.clientSocket);
    });

    afterEach(() => Sinon.restore());

    it('should create endGameManager', () => {
        expect(service).to.not.be.eql(undefined);
    });

    it('should send endgame to player', () => {
        const spyOnSendPrivate = Sinon.spy(stubs.socketManager, 'sendPrivate');

        service.sendEndGame(FAKE_PLAYER_1(), FAKE_END_GAME());
        Sinon.assert.calledOnce(spyOnSendPrivate);
    });

    it('should call replace player on a SURRENDER_EVENT', () => {
        const game = stubGame() as unknown as Sinon.SinonStubbedInstance<Game>;

        stubs.gameManager.getGameByPlayerId.returns(game as unknown as Game);
        game.getPlayer.returns(FAKE_PLAYER_1());

        Sinon.stub(MathUtils, 'randomInArray').returns(FAKE_VIRTUAL());
        stubs.clientSocket.emit(SURRENDER_EVENT);
        Sinon.assert.calledOnce(game.replacePlayer);
    });

    it('should call replace player on a disconnect', () => {
        const game = stubGame() as unknown as Sinon.SinonStubbedInstance<Game>;

        stubs.gameManager.getGameByPlayerId.returns(game as unknown as Game);
        game.getPlayer.returns(FAKE_PLAYER_1());

        Sinon.stub(MathUtils, 'randomInArray').returns(FAKE_VIRTUAL());
        stubs.clientSocket.disconnect();
        Sinon.assert.calledOnce(game.replacePlayer);
    });
});
