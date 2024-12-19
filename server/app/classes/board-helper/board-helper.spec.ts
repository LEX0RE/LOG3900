/* eslint-disable dot-notation -- Méthodes privées */
import { BoardHelper } from '@app/classes/board-helper/board-helper';
import { Board } from '@app/classes/board/board';
import { MIDDLE_POSITION } from '@app/constants/game';
import { Anchor, LetterOrientation } from '@app/interface/anchor';
import { Vector2D } from '@app/interface/vector-2d-interface';
import {
    EMPTY_STRING,
    FAKE_ANCHOR,
    FAKE_GADDAG,
    FAKE_POSITION,
    FIFTH_CALL,
    FIRST_LETTER,
    FOURTH_CALL,
    LETTER,
    LOWER_CASE_WORD,
    NO_LETTER,
    REVERSED_LOWER_CASE_WORD,
    SECOND_LETTER,
} from '@app/test/constants/fake-words-find-constants';
import { doNothing } from '@app/test/do-nothing-function';
import { ALPHABET } from '@common/constants/alphabet';
import { DOWN_OFFSET, LEFT_OFFSET, RIGHT_OFFSET, UP_OFFSET } from '@common/constants/board';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { describe } from 'mocha';
import { assert, restore, stub } from 'sinon';

describe('BoardHelper', () => {
    let boardHelper: BoardHelper;

    beforeEach(() => {
        boardHelper = new BoardHelper(new Board(), FAKE_GADDAG());
    });

    afterEach(() => restore());

    it('hasRoom should return false if evaluated tile is not in board or already has a letter on it', () => {
        const workBefore = true;
        const currentPositionStub = stub(boardHelper, 'currentPosition').callsFake(() => MIDDLE_POSITION);
        const isInTilesStub = stub(boardHelper.board, 'isInTiles');
        const letterAtStub = stub(boardHelper.board, 'letterAt');

        isInTilesStub.callsFake(() => false);
        letterAtStub.callsFake(() => '');

        expect(boardHelper.hasRoom(FAKE_POSITION, workBefore)).to.eql(false);
        assert.calledOnce(currentPositionStub);
        assert.calledOnce(isInTilesStub);
        assert.notCalled(letterAtStub);

        isInTilesStub.resetHistory();

        isInTilesStub.onCall(0).callsFake(() => true);
        isInTilesStub.onCall(1).callsFake(() => false);
        letterAtStub.callsFake(() => LETTER);
        expect(boardHelper.hasRoom(FAKE_POSITION, workBefore)).to.eql(false);
        assert.calledTwice(isInTilesStub);
        assert.calledOnce(letterAtStub);

        isInTilesStub.resetHistory();
        isInTilesStub.onCall(2).callsFake(() => false);
        letterAtStub.callsFake(() => '');
        expect(boardHelper.hasRoom(FAKE_POSITION, workBefore)).to.eql(false);
    });

    it('hasRoom should return true if evaluated tile is in board and does not have a letter on it', () => {
        const workBefore = false;
        const currentPositionStub = stub(boardHelper, 'currentPosition').callsFake(() => MIDDLE_POSITION);
        const isInTilesStub = stub(boardHelper.board, 'isInTiles');

        isInTilesStub.onCall(0).callsFake(() => true);
        isInTilesStub.onCall(1).callsFake(() => true);
        const letterAtStub = stub(boardHelper.board, 'letterAt').callsFake(() => '');

        expect(boardHelper.hasRoom(FAKE_POSITION, workBefore)).to.eql(true);
        assert.called(currentPositionStub);
        assert.calledTwice(isInTilesStub);
        assert.called(letterAtStub);
    });

    it('currentPosition should increment x component of position if workHorizontal is true and increment y component otherwise', () => {
        boardHelper.workHorizontal = true;
        boardHelper.current = MIDDLE_POSITION;
        const increment1 = 2;
        const increment2 = 0;
        const increment3 = -1;

        expect(boardHelper.currentPosition(increment1)).to.eql({ x: MIDDLE_POSITION.x + increment1, y: MIDDLE_POSITION.y });
        expect(boardHelper.currentPosition(increment2)).to.eql({ x: MIDDLE_POSITION.x + increment2, y: MIDDLE_POSITION.y });
        expect(boardHelper.currentPosition(increment3)).to.eql({ x: MIDDLE_POSITION.x + increment3, y: MIDDLE_POSITION.y });
        boardHelper.workHorizontal = false;
        expect(boardHelper.currentPosition(increment1)).to.eql({ x: MIDDLE_POSITION.x, y: MIDDLE_POSITION.y + increment1 });
        expect(boardHelper.currentPosition(increment2)).to.eql({ x: MIDDLE_POSITION.x, y: MIDDLE_POSITION.y + increment2 });
        expect(boardHelper.currentPosition(increment3)).to.eql({ x: MIDDLE_POSITION.x, y: MIDDLE_POSITION.y + increment3 });
    });

    it('getPositionPossibilities should return all possibilities if no anchor matches coordinate', () => {
        boardHelper.workHorizontal = true;
        boardHelper.anchors = [];
        const expectedResultLength = 26;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Méthode privée
        stub(boardHelper, 'currentPosition' as any).callsFake(() => MIDDLE_POSITION);
        const result = boardHelper.getPositionPossibility(FAKE_POSITION);

        expect(result.length).to.eql(expectedResultLength);
        expect(result).to.eql(ALPHABET);
    });

    it('getPositionPossibilities should return all letter of found anchor if it includes orientation', () => {
        boardHelper.workHorizontal = true;
        const anchorPosition: Vector2D = { x: 0, y: 0 };
        const fakePossibilities: LetterOrientation[] = [
            { letter: 'a', directions: [Orientation.Horizontal] },
            { letter: 'b', directions: [Orientation.Vertical] },
            { letter: 'c', directions: [Orientation.Horizontal, Orientation.Vertical] },
            { letter: 'd', directions: [Orientation.Horizontal] },
        ];
        const anchor: Anchor = { position: anchorPosition, possibilities: fakePossibilities };
        let expectedResult = ['a', 'c', 'd'];

        boardHelper.anchors = [FAKE_ANCHOR, FAKE_ANCHOR, anchor];
        stub(boardHelper, 'currentPosition').callsFake(() => anchorPosition);
        expect(boardHelper.getPositionPossibility(FAKE_POSITION)).to.eql(expectedResult);

        boardHelper.workHorizontal = false;
        expectedResult = ['b', 'c'];
        expect(boardHelper.getPositionPossibility(FAKE_POSITION)).to.eql(expectedResult);
    });

    it('adjacentWord should return an empty string if adjacentTile returns an empty string on first call', () => {
        const adjacentTileStub = stub(boardHelper, 'adjacentTile').callsFake(() => EMPTY_STRING);

        expect(boardHelper.adjacentWord(MIDDLE_POSITION, LEFT_OFFSET)).to.eql(EMPTY_STRING);
        assert.calledOnceWithExactly(adjacentTileStub, MIDDLE_POSITION, LEFT_OFFSET);
    });

    it('adjacentWord should return the adjacent word before specified position if the offset is left or up', () => {
        boardHelper.workHorizontal = true;
        const expectedCalls = 5;
        const adjacentTileStub = stub(boardHelper, 'adjacentTile');

        adjacentTileStub.onFirstCall().callsFake(() => FIRST_LETTER);
        adjacentTileStub.onSecondCall().callsFake(() => FIRST_LETTER);
        adjacentTileStub.onThirdCall().callsFake(() => SECOND_LETTER);
        adjacentTileStub.onCall(FOURTH_CALL).callsFake(() => SECOND_LETTER);
        adjacentTileStub.onCall(FIFTH_CALL).callsFake(() => NO_LETTER);

        expect(boardHelper.adjacentWord(MIDDLE_POSITION, LEFT_OFFSET)).to.eql(LOWER_CASE_WORD);
        assert.callCount(adjacentTileStub, expectedCalls);
    });

    it('adjacentWord should return the adjacent word after specified position if the offset is not left or up', () => {
        boardHelper.workHorizontal = false;
        const expectedCalls = 5;
        const adjacentTileStub = stub(boardHelper, 'adjacentTile');

        adjacentTileStub.onFirstCall().callsFake(() => FIRST_LETTER);
        adjacentTileStub.onSecondCall().callsFake(() => FIRST_LETTER);
        adjacentTileStub.onThirdCall().callsFake(() => SECOND_LETTER);
        adjacentTileStub.onCall(FOURTH_CALL).callsFake(() => SECOND_LETTER);
        adjacentTileStub.onCall(FIFTH_CALL).callsFake(() => NO_LETTER);

        expect(boardHelper.adjacentWord(MIDDLE_POSITION, RIGHT_OFFSET)).to.eql(REVERSED_LOWER_CASE_WORD);
        assert.callCount(adjacentTileStub, expectedCalls);
    });

    it('wordBefore should call adjacentWord with LEFT_OFFSET if workHorizontal is true and with UP_OFFSET otherwise', () => {
        boardHelper.workHorizontal = true;
        const adjacentWordStub = stub(boardHelper, 'adjacentWord').callsFake(doNothing);

        boardHelper.wordBefore(MIDDLE_POSITION);
        assert.calledWith(adjacentWordStub, MIDDLE_POSITION, LEFT_OFFSET);

        boardHelper.workHorizontal = false;
        boardHelper.wordBefore(MIDDLE_POSITION);
        assert.calledWith(adjacentWordStub, MIDDLE_POSITION, UP_OFFSET);
    });

    it('wordAfter should call adjacentWord with RIGHT_OFFSET if workHorizontal is true and with DOWN_OFFSET otherwise', () => {
        boardHelper.workHorizontal = true;
        const adjacentWordStub = stub(boardHelper, 'adjacentWord').callsFake(doNothing);

        boardHelper.wordAfter(MIDDLE_POSITION);
        assert.calledWith(adjacentWordStub, MIDDLE_POSITION, RIGHT_OFFSET);

        boardHelper.workHorizontal = false;
        boardHelper.wordAfter(MIDDLE_POSITION);
        assert.calledWith(adjacentWordStub, MIDDLE_POSITION, DOWN_OFFSET);
    });

    it('adjacentTile should return an empty string if specified position plus the offset is not in board', () => {
        const boundPosition: Vector2D = { x: 0, y: 0 };
        const expectedNewPosition: Vector2D = { x: boundPosition.x + LEFT_OFFSET.x, y: boundPosition.y + LEFT_OFFSET.y };
        const isInTilesStub = stub(boardHelper.board, 'isInTiles').callsFake(() => false);
        const letterAtStub = stub(boardHelper.board, 'letterAt').callsFake(doNothing);

        expect(boardHelper.adjacentTile(boundPosition, LEFT_OFFSET)).to.eql(EMPTY_STRING);
        assert.calledOnceWithExactly(isInTilesStub, expectedNewPosition);
        assert.notCalled(letterAtStub);
    });

    it('adjacentTile should return the letter on tile of the board if position is inside board bounds', () => {
        const expectedNewPosition: Vector2D = { x: MIDDLE_POSITION.x + LEFT_OFFSET.x, y: MIDDLE_POSITION.y + LEFT_OFFSET.y };
        const isInTilesStub = stub(boardHelper.board, 'isInTiles').callsFake(() => true);
        const letterAtStub = stub(boardHelper.board, 'letterAt').callsFake(() => LETTER);

        expect(boardHelper.adjacentTile(MIDDLE_POSITION, LEFT_OFFSET)).to.eql(LETTER);
        assert.calledOnceWithExactly(isInTilesStub, expectedNewPosition);
        assert.calledOnceWithExactly(letterAtStub, expectedNewPosition);
    });

    it('tileBefore should call adjacentTile with LEFT_OFFSET if workHorizontal is true and with UP_OFFSET otherwise', () => {
        boardHelper.workHorizontal = true;
        stub(boardHelper, 'currentPosition').callsFake(() => MIDDLE_POSITION);
        const adjacentTileStub = stub(boardHelper, 'adjacentTile').callsFake(doNothing);

        boardHelper.tileBefore(FAKE_POSITION);
        assert.calledWith(adjacentTileStub, MIDDLE_POSITION, LEFT_OFFSET);

        boardHelper.workHorizontal = false;
        boardHelper.tileBefore(FAKE_POSITION);
        assert.calledWith(adjacentTileStub, MIDDLE_POSITION, UP_OFFSET);
    });

    it('tileAfter should call adjacentTile with RIGHT_OFFSET if workHorizontal is true and with UP_OFFSET otherwise', () => {
        boardHelper.workHorizontal = true;
        stub(boardHelper, 'currentPosition').callsFake(() => MIDDLE_POSITION);
        const adjacentTileStub = stub(boardHelper, 'adjacentTile').callsFake(doNothing);

        boardHelper.tileAfter(FAKE_POSITION);
        assert.calledWith(adjacentTileStub, MIDDLE_POSITION, RIGHT_OFFSET);

        boardHelper.workHorizontal = false;
        boardHelper.tileAfter(FAKE_POSITION);
        assert.calledWith(adjacentTileStub, MIDDLE_POSITION, DOWN_OFFSET);
    });
});
