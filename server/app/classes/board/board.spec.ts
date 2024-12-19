import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Board } from '@app/classes/board/board';
import { Letter } from '@app/classes/letters/letter/letter';
import { Tile } from '@app/classes/tiles/tile';
import { defaultBoard } from '@app/constants/default/default-board';
import {
    defaultLetterTimes2Tile as lx2,
    defaultStandardTile as std,
    defaultWordTimes2Tile as wx2,
    defaultWordTimes3Tile as wx3,
} from '@app/constants/default/default-tile';
import { MIDDLE_POSITION } from '@app/constants/game';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { SCENARIO_3_TILES } from '@app/test/constants/boardScenarios/board-scenario-3';
import { doNothing } from '@app/test/do-nothing-function';
import { BOARD_SIZE } from '@common/constants/board';
import { scenarioBoard } from '@common/constants/board-scenario';
import { ActionType } from '@common/enums/action-type';
import { Orientation } from '@common/enums/orientation';
import { assert as chaiAssert, expect } from 'chai';
import { describe } from 'mocha';
import { assert, restore, spy, stub } from 'sinon';

describe('Board', () => {
    let emptyTilesStud: Tile[][];
    const aLetter: Letter = { letter: 'a', point: 3 };
    const lLetter: Letter = { letter: 'l', point: 2 };
    const oLetter: Letter = { letter: 'o', point: 4 };
    const testWord: Letter[] = [aLetter, lLetter, lLetter, oLetter];
    const oldLettersPlaced = 3;
    let beginPos: Vector2D;
    let board: Board;
    let action: PlaceLetters;

    beforeEach(() => {
        beginPos = { x: 3, y: 6 };
        emptyTilesStud = defaultBoard;
        board = new Board();
        action = {
            actionType: ActionType.PlaceLetters,
            letters: testWord,
            beginPosition: beginPos,
            orientation: Orientation.Vertical,
        };
    });

    afterEach(() => restore());

    it('should create a simple Board', () => {
        expect(board.tiles).to.eql(defaultBoard);
    });

    it('should create a Board from tiles[][]', () => {
        const board1 = new Board(emptyTilesStud);

        expect(board1.tiles).to.eql(emptyTilesStud);
    });

    it('should create empty tiles', () => {
        expect(board.fillEmptyTiles().length).to.eql(defaultBoard.length);
        expect(board.fillEmptyTiles()[0].length).to.eql(defaultBoard[0].length);
    });

    it('should clone tile in board', () => {
        expect(board.fillTiles(board.fillEmptyTiles(), defaultBoard)).to.eql(defaultBoard);
    });

    it('should call placeLetter on the right tiles - horizontal', () => {
        const begin: Vector2D = { x: 7, y: 7 };
        const fakePosition = [
            { x: 7, y: 7 },
            { x: 8, y: 7 },
            { x: 9, y: 7 },
            { x: 10, y: 7 },
        ];
        const stubGenerate = stub(board, 'generatedPositionForPlacement').callsFake(() => {
            return fakePosition;
        });
        const aStub = stub(board.tiles[7][7], 'placeLetter').callsFake(doNothing);
        const l1Stub = stub(board.tiles[8][7], 'placeLetter').callsFake(doNothing);
        const l2Stub = stub(board.tiles[9][7], 'placeLetter').callsFake(doNothing);
        const oStub = stub(board.tiles[10][7], 'placeLetter').callsFake(doNothing);

        action.beginPosition = begin;
        action.orientation = Orientation.Horizontal;
        board.placeLetters(action);

        assert.called(stubGenerate);
        assert.called(aStub);
        assert.calledOnce(aStub);
        assert.called(l1Stub);
        assert.calledOnce(l1Stub);
        assert.called(l2Stub);
        assert.calledOnce(l2Stub);
        assert.called(oStub);
        assert.calledOnce(oStub);
    });

    it('should call placeLetter on the right tiles - vertical', () => {
        const begin: Vector2D = { x: 2, y: 3 };
        const fakePosition = [
            { x: 2, y: 3 },
            { x: 2, y: 4 },
            { x: 2, y: 5 },
            { x: 2, y: 6 },
        ];
        const stubGenerate = stub(board, 'generatedPositionForPlacement').callsFake(() => {
            return fakePosition;
        });
        const aStub = stub(board.tiles[2][3], 'placeLetter').callsFake(doNothing);
        const l1Stub = stub(board.tiles[2][4], 'placeLetter').callsFake(doNothing);
        const l2Stub = stub(board.tiles[2][5], 'placeLetter').callsFake(doNothing);
        const oStub = stub(board.tiles[2][6], 'placeLetter').callsFake(doNothing);

        action.beginPosition = begin;
        board.placeLetters(action);

        assert.called(stubGenerate);
        assert.called(aStub);
        assert.calledOnce(aStub);
        assert.called(l1Stub);
        assert.calledOnce(l1Stub);
        assert.called(l2Stub);
        assert.calledOnce(l2Stub);
        assert.called(oStub);
        assert.calledOnce(oStub);
    });

    it('generatedPositionForAWordPlacement should call assignPosition and changePosition', () => {
        const spyAssign = spy(board, 'assignPosition');
        const spyChange = spy(board, 'changePosition');

        board.generatedPositionForPlacement(action);

        assert.called(spyAssign);
        assert.called(spyChange);
    });

    it('should generate the right position - horizontal', () => {
        const expected = [
            { x: 3, y: 6 },
            { x: 4, y: 6 },
            { x: 5, y: 6 },
            { x: 6, y: 6 },
        ];

        action.orientation = Orientation.Horizontal;
        const result = board.generatedPositionForPlacement(action);

        expect(result).to.eql(expected);
    });

    it('should generate the right position - vertical', () => {
        const expected = [
            { x: 3, y: 6 },
            { x: 3, y: 7 },
            { x: 3, y: 8 },
            { x: 3, y: 9 },
        ];
        const result = board.generatedPositionForPlacement(action);

        expect(result).to.eql(expected);
    });

    it('generatedPositionForAWordPlacement should handle when there is already a letter', () => {
        board.tiles[1][1].letter = { letter: 'l', point: 1 };
        const aloWord: Letter[] = [aLetter, lLetter, oLetter];
        const actionTest: PlaceLetters = {
            actionType: ActionType.PlaceLetters,
            letters: aloWord,
            beginPosition: { x: 0, y: 1 },
            orientation: Orientation.Horizontal,
        };
        const expected: Vector2D[] = [
            { x: 0, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
        ];
        const result = board.generatedPositionForPlacement(actionTest);

        expect(result).to.eql(expected);
    });

    it('should throw if position is not in bounds', () => {
        const position: Vector2D = { x: 15, y: 0 };
        const generatedPlacedPosition: Vector2D[] = [];

        chaiAssert.throws(() => board.assignPosition(oldLettersPlaced, position, generatedPlacedPosition), Error);
    });

    it('should assign position if generatedPlacedPosition is empty', () => {
        const generatedPlacedPosition: Vector2D[] = [];
        const newLettersPlaced = board.assignPosition(oldLettersPlaced, beginPos, generatedPlacedPosition);

        expect(newLettersPlaced).to.eql(oldLettersPlaced + 1);
        expect(generatedPlacedPosition).to.eql([beginPos]);
    });

    it('should assign position if generatedPlacedPosition  is not empty', () => {
        const otherVector = { x: 8, y: 2 };
        const generatedPlacedPosition: Vector2D[] = [otherVector];
        const newLettersPlaced = board.assignPosition(oldLettersPlaced, beginPos, generatedPlacedPosition);

        expect(newLettersPlaced).to.eql(oldLettersPlaced + 1);
        expect(generatedPlacedPosition).to.eql([otherVector, beginPos]);
    });

    it('should not assign position if there is already a letter', () => {
        const otherVector = { x: 8, y: 2 };
        const generatedPlacedPosition: Vector2D[] = [otherVector];

        board.tiles[beginPos.x][beginPos.y].letter.letter = 'A';
        const newLettersPlaced = board.assignPosition(oldLettersPlaced, beginPos, generatedPlacedPosition);

        expect(newLettersPlaced).to.eql(oldLettersPlaced);
        expect(generatedPlacedPosition).to.eql([otherVector]);
    });

    it('should change position depending on Orientation', () => {
        let newPosition;

        newPosition = board.changePosition(beginPos, Orientation.Horizontal);
        expect(newPosition).to.eql({ x: 4, y: 6 });

        newPosition = board.changePosition(beginPos, Orientation.Vertical);
        expect(newPosition).to.eql({ x: 4, y: 7 });

        newPosition = board.changePosition(beginPos, Orientation.None);
        expect(newPosition).to.eql({ x: 4, y: 8 });
    });

    it('should give a column', () => {
        const expected: Tile[] = [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()];
        const columnNumber = 0;
        const tiles = board.getColumn(columnNumber);

        expect(tiles).to.be.eql(expected);
    });

    it('should throw when column is out of range', () => {
        const impossibleColumn = -1;

        chaiAssert.throws(() => board.getColumn(impossibleColumn), Error);
    });

    it('should give a row', () => {
        const rowNumber = 4;
        const expected = [std(), std(), std(), std(), wx2(), std(), std(), std(), std(), std(), wx2(), std(), std(), std(), std()];
        const tiles = board.getRow(rowNumber);

        expect(tiles).to.be.eql(expected);
    });

    it('should throw when row is out of range', () => {
        const impossibleRow = -1;

        chaiAssert.throws(() => board.getRow(impossibleRow), Error);
    });

    it('should clone the board', () => {
        const newBoard = board.clone();

        board.placeLetters(action);
        expect(newBoard).to.not.eql(board);
    });

    it('should return false if a position is out of bound', () => {
        const horizontalMax: Vector2D = { x: 15, y: 0 };
        const horizontalMin: Vector2D = { x: -1, y: 0 };
        const verticalMax: Vector2D = { x: 0, y: 15 };
        const verticalMin: Vector2D = { x: 0, y: -1 };

        expect(board.isInTiles(horizontalMax)).to.eql(false);
        expect(board.isInTiles(horizontalMin)).to.eql(false);
        expect(board.isInTiles(verticalMax)).to.eql(false);
        expect(board.isInTiles(verticalMin)).to.eql(false);
    });

    it('should return true if a position is in bounds', () => {
        const position1: Vector2D = { x: 2, y: 10 };
        const position2: Vector2D = { x: 14, y: 0 };

        expect(board.isInTiles(position1)).to.eql(true);
        expect(board.isInTiles(position2)).to.eql(true);
    });

    it('should convert a board to common Board - scenario 3', () => {
        const newBoard = new Board(SCENARIO_3_TILES());
        const commonBoard = newBoard.toCommonBoard;

        expect(commonBoard).to.be.eql(scenarioBoard);
    });

    it('generatedPositionForAWordPlacement should handle when there is already a letter', () => {
        board.tiles[1][1].letter = { letter: 'a', point: 3 };
        const beginPosition = { x: 1, y: 0 };
        const letters: Letter[] = [
            { letter: 'a', point: 3 },
            { letter: 'b', point: 3 },
        ];
        const placeLetters = new PlaceLetters(letters, beginPosition, Orientation.Vertical);
        const result = board.generatedPositionForPlacement(placeLetters);
        const expected: Vector2D[] = [
            { x: 1, y: 0 },
            { x: 1, y: 2 },
        ];

        expect(result).to.eql(expected);
    });

    it('letterAt should call isInTiles', () => {
        const isInTilesStub = stub(board, 'isInTiles').callsFake(() => {
            return true;
        });

        board.letterAt(MIDDLE_POSITION);
        assert.called(isInTilesStub);
    });

    it('letterAt should return a string value of the letter at position passed in parameter', () => {
        const position0 = { x: 0, y: 0 };
        const position1 = { x: MIDDLE_POSITION.x + 1, y: MIDDLE_POSITION.y };
        const firstLetter = { letter: 'l', point: 1 };
        const secondLetter = { letter: 'a', point: 1 };

        board.tiles[MIDDLE_POSITION.x][MIDDLE_POSITION.y].letter = firstLetter;
        board.tiles[position1.x][position1.y].letter = secondLetter;

        expect(board.letterAt(MIDDLE_POSITION)).to.eql(firstLetter.letter);
        expect(board.letterAt(position1)).to.eql(secondLetter.letter);
        expect(board.letterAt(position0)).to.eql('');
    });

    it('letterAt should return an empty string when position passed in parameter is out of board bounds', () => {
        const emptyString = '';
        const outOfBoardBoundsPosition1: Vector2D = { x: -1, y: 3 };
        const outOfBoardBoundsPosition2: Vector2D = { x: 4, y: BOARD_SIZE };
        const outOfBoardBoundsPosition3: Vector2D = { x: -10, y: 20 };

        expect(board.letterAt(outOfBoardBoundsPosition1)).to.eql(emptyString);
        expect(board.letterAt(outOfBoardBoundsPosition2)).to.eql(emptyString);
        expect(board.letterAt(outOfBoardBoundsPosition3)).to.eql(emptyString);
    });

    it('getTile should return tile', () => expect(board.getTile(MIDDLE_POSITION)).to.be.eql(board.tiles[MIDDLE_POSITION.x][MIDDLE_POSITION.y]));
});
