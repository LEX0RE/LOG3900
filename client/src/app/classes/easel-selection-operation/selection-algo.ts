import { ViewLetter } from '@app/classes/view-letter';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';

export class SelectionAlgo {
    private easelService: EaselSelectionService;

    constructor(easelService: EaselSelectionService) {
        this.easelService = easelService;
    }

    get viewLetters(): ViewLetter[] {
        return this.easelService.viewLetters;
    }

    findIndex(easelSelectionType?: EaselSelectionType): number {
        return easelSelectionType ? this.viewLetters.findIndex((letter: ViewLetter) => letter.selection === easelSelectionType) : INDEX_NOT_FOUND;
    }

    switchLetter(i: number, j: number): void {
        let currentIndex: number = i;

        while (currentIndex !== j) {
            const temp = this.viewLetters[currentIndex];
            const nextIndex = currentIndex > j ? currentIndex - 1 : currentIndex + 1;

            this.viewLetters[currentIndex] = this.viewLetters[nextIndex];
            this.viewLetters[nextIndex] = temp;
            currentIndex = nextIndex;
        }
    }

    findNextLetterIndex(from: number, keyboardChar: string): number {
        const indexes: number[] = this.findAllIndexesForALetter(keyboardChar);

        if (!indexes.length) return INDEX_NOT_FOUND;

        const nextIndex = indexes.find((index: number) => index > from);

        if (nextIndex) return nextIndex;

        return indexes[0];
    }

    findAllIndexesForALetter(keyboardChar: string): number[] {
        const indexes = this.viewLetters.map((letter: ViewLetter, index: number) => {
            if (letter.selection === EaselSelectionType.Hidden) return INDEX_NOT_FOUND;
            if (letter.toCommonLetter.letter.toLowerCase() === keyboardChar.toLowerCase()) return index;
            return INDEX_NOT_FOUND;
        });

        return indexes.filter((index: number) => index !== INDEX_NOT_FOUND);
    }

    findIndexOfHidden(keyboardChar: string): number {
        return this.viewLetters.findIndex(
            (letter: ViewLetter) =>
                letter.selection === EaselSelectionType.Hidden && letter.toCommonLetter.letter.toLowerCase() === keyboardChar.toLowerCase(),
        );
    }
}
