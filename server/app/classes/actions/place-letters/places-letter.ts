import { BlankLettersFactory } from '@app/classes/letters/blank-factory/blank-factory';
import { Letter } from '@app/classes/letters/letter/letter';
import { LettersFactory } from '@app/classes/letters/letterFactory/letter-factory';
import { vector2DToCoordinate } from '@app/classes/utils/vector-2d/vector-2d';
import { SPACE } from '@app/constants/command-formatting';
import { Action } from '@app/interface/action-interface';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { ActionType } from '@common/enums/action-type';
import { Orientation } from '@common/enums/orientation';

export class PlaceLetters implements Action {
    letters: Letter[];
    beginPosition: Vector2D;
    orientation: Orientation;
    actionType: ActionType;

    constructor(lettersToPlace: Letter[], beginPosition: Vector2D, orientation: Orientation) {
        this.letters = lettersToPlace;
        this.beginPosition = beginPosition;
        this.orientation = orientation;
        this.actionType = ActionType.PlaceLetters;
    }

    static transformToAction(position: Vector2D, orientation: Orientation, word: string): PlaceLetters {
        const lettersToPlace: Letter[] = [];

        for (const letter of word)
            lettersToPlace.push(letter.toLowerCase() === letter ? LettersFactory[letter] : BlankLettersFactory[letter.toLowerCase()]);

        return new PlaceLetters(lettersToPlace, position, orientation);
    }

    toString(): string {
        const coordinate = vector2DToCoordinate(this.beginPosition);
        let result = `${this.actionType} ${coordinate.row}${coordinate.column}`;

        if (this.letters.length > 1) result += `${this.orientation}`;
        result += SPACE;
        this.letters.forEach((letter: Letter) => (result += letter.letter));
        return result;
    }
}
