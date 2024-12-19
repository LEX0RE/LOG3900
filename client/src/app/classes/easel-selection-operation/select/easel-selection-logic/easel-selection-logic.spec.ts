import { EaselCancel } from '@app/classes/easel-selection-operation/cancel/easel-cancel';
import { EaselSelectionLogic } from '@app/classes/easel-selection-operation/select/easel-selection-logic/easel-selection-logic';
import { ViewLetter } from '@app/classes/view-letter';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { mockEaselCancel } from '@app/test/mocks/easel-mock/easel-cancel-mock';
import { mockEaselSelectionService } from '@app/test/mocks/easel-mock/easel-selection-service-mock';

describe('EaselSelectionLogic', () => {
    let viewLetters: ViewLetter[];
    let logic: EaselSelectionLogic;
    let cancel: EaselCancel;

    beforeEach(() => {
        const mock = mockEaselSelectionService();

        cancel = mockEaselCancel();
        viewLetters = mock.viewLetters;
        logic = new EaselSelectionLogic();
    });

    it('toggleTradeSelection should select trade', () => {
        const index = 0;

        logic.toggleTradeSelection(viewLetters, index);
        expect(viewLetters[index].selection).toEqual(EaselSelectionType.Trade);
    });

    it('toggleTradeSelection should unselect trade', () => {
        const index = 3;

        logic.toggleTradeSelection(viewLetters, index);
        expect(viewLetters[index].selection).toEqual(EaselSelectionType.Unselected);
    });

    it('toggleTradeSelection should do nothing if it is manipulation selection', () => {
        const index = 1;

        logic.toggleTradeSelection(viewLetters, index);
        expect(viewLetters[index].selection).toEqual(EaselSelectionType.Manipulation);
    });

    it('setManipulationSelection should select manipulation if it is unselected', () => {
        const index = 0;

        logic.setManipulationSelection(cancel)(viewLetters, index);
        expect(cancel.cancelManipulationSelection).toHaveBeenCalled();
        expect(viewLetters[index].selection).toEqual(EaselSelectionType.Manipulation);
    });

    it('setManipulationSelection should cancel manipulation if it is select as manipulation', () => {
        const index = 1;

        logic.setManipulationSelection(cancel)(viewLetters, index);
        expect(cancel.cancelManipulationSelection).toHaveBeenCalled();
    });

    it('setHiddenSelection should set hidden', () => {
        const index = 0;

        logic.setHiddenSelection(viewLetters, index);
        expect(viewLetters[index].selection).toEqual(EaselSelectionType.Hidden);
    });

    it('unselectHidden should remove hidden', () => {
        const index = 5;

        logic.unselectHidden(viewLetters, index);
        expect(viewLetters[index].selection).toEqual(EaselSelectionType.Unselected);
    });

    it('unselectHidden should remove do nothing if it is still visible', () => {
        const index = 0;

        logic.unselectHidden(viewLetters, index);
        expect(viewLetters[index].selection).toEqual(EaselSelectionType.Unselected);
    });

    it('unselectedAllType should unselected all type it is not manipulation', () => {
        const expectedViewLetters = [
            new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
            new ViewLetter({ letter: 'J', point: 3 }, EaselSelectionType.Manipulation),
            new ViewLetter({ letter: 'A', point: 3 }, EaselSelectionType.Unselected),
            new ViewLetter({ letter: 'M', point: 3 }, EaselSelectionType.Unselected),
            new ViewLetter({ letter: 'E', point: 3 }, EaselSelectionType.Unselected),
            new ViewLetter({ letter: 'S', point: 3 }, EaselSelectionType.Unselected),
            new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
        ];

        logic.unselectedAllType(viewLetters, EaselSelectionType.Manipulation);
        expect(viewLetters).toEqual(expectedViewLetters);
    });

    it('unselectedAllType should unselected all type it is not trade', () => {
        const expectedViewLetters = [
            new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
            new ViewLetter({ letter: 'J', point: 3 }, EaselSelectionType.Unselected),
            new ViewLetter({ letter: 'A', point: 3 }, EaselSelectionType.Unselected),
            new ViewLetter({ letter: 'M', point: 3 }, EaselSelectionType.Trade),
            new ViewLetter({ letter: 'E', point: 3 }, EaselSelectionType.Unselected),
            new ViewLetter({ letter: 'S', point: 3 }, EaselSelectionType.Unselected),
            new ViewLetter({ letter: '*', point: 3 }, EaselSelectionType.Unselected),
        ];

        logic.unselectedAllType(viewLetters, EaselSelectionType.Trade);
        expect(viewLetters).toEqual(expectedViewLetters);
    });
});
