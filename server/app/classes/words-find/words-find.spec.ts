/* eslint-disable max-lines -- Simplement dans le but de tout tester words-find */
/* eslint-disable @typescript-eslint/no-explicit-any, dot-notation -- Méthodes privées et mock des méthodes */
import { Board } from '@app/classes/board/board';
import { GaddagNode } from '@app/classes/gaddag/gaddag-node/gaddag-node';
import { WordsFind } from '@app/classes/words-find/words-find';
import { MIDDLE_POSITION } from '@app/constants/game';
import { TriState } from '@app/constants/tri-state';
import { stubEasel } from '@app/test/classes-stubs/easel-stub';
import { stubGame } from '@app/test/classes-stubs/game-stub';
import { FAKE_DICTIONARY_FULL } from '@app/test/constants/fake-dictionary';

import {
    DECREMENT_POS,
    EMPTY_STRING,
    FAKE_ANCHOR,
    FAKE_ANCHORS,
    FAKE_ARC_WAY,
    FAKE_BOARD_HELPER,
    FAKE_DICTIONARY,
    FAKE_EMPTY_PLAYABLE_WORD,
    FAKE_GADDAG,
    FAKE_GADDAG_NODE,
    FAKE_HAND,
    FAKE_MUTABLE_PLACING_CONTEXT,
    FAKE_PLACING_CONTEXT,
    FAKE_PLAYABLE_WORD,
    FAKE_PLAYABLE_WORD_BLANK,
    FAKE_POSITION,
    FAKE_WORD,
    FAKE_WORDS_FIND_VALIDATORS,
    INCREMENT_POS,
    LETTER,
    NO_LETTER,
    SORTED_FAKE_HINTS,
    UNSORTED_FAKE_HINTS,
} from '@app/test/constants/fake-words-find-constants';
import { doNothing } from '@app/test/do-nothing-function';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { expect } from 'chai';
import { describe } from 'mocha';
import { assert, createStubInstance, restore, stub } from 'sinon';

describe('WordsFindClass', () => {
    let wordsFind: WordsFind;
    let stubs: ServiceStubHelper;

    beforeEach(() => {
        restore();
        stubs = new ServiceStubHelper();
        stubs.dictionaryService.getDictionary.returns(FAKE_DICTIONARY);
        wordsFind = new WordsFind();
        wordsFind['board'] = new Board();
        wordsFind['boardHelper'] = FAKE_BOARD_HELPER;
        wordsFind['wordsFindValidators'] = FAKE_WORDS_FIND_VALIDATORS();
        wordsFind['dictionary'] = FAKE_DICTIONARY;
    });

    afterEach(() => restore());

    it('should create with the right dictionary', async () => {
        stubs.dictionaryService.getDictionary.returns(undefined);
        const otherWordFind = new WordsFind();

        await otherWordFind.fastActions(stubEasel(), stubGame());
        expect(otherWordFind['dictionary'].dictionaryId).to.be.eql(FAKE_DICTIONARY_FULL().dictionaryId);
    });

    it('fastActions should call generateAllMoves and getDictionary and should return sorted hint array in descending order', async () => {
        const generateAllMovesStub = stub(wordsFind, 'generateAllMoves' as any).callsFake(doNothing);

        wordsFind['result'] = UNSORTED_FAKE_HINTS;
        expect(await wordsFind.fastActions(stubEasel(), stubGame())).to.eql(SORTED_FAKE_HINTS);
        assert.called(generateAllMovesStub);
    });

    it('generateAllMoves should call testAnchor with good parameters', async () => {
        const testAnchorStub = stub(wordsFind, 'testAnchor' as any).callsFake(doNothing);

        await wordsFind['generateAllMoves'](FAKE_HAND);
        assert.calledTwice(testAnchorStub);
        assert.calledWith(testAnchorStub, FAKE_HAND);
    });

    it('testAnchor should stop execution if endSearch returns true', async () => {
        wordsFind['result'] = [];
        const endSearchStub = stub(wordsFind['wordsFindValidators'], 'endSearch' as any).callsFake(() => true);
        const queueResetStub = stub(wordsFind['wordsFindValidators'], 'queueReset' as any).callsFake(doNothing);

        await wordsFind['testAnchor'](FAKE_HAND);
        assert.calledOnce(endSearchStub);
        assert.notCalled(queueResetStub);
    });

    it('testAnchor should continue execution if endSearch returns false', async () => {
        wordsFind['boardHelper'].anchors = FAKE_ANCHORS;
        wordsFind['result'] = [];
        const endSearchStub = stub(wordsFind['wordsFindValidators'], 'endSearch' as any).callsFake(() => false);
        const placeBeforeStub = stub(wordsFind, 'placeBefore' as any).callsFake(() => false);
        const placeAfterStub = stub(wordsFind, 'placeAfter' as any).callsFake(() => true);
        const genStub = stub(wordsFind, 'generate' as any).callsFake(doNothing);

        await wordsFind['testAnchor'](FAKE_HAND);
        assert.calledTwice(endSearchStub);
        assert.calledTwice(placeBeforeStub);
        assert.calledTwice(placeAfterStub);
        assert.notCalled(genStub);
    });

    it('testAnchor should call call gen if endSearch, placeBefore and placeAfter return false', async () => {
        wordsFind['boardHelper'].anchors = FAKE_ANCHORS;
        wordsFind['result'] = [];
        const endSearchStub = stub(wordsFind['wordsFindValidators'], 'endSearch' as any).callsFake(() => false);
        const placeBeforeStub = stub(wordsFind, 'placeBefore' as any).callsFake(() => TriState.FALSE);
        const placeAfterStub = stub(wordsFind, 'placeAfter' as any).callsFake(() => TriState.FALSE);
        const genStub = stub(wordsFind, 'generate' as any).callsFake(doNothing);

        wordsFind['dictionary'] = FAKE_DICTIONARY;
        await wordsFind['testAnchor'](FAKE_HAND);
        assert.calledTwice(endSearchStub);
        assert.calledTwice(placeBeforeStub);
        assert.calledTwice(placeAfterStub);
        assert.calledTwice(genStub);
        assert.calledWith(genStub, 0, { word: '', hand: FAKE_HAND }, wordsFind['dictionary'].root);
    });

    it('placeBefore should return other promise if wordAfter returns an word of 1 letter or more and dictionary does not contain that word', async () => {
        wordsFind['dictionary'] = FAKE_DICTIONARY;
        stub(wordsFind['boardHelper'], 'wordAfter').callsFake(() => FAKE_WORD);
        stub(wordsFind['boardHelper'], 'currentPosition').callsFake(doNothing);
        stub(FAKE_DICTIONARY.root, 'isContaining').callsFake(() => false);
        stub(wordsFind, 'generate' as any).callsFake(doNothing);
        await wordsFind['placeBefore'](FAKE_ANCHOR, FAKE_HAND).then((result) => expect(result).to.eql(TriState.OTHER));
    });

    it('placeBefore should return false promise if wordAfter returns an empty string', async () => {
        wordsFind['dictionary'] = FAKE_DICTIONARY;
        stub(wordsFind['boardHelper'], 'wordAfter').callsFake(() => '');
        stub(wordsFind['boardHelper'], 'currentPosition').callsFake(doNothing);
        stub(FAKE_DICTIONARY.root, 'isContaining').callsFake(() => false);
        stub(wordsFind, 'generate' as any).callsFake(doNothing);
        await wordsFind['placeBefore'](FAKE_ANCHOR, FAKE_HAND).then((result) => expect(result).to.eql(TriState.FALSE));
    });

    it('placeBefore should return true promise if wordAfter returns an word of 1 letter or more and if dictionary contains that word', async () => {
        const root = createStubInstance(GaddagNode);

        Object.defineProperty(FAKE_DICTIONARY, 'root', { value: root, configurable: true });
        wordsFind['dictionary'] = FAKE_DICTIONARY;
        stub(wordsFind['boardHelper'], 'wordAfter').callsFake(() => FAKE_WORD);
        stub(wordsFind['boardHelper'], 'currentPosition').callsFake(doNothing);
        root.isContaining.returns(true);
        const genStub = stub(wordsFind, 'generate' as any).callsFake(doNothing);

        await wordsFind['placeBefore'](FAKE_ANCHOR, FAKE_HAND).then((result) => expect(result).to.eql(TriState.TRUE));
        assert.called(genStub);
    });

    it('placeAfter should return other promise if wordBefore returns an word of 1 letter or more and dictionary does not contain that word with break', async () => {
        wordsFind['dictionary'] = FAKE_DICTIONARY;
        stub(wordsFind['boardHelper'], 'wordBefore').callsFake(() => FAKE_WORD);
        stub(wordsFind['boardHelper'], 'currentPosition').callsFake(doNothing);
        stub(FAKE_DICTIONARY.root, 'isContaining').callsFake(() => false);
        stub(wordsFind, 'generate' as any).callsFake(doNothing);
        await wordsFind['placeAfter'](FAKE_ANCHOR, FAKE_HAND).then((result) => expect(result).to.eql(TriState.OTHER));
    });

    it('placeAfter should return false promise if wordBefore returns an word of 1 letter or more and dictionary does not contain that word with break', async () => {
        wordsFind['dictionary'] = FAKE_DICTIONARY;
        stub(wordsFind['boardHelper'], 'wordBefore').callsFake(() => '');
        stub(wordsFind['boardHelper'], 'currentPosition').callsFake(doNothing);
        stub(FAKE_DICTIONARY.root, 'isContaining').callsFake(() => false);
        stub(wordsFind, 'generate' as any).callsFake(doNothing);
        await wordsFind['placeAfter'](FAKE_ANCHOR, FAKE_HAND).then((result) => expect(result).to.eql(TriState.FALSE));
    });

    it('placeAfter should return true promise if wordBefore returns an word of 1 letter or more and if dictionary contains that word with break', async () => {
        const root = createStubInstance(GaddagNode);

        Object.defineProperty(FAKE_DICTIONARY, 'root', { value: root, configurable: true });
        wordsFind['dictionary'] = FAKE_DICTIONARY;
        stub(wordsFind['boardHelper'], 'wordBefore').callsFake(() => FAKE_WORD);
        stub(wordsFind['boardHelper'], 'currentPosition').callsFake(doNothing);
        root.isContaining.returns(true);
        const genStub = stub(wordsFind, 'generate' as any).callsFake(doNothing);

        await wordsFind['placeAfter'](FAKE_ANCHOR, FAKE_HAND).then((result) => expect(result).to.eql(TriState.TRUE));
        assert.called(genStub);
    });

    it('filterAllowed should return an empty string if possibilities value is an empty string', () => {
        const arc = new GaddagNode(FAKE_GADDAG());
        const getPositionPossibilityStub = stub(wordsFind['boardHelper'], 'getPositionPossibility').callsFake(() => []);
        const arcStub = stub(arc, 'isContaining');

        expect(wordsFind['filterAllowed'](FAKE_POSITION, EMPTY_STRING, arc)).to.eql(EMPTY_STRING);
        assert.calledOnce(getPositionPossibilityStub);
        assert.notCalled(arcStub);
    });

    it('filterAllowed should return a string that contains letters of possibilities that are not already in result string, contained in the arc and in the anchorPossibilities ', () => {
        const possibilities = 'amere ';
        const positionPossibilities = ['a', 'e'];
        const arc = new GaddagNode(FAKE_GADDAG());
        const arcStub = stub(arc, 'isContaining');
        const letter1 = 'a';
        const letter2 = 'm';
        const letter3 = 'e';
        const letter4 = 'r';

        arcStub.withArgs(letter1).returns(true);
        arcStub.withArgs(letter2).returns(true);
        arcStub.withArgs(letter3).returns(true);
        arcStub.withArgs(letter4).returns(false);
        stub(wordsFind['boardHelper'], 'getPositionPossibility').callsFake(() => positionPossibilities);

        expect(wordsFind['filterAllowed'](FAKE_POSITION, possibilities, arc)).to.eql(letter1 + letter3);
    });

    it('removeFirst should return word passed in parameter without one occurrence of the letter passed in parameter', () => {
        const word = 'bonjour';
        const letter1 = 'j';
        const letter2 = 'o';
        const letter3 = 'a';
        const expectedWithout1 = 'bonour';
        const expectedWithout2 = 'bnjour';

        expect(wordsFind['removeFirst'](word, letter1)).to.eql(expectedWithout1);
        expect(wordsFind['removeFirst'](word, letter2)).to.eql(expectedWithout2);
        expect(wordsFind['removeFirst'](word, letter3)).to.eql(word);
    });

    it('generate should not call letterAt if endSearch returns true', async () => {
        wordsFind['result'] = [];
        stub(wordsFind['wordsFindValidators'], 'endSearch' as any).callsFake(() => true);
        const letterAtStub = stub(wordsFind['board'], 'letterAt').callsFake(doNothing);

        await wordsFind['generate'](FAKE_POSITION, FAKE_PLAYABLE_WORD, FAKE_GADDAG_NODE);
        assert.notCalled(letterAtStub);
    });

    it('gen should call goOn and if letterAt returns a valid letter and if arc contains that letter', async () => {
        const arc = new GaddagNode(FAKE_GADDAG());

        wordsFind['result'] = [];
        stub(wordsFind['wordsFindValidators'], 'endSearch' as any).callsFake(() => false);
        stub(wordsFind['boardHelper'], 'currentPosition' as any).callsFake(() => MIDDLE_POSITION);
        stub(wordsFind['board'], 'letterAt').callsFake(() => LETTER);
        stub(arc, 'isContaining').callsFake(() => true);
        stub(arc, 'makeWay').callsFake(() => FAKE_ARC_WAY());
        const goOnStub = stub(wordsFind, 'goOn' as any).callsFake(doNothing);

        await wordsFind['generate'](FAKE_POSITION, FAKE_PLAYABLE_WORD, arc);
        assert.calledWith(goOnStub, FAKE_POSITION, { letter: LETTER, ...FAKE_PLAYABLE_WORD }, FAKE_ARC_WAY());
    });

    it('generate should call generateHandleNormal and generateHandleBlank if hand has at least one letter and if letterAt does not return a valid letter', async () => {
        wordsFind['result'] = [];
        stub(wordsFind['wordsFindValidators'], 'endSearch' as any).callsFake(() => false);
        stub(wordsFind['boardHelper'], 'currentPosition' as any).callsFake(() => MIDDLE_POSITION);
        stub(wordsFind['board'], 'letterAt').callsFake(() => NO_LETTER);
        const generateHandleNormalStub = stub(wordsFind, 'generateHandleNormal' as any).callsFake(doNothing);
        const generateHandleBlankStub = stub(wordsFind, 'generateHandleBlank' as any).callsFake(doNothing);

        await wordsFind['generate'](FAKE_POSITION, FAKE_PLAYABLE_WORD, FAKE_GADDAG_NODE);
        assert.calledWith(generateHandleNormalStub, FAKE_POSITION, FAKE_PLAYABLE_WORD, FAKE_GADDAG_NODE);
        assert.calledWith(generateHandleBlankStub, FAKE_POSITION, FAKE_PLAYABLE_WORD, FAKE_GADDAG_NODE);
        generateHandleNormalStub.resetHistory();
        generateHandleBlankStub.resetHistory();
        await wordsFind['generate'](FAKE_POSITION, FAKE_EMPTY_PLAYABLE_WORD, FAKE_GADDAG_NODE);
        assert.notCalled(generateHandleNormalStub);
        assert.notCalled(generateHandleBlankStub);
    });

    it('generateHandleNormal should call filterAllowed once and should call goOn for each letter of string returned by filterAllowed', async () => {
        const hand = 'aa';
        const arc = new GaddagNode(FAKE_GADDAG());
        const goOnStub = stub(wordsFind, 'goOn' as any).callsFake(doNothing);

        stub(wordsFind, 'filterAllowed' as any).callsFake(() => hand);
        stub(wordsFind, 'removeFirst' as any).callsFake(() => LETTER);
        stub(arc, 'makeWay').callsFake(() => FAKE_ARC_WAY());

        await wordsFind['generateHandleNormal'](FAKE_POSITION, FAKE_PLAYABLE_WORD, arc);
        assert.calledTwice(goOnStub);
    });

    it('generateHandleBlank should not call goOn if there is not blank to handle', async () => {
        const arc = new GaddagNode(FAKE_GADDAG());
        const goOnStub = stub(wordsFind, 'goOn' as any).callsFake(doNothing);

        stub(arc, 'getPossibilities').callsFake(doNothing);
        stub(wordsFind, 'filterAllowed' as any).callsFake(() => LETTER);

        await wordsFind['generateHandleBlank'](FAKE_POSITION, FAKE_EMPTY_PLAYABLE_WORD, FAKE_GADDAG_NODE);
        assert.notCalled(goOnStub);
    });

    it('generateHandleBlank should call goOn, removeFirst and makeWay if there are blanks to handle', async () => {
        const filtered = 'aa';
        const arc = new GaddagNode(FAKE_GADDAG());
        const goOnStub = stub(wordsFind, 'goOn' as any).callsFake(doNothing);
        const removeFirstStub = stub(wordsFind, 'removeFirst' as any).callsFake(() => LETTER);
        const makeWayStub = stub(arc, 'makeWay').callsFake(() => FAKE_ARC_WAY());

        stub(wordsFind, 'filterAllowed' as any).callsFake(() => filtered);
        stub(arc, 'getPossibilities').callsFake(() => filtered);

        await wordsFind['generateHandleBlank'](FAKE_POSITION, FAKE_PLAYABLE_WORD_BLANK, arc);
        assert.calledTwice(goOnStub);
        assert.calledTwice(removeFirstStub);
        assert.calledTwice(makeWayStub);
    });

    it('goOn should not call letterAt of board if endSearch returns true', () => {
        wordsFind['result'] = [];
        stub(wordsFind['wordsFindValidators'], 'endSearch' as any).callsFake(() => true);
        const isLastLetterStub = stub(FAKE_ARC_WAY().oldNode, 'isEnd').callsFake(doNothing);

        wordsFind['goOn'](FAKE_POSITION, FAKE_PLACING_CONTEXT(), FAKE_ARC_WAY());
        assert.notCalled(isLastLetterStub);
    });

    it('goOn should call goOnRight if index is greater than 0', async () => {
        const placingContext = FAKE_MUTABLE_PLACING_CONTEXT();

        wordsFind['result'] = [];
        stub(wordsFind['wordsFindValidators'], 'endSearch' as any).returns(false);
        stub(wordsFind['board'], 'letterAt').returns(placingContext.word);
        stub(wordsFind['boardHelper'], 'currentPosition');
        stub(wordsFind, 'validate' as any);
        const goOnRightStub = stub(wordsFind, 'goOnRight' as any);
        const position = 1;
        const expectedPlacingContextWord = placingContext.word;
        const arkWay = {
            newNode: FAKE_GADDAG().root,
            oldNode: createStubInstance(GaddagNode) as unknown as GaddagNode,
        };

        await wordsFind['goOn'](position, placingContext, arkWay);
        expect(placingContext.word).to.eql(expectedPlacingContextWord);
        assert.calledWith(goOnRightStub, position, placingContext, arkWay);
    });

    it('goOn should not call goOnRight if old ark is equal the new are', async () => {
        wordsFind['result'] = [];
        stub(wordsFind['wordsFindValidators'], 'endSearch' as any).returns(false);
        stub(wordsFind['board'], 'letterAt').returns(FAKE_MUTABLE_PLACING_CONTEXT().word);
        stub(wordsFind['boardHelper'], 'currentPosition');
        stub(wordsFind, 'validate' as any);
        const goOnRightStub = stub(wordsFind, 'goOnRight' as any);
        const position = 1;

        await wordsFind['goOn'](position, FAKE_MUTABLE_PLACING_CONTEXT(), FAKE_ARC_WAY());
        assert.notCalled(goOnRightStub);
    });

    it('goOn should call goOnLeft if index is equal or lower than 0', async () => {
        wordsFind['result'] = [];
        stub(wordsFind['wordsFindValidators'], 'endSearch' as any).returns(false);
        stub(wordsFind['boardHelper'], 'currentPosition');
        stub(wordsFind, 'validate' as any);
        stub(wordsFind['board'], 'letterAt').returns(NO_LETTER);
        const goOnLeftStub = stub(wordsFind, 'goOnLeft' as any);
        const pos = 0;
        const placingContext = FAKE_MUTABLE_PLACING_CONTEXT();
        const expectedPlacingContextWord = placingContext.letter + placingContext.word;
        const arkWay = {
            newNode: FAKE_GADDAG().root,
            oldNode: createStubInstance(GaddagNode) as unknown as GaddagNode,
        };

        await wordsFind['goOn'](pos, placingContext, arkWay);
        expect(placingContext.word).to.eql(expectedPlacingContextWord);
        assert.calledWith(goOnLeftStub, pos, placingContext, arkWay);
    });

    it('goOn should call goOnRight with the right placing context', async () => {
        wordsFind['result'] = [];
        stub(wordsFind['wordsFindValidators'], 'endSearch' as any).returns(false);
        stub(wordsFind['boardHelper'], 'currentPosition');
        stub(wordsFind, 'validate' as any);
        stub(wordsFind['board'], 'letterAt').returns(NO_LETTER);
        const goOnRightStub = stub(wordsFind, 'goOnRight' as any);
        const pos = 1;
        const placingContext = FAKE_MUTABLE_PLACING_CONTEXT();
        const expectedPlacingContextWord = placingContext.word + placingContext.letter;
        const arkWay = {
            newNode: FAKE_GADDAG().root,
            oldNode: createStubInstance(GaddagNode) as unknown as GaddagNode,
        };

        await wordsFind['goOn'](pos, placingContext, arkWay);
        expect(placingContext.word).to.eql(expectedPlacingContextWord);
        assert.calledWith(goOnRightStub, pos, placingContext, arkWay);
    });

    it('goOnLeft should call gen if hasRoom returns true', async () => {
        const arkWay = FAKE_ARC_WAY();

        stub(wordsFind['boardHelper'], 'hasRoom').callsFake(() => true);
        stub(arkWay.newNode, 'isContaining').callsFake(() => false);
        const genStub = stub(wordsFind, 'generate' as any).callsFake(doNothing);
        const placingContext = FAKE_PLACING_CONTEXT();

        await wordsFind['goOnLeft'](FAKE_POSITION, placingContext, arkWay);
        assert.calledWith(genStub, FAKE_POSITION + DECREMENT_POS, placingContext, arkWay.newNode);
    });

    it('goOnLeft should call gen twice if contains of new, tileBefore and hasRoom return true', async () => {
        const arkWay = FAKE_ARC_WAY();

        stub(wordsFind['boardHelper'], 'hasRoom').callsFake(() => true);
        stub(arkWay.newNode, 'isContaining').callsFake(() => true);
        stub(wordsFind['boardHelper'], 'tileBefore').callsFake(() => NO_LETTER);
        stub(wordsFind, 'lastLetterAdded' as any).callsFake(doNothing);
        stub(arkWay.newNode, 'getChild').callsFake(() => FAKE_GADDAG_NODE);
        const genStub = stub(wordsFind, 'generate' as any).callsFake(doNothing);

        await wordsFind['goOnLeft'](FAKE_POSITION, FAKE_PLACING_CONTEXT(), arkWay);
        assert.calledTwice(genStub);
    });

    it('goOnLeft should not call gen if hasRoom returns false', async () => {
        const arkWay = FAKE_ARC_WAY();

        stub(wordsFind['boardHelper'], 'hasRoom').returns(false);
        stub(arkWay.newNode, 'isContaining').returns(true);
        stub(wordsFind['boardHelper'], 'tileBefore').returns(NO_LETTER);
        stub(arkWay.newNode, 'getChild').returns(FAKE_GADDAG_NODE);
        const genStub = stub(wordsFind, 'generate' as any);

        await wordsFind['goOnLeft'](FAKE_POSITION, FAKE_PLACING_CONTEXT(), arkWay);
        assert.notCalled(genStub);
    });

    it('goOnRight should call gen if hasRoom of boardHelper returns true', async () => {
        stub(wordsFind['boardHelper'], 'hasRoom' as any).callsFake(() => true);
        const genStub = stub(wordsFind, 'generate' as any).callsFake(doNothing);

        await wordsFind['goOnRight'](FAKE_POSITION, FAKE_PLACING_CONTEXT(), FAKE_ARC_WAY());
        assert.calledWith(genStub, FAKE_POSITION + INCREMENT_POS, FAKE_PLACING_CONTEXT(), FAKE_ARC_WAY().newNode);
    });

    it('goOnRight should not call gen if hasRoom returns false', async () => {
        stub(wordsFind['boardHelper'], 'hasRoom' as any).callsFake(() => false);
        const genStub = stub(wordsFind, 'generate' as any).callsFake(doNothing);

        await wordsFind['goOnRight'](FAKE_POSITION, FAKE_PLACING_CONTEXT(), FAKE_ARC_WAY());
        assert.notCalled(genStub);
    });

    it('validate should not call tryPlacement if placing.letter is not the last letter of the old or adjacent tile is not empty', async () => {
        stub(wordsFind['boardHelper'], 'tileBefore').callsFake(() => LETTER);
        stub(FAKE_ARC_WAY().oldNode, 'isEnd').callsFake(() => true);
        const tryPlacementStub = stub(wordsFind['wordsFindValidators'], 'tryPlacement').callsFake(doNothing);

        wordsFind['validate'](FAKE_POSITION, FAKE_PLACING_CONTEXT(), FAKE_ARC_WAY());
        assert.notCalled(tryPlacementStub);
    });

    it('validate should call lastLetterAdded and tryPlacement if index is equal or lower than 0', () => {
        const arkWay = FAKE_ARC_WAY();

        stub(wordsFind['boardHelper'], 'tileBefore').returns(NO_LETTER);
        stub(arkWay.oldNode, 'isEnd').returns(true);
        const lastLetterAddedStub = stub(wordsFind, 'lastLetterAdded' as any).returns(FAKE_POSITION + INCREMENT_POS);
        const tryPlacementStub = stub(wordsFind['wordsFindValidators'], 'tryPlacement');

        wordsFind['validate'](FAKE_POSITION, FAKE_MUTABLE_PLACING_CONTEXT(), arkWay);
        assert.called(lastLetterAddedStub);
        assert.called(tryPlacementStub);
    });

    it('validate should not call lastLetterAdded if index is greater than 0', () => {
        const arkWay = FAKE_ARC_WAY();

        stub(wordsFind['boardHelper'], 'tileAfter').returns(NO_LETTER);
        stub(arkWay.oldNode, 'isEnd').returns(true);
        const lastLetterAddedStub = stub(wordsFind, 'lastLetterAdded' as any).returns(FAKE_POSITION);
        const tryPlacementStub = stub(wordsFind['wordsFindValidators'], 'tryPlacement');

        wordsFind['validate'](FAKE_POSITION + INCREMENT_POS, FAKE_MUTABLE_PLACING_CONTEXT(), arkWay);
        assert.notCalled(lastLetterAddedStub);
        assert.called(tryPlacementStub);
    });

    it('lastLetterAdded should increment the index passed as long as there is a letter on tile at next position', () => {
        stub(wordsFind['boardHelper'], 'currentPosition').callsFake(doNothing);
        const letterAtStub = stub(wordsFind['board'], 'letterAt');

        letterAtStub.onFirstCall().callsFake(() => LETTER);
        letterAtStub.onSecondCall().callsFake(() => NO_LETTER);
        const expectedNewPosition = 1;

        expect(wordsFind['lastLetterAdded'](FAKE_POSITION)).to.eql(expectedNewPosition);
        assert.calledTwice(letterAtStub);
    });
});
