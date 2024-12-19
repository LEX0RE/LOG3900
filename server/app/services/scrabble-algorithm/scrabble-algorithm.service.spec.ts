import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Board } from '@app/classes/board/board';
import { Letter } from '@app/classes/letters/letter/letter';
import { Tile } from '@app/classes/tiles/tile';
import { defaultStandardTile as std } from '@app/constants/default/default-tile';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { ScrabbleAlgo } from '@app/services/scrabble-algorithm/scrabble-algorithm.service';
import {
    BEGIN_POSITION_1,
    EXPECTED_POSITION_1,
    NEW_WORDS_1,
    SCENARIO_ONE_TILES,
    WORD_PLACE_1,
} from '@app/test/constants/boardScenarios/board-scenario-1';
import {
    BEGIN_POSITION_2,
    EXPECTED_NEW_WORD_2,
    EXPECTED_POSITION_2,
    NEW_WORD_2,
    SCENARIO_2_TILES,
    WORD_PLACE_2,
} from '@app/test/constants/boardScenarios/board-scenario-2';
import {
    BEGIN_POSITION_3,
    EXPECTED_NEW_WORD_3,
    EXPECTED_POSITION_3,
    SCENARIO_3_TILES,
    WORD_PLACE_3,
} from '@app/test/constants/boardScenarios/board-scenario-3';
import {
    BEGIN_POSITION_4,
    EXPECTED_NEW_WORDS_4,
    EXPECTED_POSITION_4,
    SCENARIO_4_TILES,
    WORD_PLACE_4,
} from '@app/test/constants/boardScenarios/board-scenario-4';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { assert, restore, spy } from 'sinon';

describe('ScrabbleAlgo', () => {
    let algo: ScrabbleAlgo;
    const wordLength = 4;
    let row: Tile[];
    const wordsTiles: Tile[][] = [];
    const aLetter: Letter = { letter: 'a', point: 3 };
    const lLetter: Letter = { letter: 'l', point: 2 };
    const oLetter: Letter = { letter: 'o', point: 4 };
    let board: Board;

    beforeEach(() => {
        algo = new ScrabbleAlgo();
        row = [std(), std(), std(), std(), std(), std(), std(), std(), std(), std()];
        board = new Board();
        row[4].letter = aLetter;
        row[5].letter = lLetter;
        row[6].letter = lLetter;
        row[7].letter = oLetter;
        for (let i = 0; i < wordLength; i++) wordsTiles.push(row);
        row[0].letter = aLetter;
        row[2].letter = aLetter;
        row[4].isStared = true;
    });

    afterEach(() => restore());

    it('should returns words from tiles', () => {
        const expected = ['balle', 'ventre', 'vas'];
        const tilesAsWord: Tile[][] = [...NEW_WORDS_1(), ...NEW_WORD_2()];
        const result = algo.tilesToWords(tilesAsWord);

        expect(result).to.be.eql(expected);
    });

    it('should put star to the right tiles', () => {
        const positions: Vector2D[] = [
            { x: 3, y: 6 },
            { x: 4, y: 6 },
            { x: 5, y: 6 },
            { x: 6, y: 6 },
        ];

        algo.staringTile(board, true, positions);
        positions.forEach((pos: Vector2D) => expect(board.tiles[pos.x][pos.y].isStared).to.be.true);
    });

    it('should unStar the right tiles ', () => {
        // eslint-disable-next-line max-nested-callbacks -- depasse le nombre vu que c'est dans un describe
        board.tiles.forEach((tiles: Tile[]) => tiles.map((tile: Tile) => (tile.isStared = true)));
        const positions: Vector2D[] = [
            { x: 3, y: 6 },
            { x: 4, y: 6 },
            { x: 5, y: 6 },
            { x: 6, y: 6 },
        ];

        algo.staringTile(board, false, positions);
        positions.forEach((pos: Vector2D) => expect(board.tiles[pos.x][pos.y].isStared).to.be.false);
    });

    it('should call starring when unstart', () => {
        const starringSpy = spy(algo, 'staringTile');
        const positions: Vector2D[] = [
            { x: 3, y: 6 },
            { x: 4, y: 6 },
            { x: 5, y: 6 },
            { x: 6, y: 6 },
        ];

        algo.unStarTile(board, positions);
        assert.calledOnce(starringSpy);
        assert.calledWith(starringSpy, board, false, positions);
    });

    it('should call starring when start', () => {
        const starringSpy = spy(algo, 'staringTile');
        const positions: Vector2D[] = [
            { x: 3, y: 6 },
            { x: 4, y: 6 },
            { x: 5, y: 6 },
            { x: 6, y: 6 },
        ];

        algo.starTile(board, positions);
        assert.calledOnce(starringSpy);
        assert.calledWith(starringSpy, board, true, positions);
    });

    it('should clean up an array with dirty tiles', () => {
        const tiles: Tile[][] = [];

        for (let i = 0; i < wordLength; i++) tiles.push(row);
        const expected: Tile[][] = [];
        const expectedRow = [std(), std(), std(), std()];

        expectedRow[0].letter = aLetter;
        expectedRow[0].isStared = true;
        expectedRow[1].letter = lLetter;
        expectedRow[2].letter = lLetter;
        expectedRow[3].letter = oLetter;
        for (let i = 0; i < wordLength; i++) expected.push(expectedRow);

        algo.cleanUpTiles(tiles);
        expect(tiles).to.be.eql(expected);
    });

    it('should find tiles of newly formed words scenario 1', () => {
        const placeAction: PlaceLetters = new PlaceLetters(WORD_PLACE_1, BEGIN_POSITION_1, Orientation.None);
        const result = algo.findNewFormedTiles(new Board(SCENARIO_ONE_TILES()), EXPECTED_POSITION_1, placeAction);

        result.forEach((word: Tile[], index: number) => {
            expect(word).to.be.eql(NEW_WORDS_1()[index]);
        });
    });

    it('should find tiles of newly formed words scenario 2 with vertical', () => {
        const placeAction: PlaceLetters = new PlaceLetters(WORD_PLACE_2, BEGIN_POSITION_2, Orientation.Vertical);
        const result = algo.findNewFormedTiles(new Board(SCENARIO_2_TILES()), EXPECTED_POSITION_2, placeAction);

        expect(result).to.be.eql(EXPECTED_NEW_WORD_2());
    });

    it('should find tiles of newly formed words scenario 3', () => {
        const placeAction: PlaceLetters = new PlaceLetters(WORD_PLACE_3, BEGIN_POSITION_3, Orientation.Vertical);
        const result = algo.findNewFormedTiles(new Board(SCENARIO_3_TILES()), EXPECTED_POSITION_3, placeAction);

        expect(result).to.be.eql(EXPECTED_NEW_WORD_3());
    });

    it('should find tiles of newly formed words scenario 4', () => {
        const placeAction: PlaceLetters = new PlaceLetters(WORD_PLACE_4(), BEGIN_POSITION_4, Orientation.Horizontal);
        const result = algo.findNewFormedTiles(new Board(SCENARIO_4_TILES()), EXPECTED_POSITION_4, placeAction);

        expect(result).to.be.eql(EXPECTED_NEW_WORDS_4());
    });

    it('should isWordConnected return true', () => {
        const result = algo.isWordConnected(new Board(SCENARIO_3_TILES()), EXPECTED_POSITION_3);

        expect(result).to.be.eql(true);
    });

    it('should isWordConnected return false', () => {
        const result = algo.isWordConnected(new Board(SCENARIO_3_TILES()), [{ x: 0, y: 0 }]);

        expect(result).to.be.eql(false);
    });
});
