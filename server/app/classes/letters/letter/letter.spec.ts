import { Letter } from '@app/classes/letters/letter/letter';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('Letter', () => {
    let smallChar: string;
    let bigChar: string;
    let score: number;

    beforeEach(async () => {
        smallChar = 'a';
        bigChar = 'A';
        score = 3;
    });

    it('should create a simple Letter', () => {
        const letter = new Letter(smallChar, score);

        expect(letter).to.ownProperty('letter', smallChar);
        expect(letter).to.ownProperty('point', score);
    });

    it('should store char in lowercase', () => {
        const letter = new Letter(bigChar, score);

        expect(letter).to.ownProperty('letter', smallChar);
        expect(letter).to.ownProperty('point', score);
    });
});
