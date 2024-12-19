export const mockSelectionAlgo = () =>
    jasmine.createSpyObj('SelectionAlgo', ['findIndex', 'switchLetter', 'findNextLetterIndex', 'findAllIndexesForALetter', 'findIndexOfHidden'], {
        viewLetters: [],
    });
