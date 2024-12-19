import { ViewLetter } from '@app/classes/view-letter';
import { FAKE_COMMON_LETTERS, FAKE_COMMON_TO_VIEW_LETTERS, FAKE_VIEW_LETTERS } from '@app/test/constants/fake-view-letters';

describe('ViewLetters', () => {
    it('viewToCommon should return view letter array into a common letter array', () => {
        expect(ViewLetter.viewToCommon(FAKE_VIEW_LETTERS())).toEqual(FAKE_COMMON_LETTERS());
        expect(ViewLetter.viewToCommon([])).toEqual([]);
    });

    it('commonToView should return common letter array into a view letter array with selection property est to Unselected', () => {
        expect(ViewLetter.commonToView(FAKE_COMMON_LETTERS())).toEqual(FAKE_COMMON_TO_VIEW_LETTERS());
        expect(ViewLetter.commonToView([])).toEqual([]);
    });
});
