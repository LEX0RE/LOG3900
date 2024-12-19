import { TypeCase } from '@app/enum/grid';
import { Vector2D } from '@app/interface/vector-2d';
import { Coordinate } from '@common/interfaces/coordinate';

export const DEFAULT_SIZE = 500;

export const BOX_BY_ROW_WITH_NUMBER = 16;
export const SPACE_BETWEEN_CASE: number = DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER;

export const ORIGINAL_FONT_STAR = 35;
export const CONVERSION_FONT_STAR = ORIGINAL_FONT_STAR;
export const POSITION_X_STAR = 1.005;
export const CONVERSION_Y_STAR = 1.1;
export const POSITION_Y_STAR = SPACE_BETWEEN_CASE / CONVERSION_Y_STAR;

export const CONVERSION_FONT_LETTER_WORD = 9;
export const FONT_LETTER_WORD = CONVERSION_FONT_LETTER_WORD;

export const CONVERSION_STEP_LETTER = 5;
export const STEP_LETTER = CONVERSION_STEP_LETTER;
export const CONVERSION_POSITION_X_LETTER = 400;
export const POSITION_X_LETTER = DEFAULT_SIZE / CONVERSION_POSITION_X_LETTER;

export const CONVERSION_STEP_WORD = 10;
export const STEP_WORD = CONVERSION_STEP_WORD;
export const CONVERSION_POSITION_X_WORD = 100;
export const POSITION_X_WORD = DEFAULT_SIZE / CONVERSION_POSITION_X_WORD;

export const CONVERSION_WORD_LETTER = 37.5;
export const POSITION_Y_WORD_LETTER = DEFAULT_SIZE / CONVERSION_WORD_LETTER;

export const CONVERSION_STEP_MULTIPLY = 11;
export const STEP_MULTIPLY = CONVERSION_STEP_MULTIPLY;
export const POSITION_X_MULTIPLY = 60;
export const POSITION_Y_MULTIPLY = 19.5;

export const ORIGINAL_NUMBER_FILL_STYLE = 18;
export const NUMBER_FILL_STYLE = ORIGINAL_NUMBER_FILL_STYLE;
export const POSITION_X_NUMBER = 1.3333333333333333333333333333333;
export const POSITION_Y_NUMBER = SPACE_BETWEEN_CASE / 2;

export const CONVERSION_POSITION_Y_LETTER = 1.666666666666666;
export const POSITION_Y_ALPHABET = SPACE_BETWEEN_CASE * CONVERSION_POSITION_Y_LETTER;

export const POSITION_X_ALPHABET = SPACE_BETWEEN_CASE / 3;

export const POSITION_ARROW = SPACE_BETWEEN_CASE / 2;
export const ADJUST_POSITION_X = 3;

export const HEAD_LENGTH = 10;

export const CONVERSION_POSITION_SQUARE = 10;
export const POSITION_LETTER_SQUARE = SPACE_BETWEEN_CASE / CONVERSION_POSITION_SQUARE;

export const CONVERSION_PLUS_CLEAR_LETTER = 11;
export const PLUS_CLEAR_LETTER_SIZE = POSITION_LETTER_SQUARE * CONVERSION_PLUS_CLEAR_LETTER;

export const CONVERSION_PLUS_STROKE_LETTER = 2.5;
export const PLUS_STROKE_LETTER_SIZE = POSITION_LETTER_SQUARE * CONVERSION_PLUS_STROKE_LETTER;

export const CONVERSION_PLUS_TEXT_LETTER = 2.5;
export const PLUS_TEXT_LETTER_POSITION_X = POSITION_LETTER_SQUARE;
export const PLUS_TEXT_LETTER_POSITION_Y = SPACE_BETWEEN_CASE / CONVERSION_PLUS_TEXT_LETTER;

export const CONVERSION_POINT_POSITION_X = 2.5;
export const PLUS_POINT_LETTER_POSITION_X = SPACE_BETWEEN_CASE / CONVERSION_POINT_POSITION_X;
export const PLUS_POINT_LETTER_POSITION_Y = PLUS_POINT_LETTER_POSITION_X / 2;

export const CONVERSION_FONT_LETTER_SQUARE = 600;
export const FONT_LETTER_SQUARE = DEFAULT_SIZE / CONVERSION_FONT_LETTER_SQUARE;

export const MINUS_POINT_SQUARE = 6.5;

export const RADIUS_DIVISION_FACTOR = 5;
export const LINE_WIDTH = 3;

export const DEFAULT_RADIUS = 7;
export const NUMBER_OF_ARC_SQUARE = 4;

export const BOARD_COLUMNS: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
export const INITIAL_PLACEMENT: Vector2D = { x: -1, y: -1 };

export const DEFAULT_BOARD = [
    [TypeCase.Word3, TypeCase.Normal, TypeCase.Normal, TypeCase.Letter2, TypeCase.Normal, TypeCase.Normal, TypeCase.Normal, TypeCase.Word3],
    [TypeCase.Normal, TypeCase.Word2, TypeCase.Normal, TypeCase.Normal, TypeCase.Normal, TypeCase.Letter3, TypeCase.Normal, TypeCase.Normal],
    [TypeCase.Normal, TypeCase.Normal, TypeCase.Word2, TypeCase.Normal, TypeCase.Normal, TypeCase.Normal, TypeCase.Letter2, TypeCase.Normal],
    [TypeCase.Letter2, TypeCase.Normal, TypeCase.Normal, TypeCase.Word2, TypeCase.Normal, TypeCase.Normal, TypeCase.Normal, TypeCase.Letter2],
    [TypeCase.Normal, TypeCase.Normal, TypeCase.Normal, TypeCase.Normal, TypeCase.Word2, TypeCase.Normal, TypeCase.Normal, TypeCase.Normal],
    [TypeCase.Normal, TypeCase.Letter3, TypeCase.Normal, TypeCase.Normal, TypeCase.Normal, TypeCase.Letter3, TypeCase.Normal, TypeCase.Normal],
    [TypeCase.Normal, TypeCase.Normal, TypeCase.Letter2, TypeCase.Normal, TypeCase.Normal, TypeCase.Normal, TypeCase.Letter2, TypeCase.Normal],
    [TypeCase.Word3, TypeCase.Normal, TypeCase.Normal, TypeCase.Letter2, TypeCase.Normal, TypeCase.Normal, TypeCase.Normal, TypeCase.Star],
];

export const INVALID_COORDINATE: Coordinate = { row: 'X', column: -1 };
export const INVALID_VECTOR2D: Vector2D = { x: -1, y: -1 };

export const FORWARD_PROGRESSION = 1;
export const BACKWARD_PROGRESSION = -1;
