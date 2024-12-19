import { EaselSelect } from '@app/classes/easel-selection-operation/select/easel-select';
import { EaselSelectionLogic } from '@app/classes/easel-selection-operation/select/easel-selection-logic/easel-selection-logic';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { DO_NOTHING_WITH_PARAMETERS } from '@app/test/constants/do-nothing-function';
import { mockEaselSelectionLogic } from '@app/test/mocks/easel-mock/easel-selection-logic-mock';
import { mockEaselSelectionService } from '@app/test/mocks/easel-mock/easel-selection-service-mock';

describe('EaselSelect', () => {
    const char = 'J';
    const index = 3;
    let select: EaselSelect;
    let service: EaselSelectionService;
    let logic: EaselSelectionLogic;

    beforeEach(() => {
        service = mockEaselSelectionService();
        logic = mockEaselSelectionLogic();
        select = new EaselSelect(service, logic);
    });

    it('viewLetters should return service view letters', () => {
        expect(select.viewLetters).toEqual(service.viewLetters);
    });

    it('algo should return service algo', () => {
        expect(select.algo).toEqual(service.algo);
    });

    it('cancel should return service cancel', () => {
        expect(select.cancel).toEqual(service.cancelHandler);
    });

    it('selectManipulationByString should call selectLetterByString', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- espion sur membre privee
        const spy = spyOn(select, 'selectLetterByString' as any);

        (logic.setManipulationSelection as jasmine.Spy).and.returnValue(DO_NOTHING_WITH_PARAMETERS);

        select.selectManipulationByString(char);
        expect(spy).toHaveBeenCalledWith(char, DO_NOTHING_WITH_PARAMETERS, EaselSelectionType.Manipulation);
    });

    it('selectHiddenLetterByString should call selectLetterByString', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- espion sur membre privee
        const spy = spyOn(select, 'selectLetterByString' as any);

        select.selectHiddenLetterByString(char);
        expect(spy).toHaveBeenCalledWith(char, logic.setHiddenSelection);
    });

    it('selectManipulationByIndex should call handleSimpleSelect', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- espion sur membre privee
        const spy = spyOn(select, 'handleSimpleSelect' as any);

        (logic.setManipulationSelection as jasmine.Spy).and.returnValue(DO_NOTHING_WITH_PARAMETERS);
        select.selectManipulationByIndex(index);
        expect(spy).toHaveBeenCalledWith(index, EaselSelectionType.Manipulation, DO_NOTHING_WITH_PARAMETERS);
    });

    it('selectTradeLetter should call handleSimpleSelect', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- espion sur membre privee
        const spy = spyOn(select, 'handleSimpleSelect' as any);

        select.selectTradeLetter(index);
        expect(spy).toHaveBeenCalledWith(index, EaselSelectionType.Trade, logic.toggleTradeSelection);
    });

    it('unselectHiddenLetterByString should unselect hidden', () => {
        const indexOfLetter = 4;

        (service.algo.findIndexOfHidden as jasmine.Spy).and.returnValue(indexOfLetter);
        select.unselectHiddenLetterByString(char);

        expect(logic.unselectHidden).toHaveBeenCalledWith(select.viewLetters, indexOfLetter);
    });

    it('unselectHiddenLetterByString should do nothing if not found', () => {
        (service.algo.findIndexOfHidden as jasmine.Spy).and.returnValue(INDEX_NOT_FOUND);
        select.unselectHiddenLetterByString(char);

        expect(logic.unselectHidden).not.toHaveBeenCalled();
    });

    it('handleSimpleSelect should call actionOnLetter', () => {
        const spy = jasmine.createSpy();

        (logic.unselectedAllType as jasmine.Spy).and.returnValue(DO_NOTHING_WITH_PARAMETERS);

        // eslint-disable-next-line dot-notation -- Méthode privée
        select['handleSimpleSelect'](index, EaselSelectionType.Unselected, spy);

        expect(spy).toHaveBeenCalledWith(select.viewLetters, index);
    });

    it('handleSimpleSelect should not call actionOnLetter if index out of upper bound', () => {
        const upperBound = 7;
        const spy = jasmine.createSpy();

        // eslint-disable-next-line dot-notation -- Méthode privée
        select['handleSimpleSelect'](upperBound, EaselSelectionType.Unselected, spy);

        expect(spy).not.toHaveBeenCalled();
    });

    it('handleSimpleSelect should not call actionOnLetter if index out of lower bound', () => {
        const lowerBound = -1;
        const spy = jasmine.createSpy();

        // eslint-disable-next-line dot-notation -- Méthode privée
        select['handleSimpleSelect'](lowerBound, EaselSelectionType.Unselected, spy);

        expect(spy).not.toHaveBeenCalled();
    });

    it('selectLetterByString should call the action with the right index and return the letter', () => {
        const spy = jasmine.createSpy();

        (service.algo.findIndex as jasmine.Spy).and.returnValue(INDEX_NOT_FOUND);
        (service.algo.findNextLetterIndex as jasmine.Spy).and.returnValue(index);

        // eslint-disable-next-line dot-notation -- Méthode privée
        const letter = select['selectLetterByString'](char, spy, EaselSelectionType.Trade);

        expect(spy).toHaveBeenCalledWith(select.viewLetters, index);
        expect(letter).toEqual(select.viewLetters[index]);
    });

    it('selectLetterByString should call findNext letter  if selection is already selected and do nothing', () => {
        const spy = jasmine.createSpy();

        (service.algo.findIndex as jasmine.Spy).and.returnValue(index);
        (service.algo.findNextLetterIndex as jasmine.Spy)
            .withArgs(0, char)
            .and.returnValue(index)
            .withArgs(index, char)
            .and.returnValue(INDEX_NOT_FOUND);

        // eslint-disable-next-line dot-notation -- Méthode privée
        const letter = select['selectLetterByString'](char, spy, EaselSelectionType.Trade);

        expect(spy).not.toHaveBeenCalled();
        expect(letter).toBeUndefined();
    });
});
