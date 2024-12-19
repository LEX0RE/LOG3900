import { Easel } from '@app/classes/easel/easel';
import { BlankLettersFactory } from '@app/classes/letters/blank-factory/blank-factory';
import { Letter } from '@app/classes/letters/letter/letter';
import { LettersFactory as l } from '@app/classes/letters/letterFactory/letter-factory';
import { expect } from 'chai';
import { describe } from 'mocha';
import { restore } from 'sinon';

describe('Easel', () => {
    let easel: Easel;
    const max = 7;
    const dhfswdg = [l.d, l.h, l.f, l.s, l.w, l.d, l.g];
    const abc = [l.a, l.b, l.c];
    const dfsw = [l.d, l.f, l.s, l.w];
    const hdg = [l.h, l.d, l.g];
    const abBlank = [l.a, l.b, l.blank];

    beforeEach(async () => {
        easel = new Easel();
    });

    afterEach(() => restore());

    it('should throw an error when trying to add more then 7 letters', () => {
        easel.letters = dhfswdg;
        expect(() => easel.addLetters(abc)).to.throw();
    });

    it('should have 4 letters', () => {
        const nLetters = 4;

        easel.letters = dfsw;
        expect(easel.size).to.be.equal(nLetters);
    });

    it('should add letters to easel', () => {
        easel.letters = dfsw;
        easel.addLetters(hdg);
        expect(easel.letters).to.have.deep.members(dhfswdg);
    });

    it('should remove letters from easel', () => {
        easel.letters = dhfswdg;
        const removed = easel.removeLetters(hdg);

        expect(removed).to.have.deep.members(hdg);
        expect(removed.length + easel.letters.length).to.be.equal(max);
        expect(easel.letters).to.have.deep.members(dfsw);
    });

    it('should throw an error when trying to remove letters that are not there', () => {
        easel.letters = dhfswdg;
        expect(() => easel.removeLetters(abc)).to.throw();
    });

    it('should contains passed', () => {
        easel.letters = dhfswdg;
        const result = easel.isContaining(dfsw);

        expect(result).to.be.equal(true);
    });

    it('should contains failed', () => {
        easel.letters = dhfswdg;
        const result = easel.isContaining(abc);

        expect(result).to.be.equal(false);
        expect(easel.letters).to.have.deep.members([...dhfswdg]);
    });

    it('should contains count letter only once', () => {
        const letters = [l.a, l.a, l.c, l.d];

        easel.letters = letters;
        const result = easel.isContaining([l.a, l.a, l.a, l.c]);

        expect(result).to.be.equal(false);
        expect(easel.letters).to.have.deep.members([...letters]);
    });

    it('should contains handle duplicates', () => {
        const letters = [l.a, l.a, l.c, l.d];

        easel.letters = letters;
        const result = easel.isContaining([l.a, l.c]);

        expect(result).to.be.equal(true);
        expect(easel.letters).to.have.deep.members([...letters]);
    });

    it('contains should hanlde blank', () => {
        easel.letters = abBlank;

        const result = easel.isContaining([l.a, BlankLettersFactory.c]);

        expect(result).to.eql(true);
        expect(easel.letters).to.have.deep.members([...abBlank]);
    });

    it('totalScore should get correct score', () => {
        const letters = [l.a, l.a, l.x, l.blank];

        easel.letters = letters;
        const expectedScore = 12;

        expect(easel.totalScore).to.be.equal(expectedScore);
    });

    it('should have a score of 0, only blank', () => {
        const letters = [l.blank];

        easel.letters = letters;
        const expectedScore = 0;

        expect(easel.totalScore).to.be.equal(expectedScore);
    });

    it('should have a score of 0', () => {
        const letters: Letter[] = [];

        easel.letters = letters;
        const expectedScore = 0;

        expect(easel.totalScore).to.be.equal(expectedScore);
    });

    it('removeChar should handle blanks', () => {
        const fakeLetterRemove: Letter = BlankLettersFactory.h;
        const fakeRemoved: Letter[] = [];

        easel.letters = [l.blank, l.a, l.j, l.g];
        // eslint-disable-next-line dot-notation -- Méthode privée
        easel['removeChar'](fakeLetterRemove, fakeRemoved);
        expect(fakeRemoved).to.be.eql([l.blank]);
    });

    it('makeHand should return a string with all letters from the easel', () => {
        const abcdefg = [l.a, l.b, l.c, l.d, l.e, l.f, l.g];
        const abcdefgString = 'abcdefg';
        const hij = [l.h, l.i, l.j];
        const hijString = 'hij';

        easel.letters = abcdefg;
        expect(easel.hand).to.eql(abcdefgString);
        easel.letters = hij;
        expect(easel.hand).to.eql(hijString);
        easel.letters = [];
        expect(easel.hand).to.eql('');
    });
});
