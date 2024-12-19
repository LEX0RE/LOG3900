import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { Board } from '@app/classes/board/board';
import { Game } from '@app/classes/game/game';
import { PlacementMustBeValid } from '@app/classes/rules/placement-must-valid/placement-must-be-valid';
import { Action } from '@app/interface/action-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { stubBoard } from '@app/test/classes-stubs/board-stub';
import { stubGame } from '@app/test/classes-stubs/game-stub';
import { SCENARIO_ONE_TILES } from '@app/test/constants/boardScenarios/board-scenario-1';
import { BEGIN_POSITION_4, NEW_WORDS_4, SCENARIO_4_TILES, WORD_PLACE_4 } from '@app/test/constants/boardScenarios/board-scenario-4';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { assert, restore } from 'sinon';

describe('PlacementMustBeValid', () => {
    let stubs: ServiceStubHelper;
    let rule: PlacementMustBeValid;
    let game: Game;
    let board: Board;
    let action: Action;
    let visitor: RulesVisitorResponse;
    let fakePlacedPosition: Vector2D[];
    const initialScore = 0;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        board = stubBoard();
        game = stubGame();
        rule = new PlacementMustBeValid();
        fakePlacedPosition = [
            { x: 4, y: 5 },
            { x: 4, y: 6 },
        ];
        visitor = { gameModification: [], newBoard: board, newlyFormedWordAsTile: NEW_WORDS_4(), placedPosition: fakePlacedPosition, score: 0 };
    });

    afterEach(() => restore());

    it('should create PlacementMustBeValid', () => {
        expect(rule).to.not.be.eql(undefined);
    });

    it('should do nothing when it is not the right action', () => {
        rule.verify(new SkipTurn(), game, visitor);
        assert.notCalled(stubs.scrabbleAlgo.isWordConnected);
    });

    it('should throw an error when placement is invalid', () => {
        const placeAction = new PlaceLetters([], { x: 0, y: 0 }, Orientation.Horizontal);

        stubs.scrabbleAlgo.isWordConnected.returns(false);

        expect(() => rule.verify(placeAction, game, visitor)).to.throw();
        assert.calledWithExactly(stubs.scrabbleAlgo.isWordConnected, board, fakePlacedPosition);
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

    it('should not allow when no word were formed', () => {
        visitor = {
            newBoard: new Board(SCENARIO_ONE_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: [],
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Horizontal);
        expect(() => rule.verify(action, game, visitor)).to.throw();
    });

    it('should allow when at least one word were formed', () => {
        stubs.scrabbleAlgo.isWordConnected.returns(true);
        visitor = {
            newBoard: new Board(SCENARIO_4_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_4(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Horizontal);
        rule.verify(action, game, visitor);
    });
});
