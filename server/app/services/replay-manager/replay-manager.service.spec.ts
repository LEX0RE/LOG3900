import { Game } from '@app/classes/game/game';
import { GameWatchTower } from '@app/classes/game/game-watch-tower/game-watch-tower';
import { GAME_TURN_CHANGE_EVENT } from '@app/constants/events/game-events';
import { ReplayManager } from '@app/services/replay-manager/replay-manager.service';
import { FAKE_GAME_ID } from '@app/test/constants/fake-game';
import { FAKE_EASEL_UPDATE, FAKE_GAME_UPDATE } from '@app/test/constants/fake-game-update';
import { FAKE_PLAYER_1 } from '@app/test/constants/fake-player';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { TurnInfo } from '@common/interfaces/replay/turn-info';
import { expect } from 'chai';
import * as Sinon from 'sinon';
import { EventEmitter } from 'stream';

describe('ReplayManager  ', () => {
    let stubs: ServiceStubHelper;
    let service: ReplayManager;
    let game: Sinon.SinonStubbedInstance<Game>;
    let gameWatchTower: Sinon.SinonStubbedInstance<GameWatchTower>;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        game = Sinon.createStubInstance(Game);
        Object.defineProperty(game, 'gameId', { value: FAKE_GAME_ID });
        gameWatchTower = Sinon.createStubInstance(GameWatchTower);
        game.watchTower = gameWatchTower as unknown as GameWatchTower;
        game.events = new EventEmitter();
        service = new ReplayManager();
    });

    afterEach(() => Sinon.restore());

    it('should be created', () => {
        expect(service).to.not.eql(undefined);
    });

    it('should do a replay', async () => {
        await service.createReplay(game as unknown as Game);

        game.players = [FAKE_PLAYER_1()];
        gameWatchTower.setEaselUpdate.returns(FAKE_EASEL_UPDATE());
        gameWatchTower.setGameUpdate.returns(FAKE_GAME_UPDATE());
        game.events.emit(GAME_TURN_CHANGE_EVENT);
        const expected = new Map<string, TurnInfo>();

        expected.set(FAKE_PLAYER_1().id, {
            easelUpdate: FAKE_EASEL_UPDATE(),
            gameUpdate: FAKE_GAME_UPDATE(),
        });

        Sinon.assert.calledWith(stubs.replayDatabaseManager.addTurnToReplay, FAKE_GAME_ID, expected);
    });
});
