/* eslint-disable @typescript-eslint/no-explicit-any, dot-notation -- Méthode privée et mock des méthodes */
import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { ClassicMode } from '@app/classes/game-mode/classic-mode/classic-mode';
import { Game } from '@app/classes/game/game';
import { GameWatchTower } from '@app/classes/game/game-watch-tower/game-watch-tower';
import { Player } from '@app/classes/players/player-abstract';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { BeginnerPlayer } from '@app/classes/players/virtual-player/beginner-player/beginner-player';
import { Action } from '@app/interface/action-interface';
import { VisibilityManagerPublicNoPass } from '@app/services/lobby/visibility-manager/public-no-password/public-no-password-manager.service';
import { stubBoard } from '@app/test/classes-stubs/board-stub';
import { stubClassicMode } from '@app/test/classes-stubs/classic-mode-stub';
import { stubGameWatchTowerWithOutGame } from '@app/test/classes-stubs/game-watch-tower-stub';
import { stubPlayer1, stubPlayer2 } from '@app/test/classes-stubs/player-stub';
import { FAKE_DICTIONARY_ID, FAKE_GAME_CONFIG, FAKE_GAME_ID } from '@app/test/constants/fake-game';
import { doNothing } from '@app/test/do-nothing-function';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { describe } from 'mocha';
import { SinonStub, SinonStubbedInstance, assert, createStubInstance, restore, spy, stub } from 'sinon';

describe('ClassGame', () => {
    let game: Game;
    let action: Action;
    let player1: Player;
    let player2: Player;
    let visibilityManagerStub: SinonStubbedInstance<VisibilityManagerPublicNoPass>;
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-empty-function, id-length -- sert comme fonction de rappel pour tests
    const fakeCallback = (_: Game): void => {};
    const initialScore = 0;
    const differentialScore = 24;
    const stashSize = 87;
    const easel1Size = 7;
    const easel2Size = 3;
    let serviceStubs: ServiceStubHelper;

    beforeEach(() => {
        serviceStubs = new ServiceStubHelper();
        player1 = stubPlayer1();
        player2 = stubPlayer2();
        Object.setPrototypeOf(ClassicMode, stub());
        visibilityManagerStub = serviceStubs.visibilityManagerPublicNoPass;
        game = new Game(FAKE_GAME_ID, FAKE_GAME_CONFIG(), [player1, player2], visibilityManagerStub);
        game.gameMode = stubClassicMode();
        game.players = [player1, player2];
        game.watchTower = stubGameWatchTowerWithOutGame();
        stub(player1.easel, 'size').get(() => easel1Size);
        stub(player2.easel, 'size').get(() => easel2Size);
        Object.defineProperty(game.letterStash, 'size', { value: stashSize });
        serviceStubs.clientSocket.connect();
    });

    afterEach(() => restore());

    it('should execute callbacks', () => {
        const callBackStub = { callBack1: fakeCallback, callBack2: fakeCallback };
        const spyCallBack1 = stub(callBackStub, 'callBack1');
        const spyCallBack2 = stub(callBackStub, 'callBack2');
        const callBacks = [callBackStub.callBack1, callBackStub.callBack2];

        game['executeRulesVisitorCallBacks'](callBacks);
        assert.calledOnce(spyCallBack1);
        assert.calledWith(spyCallBack1, game);
        assert.calledOnce(spyCallBack2);
        assert.calledWith(spyCallBack2, game);
    });

    it('should execute a by calling verify rules on gameMode, update the player score, board and do callBack', () => {
        const board = stubBoard();
        const callBackStub = { callBack1: fakeCallback, callBack2: fakeCallback };
        const spyCallBack1 = stub(callBackStub, 'callBack1');
        const spyCallBack2 = stub(callBackStub, 'callBack2');
        const callBacks = [callBackStub.callBack1, callBackStub.callBack2];
        const visitor = {
            newBoard: board,
            gameModification: callBacks,
            newlyFormedWordAsTile: [],
            score: differentialScore,
            placedPosition: [],
        };

        (game.gameMode as SinonStubbedInstance<ClassicMode>).verifyRules.returns(visitor);
        game.players[0].score = 0;
        action = new SkipTurn();
        game['executeTurn'](action);
        assert.calledOnce(spyCallBack1);
        assert.calledWith(spyCallBack1, game);
        assert.calledOnce(spyCallBack2);
        assert.calledWith(spyCallBack2, game);
        expect(game.players[0].score).to.be.eql(differentialScore);
        expect(game.board).to.be.eql(board);
    });

    it('executeTurn should call delayWordEasel if action is a PlaceLetters', () => {
        const board = stubBoard();
        const position = { x: 0, y: 0 };
        const visitor = {
            newBoard: board,
            gameModification: [],
            newlyFormedWordAsTile: [],
            score: differentialScore,
            placedPosition: [],
        };

        (game.gameMode as SinonStubbedInstance<ClassicMode>).verifyRules.returns(visitor);
        action = new PlaceLetters([], position, Orientation.Horizontal);
        const spyDelay = (game.watchTower as unknown as SinonStubbedInstance<GameWatchTower>).delayWordEasel;

        game['executeTurn'](action);
        assert.calledOnce(spyDelay);
    });

    it('should return player one as winner', () => {
        const highScore = 150;

        player1.score = highScore;
        player2.score = initialScore;
        game.end();
        expect(game.winners).to.have.deep.members([player1]);
        expect(game.flags.isGameOver).to.be.eql(true);
    });

    it('should return player two as winner', () => {
        const highScore = 150;

        player1.score = initialScore;
        player2.score = highScore;
        game.end();
        expect(game.winners).to.have.deep.members([player2]);
        expect(game.flags.isGameOver).to.be.eql(true);
    });

    it('should return both player as winner when there is a tie', () => {
        const highScore = 150;
        const playerOneEaselScore = 123;
        const playerTwoEaselScore = playerOneEaselScore;

        player1.score = highScore;
        player2.score = highScore;
        stub(player1.easel, 'totalScore').get(() => playerOneEaselScore);
        stub(player2.easel, 'totalScore').get(() => playerTwoEaselScore);
        game.end();
        expect(game.winners).to.have.deep.members([player1, player2]);
        expect(game.flags.isGameOver).to.be.eql(true);
    });

    it('should call new action on player', async () => {
        serviceStubs.dictionaryService.loadDictionary.returns(Promise.resolve(FAKE_DICTIONARY_ID));
        const skipAction = new SkipTurn();
        let player: SinonStubbedInstance<RealPlayer>;

        game.outsideResolveError = stub();
        if (game.players[0] === player1) player = player1 as unknown as SinonStubbedInstance<RealPlayer>;
        else player = player2 as unknown as SinonStubbedInstance<RealPlayer>;
        player.nextAction.callsFake(async () => Promise.resolve(skipAction));
        stub(game, 'executeTurn' as any).callsFake(
            async () =>
                new Promise<boolean>((res) => {
                    game.flags.isGameOver = true;
                    res(true);
                }),
        );
        await game.start();
        assert.called(player.nextAction);
    });

    it('makeAction should call delayWordEasel if no word was formed', () => {
        const err = new Error("Aucun mot valide n'est formé.");
        const position = { x: 0, y: 0 };

        game['errorInTurnHandler'](game, new PlaceLetters([], position, Orientation.Horizontal))(err);
        assert.called((game.watchTower as unknown as SinonStubbedInstance<GameWatchTower>).delayWordEasel);
    });

    it('updateRules should put flag at false when the is an place letter action', () => {
        const position = { x: 0, y: 0 };

        game['updateRules'](new PlaceLetters([], position, Orientation.Horizontal));

        expect(game.flags.firstTimePlacingLetter).to.eql(false);
        assert.called(game.gameMode.removeRule as unknown as SinonStub<[ruleName: string], void>);
        assert.called(game.gameMode.addRule as unknown as SinonStub<[ruleName: string], void>);
    });

    it('makeAction should now outsideResolve if it is not defined', () => {
        (player1 as unknown as SinonStubbedInstance<RealPlayer>).nextAction.resolves(new SkipTurn());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- stub membre prive
        stub(game, 'executeTurn' as any);
        game.outsideResolveError = 0 as unknown as (value: string | PromiseLike<string>) => void;

        expect(game['makeAction']).to.not.throw();
    });

    it('makeAction should call updateRules if executeTurn does not throw', async () => {
        game.flags.firstTimePlacingLetter = true;
        (player1 as unknown as SinonStubbedInstance<RealPlayer>).nextAction.resolves(new SkipTurn());
        stub(game, 'executeTurn' as any).resolves();
        const spyUpdate = stub(game, 'updateRules' as any);

        game.outsideResolveError = 0 as unknown as (value: string | PromiseLike<string>) => void;

        await game['makeAction']();
        assert.called(spyUpdate);
    });

    it('makeAction should not call updateRules if flag is false', async () => {
        game.flags.firstTimePlacingLetter = false;
        (player1 as unknown as SinonStubbedInstance<RealPlayer>).nextAction.resolves(new SkipTurn());
        stub(game, 'executeTurn' as any).resolves();
        const spyUpdate = stub(game, 'updateRules' as any);

        game.outsideResolveError = 0 as unknown as (value: string | PromiseLike<string>) => void;

        await game['makeAction']();
        assert.notCalled(spyUpdate);
    });

    it('end should skip turn from player one if it is a virtualPlayer', () => {
        game.players[0] = createStubInstance(BeginnerPlayer) as unknown as Player;
        game.players[0].requiredUpdates = false;
        game.players[0].outsideResolve = doNothing;
        const spyEnd = spy(game.players[0], 'outsideResolve');

        game.end();
        assert.calledOnce(spyEnd);
    });

    it('end should skip turn from player two if it is a virtualPlayer', () => {
        game.players[1] = createStubInstance(BeginnerPlayer) as unknown as Player;
        game.players[1].requiredUpdates = false;
        game.players[1].outsideResolve = doNothing;
        const spyEnd = spy(game.players[1], 'outsideResolve');

        game.end();
        assert.calledOnce(spyEnd);
    });

    it('activePlayerIndex should return PLAYER_ONE_INDEX if the active player is player one', () => expect(game.activePlayerIndex).to.be.equal(0));

    it('activePlayerIndex should return PLAYER_TWO_INDEX if the active player is player two', () => {
        game.activePlayerIndex = 1;

        expect(game.activePlayerIndex).to.be.equal(1);
    });
});
