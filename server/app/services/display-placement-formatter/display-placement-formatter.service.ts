import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Board } from '@app/classes/board/board';
import { Letter } from '@app/classes/letters/letter/letter';
import { coordinateToVector2D, vector2DToCoordinate } from '@app/classes/utils/vector-2d/vector-2d';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { Hint } from '@app/interface/hint';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { BOARD_SIZE } from '@common/constants/board';
import { Orientation } from '@common/enums/orientation';
import { Service } from 'typedi';

const INVALID_VECTOR2D: Vector2D = { x: -1, y: -1 };
const FORWARD_PROGRESSION = 1;
const BACKWARD_PROGRESSION = -1;

@Service()
export class DisplayPlacementFormatter {
    static getHintFromCommand(commandComponents: string[]): Hint {
        const orientation = this.formatOrientation(commandComponents[1].slice(INDEX_NOT_FOUND));
        const initialPosition =
            orientation === Orientation.None ? commandComponents[1] : commandComponents[1].substring(0, commandComponents[1].length - 1);
        const coordinate = { row: initialPosition[0], column: parseInt(initialPosition.substring(1), 10) };
        const beginPosition = coordinateToVector2D(coordinate);
        const letters = [];

        for (const letter of commandComponents[2]) {
            letters.push(new Letter(letter, 0));
        }
        const placeLetters = new PlaceLetters(letters, beginPosition, orientation);

        return { action: placeLetters, score: -1 };
    }

    static formatPlacementCommandDisplay(hint: Hint, board: Board): string {
        const word = this.formatWord(hint, board);

        const beginPositionCoordinate = vector2DToCoordinate(hint.action.beginPosition);

        return beginPositionCoordinate.row + beginPositionCoordinate.column.toString() + ' ' + hint.action.orientation + ' ' + word;
    }

    private static formatWord(hint: Hint, board: Board): string {
        return this.executeBackwardSearch(hint, board) + this.excuteForwardSearch(hint, board);
    }

    private static excuteForwardSearch(hint: Hint, board: Board): string {
        let positionToCheck: Vector2D = { x: hint.action.beginPosition.x, y: hint.action.beginPosition.y };
        let word = '';
        let index = 0;
        let letterAtPosition = this.findTileAtPosition(positionToCheck, board);

        while (index < hint.action.letters.length || letterAtPosition !== '') {
            if (letterAtPosition === '') {
                word += hint.action.letters[index++].letter;
            } else {
                word += letterAtPosition;
            }
            positionToCheck = this.updateCoordinate(positionToCheck, hint.action.orientation, FORWARD_PROGRESSION);
            if (positionToCheck === INVALID_VECTOR2D) break;
            letterAtPosition = this.findTileAtPosition(positionToCheck, board);
        }
        return word;
    }

    private static executeBackwardSearch(hint: Hint, board: Board): string {
        let positionToCheck = this.updateCoordinate(hint.action.beginPosition, hint.action.orientation, BACKWARD_PROGRESSION);
        let letterAtPosition;
        let word = '';

        while (positionToCheck !== INVALID_VECTOR2D) {
            letterAtPosition = this.findTileAtPosition(positionToCheck, board);
            if (letterAtPosition === '') break;
            word = letterAtPosition + word;
            positionToCheck = this.updateCoordinate(positionToCheck, hint.action.orientation, BACKWARD_PROGRESSION);
        }
        return word;
    }

    private static updateCoordinate(initialPosition: Vector2D, orientation: Orientation, direction: number): Vector2D {
        const offset = orientation === Orientation.Horizontal ? { x: direction * 1, y: 0 } : { x: 0, y: direction * 1 };
        const updatedVector2D = { x: initialPosition.x + offset.x, y: initialPosition.y + offset.y };

        return this.isInBoard(updatedVector2D) ? updatedVector2D : INVALID_VECTOR2D;
    }

    private static isInBoard(position: Vector2D): boolean {
        return position.x >= 0 && position.y >= 0 && position.x < BOARD_SIZE && position.y < BOARD_SIZE;
    }

    private static findTileAtPosition(position: Vector2D, board: Board): string {
        return board.getTile(position).letter.letter;
    }

    private static formatOrientation(orientation: string): Orientation {
        if (orientation === Orientation.Horizontal) return Orientation.Horizontal;
        if (orientation === Orientation.Vertical) return Orientation.Vertical;
        return Orientation.None;
    }
}
