import { TestBed } from '@angular/core/testing';
import { EaselCancel } from '@app/classes/easel-selection-operation/cancel/easel-cancel';
import { EaselSelect } from '@app/classes/easel-selection-operation/select/easel-select';
import { SelectionAlgo } from '@app/classes/easel-selection-operation/selection-algo';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EaselService } from '@app/services/easel/logic/easel.service';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { mockEaselCancel } from '@app/test/mocks/easel-mock/easel-cancel-mock';
import { mockEaselSelect } from '@app/test/mocks/easel-mock/easel-select-mock';
import { mockSelectionAlgo } from '@app/test/mocks/easel-mock/easel-selection-algo-mock';
import { mockEaselService } from '@app/test/mocks/easel-mock/easel-service-mock';

describe('EaselSelectionService', () => {
    let service: EaselSelectionService;
    let easelService: EaselService;
    let algo: jasmine.SpyObj<SelectionAlgo>;
    let cancel: EaselCancel;
    let select: EaselSelect;
    const fakeKeyboardChar = 'E';
    const index = 4;

    beforeEach(() => {
        easelService = mockEaselService();
        algo = mockSelectionAlgo();
        cancel = mockEaselCancel();
        select = mockEaselSelect();
        TestBed.configureTestingModule({
            providers: [{ provide: EaselService, useValue: easelService }],
        });
        service = TestBed.inject(EaselSelectionService);
        service.algo = algo;
        service.cancelHandler = cancel;
        service.selectHandler = select;
        service.viewLetters = easelService.viewLetters;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('letters should call letters on easel service and return view Letters', () => {
        const result = service.letters;

        expect(easelService.setLetters).toHaveBeenCalledWith(easelService.viewLetters);
        expect(result).toEqual(service.viewLetters);
    });

    it('tradeLetters should return M ', () => {
        const letter = 'M';

        expect(service.tradeLetters).toEqual(letter);
    });

    it('size should not count hidden letters', () => {
        const expected = 5;

        expect(service.size).toEqual(expected);
    });

    it('isAEaselLetter should return true if letter is in easel', () => {
        const letter = 'J';

        expect(service.isInEasel(letter)).toBeTrue();
    });

    it('isAEaselLetter should return false if letter is not in easel', () => {
        const letter = 'G';

        expect(service.isInEasel(letter)).toBeFalse();
    });

    it('cancelManipulationSelection should call cancelManipulationSelection on cancel handler', () => {
        service.cancelManipulation();
        expect(cancel.cancelManipulationSelection).toHaveBeenCalled();
    });

    it('cancelTradeSelection should call cancelTradeSelection on cancel handler', () => {
        service.cancelTrade();
        expect(cancel.cancelTradeSelection).toHaveBeenCalled();
    });

    it('cancelHiddenSelection should call cancelHiddenSelection on cancel handler', () => {
        service.cancelHidden();
        expect(cancel.cancelHiddenSelection).toHaveBeenCalled();
    });

    it('selectManipulationByString should call selectManipulationByString on select handler', () => {
        service.selectManipulationByString(fakeKeyboardChar);
        expect(select.selectManipulationByString).toHaveBeenCalledWith(fakeKeyboardChar);
    });

    it('selectHiddenLetterByString should call selectHiddenLetterByString on select handler', () => {
        service.selectHiddenByString(fakeKeyboardChar);
        expect(select.selectHiddenLetterByString).toHaveBeenCalledWith(fakeKeyboardChar);
    });

    it('unselectHiddenLetterByString should call unselectHiddenLetterByString on select handler', () => {
        service.unselectHiddenByString(fakeKeyboardChar);
        expect(select.unselectHiddenLetterByString).toHaveBeenCalledWith(fakeKeyboardChar);
    });

    it('selectManipulationByIndex should call selectManipulationByIndex on select handler', () => {
        service.selectManipulationByIndex(index);
        expect(select.selectManipulationByIndex).toHaveBeenCalledWith(index);
    });

    it('selectTradeLetter should call selectTradeLetter on select handler', () => {
        service.selectTrade(index);
        expect(select.selectTradeLetter).toHaveBeenCalledWith(index);
    });

    it('moveManipulationRight should call switch letter with right indexes', () => {
        const indexOfManipulation = 0;

        algo.findIndex.and.returnValue(indexOfManipulation);
        service.moveManipulationRight();
        expect(algo.switchLetter).toHaveBeenCalledWith(indexOfManipulation, indexOfManipulation + 1);
    });

    it('moveManipulationRight should call switch letter with right indexes', () => {
        const indexOfManipulation = 6;

        algo.findIndex.and.returnValue(indexOfManipulation);
        service.moveManipulationRight();
        expect(algo.switchLetter).toHaveBeenCalledWith(indexOfManipulation, 0);
    });

    it('moveManipulationRight should do nothing if the is no letter selected for manipulation', () => {
        algo.findIndex.and.returnValue(INDEX_NOT_FOUND);
        service.moveManipulationRight();
        expect(algo.switchLetter).not.toHaveBeenCalled();
    });

    it('moveManipulationLeft should call switch letter with right indexes', () => {
        const indexOfManipulation = 0;
        const expected = 6;

        algo.findIndex.and.returnValue(indexOfManipulation);
        service.moveManipulationLeft();
        expect(algo.switchLetter).toHaveBeenCalledWith(indexOfManipulation, expected);
    });

    it('moveManipulationLeft should call switch letter with right indexes', () => {
        const indexOfManipulation = 6;

        algo.findIndex.and.returnValue(indexOfManipulation);
        service.moveManipulationLeft();
        expect(algo.switchLetter).toHaveBeenCalledWith(indexOfManipulation, indexOfManipulation - 1);
    });

    it('moveManipulationLeft should do nothing if the is no letter selected for manipulation', () => {
        algo.findIndex.and.returnValue(INDEX_NOT_FOUND);
        service.moveManipulationLeft();
        expect(algo.switchLetter).not.toHaveBeenCalled();
    });
});
