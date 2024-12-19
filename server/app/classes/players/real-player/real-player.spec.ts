import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { TradeLetter } from '@app/classes/actions/trade-letters/trade-letters';
import { Game } from '@app/classes/game/game';
import { LettersFactory } from '@app/classes/letters/letterFactory/letter-factory';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { PlayerTurnsQueueEntry } from '@app/interface/player-turns-queue-entry';
import { stubGame } from '@app/test/classes-stubs/game-stub';
import {
    FAKE_PLAYER_1_NAME,
    FAKE_PLAYER_2_NAME,
    FAKE_PLAYER_TURN_ENTRY,
    FAKE_SOCKET_ID_PLAYER_1,
    FAKE_SOCKET_ID_PLAYER_2,
} from '@app/test/constants/fake-player';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { expect } from 'chai';
import { describe } from 'mocha';
import { assert, restore, stub } from 'sinon';

describe('RealPlayer', () => {
    let stubs: ServiceStubHelper;
    let player1: RealPlayer;
    let player2: RealPlayer;
    let game: Game;
    const trade = new TradeLetter([LettersFactory.a, LettersFactory.g]);
    const skipTurn = new SkipTurn();

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        game = stubGame();
        stubs.gameManager.getGameByPlayerId.returns(game);
        player1 = new RealPlayer({ name: FAKE_PLAYER_1_NAME, id: FAKE_SOCKET_ID_PLAYER_1 });
        player2 = new RealPlayer({ name: FAKE_PLAYER_2_NAME, id: FAKE_SOCKET_ID_PLAYER_2 });
    });

    afterEach(() => restore());

    it('playerTurnsQueue should be of size one after newAction was called', () => {
        stubs.gameManager.getGameByPlayerId.returns(null);
        player1.nextAction();
        assert.calledOnce(stubs.gameplay.addToPlayerTurnQueue);
    });

    it('playerTurnsQueue should be empty at the beginning', () => {
        expect(stubs.gameplay.playerTurnsQueue.length).to.equal(0);
    });

    it('playerTurnsQueue should be of size two after newAction was called by two different player', async () => {
        player1.nextAction();
        player2.nextAction();
        assert.calledTwice(stubs.gameplay.addToPlayerTurnQueue);
    });

    it('outsideResolve should resolve the promise when called with action trade', async () => {
        stubs.gameManager.getGameByPlayerId.returns(null);
        const timeOut = 10;
        const playerTime = 30;

        player1.timeLimit = playerTime;

        const time = setTimeout(() => {
            player1.outsideResolve(trade);
        }, timeOut);

        await player1.nextAction().then((action) => {
            expect(action).to.eql(trade);
        });

        clearTimeout(time);
    });

    it('The promise should resolve with skipTurn after more than timeLimit', async () => {
        stubs.gameplay.addToPlayerTurnQueue.callsFake(async () => {
            player1.outsideEndTime();
            return Promise.resolve();
        });

        stubs.gameManager.getGameByPlayerId.returns(null);
        await player1.nextAction().then((action) => {
            expect(action).to.eql(skipTurn);
            expect(stubs.gameplay.playerTurnsQueue.length).to.eql(0);
        });
    });

    it('outsideResolve should resolve with time out if activeGame', async () => {
        stubs.gameplay.playerTurnsQueue.push(FAKE_PLAYER_TURN_ENTRY());
        stubs.gameplay.addToPlayerTurnQueue.callsFake(async (entry: PlayerTurnsQueueEntry) => {
            entry.endAction();
            return Promise.resolve();
        });
        const outsideResolveErrorSpy = stub();

        game.outsideResolveError = outsideResolveErrorSpy;
        await player1.nextAction().then((action) => {
            expect(action).to.eql(skipTurn);
        });
        assert.called(stubs.gameManager.getGameByPlayerId);
        assert.called(outsideResolveErrorSpy);
    });

    it('outsideResolve should resolve with time out if activeGame - handle outsideResolve undefined', async () => {
        stubs.gameManager.getGameByPlayerId.returns(null);
        stubs.gameplay.addToPlayerTurnQueue.callsFake(async () => {
            player1.outsideEndTime();
            return Promise.resolve();
        });

        await player1.nextAction().then((action) => {
            expect(action).to.eql(skipTurn);
        });
        assert.called(stubs.gameManager.getGameByPlayerId);
    });
});
