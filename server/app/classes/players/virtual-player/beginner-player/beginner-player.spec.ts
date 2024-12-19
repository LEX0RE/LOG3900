/* eslint-disable @typescript-eslint/no-explicit-any, dot-notation -- Propriété/Méthode privée et mock des méthodes */
import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Easel } from '@app/classes/easel/easel';
import { BeginnerPlayer } from '@app/classes/players/virtual-player/beginner-player/beginner-player';
import { VirtualPlayer } from '@app/classes/players/virtual-player/virtual-player-abstract';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { Possibility } from '@app/enum/beginner-player';
import { Action } from '@app/interface/action-interface';
import { Hint } from '@app/interface/hint';
import { stubVirtualPlayer } from '@app/test/classes-stubs/virtual-player-stub';
import { FAKE_PLACE_ACTION, FAKE_PLACE_ACTION_2, LONG_FAKE_HINTS } from '@app/test/constants/fake-hints';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { ActionType } from '@common/enums/action-type';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { describe } from 'mocha';
import { assert, restore, spy, stub } from 'sinon';

describe('BeginnerPlayer', () => {
    let stubs: ServiceStubHelper;
    let abstractPlayer: VirtualPlayer;
    let player: BeginnerPlayer;
    const firstProbability = 10;
    const secondProbability = 10;
    let newHint: Hint;
    let hint: Hint[];

    beforeEach(() => {
        const fakePosition = { x: 40, y: 40 };
        const fakeScore = 10;
        const fakeTime = 9000;

        stubs = new ServiceStubHelper();
        abstractPlayer = stubVirtualPlayer();
        player = new BeginnerPlayer({ name: abstractPlayer.name, id: abstractPlayer.id }, new Easel());

        stubs.gameManager.getGameByPlayerId.returns(abstractPlayer['game'] ?? null);
        player.timeLimit = fakeTime;

        hint = LONG_FAKE_HINTS();
        newHint = { score: fakeScore, action: new PlaceLetters([], fakePosition, Orientation.None) };
        hint.push(newHint);

        stubs.gameplay.getPossibilities.returns(Promise.resolve(hint));
    });

    afterEach(() => restore());

    it('should create a simple beginner player', () => {
        expect(player).to.haveOwnProperty('requiredUpdates', false);
    });

    it('action should call tradeAction if chooseAction return trade ', () => {
        stub(player, 'chooseAction' as any).returns(Possibility.SecondPossibility);
        const spyAction = spy(player, 'tradeAction' as any);

        player['handleAction']();
        assert.calledOnce(spyAction);
    });

    it('action should call SkipTurn if chooseAction return SkipTurn ', () => {
        stub(player, 'chooseAction' as any).returns(Possibility.ThirdPossibility);

        player['handleAction']().then((value: Action) => {
            expect(value.actionType).to.equal(ActionType.SkipTurn);
        });
    });

    it('action should call PlaceAction if chooseAction return PlaceLetters ', () => {
        stub(player, 'chooseAction' as any).returns(Possibility.FirstPossibility);
        const spyAction = spy(player, 'placeAction' as any);

        player['handleAction']();
        assert.calledOnce(spyAction);
    });

    it('action should call SkipAction if chooseAction return unknown value (not placeLetter,trade or skipTurn) ', () => {
        const testReturn = 'test';

        stub(player, 'chooseAction' as any).returns(testReturn);

        player['handleAction']().then((value: Action) => {
            expect(value.actionType).to.equal(ActionType.SkipTurn);
        });
    });

    it('chooseAction should return firstPossibility if random number is between the first probability  ', () => {
        const percentage = 10;

        stub(MathUtils, 'randomNumberInInterval').returns(percentage);
        const expectedAction = Possibility.FirstPossibility;

        const action = player['chooseAction'](firstProbability, secondProbability);

        expect(action).equal(expectedAction);
    });

    it('chooseAction should return secondPossibility if random number is between the secondProbability  ', () => {
        const percentage = 20;

        stub(MathUtils, 'randomNumberInInterval' as any).returns(percentage);
        const expectedAction = Possibility.SecondPossibility;

        const action = player['chooseAction'](firstProbability, secondProbability);

        expect(action).equal(expectedAction);
    });

    it('chooseAction should return thirdPossibility if random number is bigger than the first and the second probability ', () => {
        const percentage = 21;

        stub(MathUtils, 'randomNumberInInterval' as any).returns(percentage);
        const expectedAction = Possibility.ThirdPossibility;

        const action = player['chooseAction'](firstProbability, secondProbability);

        expect(action).equal(expectedAction);
    });

    it('placeAction should return a place Letters with a low score if randomNumber is for 6 points and less', () => {
        const percentage = 0.1;

        stub(Math, 'random').returns(percentage);

        player['placeAction']().then((action: Action) => {
            expect(action).to.equal(FAKE_PLACE_ACTION_2());
        });
    });

    it('placeAction should return a place Letters with a Medium score if randomNumber is between 7 - 12 points ', () => {
        const percentage = 0.5;

        stub(Math, 'random').returns(percentage);

        player['placeAction']().then((action: Action) => {
            expect(action).to.equal(newHint.action);
        });
    });

    it('placeAction should return a place Letters with a high score if randomNumber is between 13 - 18 points', () => {
        const percentage = 0.8;

        stub(Math, 'random').returns(percentage);

        player['placeAction']().then((action: Action) => {
            expect(action).to.equal(FAKE_PLACE_ACTION());
        });
    });

    it('placeAction should return a place skip turn if there has no placement', () => {
        const expectedAction = ActionType.SkipTurn;

        stubs.gameplay.getPossibilities.returns(Promise.resolve([]));

        player['placeAction']().then((action: Action) => {
            expect(action.actionType).to.equal(expectedAction);
        });
    });

    it('placeAction should return a place skip turn if the score is bigger than 18', () => {
        const percentage = 0.8;
        const fakeScore = 19;
        const fakePosition = { x: 1, y: 0 };
        const testLetters: Hint = { score: fakeScore, action: new PlaceLetters([], fakePosition, Orientation.None) };
        const expectedAction = ActionType.SkipTurn;

        stub(Math, 'random').returns(percentage);
        stubs.gameplay.getPossibilities.returns(Promise.resolve([testLetters]));

        player['placeAction']().then((action: Action) => {
            expect(action.actionType).to.equal(expectedAction);
        });
    });

    it('placeAction should return a place Letters with a medium score if randomNumber is between 13 - 18 points but he doesnt have a score like this', () => {
        const percentage = 0.8;

        hint.pop();
        stub(Math, 'random').returns(percentage);

        player['placeAction']().then((action: Action) => {
            expect(action).to.equal(newHint.action);
        });
    });

    it('placeAction should return a place Letters with a low score if randomNumber is between 13 - 18 points but he doesnt have a score like this nor a medium score', () => {
        const percentage = 0.8;

        hint.pop();
        hint.pop();
        stub(Math, 'random').returns(percentage);

        player['placeAction']().then((action: Action) => {
            expect(action).to.equal(FAKE_PLACE_ACTION_2());
        });
    });

    it('chooseTradeAction should call skipAction', () => {
        const spySkipAction = spy(player, 'skipAction');

        player.chooseTradeAction();

        assert.calledOnce(spySkipAction);
    });
});
