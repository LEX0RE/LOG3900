import { BlankLetter } from '@app/classes/blank-letter/blank-letter';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';

describe('Letter', () => {
    const smallChar = 'a';
    const bigChar = 'A';
    const score = 0;

    it('should create a simple BlankLetter', () => {
        const letter = new BlankLetter(smallChar);

        expect(letter.letter).toEqual(bigChar);
        expect(letter.point).toEqual(score);
    });

    it('should store char in uppercase', () => {
        const letter = new BlankLetter(bigChar);

        expect(letter.letter).toEqual(bigChar);
        expect(letter.point).toEqual(score);
    });

    it('should create blankLetter from commonLetter', () => {
        const commonLetter: CommonLetter = { letter: bigChar, point: score };
        const letter = BlankLetter.commonToBlank(commonLetter);

        expect(letter.letter).toEqual(bigChar);
        expect(letter.point).toEqual(score);
    });
});
