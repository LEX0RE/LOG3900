import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { TradeLetter } from '@app/classes/actions/trade-letters/trade-letters';
import { Board } from '@app/classes/board/board';
import { ClassicMode } from '@app/classes/game-mode/classic-mode/classic-mode';
import { Game } from '@app/classes/game/game';
import { MustFirstPlacementBeValid } from '@app/classes/rules/must-first-placement-be-valid/must-first-placement-be-valid';
import { RuleName } from '@app/enum/rules';
import { Action } from '@app/interface/action-interface';
import { GameMode } from '@app/interface/game-mode';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { ScrabbleAlgo } from '@app/services/scrabble-algorithm/scrabble-algorithm.service';
import {
    BEGIN_POSITION_4,
    EXPECTED_POSITION_4,
    NEW_WORDS_4,
    SCENARIO_4_TILES,
    WORD_PLACE_4,
} from '@app/test/constants/boardScenarios/board-scenario-4';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { describe } from 'mocha';
import { assert, createStubInstance, restore, SinonStubbedInstance, stub } from 'sinon';

describe('ClassicMode', () => {
    let mode: GameMode;
    let algo: ScrabbleAlgo;
    let rules: SinonStubbedInstance<MustFirstPlacementBeValid>[];
    let action: Action;
    let visitor: RulesVisitorResponse;
    let gameStub: SinonStubbedInstance<Game>;
    let game: Game;
    let board: SinonStubbedInstance<Board>;
    const initialScore = 0;

    beforeEach(() => {
        gameStub = createStubInstance(Game);
        game = gameStub as unknown as Game;
        board = createStubInstance(Board);
        game.board = board;
        algo = new ScrabbleAlgo();
        mode = new ClassicMode();

        // eslint-disable-next-line dot-notation -- Méthode privée
        mode['scrabbleAlgo'] = algo;
        rules = [
            createStubInstance(MustFirstPlacementBeValid),
            createStubInstance(MustFirstPlacementBeValid),
            createStubInstance(MustFirstPlacementBeValid),
            createStubInstance(MustFirstPlacementBeValid),
            createStubInstance(MustFirstPlacementBeValid),
            createStubInstance(MustFirstPlacementBeValid),
        ];
        mode.rules = rules;
        rules.forEach((rule: SinonStubbedInstance<MustFirstPlacementBeValid>) => {
            // eslint-disable-next-line max-nested-callbacks, id-length -- variable non utilisé pour le fake
            rule.verify.callsFake((_: Action, __: Game, vis: RulesVisitorResponse) => vis);
        });
        board.clone.callsFake(() => board);
        board.tiles = SCENARIO_4_TILES();
        stub(algo, 'findNewFormedTiles').callsFake(() => NEW_WORDS_4());
    });

    afterEach(() => restore());

    it('should contain 7 rules', () => {
        const nRules = 7;
        const classic = new ClassicMode();

        expect(classic.rules.length).to.be.eql(nRules);
    });

    it('should call verify on rules', () => {
        visitor = { newBoard: board, gameModification: [], newlyFormedWordAsTile: [], score: initialScore, placedPosition: [] };
        action = new SkipTurn();
        const vis = mode.verifyRules(action, game);

        expect(vis).to.eql(visitor);
        rules.forEach((rule: SinonStubbedInstance<MustFirstPlacementBeValid>) => {
            assert.calledOnce(rule.verify);
            assert.calledWith(rule.verify, action, game, visitor);
        });
    });

    it('should create the right visitor for placeLetters action', () => {
        visitor = {
            newBoard: board,
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_4(),
            score: initialScore,
            placedPosition: EXPECTED_POSITION_4,
        };
        action = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Horizontal);
        board.placeLetters.callsFake(() => EXPECTED_POSITION_4);
        const vis = mode.verifyRules(action, game);

        expect(vis).to.eql(visitor);
        rules.forEach((rule: SinonStubbedInstance<MustFirstPlacementBeValid>) => {
            assert.calledOnce(rule.verify);
            assert.calledWith(rule.verify, action, game, visitor);
        });
    });

    it('should create the right visitor for action other then placeLetters', () => {
        visitor = { newBoard: board, gameModification: [], newlyFormedWordAsTile: [], score: initialScore, placedPosition: [] };
        action = new TradeLetter(WORD_PLACE_4());
        board.placeLetters.callsFake(() => EXPECTED_POSITION_4);
        const vis = mode.verifyRules(action, game);

        expect(vis).to.eql(visitor);
        rules.forEach((rule: SinonStubbedInstance<MustFirstPlacementBeValid>) => {
            assert.calledOnce(rule.verify);
            assert.calledWith(rule.verify, action, game, visitor);
        });
    });

    it('should remove the rule from rules', () => {
        const ruleToRemove = RuleName.MustFirstPlacementBeValid;
        const classic = new ClassicMode();
        const nRules = 6;
        const noRule = 0;

        classic.removeRule(ruleToRemove);

        const removedRule = classic.rules.filter((rule) => rule.name === ruleToRemove);

        expect(classic.rules.length).to.be.eql(nRules);
        expect(removedRule.length).to.be.eql(noRule);
    });

    it('should add the rule from rules', () => {
        const ruleToAdd = createStubInstance(MustFirstPlacementBeValid);
        const classic = new ClassicMode();
        const nRules = 8;
        const foundRule = 1;

        classic.addRule(ruleToAdd);

        const addedRule = classic.rules.filter((rule) => rule === ruleToAdd);

        expect(classic.rules.length).to.be.eql(nRules);
        expect(addedRule.length).to.be.eql(foundRule);
    });
});
