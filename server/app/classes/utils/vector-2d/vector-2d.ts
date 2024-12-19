import { CONVERSION_FAILED } from '@app/constants/error/vector-2d';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { ALPHABET_BOARD } from '@common/constants/alphabet';
import { Coordinate } from '@common/interfaces/coordinate';

export const coordinateToVector2D = (coordinate: Coordinate): Vector2D => {
    let y = INDEX_NOT_FOUND;

    ALPHABET_BOARD.forEach((char: string, index: number) => {
        if (char.toUpperCase() === coordinate.row.toUpperCase()) y = index;
    });

    if (y === INDEX_NOT_FOUND) throw new Error(CONVERSION_FAILED);
    return { x: coordinate.column - 1, y };
};

export const vector2DToCoordinate = (vector: Vector2D): Coordinate => {
    return { row: ALPHABET_BOARD[vector.y].toUpperCase(), column: vector.x + 1 };
};

export const compareVector2D = (first: Vector2D, second: Vector2D): boolean => {
    return first.x === second.x && first.y === second.y;
};

export const isSamePosition = (position: Vector2D, position2: Vector2D): boolean => {
    return position.x === position2.x && position.y === position2.y;
};
