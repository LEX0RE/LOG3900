import { EaselCancel } from '@app/classes/easel-selection-operation/cancel/easel-cancel';
import { SelectionAlgo } from '@app/classes/easel-selection-operation/selection-algo';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { mockSelectionAlgo } from '@app/test/mocks/easel-mock/easel-selection-algo-mock';
import { mockEaselSelectionService } from '@app/test/mocks/easel-mock/easel-selection-service-mock';

describe('EaselCancel', () => {
    let cancel: EaselCancel;
    let mockAlgo: SelectionAlgo;
    let mockService: EaselSelectionService;

    beforeEach(() => {
        mockService = mockEaselSelectionService();
        mockAlgo = mockSelectionAlgo();
        cancel = new EaselCancel(mockService, mockAlgo);
    });

    it('viewLetters should return service view letters', () => {
        expect(cancel.viewLetters).toEqual(mockService.viewLetters);
    });

    it('cancelManipulationSelection should remove selection', () => {
        const spy = (mockAlgo.findIndex as jasmine.Spy).and.returnValue(1);

        cancel.cancelManipulationSelection();
        expect(spy).toHaveBeenCalledWith(EaselSelectionType.Manipulation);
        expect(mockService.viewLetters[1].selection).toEqual(EaselSelectionType.Unselected);
    });

    it('cancelManipulationSelection should do nothing if no selection', () => {
        const spy = (mockAlgo.findIndex as jasmine.Spy).and.returnValue(INDEX_NOT_FOUND);

        cancel.cancelManipulationSelection();
        expect(spy).toHaveBeenCalledWith(EaselSelectionType.Manipulation);
        expect(mockService.viewLetters[1].selection).toEqual(EaselSelectionType.Manipulation);
    });

    it('cancelTradeSelection should remove trade selection', () => {
        const tradeLetterIndex = 3;

        cancel.cancelTradeSelection();
        expect(mockService.viewLetters[tradeLetterIndex].selection).toEqual(EaselSelectionType.Unselected);
    });

    it('cancelHiddenSelection remove hidden selection', () => {
        const hidden1 = 4;
        const hidden2 = 5;

        cancel.cancelHiddenSelection();
        expect(mockService.viewLetters[hidden1].selection).toEqual(EaselSelectionType.Unselected);
        expect(mockService.viewLetters[hidden2].selection).toEqual(EaselSelectionType.Unselected);
    });
});
