import { EaselCancel } from '@app/classes/easel-selection-operation/cancel/easel-cancel';
import { ViewLetter } from '@app/classes/view-letter';
import { EaselSelectionType } from '@app/enum/easel-selection-type';

export class EaselSelectionLogic {
    toggleTradeSelection(viewLetters: ViewLetter[], index: number): void {
        switch (viewLetters[index].selection) {
            case EaselSelectionType.Unselected:
                viewLetters[index].selection = EaselSelectionType.Trade;
                return;
            case EaselSelectionType.Trade:
                viewLetters[index].selection = EaselSelectionType.Unselected;
                return;
            case EaselSelectionType.Manipulation:
                return;
        }
    }

    setManipulationSelection(cancel: EaselCancel): (viewLetters: ViewLetter[], index: number) => void {
        return (viewLetters: ViewLetter[], index: number): void => {
            switch (viewLetters[index].selection) {
                case EaselSelectionType.Manipulation:
                    return cancel.cancelManipulationSelection();
                case EaselSelectionType.Unselected:
                    cancel.cancelManipulationSelection();
                    viewLetters[index].selection = EaselSelectionType.Manipulation;
            }
        };
    }

    setHiddenSelection(viewLetters: ViewLetter[], index: number): void {
        viewLetters[index] = new ViewLetter(viewLetters[index].letter, EaselSelectionType.Hidden);
    }

    unselectHidden(viewLetters: ViewLetter[], index: number): void {
        if (viewLetters[index].selection === EaselSelectionType.Hidden) viewLetters[index].selection = EaselSelectionType.Unselected;
    }

    unselectedAllType(viewLetters: ViewLetter[], typeToUnselected: EaselSelectionType): void {
        viewLetters.forEach((letter) => {
            if (letter.selection !== typeToUnselected) letter.selection = EaselSelectionType.Unselected;
        });
    }
}
