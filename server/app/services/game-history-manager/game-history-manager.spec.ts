import { Game } from '@app/classes/game/game';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { GAME_END_EVENT, GAME_START_EVENT } from '@app/constants/events/game-events';
import { ON_ADD_GAME } from '@app/constants/events/game-manager-events';
import { GameHistoryManager } from '@app/services/game-history-manager/game-history-manager';
import { FAKE_GAME_INFO_HISTORY_1 } from '@app/test/constants/fake-game-histories';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { GameInfoHistory } from '@common/interfaces/replay/game-history';
import { expect } from 'chai';
import * as Sinon from 'sinon';
import { EventEmitter } from 'stream';

describe('GameHistoryManager', () => {
    let service: GameHistoryManager;
    let stubs: ServiceStubHelper;
    let game: Sinon.SinonStubbedInstance<Game>;
    let gameInfoHistory: GameInfoHistory;

    beforeEach(() => {
        gameInfoHistory = FAKE_GAME_INFO_HISTORY_1();
        stubs = new ServiceStubHelper();
        game = Sinon.createStubInstance(Game);
        game.events = new EventEmitter();
        service = new GameHistoryManager();
    });

    afterEach(() => Sinon.restore());

    it('should be created', () => {
        expect(service).to.not.eql(undefined);
    });

    it('should call addGameHistory for database', () => {
        Sinon.stub(game, 'realUsers').get(() => gameInfoHistory.realPlayers);
        stubs.gameManager.eventEmitter.emit(ON_ADD_GAME, game);
        game.events.emit(GAME_START_EVENT);
        game.winners = gameInfoHistory.winners.map((winner) => new RealPlayer(winner));
        // eslint-disable-next-line max-nested-callbacks -- sinon stubs
        Sinon.stub(game, 'losers').get(() => gameInfoHistory.losers.map((loser) => new RealPlayer(loser)));
        game.players = [...game.winners, ...game.losers];
        game.events.emit(GAME_END_EVENT);
        Sinon.assert.calledOnce(stubs.gameHistoryDatabase.addGameToHistory);
    });
});
