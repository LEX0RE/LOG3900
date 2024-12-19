import { BlankLetter } from '@app/classes/letters/blank-letter/blank-letter';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('Letter', () => {
    let smallChar: string;
    let bigChar: string;
    let score: number;

    beforeEach(() => {
        smallChar = 'a';
        bigChar = 'A';
        score = 0;
    });

    it('should create a simple BlankLetter', () => {
        const letter = new BlankLetter(smallChar, score);

        expect(letter).to.ownProperty('letter', bigChar);
        expect(letter).to.ownProperty('point', score);
    });

    it('should store char in lowercase', () => {
        const letter = new BlankLetter(bigChar, score);

        expect(letter).to.ownProperty('letter', bigChar);
        expect(letter).to.ownProperty('point', score);
    });
});
