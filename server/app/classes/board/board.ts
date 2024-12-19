import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Letter } from '@app/classes/letters/letter/letter';
import { emptyLetter } from '@app/classes/letters/letterFactory/letter-factory';
import { StandardTile } from '@app/classes/tiles/standard-tile/standard-tile';
import { Tile } from '@app/classes/tiles/tile';
import { vector2DToCoordinate } from '@app/classes/utils/vector-2d/vector-2d';
import { defaultBoard } from '@app/constants/default/default-board';
import { COLUMN_OUT_OF_RANGE, ROW_OUT_OF_RANGE, WORD_OUT_OF_BOUND } from '@app/constants/error/board';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { Orientation } from '@common/enums/orientation';
import { CommonBoard } from '@common/interfaces/game-view-related/common-board';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';
import { CommonTile } from '@common/interfaces/game-view-related/common-tile';

export class Board {
    tiles: Tile[][];

    constructor(tiles: Tile[][] = defaultBoard) {
        this.tiles = tiles;

        const emptyTiles: Tile[][] = this.fillEmptyTiles();

        this.tiles = this.fillTiles(emptyTiles, tiles);
    }

    get toCommonBoard(): CommonBoard {
        const commonTiles: CommonTile[] = [];

        this.tiles.forEach((tiles: Tile[], x: number) => {
            tiles.forEach((tile: Tile, y: number) => {
                const vec: Vector2D = { x, y };
                const letter: CommonLetter = tile.letter;
                const commonTile: CommonTile = { letter, coordinate: vector2DToCoordinate(vec) };

                if (letter.letter) commonTiles.push(commonTile);
            });
        });
        return { tiles: commonTiles };
    }

    fillEmptyTiles(): Tile[][] {
        const emptyTiles: Tile[][] = [];

        this.tiles.forEach((_tile, index) => {
            emptyTiles.push([]);
            this.tiles.forEach(() => emptyTiles[index].push(new StandardTile(emptyLetter())));
        });
        return emptyTiles;
    }

    fillTiles(clonedTiles: Tile[][], tiles: Tile[][]): Tile[][] {
        tiles.forEach((tiless: Tile[], i: number) => {
            tiless.forEach((tile: Tile, j: number) => {
                clonedTiles[i][j] = tile.clone();
            });
        });
        return clonedTiles;
    }

    placeLetters(action: PlaceLetters): Vector2D[] {
        const generatedPosition = this.generatedPositionForPlacement(action);

        action.letters.forEach((letter: Letter, index: number) => {
            const pos = generatedPosition[index];

            this.tiles[pos.x][pos.y].placeLetter(letter);
        });
        return generatedPosition;
    }

    generatedPositionForPlacement(action: PlaceLetters): Vector2D[] {
        let position = { x: action.beginPosition.x, y: action.beginPosition.y };
        const generatedPlacedPosition: Vector2D[] = [];
        let nLetterPlaced = 0;

        while (nLetterPlaced < action.letters.length) {
            nLetterPlaced = this.assignPosition(nLetterPlaced, position, generatedPlacedPosition);
            position = this.changePosition(position, action.orientation);
        }
        return generatedPlacedPosition;
    }

    assignPosition(nLetterPlaced: number, position: Vector2D, generatedPlacedPosition: Vector2D[]): number {
        if (!this.isInTiles(position)) throw new Error(WORD_OUT_OF_BOUND);
        if (this.tiles[position.x][position.y].letter.letter === '') {
            generatedPlacedPosition.push({ x: position.x, y: position.y });
            nLetterPlaced += 1;
        }
        return nLetterPlaced;
    }

    changePosition(position: Vector2D, orientation: Orientation): Vector2D {
        const offSet = orientation === Orientation.Horizontal ? { x: 1, y: 0 } : { x: 0, y: 1 };

        position.x += offSet.x;
        position.y += offSet.y;
        return position;
    }

    getColumn(index: number): Tile[] {
        if (!this.isInTiles({ x: index, y: index })) throw new Error(COLUMN_OUT_OF_RANGE);

        return this.tiles[index];
    }

    getRow(index: number): Tile[] {
        if (!this.isInTiles({ x: index, y: index })) throw new Error(ROW_OUT_OF_RANGE);
        const tiles: Tile[] = [];

        this.tiles.forEach((column) => tiles.push(column[index]));
        return tiles;
    }

    clone(): Board {
        return new Board(this.tiles);
    }

    isInTiles(position: Vector2D): boolean {
        return 0 <= position.x && position.x < this.tiles.length && 0 <= position.y && position.y < this.tiles.length;
    }

    letterAt(position: Vector2D): string {
        if (!this.isInTiles(position)) return '';
        return this.tiles[position.x][position.y].letter.letter;
    }

    getTile(position: Vector2D): Tile {
        return this.tiles[position.x][position.y];
    }
}
