import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { TradeLetter } from '@app/classes/actions/trade-letters/trade-letters';
import { Easel } from '@app/classes/easel/easel';
import { ClassicMode } from '@app/classes/game-mode/classic-mode/classic-mode';
import { Game } from '@app/classes/game/game';
import { LettersFactory } from '@app/classes/letters/letterFactory/letter-factory';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { Timer } from '@app/classes/timer/timer';
import { WordsFind } from '@app/classes/words-find/words-find';
import { MAX_HINTS } from '@app/constants/command-formatting';
import { NOT_PLAYER_TURN_ERROR } from '@app/constants/error/error-messages';
import { END_GAME } from '@app/constants/error/letter-stash';
import { SOME_TIME_TO_PLAY } from '@app/constants/turn-times';
import { EndSearching } from '@app/interface/end-searching';
import { PlayerTurnsQueueEntry } from '@app/interface/player-turns-queue-entry';
import { Gameplay } from '@app/services/gameplay/gameplay.service';
import { VisibilityManagerPublicNoPass } from '@app/services/lobby/visibility-manager/public-no-password/public-no-password-manager.service';
import { stubClassicMode } from '@app/test/classes-stubs/classic-mode-stub';
import { stubGame } from '@app/test/classes-stubs/game-stub';
import { stubPlayer1 } from '@app/test/classes-stubs/player-stub';
import { FAKE_STASH_INFO } from '@app/test/constants/fake-gameplay';
import { FAKE_PLAYER_TURN_ENTRY, FAKE_SOCKET_ID_PLAYER_1 } from '@app/test/constants/fake-player';
import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { doNothing } from '@app/test/do-nothing-function';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { scenarioBoard } from '@common/constants/board-scenario';
import { BOARD_UPDATE, EASEL_UPDATE, GAME_UPDATE } from '@common/constants/communication';
import { BoardUpdate } from '@common/interfaces/board-update';
import { CommonGameConfig } from '@common/interfaces/common-game-config';
import { EaselUpdate } from '@common/interfaces/easel-update';
import { GameUpdate } from '@common/interfaces/game-update';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { expect } from 'chai';
import { describe } from 'mocha';
import { SinonStubbedInstance, assert, restore, stub } from 'sinon';

describe('GameplayService', () => {
    let stubs: ServiceStubHelper;
    let gameplay: Gameplay;
    let player1: RealPlayer;
    let player2: RealPlayer;
    let visibilityManagerStub: SinonStubbedInstance<VisibilityManagerPublicNoPass>;
    let game: Game;
    const trade = new TradeLetter([LettersFactory.a, LettersFactory.g]);
    const skipTurn = new SkipTurn();
    const dictTitle = 'Français';
    const commonTimer: CommonTimer = { minute: 1, second: 0 };
    const player1SocketId = FAKE_USER_1().id;
    const player1Name = 'James';
    const player2Name = 'Nicolas';
    const gameId = 'room_id';
    const chatId = 'chat_id';
    let fakeGameConfig: CommonGameConfig;
    let gameModeStub: ClassicMode;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        gameplay = new Gameplay();
        gameplay.playerTurnsQueue = [];
        gameModeStub = stubClassicMode();
        fakeGameConfig = {
            turnTimer: commonTimer,
            dictionaryTitle: dictTitle,
            dictionaryId: 0,
            gameModeName: gameModeStub.mode,
            gameId,
            chatId,
        };
        player1 = new RealPlayer({ name: player1Name, id: player1SocketId }, new Easel());
        player1.outsideResolve = async () => Promise.resolve('this is a test.');
        player2 = new RealPlayer({ name: player2Name, id: '2' }, new Easel());
        visibilityManagerStub = stubs.visibilityManagerPublicNoPass;
        game = new Game('1', fakeGameConfig, [player1, player2], visibilityManagerStub);
    });

    afterEach(() => restore());

    it('should create basic game manager', () => {
        expect(gameplay).to.ownProperty('socketManager', stubs.socketManager);
        expect(gameplay).to.ownProperty('gameManager', stubs.gameManager);
        expect(gameplay).to.haveOwnProperty('playerTurnsQueue');
        expect(gameplay).to.haveOwnProperty('invalidRuleError');
    });

    it('should call sendPrivate in socketManager when sendGameInfo called', () => {
        const spySendPrivate = stub(stubs.socketManager, 'sendPrivate');
        const fakeGameUpdate: GameUpdate = {
            otherPlayersInfo: [{ nLetterLeft: 2, name: player1Name, score: 100, turn: true, userId: '1' }],
            playerInfo: { nLetterLeft: 3, name: player2Name, score: 10, turn: false, userId: '2' },
            stash: { nLettersLeft: 15 },
        };

        gameplay.sendGameInfo(player1SocketId, fakeGameUpdate);
        assert.calledOnceWithExactly(spySendPrivate, GAME_UPDATE, player1SocketId, fakeGameUpdate);
    });

    it('should call sendPrivate in socketManager when sendBoard called', () => {
        const spySendPrivate = stub(stubs.socketManager, 'sendPrivate');
        const fakeBoardUpdate: BoardUpdate = {
            board: scenarioBoard,
        };

        gameplay.sendBoard(player1SocketId, fakeBoardUpdate);
        assert.calledOnceWithExactly(spySendPrivate, BOARD_UPDATE, player1SocketId, fakeBoardUpdate);
    });

    it('should call sendPrivate in socketManager when sendEasel called', () => {
        const spySendPrivate = stub(stubs.socketManager, 'sendPrivate');
        const fakeEaselUpdate: EaselUpdate = {
            easel: {
                letters: [
                    { letter: '*', point: 0 },
                    { letter: 'J', point: 3 },
                    { letter: 'A', point: 3 },
                    { letter: 'M', point: 10 },
                    { letter: 'E', point: 3 },
                    { letter: 'S', point: 3 },
                    { letter: '*', point: 0 },
                ],
            },
        };

        gameplay.sendEasel(player1SocketId, fakeEaselUpdate);
        assert.calledOnceWithExactly(spySendPrivate, EASEL_UPDATE, player1SocketId, fakeEaselUpdate);
    });

    it('checkIfPlayerTurn should check if it is the players turn', async () => {
        const entry: PlayerTurnsQueueEntry = { player: player1, resolve: player1.outsideResolve, endAction: doNothing };
        const spyMoveValid = stub(gameplay, 'checkIfMoveValid').callsFake(doNothing);

        gameplay.playerTurnsQueue.push(entry);
        gameplay.invalidRuleError = '';
        stubs.gameManager.getGameByPlayerId.returns(game);
        await gameplay.checkIfPlayerTurn(FAKE_USER_1(), trade);
        assert.called(stubs.gameManager.getGameByPlayerId);
        assert.calledOnce(spyMoveValid);
    });

    it('checkIfPlayerTurn should throw error if invalid rule', async () => {
        const entry: PlayerTurnsQueueEntry = { player: player1, resolve: player1.outsideResolve, endAction: doNothing };
        const spyResolve = stub(entry, 'resolve').callsFake(doNothing);

        stub(gameplay, 'checkIfMoveValid').callsFake(doNothing);
        const error = 'an error';

        gameplay.invalidRuleError = error;
        gameplay.playerTurnsQueue = [entry];
        stubs.gameManager.getGameByPlayerId.returns(game);
        await gameplay.checkIfPlayerTurn(FAKE_USER_1(), trade).catch((err) => {
            assert.calledOnceWithExactly(spyResolve, trade);
            expect(gameplay.playerTurnsQueue.length).to.be.eql(0);
            assert.called(stubs.gameManager.getGameByPlayerId);
            expect(err.message).to.be.eql(error);
        });
    });

    it('checkIfPlayerTurn should throw error if it is not the turn of the player to play', async () => {
        const endPlayerTurnSpy = stub(gameplay, 'endPlayerTurn').returns(null);

        await gameplay.checkIfPlayerTurn(FAKE_USER_1(), skipTurn).catch((err) => {
            expect(err.message).to.be.eql(NOT_PLAYER_TURN_ERROR);
        });
        assert.calledOnce(endPlayerTurnSpy);
    });

    it('checkIfPlayerTurn should change value of invalidRuleError to the error sent from game', async () => {
        stub(game.watchTower, 'errorInTurn' as never).callsFake(async () => Promise.resolve('this is an error.'));

        await gameplay.checkIfMoveValid(game);
        expect(gameplay.invalidRuleError).to.be.eql('this is an error.');
    });

    it('checkIfMoveValid should not change value of invalidRuleError if game is undefined', async () => {
        await gameplay.checkIfMoveValid(null);
        expect(gameplay.invalidRuleError).to.be.eql('');
    });

    it('endPlayerTurn should end a players turn', async () => {
        const entry: PlayerTurnsQueueEntry = { player: player1, resolve: player1.outsideResolve, endAction: doNothing };
        const spyResolve = stub(entry, 'resolve').callsFake(doNothing);

        gameplay.playerTurnsQueue = [entry];
        await gameplay.endPlayerTurn(FAKE_USER_1(), trade);
        assert.calledOnceWithExactly(spyResolve, trade);
        expect(gameplay.playerTurnsQueue.length).to.be.eql(0);
    });

    it('endPlayerTurn should do nothing if its not the players turn', async () => {
        expect(() => gameplay.endPlayerTurn(FAKE_USER_1(), trade)).to.throw();
        expect(gameplay.playerTurnsQueue.length).to.be.eql(0);
    });

    it('stashInfo should return empty string if game does not exist', () => {
        stubs.gameManager.getGameByPlayerId.returns(null);
        expect(gameplay.stashInfo(FAKE_USER_1())).to.be.eql(END_GAME);
    });

    it('stashInfo should return the right string for a reserve', () => {
        const gameStub = stubGame();

        stubs.gameManager.getGameByPlayerId.returns(gameStub);
        const result = gameplay.stashInfo(FAKE_USER_1());

        expect(result).to.be.eql(FAKE_STASH_INFO);
    });

    it('possibilities should call fastActions on fastFinder', async () => {
        const fastActionsSpy = stub(WordsFind.prototype, 'fastActions');
        const gameStub = stubGame();

        stubs.gameManager.getGameByPlayerId.returns(gameStub);
        await gameplay.getPossibilities(FAKE_SOCKET_ID_PLAYER_1);
        assert.calledWith(fastActionsSpy, stubPlayer1().easel, gameStub);
    });

    it('possibilities should return empty array if game is undefined', async () => {
        const fastActionsSpy = stub(WordsFind.prototype, 'fastActions');

        stubs.gameManager.getGameByPlayerId.returns(null);
        expect(await gameplay.getPossibilities(FAKE_SOCKET_ID_PLAYER_1)).to.eql([]);
        assert.notCalled(fastActionsSpy);
    });

    it('possibilities should set maxTime if time is larger than play time', async () => {
        const fastActionsSpy = stub(WordsFind.prototype, 'fastActions').callsFake(doNothing);
        const gameStub = stubGame();
        const delayTime = 10;
        const fakeTime = SOME_TIME_TO_PLAY + delayTime;

        (gameStub.timer as unknown as SinonStubbedInstance<Timer>).remainingTime.returns(fakeTime);
        stubs.gameManager.getGameByPlayerId.returns(gameStub);
        await gameplay.getPossibilities(FAKE_SOCKET_ID_PLAYER_1);
        assert.calledWith(fastActionsSpy, stubPlayer1().easel, gameStub, { maxTime: fakeTime - SOME_TIME_TO_PLAY });
    });

    it('possibilities should set found if time is lower than play time', async () => {
        const fastActionsSpy = stub(WordsFind.prototype, 'fastActions').callsFake(doNothing);
        const gameStub = stubGame();
        const delayTime = 10;
        const fakeTime = SOME_TIME_TO_PLAY - delayTime;

        (gameStub.timer as unknown as SinonStubbedInstance<Timer>).remainingTime.returns(fakeTime);
        stubs.gameManager.getGameByPlayerId.returns(gameStub);
        await gameplay.getPossibilities(FAKE_SOCKET_ID_PLAYER_1);
        assert.calledWith(fastActionsSpy, stubPlayer1().easel, gameStub, { found: MAX_HINTS });
    });

    it('possibilities should set 3 possibilities as parameter', async () => {
        const fastActionsSpy = stub(WordsFind.prototype, 'fastActions').callsFake(doNothing);
        const gameStub = stubGame();
        const endFound: EndSearching = { found: 3 };

        stubs.gameManager.getGameByPlayerId.returns(gameStub);
        await gameplay.getPossibilities(FAKE_SOCKET_ID_PLAYER_1, endFound);
        assert.calledWith(fastActionsSpy, stubPlayer1().easel, gameStub, endFound);
    });

    it('possibilities should set maxTime as parameter', async () => {
        const fastActionsSpy = stub(WordsFind.prototype, 'fastActions').callsFake(doNothing);
        const gameStub = stubGame();
        const endFound: EndSearching = { maxTime: 10 };

        stubs.gameManager.getGameByPlayerId.returns(gameStub);
        await gameplay.getPossibilities(FAKE_SOCKET_ID_PLAYER_1, endFound);
        assert.calledWith(fastActionsSpy, stubPlayer1().easel, gameStub, endFound);
    });

    it('possibilities should not call fastAction if player not found', async () => {
        const fastActionsSpy = stub(WordsFind.prototype, 'fastActions');
        const gameStub = stubGame();

        gameStub.players = [];
        stubs.gameManager.getGameByPlayerId.returns(gameStub);
        await gameplay.getPossibilities(FAKE_SOCKET_ID_PLAYER_1);
        assert.notCalled(fastActionsSpy);
    });

    it('addToPlayerTurnQueue should add turn in queue', () => {
        const entry = FAKE_PLAYER_TURN_ENTRY();
        const gameStub = stubGame();

        stubs.gameManager.getGameByPlayerId.returns(gameStub);
        gameplay.addToPlayerTurnQueue(entry);
        assert.called((gameStub.timer as unknown as SinonStubbedInstance<Timer>).setEndTimer);
        expect(gameplay.playerTurnsQueue[0]).to.be.eql(entry);
    });

    it('addToPlayerTurnQueue should not add turn in queue if game is undefined', () => {
        stubs.gameManager.getGameByPlayerId.returns(null);
        gameplay.addToPlayerTurnQueue(FAKE_PLAYER_TURN_ENTRY());
        expect(gameplay.playerTurnsQueue.length).to.be.eql(0);
    });

    /*
    it('hint should format the right hints', async () => {
        stubs.gameManager.getGameByPlayerId.returns(stubGame());

        const possibilitySpy = stub(gameplay, 'getPossibilities').resolves(FAKE_HINTS());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- espion sur une methode pricee
        const formatSpy = stub(gameplay, 'formatHints' as any);
        const twoHints: string = await gameplay.getHint(FAKE_SOCKET_ID_PLAYER_1);

        assert.called(possibilitySpy);
        assert.called(formatSpy);
        expect(twoHints).to.contain(WARN_HINT);
    });

    it('hint should return no hint if no hints', async () => {
        stub(gameplay, 'getPossibilities').resolves([]);
        const noHint: string = await gameplay.getHint(FAKE_SOCKET_ID_PLAYER_1);

        expect(noHint).to.eql(NO_HINT);
    });

    it('hint should return three hint if it finds more than or equal to 3 hints', async () => {
        stubs.gameManager.getGameByPlayerId.returns(stubGame());

        const possibilitiesStub = stub(gameplay, 'getPossibilities').resolves(LONG_FAKE_HINTS());
        const threeHints: string = await gameplay.getHint(FAKE_SOCKET_ID_PLAYER_1);

        expect(threeHints).to.contain(HINT_COMMAND);
        possibilitiesStub.resolves(FAKE_THREE_HINTS());
        expect(await gameplay.getHint(FAKE_SOCKET_ID_PLAYER_1)).to.contain(HINT_COMMAND);
    });

    it('game should use hint if the algorithm has already been use by the player this turn', async () => {
        const fakeGame: Game = stubGame();

        fakeGame.hintUsed.wasUsed = true;
        fakeGame.hintUsed.hint = LONG_FAKE_HINTS();

        stubs.gameManager.getGameByPlayerId.returns(fakeGame);

        const possibilitiesStub = stub(gameplay, 'getPossibilities');
        const threeHints: string = await gameplay.getHint(FAKE_SOCKET_ID_PLAYER_1);

        expect(threeHints).to.contain(HINT_COMMAND);
        assert.notCalled(possibilitiesStub);
    });
    */
});
