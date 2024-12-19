import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { Board } from '@app/classes/board/board';
import { Game } from '@app/classes/game/game';
import { ScoringNewWords } from '@app/classes/rules/score/score-classic';
import { Action } from '@app/interface/action-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import {
    BEGIN_POSITION_1,
    EXPECTED_SCORE_1,
    NEW_WORDS_1,
    SCENARIO_ONE_TILES,
    WORD_PLACE_1,
} from '@app/test/constants/boardScenarios/board-scenario-1';
import { BEGIN_POSITION_2, EXPECTED_SCORE_2, NEW_WORD_2, SCENARIO_2_TILES, WORD_PLACE_2 } from '@app/test/constants/boardScenarios/board-scenario-2';
import { BEGIN_POSITION_3, EXPECTED_SCORE_3, NEW_WORD_3, SCENARIO_3_TILES, WORD_PLACE_3 } from '@app/test/constants/boardScenarios/board-scenario-3';
import { BEGIN_POSITION_4, EXPECTED_SCORE_4, NEW_WORDS_4, SCENARIO_4_TILES, WORD_PLACE_4 } from '@app/test/constants/boardScenarios/board-scenario-4';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { createStubInstance, SinonStubbedInstance } from 'sinon';

describe('ScoringNewWords', () => {
    let rule: ScoringNewWords;
    let action: Action;
    let visitor: RulesVisitorResponse;
    let gameStub: SinonStubbedInstance<Game>;
    let game: Game;
    const initialScore = 0;

    beforeEach(() => {
        gameStub = createStubInstance(Game);
        game = gameStub as unknown as Game;
        rule = new ScoringNewWords();
    });

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

    it('should return a score of 9', () => {
        visitor = {
            newBoard: new Board(SCENARIO_ONE_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_1(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_1, BEGIN_POSITION_1, Orientation.Horizontal);
        const result = rule.verify(action, game, visitor);

        expect(result.score).to.eql(EXPECTED_SCORE_1);
    });

    it('should return a score of 30', () => {
        visitor = {
            newBoard: new Board(SCENARIO_2_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORD_2(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_2, BEGIN_POSITION_2, Orientation.Vertical);
        const result = rule.verify(action, game, visitor);

        expect(result.score).to.eql(EXPECTED_SCORE_2);
    });

    it('should return a score of 50', () => {
        visitor = {
            newBoard: new Board(SCENARIO_3_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORD_3(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_3, BEGIN_POSITION_3, Orientation.Vertical);
        const result = rule.verify(action, game, visitor);

        expect(result.score).to.eql(EXPECTED_SCORE_3);
    });

    it('should return a score of 97', () => {
        const bingo = 50;

        visitor = {
            newBoard: new Board(SCENARIO_4_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_4(),
            score: bingo,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Vertical);
        const result = rule.verify(action, game, visitor);

        expect(result.score).to.eql(EXPECTED_SCORE_4);
    });
});
