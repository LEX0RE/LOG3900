import { SelectionAlgo } from '@app/classes/easel-selection-operation/selection-algo';
import { ViewLetter } from '@app/classes/view-letter';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';

export class EaselCancel {
    private easelService: EaselSelectionService;
    private algo: SelectionAlgo;

    constructor(easelService: EaselSelectionService, algo: SelectionAlgo) {
        this.easelService = easelService;
        this.algo = algo;
    }

    get viewLetters(): ViewLetter[] {
        return this.easelService.viewLetters;
    }

    cancelManipulationSelection(): void {
        const indexOfManipulationLetter = this.algo.findIndex(EaselSelectionType.Manipulation);

        if (indexOfManipulationLetter === INDEX_NOT_FOUND) return;
        this.viewLetters[indexOfManipulationLetter].selection = EaselSelectionType.Unselected;
    }

    cancelTradeSelection(): void {
        this.cancelSelection(EaselSelectionType.Trade);
    }

    cancelHiddenSelection(): void {
        this.cancelSelection(EaselSelectionType.Hidden);
    }

    private cancelSelection(type: EaselSelectionType): void {
        this.viewLetters.forEach((letter: ViewLetter) => {
            if (letter.selection === type) letter.selection = EaselSelectionType.Unselected;
        });
    }
}
