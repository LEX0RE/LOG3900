import { LetterStash } from '@app/classes/letter-stash/letter-stash';
import { Letter } from '@app/classes/letters/letter/letter';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { FAKE_LETTER_STACK, FAKE_OCCURRENCE_STACK } from '@app/test/constants/fake-letter-stash';
import { expect } from 'chai';
import { describe } from 'mocha';
import { assert, restore, spy, stub } from 'sinon';

describe('LetterStash', () => {
    let letterStash: LetterStash;
    const nLetters = 102;
    const aLetter: Letter = { letter: 'a', point: 3 };
    const lLetter: Letter = { letter: 'l', point: 2 };
    const oLetter: Letter = { letter: 'o', point: 4 };
    const testWord: Letter[] = [aLetter, lLetter, lLetter, oLetter];

    beforeEach(() => {
        letterStash = new LetterStash();
    });

    afterEach(() => restore());

    it('should be empty', () => {
        letterStash.letterStack = [];
        expect(letterStash.isEmpty).to.be.equal(true);
    });

    it('should not be empty', () => {
        expect(letterStash.isEmpty).to.be.equal(false);
    });

    it('should create a simple LetterStash', () => {
        const stash = new LetterStash([], FAKE_LETTER_STACK());

        expect(stash.letterStack).to.have.deep.members(FAKE_LETTER_STACK());
    });

    it('should return the size of the stack when accessing the size property', () => {
        expect(letterStash.size).to.equal(nLetters);
    });

    it('should call the shuffle from MathUtils', () => {
        const shuffleSpy = spy(MathUtils, 'shuffleArray');
        const stackBefore = letterStash.letterStack;

        letterStash.mixLetters();
        assert.calledOnce(shuffleSpy);
        assert.calledWith(shuffleSpy, stackBefore);
    });

    it('should call mix when adding letters', () => {
        const mixSpy = spy(letterStash, 'mixLetters');

        letterStash.addLetters(testWord);
        assert.calledOnce(mixSpy);
    });

    it('should addLetters when adding letters', () => {
        const expected = [...letterStash.letterStack, ...testWord];

        letterStash.addLetters(testWord);
        expect(letterStash.letterStack).to.have.deep.members(expected);
    });

    it('should add nothing when passing an empty array to adding letters', () => {
        const expected = [...letterStash.letterStack];

        letterStash.addLetters([]);
        expect(letterStash.letterStack).to.have.deep.members(expected);
    });

    it('should remove letters form stack and return them', () => {
        const nRemoved = 12;
        const expectedSize = nLetters - nRemoved;
        const removedLetters = letterStash.removeLetters(nRemoved);

        expect(letterStash.letterStack.length).to.equal(expectedSize);
        expect(removedLetters.length).to.be.equal(nRemoved);
    });

    it('should reject if we try to remove too many letters', () => {
        expect(() => letterStash.removeLetters(nLetters + nLetters)).to.throw();
    });

    it('should call removeLetters and addLetters when tradeLetters', () => {
        const removeSpy = spy(letterStash, 'removeLetters');
        const addingSpy = spy(letterStash, 'addLetters');
        const newLetters = letterStash.tradeLetters(testWord);

        assert.calledOnce(removeSpy);
        assert.calledWith(removeSpy, testWord.length);
        assert.calledOnce(addingSpy);
        assert.calledWith(addingSpy, testWord);
        expect(newLetters.length).to.equal(testWord.length);
    });

    it('should failing case pop return undefined remove too many letters', () => {
        stub(letterStash.letterStack, 'pop').callsFake(() => {
            return undefined;
        });

        expect(() => letterStash.removeLetters(nLetters)).to.throw();
    });

    it('toOccurrences should return letterStack to occurrence map', () => {
        const stash = new LetterStash([], FAKE_LETTER_STACK());
        const result = stash.toOccurrences;

        FAKE_OCCURRENCE_STACK().forEach((value: number, key: string) => {
            expect(result.has(key)).to.eql(true);
            expect(result.get(key)).to.eql(value);
            result.delete(key);
        });
        expect(result.size).to.be.eql(0);
    });
});
