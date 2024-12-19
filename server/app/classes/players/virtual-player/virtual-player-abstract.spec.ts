/* eslint-disable @typescript-eslint/no-explicit-any, dot-notation -- Propriété/Méthode privée et mock des méthodes */
import { TradeLetter } from '@app/classes/actions/trade-letters/trade-letters';
import { Easel } from '@app/classes/easel/easel';
import { Letter } from '@app/classes/letters/letter/letter';
import { BeginnerPlayer } from '@app/classes/players/virtual-player/beginner-player/beginner-player';
import { VirtualPlayer } from '@app/classes/players/virtual-player/virtual-player-abstract';
import { TURN_DELAY } from '@app/constants/beginner-player';
import { Action } from '@app/interface/action-interface';
import { Chat } from '@app/interface/chat-room';
import { stubVirtualPlayer } from '@app/test/classes-stubs/virtual-player-stub';
import { delay } from '@app/test/delay';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { ActionType } from '@common/enums/action-type';
import { expect } from 'chai';
import { describe } from 'mocha';
import { assert, restore, stub, useFakeTimers } from 'sinon';

describe('VirtualPlayer', () => {
    let stubs: ServiceStubHelper;
    let abstractPlayer: VirtualPlayer;
    let player: BeginnerPlayer;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        abstractPlayer = stubVirtualPlayer();

        player = new BeginnerPlayer({ name: abstractPlayer.name, id: abstractPlayer.id }, new Easel());

        player['game'] = abstractPlayer['game'];

        player['chat'] = abstractPlayer['chat'];

        stubs.gameManager.getGameByPlayerId.returns(abstractPlayer['game'] ?? null);
    });

    afterEach(() => restore());

    it('getGameIfDoNotHave should get game from gameManager', () => {
        const game = player['game'];

        player['game'] = undefined;

        player['setGame']();

        expect(player['game']).to.equal(game);
        assert.calledOnce(stubs.gameManager.getGameByPlayerId);
    });

    it('getGameIfDoNotHave should not change game if it already has', () => {
        const expectedGame = player['game'];

        player['setGame']();
        assert.notCalled(stubs.gameManager.getGameByPlayerId);

        expect(player['game']).to.equal(expectedGame);
    });

    it('getGameIfDoNotHave should not change chat if he not found game', () => {
        const expectedChat: Chat = player['chat'];

        player['game'] = undefined;

        stubs.gameManager.getGameByPlayerId.returns(null);

        player['setGame']();

        expect(player['chat']).to.equal(expectedChat);
    });

    it('trade should return tradeLetter if smaller or equal than letter in stash', () => {
        const expectedNbToChange = 5;
        const letter = new Letter('test', 0);
        const letters = [letter, letter, letter, letter, letter];
        const expectedAction = ActionType.Trade;

        player.easel.letters = letters;

        stub(player, 'chooseAction' as any).callsFake(() => {
            return letters;
        });
        player.trade(expectedNbToChange).then((action: Action) => {
            expect((action as TradeLetter).letters.length).to.equal(letters.length);
            expect(action.actionType).to.equal(expectedAction);
        });
    });

    it('trade should return skipTurn if bigger than letter in stash', () => {
        const nbToChange = 999;
        const skipTurn = ActionType.SkipTurn;

        player.trade(nbToChange).then((action: Action) => {
            expect(action.actionType).to.equal(skipTurn);
        });
    });

    it('nextAction should return a skipPromise after the time limit ', async () => {
        const secondsToWait = 21;
        const expectedAction = ActionType.SkipTurn;

        player.timeLimit = 20;

        stub(player, 'handleAction' as any).callsFake(async () => {
            await delay(secondsToWait);
            return ActionType.PlaceLetters;
        });
        await player.nextAction().then((actionValue) => {
            expect(actionValue.actionType).to.eql(expectedAction);
        });
    });

    it('nextAction should return a PlaceLetterPromise before the time limit ', (done: Mocha.Done) => {
        const fakeTimer = useFakeTimers();
        const expectedAction = ActionType.PlaceLetters;
        const secondsToWait = 1000;

        player.timeLimit = TURN_DELAY + secondsToWait;
        stub(player, 'handleAction' as any).callsFake(() => {
            return ActionType.PlaceLetters;
        });
        const promise = player.nextAction();

        fakeTimer.tick(TURN_DELAY);
        promise.then((actionValue) => {
            expect(actionValue).to.eql(expectedAction);
            done();
        });
        fakeTimer.restore();
    });
});
