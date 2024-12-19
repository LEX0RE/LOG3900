/* eslint-disable dot-notation -- Méthode privée */
import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Board } from '@app/classes/board/board';
import { Game } from '@app/classes/game/game';
import { GameWatchTower } from '@app/classes/game/game-watch-tower/game-watch-tower';
import { DELAY_INVALID_WORD } from '@app/constants/game';
import { stubGameWithoutWatchTower } from '@app/test/classes-stubs/game-stub';
import { FAKE_PLACE_ACTION } from '@app/test/constants/fake-hints';
import { FAKE_PLAYER_1_NAME, FAKE_PLAYER_2_NAME, FAKE_SCORE_PLAYER_1, FAKE_SCORE_PLAYER_2 } from '@app/test/constants/fake-player';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { scenarioBoard } from '@common/constants/board-scenario';
import { Orientation } from '@common/enums/orientation';
import { BoardUpdate } from '@common/interfaces/board-update';
import { EaselUpdate } from '@common/interfaces/easel-update';
import { GameUpdate } from '@common/interfaces/game-update';
import { expect } from 'chai';
import { SinonStubbedInstance, assert, restore, stub, useFakeTimers } from 'sinon';

describe('GameWatchTower', () => {
    let stubs: ServiceStubHelper;
    let game: Game;
    let watchTower: GameWatchTower;
    const easel2Size = 3;
    const stashSize = 87;
    const easel1Size = 7;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        game = stubGameWithoutWatchTower();
        Object.defineProperty(game.players[0].easel, 'size', { value: easel1Size });
        Object.defineProperty(game.players[1].easel, 'size', { value: easel2Size });
        Object.defineProperty(game.letterStash, 'size', { value: stashSize });
        watchTower = new GameWatchTower(game);
    });

    afterEach(() => restore());

    it('should create GameWatchTower', () => {
        expect(watchTower).to.not.be.eql(undefined);
    });

    it('update should  send update to player', () => {
        watchTower.update();

        assert.calledOnce(stubs.gameplay.sendGameInfo);
    });

    it('updateBoard should  send update to player', () => {
        watchTower.updateBoard(game.activePlayer);

        assert.calledOnce(stubs.gameplay.sendBoard);
    });

    it('updateEasel should  send update to player', () => {
        watchTower.updateEasel(game.activePlayer);

        assert.calledOnce(stubs.gameplay.sendEasel);
    });

    it('should create the right gameUpdate for player one', () => {
        const expectedUpdate: GameUpdate = {
            playerInfo: {
                name: FAKE_PLAYER_1_NAME,
                profilePicture: undefined,
                score: FAKE_SCORE_PLAYER_1,
                nLetterLeft: easel1Size,
                turn: true,
                userId: game.players[0].id,
            },
            otherPlayersInfo: [
                {
                    name: FAKE_PLAYER_2_NAME,
                    profilePicture: undefined,
                    score: FAKE_SCORE_PLAYER_2,
                    nLetterLeft: easel2Size,
                    turn: false,
                    userId: game.players[1].id,
                },
            ],
            stash: { nLettersLeft: stashSize },
        };

        const result = watchTower['setGameUpdate'](game.players[0]);

        expect(result).to.eql(expectedUpdate);
    });

    it('should create the right gameUpdate for player two', () => {
        const expectedUpdate: GameUpdate = {
            playerInfo: {
                nLetterLeft: easel2Size,
                name: FAKE_PLAYER_2_NAME,
                profilePicture: undefined,
                score: FAKE_SCORE_PLAYER_2,
                turn: false,
                userId: game.players[1].id,
            },
            otherPlayersInfo: [
                {
                    nLetterLeft: easel1Size,
                    name: FAKE_PLAYER_1_NAME,
                    profilePicture: undefined,
                    score: FAKE_SCORE_PLAYER_1,
                    turn: true,
                    userId: game.players[0].id,
                },
            ],
            stash: { nLettersLeft: stashSize },
        };

        const result = watchTower['setGameUpdate'](game.players[1]);

        expect(result).to.eql(expectedUpdate);
    });

    it('should create the right BoardUpdate', () => {
        const expectedUpdate: BoardUpdate = {
            board: scenarioBoard,
        };

        const result = watchTower['setBoardUpdate']();

        expect(result).to.eql(expectedUpdate);
    });

    it('should create the right EaselUpdate for player one', () => {
        const expectedUpdate: EaselUpdate = {
            easel: game.players[0].easel,
        };

        const result = watchTower['setEaselUpdate'](game.players[0]);

        expect(result).to.eql(expectedUpdate);
    });

    it('update should not send info if player do not require update', () => {
        game.players[0].requiredUpdates = false;
        game.players[1].requiredUpdates = false;
        watchTower.update();
        assert.notCalled(stubs.gameplay.sendGameInfo);
    });

    it('updateBoard should not sendBoard if player do not require update', () => {
        game.players[0].requiredUpdates = false;
        watchTower.updateBoard(game.players[0]);
        assert.notCalled(stubs.gameplay.sendBoard);
    });

    it('updateEasel should not sendEasel if player do not require update', () => {
        game.players[0].requiredUpdates = false;
        watchTower.updateEasel(game.players[0]);
        assert.notCalled(stubs.gameplay.sendEasel);
    });

    it('outsideResolveError should resolve the promise when called with an error', async () => {
        const timeOut = 5;

        const time = setTimeout(() => {
            game.outsideResolveError('This an error.');
        }, timeOut);

        await watchTower.errorInTurn().then((error) => {
            expect(error).to.eql('This an error.');
        });
        clearTimeout(time);
    });

    it('delayWordEasel should not change value of board if called async and invalidPlacement true', async () => {
        const fakeTimer = useFakeTimers();
        const oldBoard = JSON.parse(JSON.stringify(game.board));
        const placeLetter = new PlaceLetters([], { x: 0, y: 0 }, Orientation.Horizontal);
        const spyBoard = stub(watchTower, 'updateBoard');

        (game.board as SinonStubbedInstance<Board>).clone.returns(JSON.parse(JSON.stringify(game.board)));
        watchTower.delayWordEasel(placeLetter, true);
        fakeTimer.tick(DELAY_INVALID_WORD);
        expect(game.board).to.eql(oldBoard);
        assert.called(spyBoard);
        fakeTimer.restore();
    });

    it('delayWordEasel should not change value of board if called async and invalidPlacement false', async () => {
        const fakeTimer = useFakeTimers();
        const oldBoard = JSON.parse(JSON.stringify(game.board));
        const placeLetter = new PlaceLetters([], { x: 0, y: 0 }, Orientation.Horizontal);
        const spyBoard = stub(watchTower, 'updateBoard');

        (game.board as SinonStubbedInstance<Board>).clone.returns(JSON.parse(JSON.stringify(game.board)));
        watchTower.delayWordEasel(placeLetter, false);
        fakeTimer.tick(DELAY_INVALID_WORD);
        expect(game.board).to.eql(oldBoard);
        assert.called(spyBoard);
        fakeTimer.restore();
    });

    it('sendEndGame not should called send sendEndGame from endGameManager if player is not true', () => {
        game.players[0].requiredUpdates = false;
        game.winners = [game.players[0]];
        watchTower.sendEndGame();
        assert.notCalled(stubs.endGameManager.sendEndGame);
        assert.notCalled(stubs.endGameManager.sendEndGame);
    });

    it('executeFakeAction should not call placeLetter on board when valid placement', () => {
        watchTower['executeFakeAction'](FAKE_PLACE_ACTION(), false);
        assert.notCalled((game.board as SinonStubbedInstance<Board>).placeLetters);
    });
});
