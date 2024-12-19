import { Game } from '@app/classes/game/game';
import { ReplayDatabaseManager } from '@app/services/replay-manager/replay-database-manager/replay-database-manager.service';
import { DatabaseStub } from '@app/test/classes-stubs/database-stub';
import { FAKE_GAME_ID } from '@app/test/constants/fake-game';
import { FAKE_BOARD_UPDATE } from '@app/test/constants/fake-game-update';
import { FAKE_REPLAY } from '@app/test/constants/fake-replay';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { Replay } from '@common/interfaces/replay/replay';
import { TurnInfo } from '@common/interfaces/replay/turn-info';
import { expect } from 'chai';
import * as Sinon from 'sinon';

describe('ReplayDatabaseManager ', () => {
    let service: ReplayDatabaseManager;
    let stubs: ServiceStubHelper;
    let replay: Replay;

    beforeEach(() => {
        replay = FAKE_REPLAY();
        stubs = new ServiceStubHelper();
        const database = new DatabaseStub<Replay>();

        Sinon.stub(stubs.databaseService, 'database').get(() => database);

        service = new ReplayDatabaseManager();
        service.collection.insertOne(replay);
    });

    afterEach(() => Sinon.restore());

    it('should be created', () => {
        expect(service).to.not.eql(undefined);
    });

    it('should return a replay', async () => {
        const result = await service.getReplay(FAKE_GAME_ID);

        expect(result).to.eql([replay]);
    });

    it('should create an empty replay', async () => {
        const game = Sinon.createStubInstance(Game);
        const spy = Sinon.spy(service.collection, 'insertOne');

        Sinon.stub(game, 'realUsers').get(() => []);
        Object.defineProperty(game, 'gameId', { value: FAKE_GAME_ID });
        await service.createEmptyReplay(game as unknown as Game);

        Sinon.assert.calledOnce(spy);
    });

    it('should add turn to replay', async () => {
        const spy = Sinon.stub(service.collection, 'replaceOne');

        const playersTurnInfos = new Map<string, TurnInfo>();
        const fakeBoardUpdate = FAKE_BOARD_UPDATE();

        Sinon.stub(service, 'getReplay').resolves(replay);
        await service.addTurnToReplay(FAKE_GAME_ID, playersTurnInfos, fakeBoardUpdate);

        Sinon.assert.calledOnce(spy);
    });
});
