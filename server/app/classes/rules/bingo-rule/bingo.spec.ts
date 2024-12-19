import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { Board } from '@app/classes/board/board';
import { Game } from '@app/classes/game/game';
import { Bingo } from '@app/classes/rules/bingo-rule/bingo';
import { BINGO_POINTS } from '@app/constants/bingo';
import { Action } from '@app/interface/action-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { BEGIN_POSITION_1, NEW_WORDS_1, SCENARIO_ONE_TILES, WORD_PLACE_1 } from '@app/test/constants/boardScenarios/board-scenario-1';
import { BEGIN_POSITION_4, NEW_WORDS_4, SCENARIO_4_TILES, WORD_PLACE_4 } from '@app/test/constants/boardScenarios/board-scenario-4';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { createStubInstance, SinonStubbedInstance } from 'sinon';

describe('Bingo', () => {
    let rule: Bingo;
    let action: Action;
    let visitor: RulesVisitorResponse;
    let gameStub: SinonStubbedInstance<Game>;
    let game: Game;
    const initialScore = 0;

    beforeEach(() => {
        gameStub = createStubInstance(Game);
        game = gameStub as unknown as Game;
        rule = new Bingo();
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

    it('should add bingo', () => {
        visitor = {
            newBoard: new Board(SCENARIO_4_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_4(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Horizontal);
        const result = rule.verify(action, game, visitor);

        expect(result.score).to.eql(BINGO_POINTS);
    });

    it('should do nothing when the action is not placerLetters', () => {
        visitor = {
            newBoard: new Board(SCENARIO_ONE_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_1(),
            score: initialScore,
            placedPosition: [],
        };
        const skip = new SkipTurn();
        const result = rule.verify(skip, game, visitor);

        expect(result.score).to.eql(initialScore);
    });

    it('should not add bingo', () => {
        visitor = {
            newBoard: new Board(SCENARIO_ONE_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_1(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_1, BEGIN_POSITION_1, Orientation.Horizontal);
        const result = rule.verify(action, game, visitor);

        expect(result.score).to.eql(initialScore);
    });
});
