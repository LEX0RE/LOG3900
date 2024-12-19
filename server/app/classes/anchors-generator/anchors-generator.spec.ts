/* eslint-disable @typescript-eslint/no-explicit-any, dot-notation -- Méthodes privées et mock des méthodes */
import { AnchorGenerator } from '@app/classes/anchors-generator/anchors-generator';
import { BoardHelper } from '@app/classes/board-helper/board-helper';
import { Board } from '@app/classes/board/board';
import { GaddagNode } from '@app/classes/gaddag/gaddag-node/gaddag-node';
import { ALL_POSSIBILITIES } from '@app/constants/board-helper';
import { MIDDLE_POSITION } from '@app/constants/game';
import { Anchor, LetterOrientation } from '@app/interface/anchor';
import {
    EMPTY_STRING,
    FAKE_ANCHOR,
    FAKE_A_LETTER_ORIENTATION,
    FAKE_BOARD_HELPER,
    FAKE_B_LETTER_ORIENTATION,
    FAKE_C_LETTER_ORIENTATION,
    FAKE_D_LETTER_ORIENTATION,
    FAKE_E_LETTER_ORIENTATION,
    FAKE_GADDAG,
    FAKE_GADDAG_NODE,
    FAKE_WORD,
    FOURTH_CALL,
    LETTER,
    NO_LETTER,
    WORDS_FIND_BOARD_SCENARIO,
} from '@app/test/constants/fake-words-find-constants';
import { doNothing } from '@app/test/do-nothing-function';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { DOWN_OFFSET, LEFT_OFFSET, RIGHT_OFFSET, UP_OFFSET } from '@common/constants/board';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { describe } from 'mocha';
import { assert, createStubInstance, restore, stub } from 'sinon';

describe('AnchorGenerator', () => {
    let anchorGenerator: AnchorGenerator;
    let serviceStubs: ServiceStubHelper;

    beforeEach(() => {
        serviceStubs = new ServiceStubHelper();
        serviceStubs.clientSocket.connect();
        anchorGenerator = new AnchorGenerator(new BoardHelper(new Board(), FAKE_GADDAG()), FAKE_GADDAG());
    });

    afterEach(() => restore());

    it('generate should find center of board as the only anchor if board is empty', () => {
        anchorGenerator['boardHelper'] = FAKE_BOARD_HELPER;
        stub(anchorGenerator, 'isAnchor' as any).callsFake(() => false);
        stub(anchorGenerator, 'generatePossibilities' as any).callsFake(() => [FAKE_ANCHOR]);

        expect(anchorGenerator['generate']()).to.eql([FAKE_ANCHOR]);
    });

    it('generate should find all anchors', () => {
        anchorGenerator['boardHelper'].board = WORDS_FIND_BOARD_SCENARIO;
        const expectedAnchors = [FAKE_ANCHOR, FAKE_ANCHOR];
        const isAnchorStub = stub(anchorGenerator, 'isAnchor' as any).callsFake(() => false);

        isAnchorStub.onFirstCall().callsFake(() => true);
        isAnchorStub.onSecondCall().callsFake(() => true);
        stub(anchorGenerator, 'generatePossibilities' as any).callsFake(() => [FAKE_ANCHOR]);
        expect(anchorGenerator['generate']()).to.eql(expectedAnchors);
    });

    it('generatePossibilities should call generateBetweenTwo with passed position and ALL_POSSIBILITIES if adjacentTile always returns empty string', () => {
        stub(anchorGenerator['boardHelper'], 'adjacentTile').callsFake(() => EMPTY_STRING);
        const generateBetweenTwoStub = stub(anchorGenerator, 'generateBetweenTwo' as any).callsFake(() => [FAKE_ANCHOR]);

        anchorGenerator['generatePossibilities'](MIDDLE_POSITION);
        assert.calledWith(generateBetweenTwoStub, MIDDLE_POSITION, ALL_POSSIBILITIES);
    });

    it('generatePossibilities should call generateBetweenTwo with passed position and value returned by reduce', () => {
        const generateBetweenTwoStub = stub(anchorGenerator, 'generateBetweenTwo' as any).callsFake(() => [FAKE_ANCHOR]);

        stub(anchorGenerator['boardHelper'], 'adjacentTile').callsFake(() => LETTER);
        stub(anchorGenerator['boardHelper'], 'adjacentWord').callsFake(() => EMPTY_STRING);
        stub(anchorGenerator, 'findPossibilities' as any).callsFake(() => []);
        stub(anchorGenerator, 'reducePossibilities' as any).callsFake(() => [FAKE_A_LETTER_ORIENTATION]);
        anchorGenerator['generatePossibilities'](MIDDLE_POSITION);
        assert.calledWith(generateBetweenTwoStub, MIDDLE_POSITION, [FAKE_A_LETTER_ORIENTATION]);
    });

    it('generateBetweenTwo should return anchor form with passed parameters if position is not between two words', () => {
        stub(anchorGenerator['boardHelper'], 'adjacentWord').callsFake(() => EMPTY_STRING);
        const reduceStub = stub(anchorGenerator, 'reducePossibilities' as any).callsFake(doNothing);
        const expectedResult: Anchor[] = [{ position: MIDDLE_POSITION, possibilities: [FAKE_A_LETTER_ORIENTATION] }];

        expect(anchorGenerator['generateBetweenTwo'](MIDDLE_POSITION, [FAKE_A_LETTER_ORIENTATION])).to.eql(expectedResult);
        assert.notCalled(reduceStub);
    });

    it('generateBetweenTwo should call possibilities with right and left word and horizontal orientation if position is in between two horizontal words', () => {
        const adjacentWordStub = stub(anchorGenerator['boardHelper'], 'adjacentWord').callsFake(() => EMPTY_STRING);
        const possibilitiesStub = stub(anchorGenerator, 'findPossibilities' as any);
        const reduceStub = stub(anchorGenerator, 'reducePossibilities' as any);

        adjacentWordStub.withArgs(MIDDLE_POSITION, LEFT_OFFSET).callsFake(() => FAKE_WORD);
        adjacentWordStub.withArgs(MIDDLE_POSITION, RIGHT_OFFSET).callsFake(() => FAKE_WORD);
        possibilitiesStub.withArgs(FAKE_WORD, FAKE_WORD, Orientation.Horizontal).callsFake(() => [FAKE_A_LETTER_ORIENTATION]);
        possibilitiesStub.withArgs(EMPTY_STRING, EMPTY_STRING, Orientation.Vertical).callsFake(() => []);
        reduceStub.withArgs([FAKE_A_LETTER_ORIENTATION], [FAKE_A_LETTER_ORIENTATION]).callsFake(() => [FAKE_A_LETTER_ORIENTATION]);
        reduceStub.withArgs([FAKE_A_LETTER_ORIENTATION], []).callsFake(() => []);
        const expectedResult: Anchor[] = [{ position: MIDDLE_POSITION, possibilities: [FAKE_A_LETTER_ORIENTATION] }];

        expect(anchorGenerator['generateBetweenTwo'](MIDDLE_POSITION, [FAKE_A_LETTER_ORIENTATION])).to.eql(expectedResult);
        assert.calledWith(possibilitiesStub, FAKE_WORD, FAKE_WORD, Orientation.Horizontal);
        assert.calledWith(reduceStub, [FAKE_A_LETTER_ORIENTATION], [FAKE_A_LETTER_ORIENTATION]);
    });

    it('generateBetweenTwo should call possibilities with down and up word and vertical orientation if position is in between two vertical words', () => {
        const adjacentWordStub = stub(anchorGenerator['boardHelper'], 'adjacentWord').callsFake(() => EMPTY_STRING);
        const possibilitiesStub = stub(anchorGenerator, 'findPossibilities' as any);
        const reduceStub = stub(anchorGenerator, 'reducePossibilities' as any);

        adjacentWordStub.withArgs(MIDDLE_POSITION, UP_OFFSET).callsFake(() => FAKE_WORD);
        adjacentWordStub.withArgs(MIDDLE_POSITION, DOWN_OFFSET).callsFake(() => FAKE_WORD);
        possibilitiesStub.withArgs(EMPTY_STRING, EMPTY_STRING, Orientation.Horizontal).callsFake(() => []);
        possibilitiesStub.withArgs(FAKE_WORD, FAKE_WORD, Orientation.Vertical).callsFake(() => [FAKE_A_LETTER_ORIENTATION]);
        reduceStub.withArgs([FAKE_A_LETTER_ORIENTATION], [FAKE_A_LETTER_ORIENTATION]).callsFake(() => [FAKE_A_LETTER_ORIENTATION]);
        reduceStub.withArgs([FAKE_A_LETTER_ORIENTATION], []).callsFake(() => []);
        const expectedResult: Anchor[] = [{ position: MIDDLE_POSITION, possibilities: [FAKE_A_LETTER_ORIENTATION] }];

        expect(anchorGenerator['generateBetweenTwo'](MIDDLE_POSITION, [FAKE_A_LETTER_ORIENTATION])).to.eql(expectedResult);
        assert.calledWith(possibilitiesStub, FAKE_WORD, FAKE_WORD, Orientation.Vertical);
        assert.calledWith(reduceStub, [FAKE_A_LETTER_ORIENTATION], [FAKE_A_LETTER_ORIENTATION]);
    });

    it('isAnchor should return false if tile is not empty or if none of its adjencent tiles has a letter on it', () => {
        const letterAtStub = stub(anchorGenerator['boardHelper'].board, 'letterAt');

        letterAtStub.callsFake(() => LETTER);

        expect(anchorGenerator['isAnchor'](MIDDLE_POSITION)).to.eq(false);
        assert.called(letterAtStub);

        letterAtStub.callsFake(() => NO_LETTER);
        const expectedCalls = 4;
        const adjacentTileStub = stub(anchorGenerator['boardHelper'], 'adjacentTile');

        adjacentTileStub.onFirstCall().callsFake(() => NO_LETTER);
        adjacentTileStub.onSecondCall().callsFake(() => NO_LETTER);
        adjacentTileStub.onThirdCall().callsFake(() => NO_LETTER);
        adjacentTileStub.onCall(FOURTH_CALL).callsFake(() => NO_LETTER);

        expect(anchorGenerator['isAnchor'](MIDDLE_POSITION)).to.eq(false);
        assert.callCount(adjacentTileStub, expectedCalls);
        assert.calledWith(adjacentTileStub, MIDDLE_POSITION, LEFT_OFFSET);
        assert.calledWith(adjacentTileStub, MIDDLE_POSITION, RIGHT_OFFSET);
        assert.calledWith(adjacentTileStub, MIDDLE_POSITION, UP_OFFSET);
        assert.calledWith(adjacentTileStub, MIDDLE_POSITION, DOWN_OFFSET);
    });

    it('isAnchor should return true if tile is empty and if one of its adjencent tiles has a letter on it', () => {
        let expectedCalls = 4;

        stub(anchorGenerator['boardHelper'].board, 'letterAt').callsFake(() => NO_LETTER);
        const adjacentTileStub = stub(anchorGenerator['boardHelper'], 'adjacentTile');

        adjacentTileStub.onFirstCall().callsFake(() => NO_LETTER);
        adjacentTileStub.onSecondCall().callsFake(() => NO_LETTER);
        adjacentTileStub.onThirdCall().callsFake(() => NO_LETTER);
        adjacentTileStub.onCall(FOURTH_CALL).callsFake(() => LETTER);
        expect(anchorGenerator['isAnchor'](MIDDLE_POSITION)).to.eq(true);
        assert.callCount(adjacentTileStub, expectedCalls);

        adjacentTileStub.resetHistory();
        adjacentTileStub.onThirdCall().callsFake(() => LETTER);
        expectedCalls = 3;
        expect(anchorGenerator['isAnchor'](MIDDLE_POSITION)).to.eq(true);
        assert.callCount(adjacentTileStub, expectedCalls);

        adjacentTileStub.resetHistory();
        adjacentTileStub.onSecondCall().callsFake(() => LETTER);
        expectedCalls = 2;
        expect(anchorGenerator['isAnchor'](MIDDLE_POSITION)).to.eq(true);
        assert.callCount(adjacentTileStub, expectedCalls);

        adjacentTileStub.resetHistory();
        adjacentTileStub.onFirstCall().callsFake(() => LETTER);
        expectedCalls = 1;
        expect(anchorGenerator['isAnchor'](MIDDLE_POSITION)).to.eq(true);
        assert.callCount(adjacentTileStub, expectedCalls);
    });

    it('reduce should return LetterOrientation from initial that are also in add', () => {
        const initial = [FAKE_A_LETTER_ORIENTATION, FAKE_B_LETTER_ORIENTATION, FAKE_C_LETTER_ORIENTATION, FAKE_D_LETTER_ORIENTATION];
        const add = [
            FAKE_B_LETTER_ORIENTATION,
            { letter: 'c', directions: [Orientation.Horizontal, Orientation.Vertical] },
            FAKE_E_LETTER_ORIENTATION,
        ];
        const expectedResult = [FAKE_B_LETTER_ORIENTATION, FAKE_C_LETTER_ORIENTATION];
        const reduceOrientationStub = stub(anchorGenerator, 'reduceOrientation' as any).callsFake(() => [FAKE_A_LETTER_ORIENTATION]);

        reduceOrientationStub.onFirstCall().callsFake(() => [FAKE_B_LETTER_ORIENTATION]);
        reduceOrientationStub.onSecondCall().callsFake(() => [FAKE_C_LETTER_ORIENTATION]);
        expect(anchorGenerator['reducePossibilities'](initial, add)).to.eql(expectedResult);
    });

    it('reduceOrientation should return LetterOrientation with initial directions they are in add directives', () => {
        let expectedResult: LetterOrientation[] = [{ letter: FAKE_A_LETTER_ORIENTATION.letter, directions: [Orientation.Vertical] }];

        expect(anchorGenerator['reduceOrientation'](FAKE_A_LETTER_ORIENTATION, FAKE_C_LETTER_ORIENTATION)).to.eql(expectedResult);

        expectedResult = [];
        expect(anchorGenerator['reduceOrientation'](FAKE_B_LETTER_ORIENTATION, FAKE_C_LETTER_ORIENTATION)).to.eql(expectedResult);
    });

    it('findPossibilities should return all letters that have at least one possible orientation', () => {
        const possibilitiesOrientationStub = stub(anchorGenerator, 'findPossibilitiesOrientation' as any).callsFake(() => []);

        possibilitiesOrientationStub.onFirstCall().callsFake(() => [Orientation.Horizontal]);
        possibilitiesOrientationStub.onSecondCall().callsFake(() => [Orientation.Vertical]);
        const expectedResult: LetterOrientation[] = [
            { letter: 'a', directions: [Orientation.Horizontal] },
            { letter: 'b', directions: [Orientation.Vertical] },
        ];

        expect(anchorGenerator['findPossibilities'](LETTER, LETTER, Orientation.Horizontal)).to.eql(expectedResult);
    });

    it('findPossibilitiesOrientation should return an empty array if gaddag does not contain the word', () => {
        const root = createStubInstance(GaddagNode);

        Object.defineProperty(anchorGenerator['gaddag'], 'root', { value: root, configurable: true });
        root.isContaining.returns(false);
        expect(anchorGenerator['findPossibilitiesOrientation'](FAKE_WORD, Orientation.Vertical)).to.eql([]);
    });

    it('findPossibilitiesOrientation should return an empty array if no orientation is valid for word', () => {
        const root = createStubInstance(GaddagNode);

        Object.defineProperty(anchorGenerator['gaddag'], 'root', { value: root, configurable: true });
        root.isContaining.returns(true);
        root.getChild.returns(FAKE_GADDAG_NODE);
        const containStub = stub(FAKE_GADDAG_NODE, 'isContaining').callsFake(() => false);

        stub(FAKE_GADDAG_NODE, 'getPossibilities').callsFake(() => EMPTY_STRING);
        expect(anchorGenerator['findPossibilitiesOrientation'](FAKE_WORD, Orientation.Horizontal)).to.eql([]);
        containStub.returns(true);
        expect(anchorGenerator['findPossibilitiesOrientation'](FAKE_WORD, Orientation.Horizontal)).to.eql([]);
    });

    it('findPossibilitiesOrientation should return all valid orientation for word', () => {
        const root = createStubInstance(GaddagNode);
        const expectedResult = [Orientation.Vertical, Orientation.Horizontal];
        const child = createStubInstance(GaddagNode);

        Object.defineProperty(anchorGenerator['gaddag'], 'root', { value: root, configurable: true });
        root.isContaining.returns(true);
        root.getChild.returns(child as unknown as GaddagNode);
        root.isEnd.returns(true);
        child.getPossibilities.returns(FAKE_WORD);
        expect(anchorGenerator['findPossibilitiesOrientation'](FAKE_WORD, Orientation.Horizontal)).to.eql(expectedResult);

        child.getPossibilities.returns(EMPTY_STRING);
        child.getPossibilities.returns(FAKE_WORD);
        expect(anchorGenerator['findPossibilitiesOrientation'](FAKE_WORD, Orientation.Horizontal)).to.eql(expectedResult);
    });
});
