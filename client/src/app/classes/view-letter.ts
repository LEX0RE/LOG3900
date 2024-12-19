import { BlankLetter } from '@app/classes/blank-letter/blank-letter';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { BLANK } from '@common/constants/blank';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';

export class ViewLetter {
    letter: CommonLetter;
    selection: EaselSelectionType;

    constructor(letter: CommonLetter, selection: EaselSelectionType) {
        this.letter = letter;
        this.selection = selection;
    }

    get isBlank(): boolean {
        return this.letter.letter === BLANK || this.letter instanceof BlankLetter;
    }

    get toCommonLetter(): CommonLetter {
        return this.letter;
    }

    static viewToCommon(viewLetters: ViewLetter[]): CommonLetter[] {
        return viewLetters.map((viewLetter: ViewLetter) => viewLetter.toCommonLetter);
    }

    static commonToView(letters: CommonLetter[]): ViewLetter[] {
        return letters.map((letter: CommonLetter) => new ViewLetter(letter, EaselSelectionType.Unselected));
    }
}
