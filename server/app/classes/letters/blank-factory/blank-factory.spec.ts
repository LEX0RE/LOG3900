import { BlankLettersFactory } from '@app/classes/letters/blank-factory/blank-factory';
import { BlankLetter } from '@app/classes/letters/blank-letter/blank-letter';
import { ZERO_POINT } from '@app/constants/default/default-letter';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('BlankLettersFactory', () => {
    const letter: BlankLetter = { letter: '', point: ZERO_POINT };

    it('should create a "a" letter with point 0', () => {
        letter.letter = 'A';

        expect(BlankLettersFactory.a).to.eql(letter);
    });
    it('should create a "b" letter with point 0', () => {
        letter.letter = 'B';

        expect(BlankLettersFactory.b).to.eql(letter);
    });
    it('should create a "c" letter with point 0', () => {
        letter.letter = 'C';

        expect(BlankLettersFactory.c).to.eql(letter);
    });
    it('should create a "d" letter with point 0', () => {
        letter.letter = 'D';

        expect(BlankLettersFactory.d).to.eql(letter);
    });
    it('should create a "e" letter with point 0', () => {
        letter.letter = 'E';

        expect(BlankLettersFactory.e).to.eql(letter);
    });
    it('should create a "f" letter with point 0', () => {
        letter.letter = 'F';

        expect(BlankLettersFactory.f).to.eql(letter);
    });
    it('should create a "g" letter with point 0', () => {
        letter.letter = 'G';

        expect(BlankLettersFactory.g).to.eql(letter);
    });
    it('should create a "h" letter with point 0', () => {
        letter.letter = 'H';

        expect(BlankLettersFactory.h).to.eql(letter);
    });
    it('should create a "i" letter with point 0', () => {
        letter.letter = 'I';

        expect(BlankLettersFactory.i).to.eql(letter);
    });
    it('should create a "j" letter with point 0', () => {
        letter.letter = 'J';

        expect(BlankLettersFactory.j).to.eql(letter);
    });
    it('should create a "k" letter with point 0', () => {
        letter.letter = 'K';

        expect(BlankLettersFactory.k).to.eql(letter);
    });
    it('should create a "l" letter with point 0', () => {
        letter.letter = 'L';

        expect(BlankLettersFactory.l).to.eql(letter);
    });
    it('should create a "m" letter with point 0', () => {
        letter.letter = 'M';

        expect(BlankLettersFactory.m).to.eql(letter);
    });
    it('should create a "n" letter with point 0', () => {
        letter.letter = 'N';

        expect(BlankLettersFactory.n).to.eql(letter);
    });
    it('should create a "o" letter with point 0', () => {
        letter.letter = 'O';

        expect(BlankLettersFactory.o).to.eql(letter);
    });
    it('should create a "p" letter with point 0', () => {
        letter.letter = 'P';

        expect(BlankLettersFactory.p).to.eql(letter);
    });
    it('should create a "q" letter with point 0', () => {
        letter.letter = 'Q';

        expect(BlankLettersFactory.q).to.eql(letter);
    });
    it('should create a "r" letter with point 0', () => {
        letter.letter = 'R';

        expect(BlankLettersFactory.r).to.eql(letter);
    });
    it('should create a "s" letter with point 0', () => {
        letter.letter = 'S';

        expect(BlankLettersFactory.s).to.eql(letter);
    });
    it('should create a "t" letter with point 0', () => {
        letter.letter = 'T';

        expect(BlankLettersFactory.t).to.eql(letter);
    });
    it('should create a "u" letter with point 0', () => {
        letter.letter = 'U';

        expect(BlankLettersFactory.u).to.eql(letter);
    });
    it('should create a "v" letter with point 0', () => {
        letter.letter = 'V';

        expect(BlankLettersFactory.v).to.eql(letter);
    });
    it('should create a "w" letter with point 0', () => {
        letter.letter = 'W';

        expect(BlankLettersFactory.w).to.eql(letter);
    });
    it('should create a "x" letter with point 0', () => {
        letter.letter = 'X';

        expect(BlankLettersFactory.x).to.eql(letter);
    });
    it('should create a "y" letter with point 0', () => {
        letter.letter = 'Y';

        expect(BlankLettersFactory.y).to.eql(letter);
    });
    it('should create a "z" letter with point 0', () => {
        letter.letter = 'Z';

        expect(BlankLettersFactory.z).to.eql(letter);
    });
});
