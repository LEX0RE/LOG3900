import { Injectable } from '@angular/core';
import { EaselCancel } from '@app/classes/easel-selection-operation/cancel/easel-cancel';
import { EaselSelect } from '@app/classes/easel-selection-operation/select/easel-select';
import { EaselSelectionLogic } from '@app/classes/easel-selection-operation/select/easel-selection-logic/easel-selection-logic';
import { SelectionAlgo } from '@app/classes/easel-selection-operation/selection-algo';
import { MathUtils } from '@app/classes/utils/math-utils';
import { ViewLetter } from '@app/classes/view-letter';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { EaselService } from '@app/services/easel/logic/easel.service';

@Injectable({
    providedIn: 'root',
})
export class EaselSelectionService {
    viewLetters: ViewLetter[];
    algo: SelectionAlgo;
    cancelHandler: EaselCancel;
    selectHandler: EaselSelect;
    errorWord: string;
    private readonly easelService: EaselService;

    constructor(easelService: EaselService) {
        const logic = new EaselSelectionLogic();

        this.viewLetters = [];
        this.algo = new SelectionAlgo(this);
        this.cancelHandler = new EaselCancel(this, this.algo);
        this.selectHandler = new EaselSelect(this, logic);
        this.easelService = easelService;
    }

    get letters(): ViewLetter[] {
        this.viewLetters = this.easelService.setLetters(this.viewLetters);
        return this.viewLetters;
    }

    get tradeLetters(): string {
        return MathUtils.accumulator(this.viewLetters, '', (chars: string, letter: ViewLetter) => {
            if (letter.selection === EaselSelectionType.Trade) chars += letter.toCommonLetter.letter;
            return chars;
        });
    }

    get size(): number {
        return MathUtils.accumulator(this.viewLetters, 0, (sum: number, letter: ViewLetter) => {
            if (letter.selection !== EaselSelectionType.Hidden) sum += 1;
            return sum;
        });
    }

    isInEasel(key: string): boolean {
        return Boolean(this.viewLetters.find((letter: ViewLetter) => this.isHidden(letter) && this.isMatchingKey(letter, key)));
    }

    cancelManipulation(): void {
        this.cancelHandler.cancelManipulationSelection();
    }

    cancelTrade(): void {
        this.cancelHandler.cancelTradeSelection();
    }

    cancelHidden(): void {
        this.cancelHandler.cancelHiddenSelection();
    }

    moveManipulationRight(): void {
        const indexOfManipulationLetter = this.algo.findIndex(EaselSelectionType.Manipulation);

        if (indexOfManipulationLetter === INDEX_NOT_FOUND) return;
        let potentialNewIndex = indexOfManipulationLetter + 1;

        if (potentialNewIndex >= this.viewLetters.length) potentialNewIndex = 0;
        this.algo.switchLetter(indexOfManipulationLetter, potentialNewIndex);
    }

    moveManipulationLeft(): void {
        const indexOfManipulationLetter = this.algo.findIndex(EaselSelectionType.Manipulation);

        if (indexOfManipulationLetter === INDEX_NOT_FOUND) return;
        const lowerBound = 0;
        let potentialNewIndex = indexOfManipulationLetter - 1;

        if (potentialNewIndex < lowerBound) potentialNewIndex = this.viewLetters.length - 1;
        this.algo.switchLetter(indexOfManipulationLetter, potentialNewIndex);
    }

    selectManipulationByString(keyboardCharacter: string): void {
        this.selectHandler.selectManipulationByString(keyboardCharacter);
    }

    selectHiddenByString(keyboardCharacter: string): ViewLetter | undefined {
        return this.selectHandler.selectHiddenLetterByString(keyboardCharacter);
    }

    selectHiddenByIndex(index: number): void {
        this.selectHandler.selectHiddenLetterByIndex(index);
    }

    unselectHiddenByString(keyboardCharacter: string): void {
        this.selectHandler.unselectHiddenLetterByString(keyboardCharacter);
    }

    selectManipulationByIndex(index: number): void {
        this.selectHandler.selectManipulationByIndex(index);
    }

    selectTrade(index: number): void {
        this.selectHandler.selectTradeLetter(index);
    }

    previewTrade(lettersToTrade: string): void {
        if (lettersToTrade.length === 0) return;
        const tradeLettersIndexes: number[] = [];

        for (const letterToTrade of lettersToTrade) {
            let hasFoundLetter = false;

            if (!this.isInEasel(letterToTrade)) return;
            this.viewLetters.forEach((viewLetter, index) => {
                if (!hasFoundLetter && !tradeLettersIndexes.includes(index) && viewLetter.letter.letter === letterToTrade) {
                    tradeLettersIndexes.push(index);
                    hasFoundLetter = true;
                }
            });
        }
        this.selectLettersToTradeByIndexes(tradeLettersIndexes);
    }

    private selectLettersToTradeByIndexes(tradeLettersIndexes: number[]): void {
        if (tradeLettersIndexes.length === 0) return;
        tradeLettersIndexes.forEach((letterIndex) => this.selectTrade(letterIndex));
    }

    private isHidden(letter: ViewLetter): boolean {
        return letter.selection !== EaselSelectionType.Hidden;
    }

    private isMatchingKey(letter: ViewLetter, key: string): boolean {
        return letter.toCommonLetter.letter.toLowerCase() === key.toLowerCase();
    }
}
