import { SelectionAlgo } from '@app/classes/easel-selection-operation/selection-algo';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { FIRST_SWITCH, LAST_SWITCH } from '@app/test/constants/fake-view-letters';
import { mockEaselSelectionService } from '@app/test/mocks/easel-mock/easel-selection-service-mock';
import { BLANK } from '@common/constants/blank';

describe('SelectionAlgo', () => {
    let algo: SelectionAlgo;
    let mockService: EaselSelectionService;

    beforeEach(() => {
        mockService = mockEaselSelectionService();
        algo = new SelectionAlgo(mockService);
    });

    it('viewLetters should return service view letters', () => {
        expect(algo.viewLetters).toEqual(mockService.viewLetters);
    });

    it('findIndex should return not found if selection is undefined', () => {
        expect(algo.findIndex()).toEqual(INDEX_NOT_FOUND);
    });

    it('findIndex should return right index for selection trade', () => {
        const index = 3;

        expect(algo.findIndex(EaselSelectionType.Trade)).toEqual(index);
    });

    it('switchLetter should change letters from the right position', () => {
        const i = 2;
        const j = 3;
        const iLetter = mockService.viewLetters[i];
        const jLetter = mockService.viewLetters[j];

        algo.switchLetter(i, j);

        const iNewLetter = mockService.viewLetters[i];
        const jNewLetter = mockService.viewLetters[j];

        expect(iNewLetter).toEqual(jLetter);
        expect(jNewLetter).toEqual(iLetter);
    });

    it('switchLetter should handle first letter switch', () => {
        const i = 0;
        const j = 6;

        algo.switchLetter(i, j);
        expect(mockService.viewLetters).toEqual(FIRST_SWITCH());
    });

    it('switchLetter should handle first letter switch', () => {
        const i = 6;
        const j = 0;

        algo.switchLetter(i, j);
        expect(mockService.viewLetters).toEqual(LAST_SWITCH());
    });

    it('findNextLetterIndex should find the start letter at first position', () => {
        const startPosition = 6;

        expect(algo.findNextLetterIndex(startPosition, BLANK)).toEqual(0);
    });

    it('findNextLetterIndex should find the start letter at last position', () => {
        const expected = 6;

        expect(algo.findNextLetterIndex(1, BLANK)).toEqual(expected);
    });

    it('findNextLetterIndex should find the J letter at second position', () => {
        const startPosition = 4;
        const expected = 1;

        expect(algo.findNextLetterIndex(startPosition, 'J')).toEqual(expected);
    });

    it('findNextLetterIndex should return index not found for invalid letter', () => {
        expect(algo.findNextLetterIndex(0, 'T')).toEqual(INDEX_NOT_FOUND);
    });

    it('findIndexOfUnselected should the index of S that is hidden', () => {
        const expected = 5;

        expect(algo.findIndexOfHidden('S')).toEqual(expected);
    });
});
