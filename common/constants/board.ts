import { Vector2D } from '@common/interfaces/vector-2d';

export const BOARD_SIZE = 15;
export const LEFT_OFFSET: Vector2D = { x: -1, y: 0 };
export const RIGHT_OFFSET: Vector2D = { x: 1, y: 0 };
export const DOWN_OFFSET: Vector2D = { x: 0, y: 1 };
export const UP_OFFSET: Vector2D = { x: 0, y: -1 };
export const BOARD_MAX_INDEX = BOARD_SIZE - 1;
export const BOARD_MIN_INDEX = 0;
