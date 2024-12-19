import { EaselCancel } from '@app/classes/easel-selection-operation/cancel/easel-cancel';
import { EaselSelectionLogic } from '@app/classes/easel-selection-operation/select/easel-selection-logic/easel-selection-logic';
import { SelectionAlgo } from '@app/classes/easel-selection-operation/selection-algo';
import { ViewLetter } from '@app/classes/view-letter';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';

export class EaselSelect {
    private easelService: EaselSelectionService;
    private logic: EaselSelectionLogic;

    constructor(easelService: EaselSelectionService, logic: EaselSelectionLogic) {
        this.easelService = easelService;
        this.logic = logic;
    }

    get viewLetters(): ViewLetter[] {
        return this.easelService.viewLetters;
    }

    get algo(): SelectionAlgo {
        return this.easelService.algo;
    }

    get cancel(): EaselCancel {
        return this.easelService.cancelHandler;
    }

    selectManipulationByString(keyboardChar: string): void {
        this.selectLetterByString(keyboardChar, this.logic.setManipulationSelection(this.cancel), EaselSelectionType.Manipulation);
    }

    selectHiddenLetterByString(keyboardChar: string): ViewLetter | undefined {
        return this.selectLetterByString(keyboardChar, this.logic.setHiddenSelection);
    }

    selectHiddenLetterByIndex(index: number): void {
        this.handleSimpleSelect(index, EaselSelectionType.Hidden, this.logic.setHiddenSelection);
    }

    selectManipulationByIndex(index: number): void {
        this.handleSimpleSelect(index, EaselSelectionType.Manipulation, this.logic.setManipulationSelection(this.cancel));
    }

    selectTradeLetter(index: number): void {
        this.handleSimpleSelect(index, EaselSelectionType.Trade, this.logic.toggleTradeSelection);
    }

    unselectHiddenLetterByString(keyboardChar: string): void {
        const indexOfLetter = this.algo.findIndexOfHidden(keyboardChar);

        if (indexOfLetter === INDEX_NOT_FOUND) return;
        this.logic.unselectHidden(this.viewLetters, indexOfLetter);
    }

    unselectHiddenLetterByIndex(index: number): void {
        this.handleSimpleSelect(index, EaselSelectionType.Hidden, this.logic.unselectHidden);
    }

    private handleSimpleSelect(
        index: number,
        typeSelected: EaselSelectionType,
        actionOnLetter: (viewLetters: ViewLetter[], index: number) => void,
    ): void {
        if (this.viewLetters.length <= index || index < 0) return;
        this.logic.unselectedAllType(this.viewLetters, typeSelected);
        actionOnLetter(this.viewLetters, index);
    }

    private selectLetterByString(
        keyboardChar: string,
        actionOnLetter: (viewLetters: ViewLetter[], index: number) => void,
        easelSelectionType?: EaselSelectionType,
    ): ViewLetter | undefined {
        const indexOfLetter = this.algo.findIndex(easelSelectionType);
        let index = this.algo.findNextLetterIndex(0, keyboardChar);

        if (indexOfLetter !== INDEX_NOT_FOUND) index = this.algo.findNextLetterIndex(indexOfLetter, keyboardChar);

        if (index === INDEX_NOT_FOUND) return;

        actionOnLetter(this.viewLetters, index);
        return this.viewLetters[index];
    }
}
