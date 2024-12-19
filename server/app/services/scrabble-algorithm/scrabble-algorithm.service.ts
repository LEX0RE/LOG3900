import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Board } from '@app/classes/board/board';
import { Tile } from '@app/classes/tiles/tile';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { FOUR_DIRECTIONS_OFFSETS, VALID_WORD_MIN_LENGTH } from '@app/constants/miscellaneous';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { Orientation } from '@common/enums/orientation';
import { Service } from 'typedi';

@Service()
export class ScrabbleAlgo {
    tilesToWords(tiles: Tile[][]): string[] {
        return MathUtils.accumulator<string[], Tile[]>(tiles, [], (words: string[], tilesAsWord: Tile[]) => {
            const word = MathUtils.accumulator<string, Tile>(tilesAsWord, '', (characters: string, tile: Tile) => {
                return characters + tile.letter.letter;
            });

            words.push(word);
            return words;
        });
    }

    findNewFormedTiles(board: Board, placedPosition: Vector2D[], placeAction: PlaceLetters): Tile[][] {
        this.starTile(board, placedPosition);

        let wordsAsTiles: Tile[][] = this.findAffectedLines(board, placedPosition, placeAction);

        wordsAsTiles = this.cleanUpTiles(wordsAsTiles);
        this.unStarTile(board, placedPosition);
        return wordsAsTiles;
    }

    cleanUpTiles(dirtyWordsAsTiles: Tile[][]): Tile[][] {
        dirtyWordsAsTiles.forEach((potentialWordAsTile: Tile[], index: number) => {
            dirtyWordsAsTiles[index] = this.cleanUpColumn(potentialWordAsTile);
        });

        return dirtyWordsAsTiles.filter((tiles: Tile[]) => tiles.length >= VALID_WORD_MIN_LENGTH);
    }

    cleanUpColumn(potentialWordAsTile: Tile[]): Tile[] {
        let starFound = false;
        let stopFlag = false;

        return potentialWordAsTile.reduce((accumulatedTiles: Tile[], tile: Tile) => {
            if (stopFlag) return accumulatedTiles;
            if (!tile.letter.letter && !starFound) return [];
            if (!tile.letter.letter && starFound) {
                stopFlag = true;
                return accumulatedTiles;
            }
            if (tile.isStared) starFound = true;
            accumulatedTiles.push(tile);
            return accumulatedTiles;
        }, []);
    }

    staringTile(board: Board, toStar: boolean, placedPosition: Vector2D[]): void {
        placedPosition.forEach((pos: Vector2D) => {
            board.tiles[pos.x][pos.y].isStared = toStar;
        });
    }

    starTile(board: Board, placedPosition: Vector2D[]): void {
        this.staringTile(board, true, placedPosition);
    }

    unStarTile(board: Board, placedPosition: Vector2D[]): void {
        this.staringTile(board, false, placedPosition);
    }

    isWordConnected(board: Board, placedPosition: Vector2D[]): boolean {
        let connected = false;

        this.starTile(board, placedPosition);
        placedPosition.forEach((position: Vector2D) => {
            connected = connected || this.isAdjacentToAnOtherLetter(position, board);
        });
        this.unStarTile(board, placedPosition);
        return connected;
    }

    isAdjacentToAnOtherLetter(position: Vector2D, board: Board): boolean {
        let isAdjacent = false;

        FOUR_DIRECTIONS_OFFSETS.forEach((offset: Vector2D) => {
            const adjacentPosition: Vector2D = { x: position.x + offset.x, y: position.y + offset.y };

            if (board.isInTiles(adjacentPosition) && this.isaValidAdjacentTile(board, adjacentPosition)) isAdjacent = true;
        });
        return isAdjacent;
    }

    private isaValidAdjacentTile(board: Board, adjacentPosition: Vector2D): boolean {
        const tile = board.tiles[adjacentPosition.x][adjacentPosition.y];

        return tile.letter.letter !== '' && !tile.isStared;
    }

    private findAffectedLines(board: Board, placedPosition: Vector2D[], placeAction: PlaceLetters): Tile[][] {
        let findIndirectlyAffected: (pos: Vector2D) => Tile[];

        switch (placeAction.orientation) {
            default:
            case Orientation.Horizontal:
                findIndirectlyAffected = (pos): Tile[] => board.getColumn(pos.x);
                return this.pushAffected(placedPosition, findIndirectlyAffected, board.getRow(placeAction.beginPosition.y));
            case Orientation.Vertical:
                findIndirectlyAffected = (pos): Tile[] => board.getRow(pos.y);
                return this.pushAffected(placedPosition, findIndirectlyAffected, board.getColumn(placeAction.beginPosition.x));
        }
    }

    private pushAffected(placedPosition: Vector2D[], findIndirectlyAffected: (pos: Vector2D) => Tile[], directlyAffected: Tile[]): Tile[][] {
        const wordsAsTiles: Tile[][] = [];

        placedPosition.forEach((pos: Vector2D) => wordsAsTiles.push(findIndirectlyAffected(pos)));
        wordsAsTiles.push(directlyAffected);
        return wordsAsTiles;
    }
}
