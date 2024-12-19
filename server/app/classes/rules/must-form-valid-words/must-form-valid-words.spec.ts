import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { Board } from '@app/classes/board/board';
import { Game } from '@app/classes/game/game';
import { MustFormValidWords } from '@app/classes/rules/must-form-valid-words/must-form-valid-words';
import { Action } from '@app/interface/action-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { stubGame } from '@app/test/classes-stubs/game-stub';
import { BEGIN_POSITION_1, NEW_WORDS_1, SCENARIO_ONE_TILES, WORD_PLACE_1 } from '@app/test/constants/boardScenarios/board-scenario-1';
import { BEGIN_POSITION_2, NEW_WORD_2, SCENARIO_2_TILES, WORD_PLACE_2 } from '@app/test/constants/boardScenarios/board-scenario-2';
import { BEGIN_POSITION_3, NEW_WORD_3, SCENARIO_3_TILES, WORD_PLACE_3 } from '@app/test/constants/boardScenarios/board-scenario-3';
import { BEGIN_POSITION_4, NEW_WORDS_4, SCENARIO_4_TILES, WORD_PLACE_4 } from '@app/test/constants/boardScenarios/board-scenario-4';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { restore } from 'sinon';

describe('MustFormValidWords', () => {
    let stubs: ServiceStubHelper;
    let rule: MustFormValidWords;
    let action: Action;
    let visitor: RulesVisitorResponse;
    let game: Game;
    const initialScore = 0;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        game = stubGame();
        stubs.scrabbleAlgo.findNewFormedTiles.callsFake(() => NEW_WORD_3());
        rule = new MustFormValidWords();
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
    it('should valid scenario 1', () => {
        stubs.dictionaryService.validateWords.callsFake(() => true);
        visitor = {
            newBoard: new Board(SCENARIO_ONE_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_1(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_1, BEGIN_POSITION_1, Orientation.Vertical);
        const result = rule.verify(action, game, visitor);

        expect(result).to.eql(visitor);
    });

    it('should valid scenario 2', () => {
        stubs.dictionaryService.validateWords.callsFake(() => true);
        visitor = {
            newBoard: new Board(SCENARIO_2_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORD_2(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_2, BEGIN_POSITION_2, Orientation.Vertical);
        const result = rule.verify(action, game, visitor);

        expect(result).to.eql(visitor);
    });

    it('should valid scenario 3', () => {
        stubs.dictionaryService.validateWords.callsFake(() => true);
        visitor = {
            newBoard: new Board(SCENARIO_3_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORD_3(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_3, BEGIN_POSITION_3, Orientation.Vertical);
        const result = rule.verify(action, game, visitor);

        expect(result).to.eql(visitor);
    });

    it('should valid scenario 4', () => {
        stubs.dictionaryService.validateWords.callsFake(() => true);
        visitor = {
            newBoard: new Board(SCENARIO_4_TILES()),
            gameModification: [],
            newlyFormedWordAsTile: NEW_WORDS_4(),
            score: initialScore,
            placedPosition: [],
        };
        action = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Vertical);
        const result = rule.verify(action, game, visitor);

        expect(result).to.eql(visitor);
    });

    it('should invalid this valid scenario', () => {
        stubs.dictionaryService.validateWords.callsFake(() => false);
        expect(() => rule.verify(action, game, visitor)).to.throw();
    });
});
