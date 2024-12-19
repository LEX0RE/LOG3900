import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { Board } from '@app/classes/board/board';
import { Easel } from '@app/classes/easel/easel';
import { Game } from '@app/classes/game/game';
import { LetterStash } from '@app/classes/letter-stash/letter-stash';
import { Letter } from '@app/classes/letters/letter/letter';
import { LettersFactory as l } from '@app/classes/letters/letterFactory/letter-factory';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { MustKeepEaselFull } from '@app/classes/rules/must-keep-easel-full-when-placing-letter/must-keep-easel-full-when-placing-letter';
import { Action } from '@app/interface/action-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { BEGIN_POSITION_4, NEW_WORDS_4, SCENARIO_4_TILES, WORD_PLACE_4 } from '@app/test/constants/boardScenarios/board-scenario-4';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { assert, createStubInstance, restore, SinonStubbedInstance, stub } from 'sinon';

describe('MustKeepEaselFull', () => {
    let rule: MustKeepEaselFull;
    let action: Action;
    let visitor: RulesVisitorResponse;
    let gameStub: SinonStubbedInstance<Game>;
    let game: Game;
    let player: SinonStubbedInstance<RealPlayer>;
    let easel: SinonStubbedInstance<Easel>;
    let stash: SinonStubbedInstance<LetterStash>;
    const initialScore = 0;

    beforeEach(() => {
        rule = new MustKeepEaselFull();
        gameStub = createStubInstance(Game);
        game = gameStub as unknown as Game;
        player = createStubInstance(RealPlayer);
        stash = createStubInstance(LetterStash);
        easel = createStubInstance(Easel);
        stub(game, 'activePlayer').get(() => player);
        player.easel = easel as unknown as Easel;
        game.letterStash = stash;
    });

    afterEach(() => restore());

    it('should do nothing when it is not the right action', () => {
        visitor = {
            newBoard: new Board(SCENARIO_4_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: [],
            score: initialScore,
            placedPosition: [],
        };
        action = new SkipTurn();
        const vis = rule.verify(action, game, visitor);

        expect(vis).to.be.eql(visitor);
    });

    it('should call when trading 7 letters - scenario 4', () => {
        const nLetters = 7;
        const wordFromStash: Letter[] = [l.a, l.b, l.c, l.d, l.e, l.f, l.blank];

        easel.isContaining.returns(true);
        stub(stash, 'size').get(() => nLetters + nLetters);
        stash.removeLetters.returns(wordFromStash);
        visitor = {
            newBoard: new Board(SCENARIO_4_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_4(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Horizontal);
        rule.verify(action, game, visitor);
        visitor.gameModification.forEach((func: (g: Game) => void) => func(game));
        assert.calledOnce(easel.removeLetters);
        assert.calledWith(easel.removeLetters, WORD_PLACE_4());
        assert.calledOnce(stash.removeLetters);
        assert.calledWith(stash.removeLetters, nLetters);
        assert.calledOnce(easel.addLetters);
        assert.calledWith(easel.addLetters, wordFromStash);
    });

    it('should give remaining letters when it empty the stash - scenario 4', () => {
        const nLetters = 3;
        const wordFromStash: Letter[] = [l.a, l.b, l.c];

        easel.isContaining.returns(true);
        stash.removeLetters.returns(wordFromStash);
        stub(stash, 'size').get(() => nLetters);
        visitor = {
            newBoard: new Board(SCENARIO_4_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_4(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Horizontal);
        rule.verify(action, game, visitor);
        visitor.gameModification.forEach((func: (g: Game) => void) => func(game));
        assert.calledOnce(easel.removeLetters);
        assert.calledWith(easel.removeLetters, WORD_PLACE_4());
        assert.calledOnce(stash.removeLetters);
        assert.calledWith(stash.removeLetters, nLetters);
        assert.calledOnce(easel.addLetters);
        assert.calledWith(easel.addLetters, wordFromStash);
    });

    it('should not be valid to place letters that are not in the player easel - scenario 4', () => {
        const nLetters = 7;
        const wordFromStash: Letter[] = [l.a, l.b, l.c, l.d, l.e, l.f, l.blank];

        easel.isContaining.returns(false);
        stub(stash, 'size').get(() => nLetters + nLetters);
        stash.removeLetters.returns(wordFromStash);
        visitor = {
            newBoard: new Board(SCENARIO_4_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_4(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Horizontal);

        expect(() => rule.verify(action, game, visitor)).to.throw();
    });
});
