/* eslint-disable @typescript-eslint/no-explicit-any, dot-notation -- Pour pouvoir mock les méthodes et méthode privée */
import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { LettersFactory as l } from '@app/classes/letters/letterFactory/letter-factory';
import { WordsFindValidators } from '@app/classes/words-find/words-find-validators/words-find-validators';
import { MIDDLE_POSITION } from '@app/constants/game';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { TIME_TO_QUEUE_RESET } from '@app/constants/turn-times';
import { EndSearching } from '@app/interface/end-searching';
import { Hint } from '@app/interface/hint';
import {
    ERROR_VISITOR_RESPONSE,
    FAKE_BOARD_HELPER,
    FAKE_GAME,
    FAKE_POSITION,
    FAKE_RESULT_LENGTH,
    FAKE_START_TIME,
    FAKE_WORD,
    FAKE_WORDS_FIND_STATE,
    RULES_VISITOR_RESPONSE,
} from '@app/test/constants/fake-words-find-constants';
import { doNothing } from '@app/test/do-nothing-function';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { describe } from 'mocha';
import { assert, restore, stub } from 'sinon';

describe('WordsFindValidators', () => {
    let wordsFindValidators: WordsFindValidators;
    let stubsServices: ServiceStubHelper;

    beforeEach(() => {
        stubsServices = new ServiceStubHelper();
        wordsFindValidators = new WordsFindValidators(FAKE_BOARD_HELPER, FAKE_GAME(), {});
        stubsServices.clientSocket.connect();
    });

    afterEach(() => restore());

    it('tryPlacement should call validateScore, currentPosition and PlaceLetters.transformToAction for Horizontal placement', () => {
        const fakeAction = new PlaceLetters([l.l, l.a], MIDDLE_POSITION, Orientation.Horizontal);

        const validateScoreStub = stub(wordsFindValidators, 'validateScore' as any).callsFake(doNothing);
        const currentPositionStub = stub(wordsFindValidators['boardHelper'], 'currentPosition').callsFake(() => MIDDLE_POSITION);
        const transformToActionStub = stub(PlaceLetters, 'transformToAction').callsFake(() => fakeAction);

        wordsFindValidators['tryPlacement'](FAKE_POSITION, FAKE_WORD, FAKE_WORDS_FIND_STATE);
        assert.calledWith(validateScoreStub, fakeAction, FAKE_WORDS_FIND_STATE);
        assert.calledWith(currentPositionStub, FAKE_POSITION);
        assert.calledWith(transformToActionStub, MIDDLE_POSITION, Orientation.Horizontal, FAKE_WORD);
    });

    it('tryPlacement should call validateScore, currentPosition and PlaceLetters.transformToAction for Vertical placement', () => {
        const fakeAction = new PlaceLetters([l.l, l.a], MIDDLE_POSITION, Orientation.Vertical);
        const wordsFindState = { worksHorizontal: false, current: MIDDLE_POSITION, result: [] as Hint[] };

        const validateScoreStub = stub(wordsFindValidators, 'validateScore' as any).callsFake(doNothing);
        const currentPositionStub = stub(wordsFindValidators['boardHelper'], 'currentPosition').callsFake(() => MIDDLE_POSITION);
        const transformToActionStub = stub(PlaceLetters, 'transformToAction').callsFake(() => fakeAction);

        wordsFindValidators['tryPlacement'](FAKE_POSITION, FAKE_WORD, wordsFindState);
        assert.calledWith(validateScoreStub, fakeAction, wordsFindState);
        assert.calledWith(currentPositionStub, FAKE_POSITION);
        assert.calledWith(transformToActionStub, MIDDLE_POSITION, Orientation.Vertical, FAKE_WORD);
    });

    it('tryPlacement should not call validateScore when it is not a new action', () => {
        const fakeAction = new PlaceLetters([l.l, l.a], MIDDLE_POSITION, Orientation.Vertical);
        const wordsFindState = { worksHorizontal: false, current: MIDDLE_POSITION, result: [] as Hint[] };

        const validateScoreStub = stub(wordsFindValidators, 'validateScore' as any).callsFake(doNothing);

        stub(wordsFindValidators['boardHelper'], 'currentPosition').callsFake(() => MIDDLE_POSITION);
        stub(PlaceLetters, 'transformToAction').callsFake(() => fakeAction);
        stub(wordsFindValidators, 'isNew' as any).returns(false);
        wordsFindValidators['tryPlacement'](FAKE_POSITION, FAKE_WORD, wordsFindState);
        assert.notCalled(validateScoreStub);
    });

    it('calls queueReset', async () => {
        await wordsFindValidators.queueReset();
    });

    it('validateScore should update attribute result if score is not equal to INDEX_NOT_FOUND', () => {
        const wordsFindState = { worksHorizontal: true, current: MIDDLE_POSITION, result: [] as Hint[] };
        const action = new PlaceLetters([l.l, l.a], MIDDLE_POSITION, Orientation.Horizontal);
        const score = 2;
        const validatePlacementStub = stub(wordsFindValidators, 'validatePlacement' as any).callsFake(() => score);

        wordsFindValidators['validateScore'](action, wordsFindState);
        expect(wordsFindState.result).to.deep.equal([{ action, score }]);
        assert.called(validatePlacementStub);
    });

    it('validateScore should not update attribute result if score is equal to INDEX_NOT_FOUND', () => {
        const wordsFindState = { worksHorizontal: false, current: MIDDLE_POSITION, result: [] };
        const action = new PlaceLetters([l.q, l.q], MIDDLE_POSITION, Orientation.Vertical);
        const noResult = 0;
        const validatePlacementStub = stub(wordsFindValidators, 'validatePlacement' as any).callsFake(() => INDEX_NOT_FOUND);

        expect(wordsFindState.result.length).to.eql(noResult);
        wordsFindValidators['validateScore'](action, wordsFindState);
        expect(wordsFindState.result.length).to.eql(noResult);
        assert.called(validatePlacementStub);
    });

    it('validatePlacement should return the RulesVisitorResponse score if placement is valid', () => {
        const action = new PlaceLetters([l.a, l.a], MIDDLE_POSITION, Orientation.Horizontal);

        wordsFindValidators['game'] = FAKE_GAME();
        const verifyRulesStub = stub(wordsFindValidators['game'].gameMode, 'verifyRules').callsFake(() => RULES_VISITOR_RESPONSE);

        expect(wordsFindValidators['validatePlacement'](action)).to.eql(RULES_VISITOR_RESPONSE.score);
        assert.called(verifyRulesStub);
        verifyRulesStub.restore();
    });

    it('validatePlacement should return INDEX_NOT_FOUND if placement is not valid', () => {
        const action = new PlaceLetters([l.l, l.l], MIDDLE_POSITION, Orientation.Horizontal);
        const verifyRulesStub = stub(wordsFindValidators['game'].gameMode, 'verifyRules').throws(ERROR_VISITOR_RESPONSE);

        expect(wordsFindValidators['validatePlacement'](action)).to.eql(INDEX_NOT_FOUND);
        assert.called(verifyRulesStub);
    });

    it('validatePlacement should return INDEX_NOT_FOUND if a tile is at the position', () => {
        const action = new PlaceLetters([l.l, l.l], MIDDLE_POSITION, Orientation.Horizontal);
        const letterAtStub = stub(wordsFindValidators.game.board, 'letterAt').callsFake(() => 'A');

        expect(wordsFindValidators['validatePlacement'](action)).to.eql(INDEX_NOT_FOUND);
        assert.called(letterAtStub);
    });

    it('endSearch should return true if isTimesUp or hasFound returned true', async () => {
        let isTimesUpStub = stub(wordsFindValidators, 'isTimesUp' as any).callsFake(() => true);
        const hasFoundStub = stub(wordsFindValidators, 'hasFound' as any).callsFake(() => true);

        expect(await wordsFindValidators['endSearch'](FAKE_START_TIME, FAKE_RESULT_LENGTH)).to.eql(true);
        assert.called(isTimesUpStub);
        assert.notCalled(hasFoundStub);

        isTimesUpStub.restore();
        isTimesUpStub = stub(wordsFindValidators, 'isTimesUp' as any).callsFake(() => false);

        expect(await wordsFindValidators['endSearch'](FAKE_START_TIME, FAKE_RESULT_LENGTH)).to.eql(true);
        assert.called(isTimesUpStub);
        assert.called(hasFoundStub);
    });

    it('endSearch should return false if isTimesUp and hasFound returned false', async () => {
        const isTimesUpStub = stub(wordsFindValidators, 'isTimesUp' as any).callsFake(() => false);
        const hasFoundStub = stub(wordsFindValidators, 'hasFound' as any).callsFake(() => false);

        expect(await wordsFindValidators['endSearch'](FAKE_START_TIME, FAKE_RESULT_LENGTH)).to.eql(false);
        assert.called(isTimesUpStub);
        assert.called(hasFoundStub);
    });

    it('isTimesUp should return true if time between right now and startTime is greater than maxTime', async () => {
        const maxTimeNotAchieved = 100;
        const maxTime = 2000;
        const maxTimeAchieved = 3000;

        let startTime = Date.now() - maxTimeNotAchieved;

        stub(Date, 'now').callsFake(() => maxTimeAchieved * 2);
        expect(await wordsFindValidators['isTimesUp'](startTime)).to.eql(false);

        wordsFindValidators['end'].maxTime = maxTime;
        expect(await wordsFindValidators['isTimesUp'](startTime)).to.eql(false);

        startTime = Date.now() - maxTimeAchieved;
        expect(await wordsFindValidators['isTimesUp'](startTime)).to.eql(true);
    });

    it('isTimesUp should correctly call queueReset()', async () => {
        wordsFindValidators['end'].maxTime = 1;
        stub(Date, 'now').callsFake(() => TIME_TO_QUEUE_RESET);
        const queueResetStub = stub(wordsFindValidators, 'queueReset').callsFake(doNothing);

        await wordsFindValidators['isTimesUp'](TIME_TO_QUEUE_RESET / 2);
        assert.notCalled(queueResetStub);

        await wordsFindValidators['isTimesUp'](0);
        assert.calledOnce(queueResetStub);
    });

    it('hasFound should return false if property found of end is not valid', () => {
        const resultFound = 1;
        let invalidFoundValue = -1;

        expect(wordsFindValidators['hasFound'](resultFound)).to.eql(false);

        wordsFindValidators['end'].found = invalidFoundValue;
        expect(wordsFindValidators['hasFound'](resultFound)).to.eql(false);

        invalidFoundValue = 0;
        wordsFindValidators['end'].found = invalidFoundValue;
        expect(wordsFindValidators['hasFound'](resultFound)).to.eql(false);
    });

    it('hasFound should return true if at least "found" numbers of possibilities were found', () => {
        const end: EndSearching = { found: 2 };
        let resultFound = 0;

        wordsFindValidators['end'] = end;
        expect(wordsFindValidators['hasFound'](resultFound)).to.eql(false);

        resultFound = 3;
        expect(wordsFindValidators['hasFound'](resultFound)).to.eql(true);
    });

    it('isNew should return true if it is not already present', () => {
        const action1 = new PlaceLetters([l.a, l.a], MIDDLE_POSITION, Orientation.Horizontal);
        const action2 = new PlaceLetters([l.b, l.a], MIDDLE_POSITION, Orientation.Vertical);
        const hintIn = { action: action1, score: 1 };
        const result: Hint[] = [hintIn];

        expect(wordsFindValidators['isNew'](action2, result)).to.eql(true);
    });

    it('isNew should return false if it is already present', () => {
        const action1 = new PlaceLetters([l.a, l.a], MIDDLE_POSITION, Orientation.Horizontal);
        const hintIn = { action: action1, score: 1 };
        const result: Hint[] = [hintIn];

        expect(wordsFindValidators['isNew'](action1, result)).to.eql(false);
    });
});
