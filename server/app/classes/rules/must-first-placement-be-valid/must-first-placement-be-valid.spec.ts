import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { Board } from '@app/classes/board/board';
import { Game } from '@app/classes/game/game';
import { MustFirstPlacementBeValid } from '@app/classes/rules/must-first-placement-be-valid/must-first-placement-be-valid';
import { Action } from '@app/interface/action-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { stubGame } from '@app/test/classes-stubs/game-stub';
import { NEW_WORDS_1, SCENARIO_ONE_TILES } from '@app/test/constants/boardScenarios/board-scenario-1';
import { BEGIN_POSITION_4, SCENARIO_4_TILES, WORD_PLACE_4 } from '@app/test/constants/boardScenarios/board-scenario-4';
import { BEGIN_POSITION_5, NEW_WORDS_5, SCENARIO_5_TILES, WORD_PLACE_5 } from '@app/test/constants/boardScenarios/board-scenario-5';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { restore, stub } from 'sinon';

describe('MustFirstPlacementBeValid', () => {
    let rule: MustFirstPlacementBeValid;
    let action: Action;
    let visitor: RulesVisitorResponse;
    let game: Game;
    let stubServices: ServiceStubHelper;

    const initialScore = 0;

    beforeEach(() => {
        stubServices = new ServiceStubHelper();
        stubServices.clientSocket.connect();
        rule = new MustFirstPlacementBeValid();
        game = stubGame();
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

    it('should not word Place without middle at turn 1', () => {
        visitor = {
            newBoard: new Board(SCENARIO_ONE_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_1(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Horizontal);
        expect(() => rule.verify(action, game, visitor)).to.throw();
    });

    it('should allow place a word with middle at turn 1', () => {
        visitor = {
            newBoard: new Board(SCENARIO_5_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_5(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_5, BEGIN_POSITION_5, Orientation.Horizontal);
        rule.verify(action, game, visitor);
    });

    it('should not allow place a word with one letter at turn 1', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- stub membre prive
        stub(rule, 'isMiddleOccupied' as any).returns(false);
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

    it('should allow place a word with one at least two letter at turn 1', () => {
        game.flags.firstTimePlacingLetter = false;
        visitor = {
            newBoard: new Board(SCENARIO_5_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_5(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_5, BEGIN_POSITION_5, Orientation.Horizontal);
        rule.verify(action, game, visitor);
    });
});
