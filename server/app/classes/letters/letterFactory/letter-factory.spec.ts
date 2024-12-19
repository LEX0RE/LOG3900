import { LettersFactory } from '@app/classes/letters/letterFactory/letter-factory';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('LettersFactory', () => {
    it('should create a "a" letter with point 1', () => {
        const expected = { letter: 'a', point: 1 };

        expect(LettersFactory.a).to.eql(expected);
    });
    it('should create a "b" letter with point 3', () => {
        const expected = { letter: 'b', point: 3 };

        expect(LettersFactory.b).to.eql(expected);
    });
    it('should create a "c" letter with point 3', () => {
        const expected = { letter: 'c', point: 3 };

        expect(LettersFactory.c).to.eql(expected);
    });
    it('should create a "d" letter with point 2', () => {
        const expected = { letter: 'd', point: 2 };

        expect(LettersFactory.d).to.eql(expected);
    });
    it('should create a "e" letter with point 1', () => {
        const expected = { letter: 'e', point: 1 };

        expect(LettersFactory.e).to.eql(expected);
    });
    it('should create a "f" letter with point 4', () => {
        const expected = { letter: 'f', point: 4 };

        expect(LettersFactory.f).to.eql(expected);
    });
    it('should create a "g" letter with point 2', () => {
        const expected = { letter: 'g', point: 2 };

        expect(LettersFactory.g).to.eql(expected);
    });
    it('should create a "h" letter with point 4', () => {
        const expected = { letter: 'h', point: 4 };

        expect(LettersFactory.h).to.eql(expected);
    });
    it('should create a "i" letter with point 1', () => {
        const expected = { letter: 'i', point: 1 };

        expect(LettersFactory.i).to.eql(expected);
    });
    it('should create a "j" letter with point 8', () => {
        const expected = { letter: 'j', point: 8 };

        expect(LettersFactory.j).to.eql(expected);
    });
    it('should create a "k" letter with point 10', () => {
        const expected = { letter: 'k', point: 10 };

        expect(LettersFactory.k).to.eql(expected);
    });
    it('should create a "l" letter with point 1', () => {
        const expected = { letter: 'l', point: 1 };

        expect(LettersFactory.l).to.eql(expected);
    });
    it('should create a "m" letter with point 2', () => {
        const expected = { letter: 'm', point: 2 };

        expect(LettersFactory.m).to.eql(expected);
    });
    it('should create a "n" letter with point 1', () => {
        const expected = { letter: 'n', point: 1 };

        expect(LettersFactory.n).to.eql(expected);
    });
    it('should create a "o" letter with point 1', () => {
        const expected = { letter: 'o', point: 1 };

        expect(LettersFactory.o).to.eql(expected);
    });
    it('should create a "p" letter with point 3', () => {
        const expected = { letter: 'p', point: 3 };

        expect(LettersFactory.p).to.eql(expected);
    });
    it('should create a "q" letter with point 8', () => {
        const expected = { letter: 'q', point: 8 };

        expect(LettersFactory.q).to.eql(expected);
    });
    it('should create a "r" letter with point 1', () => {
        const expected = { letter: 'r', point: 1 };

        expect(LettersFactory.r).to.eql(expected);
    });
    it('should create a "s" letter with point 1', () => {
        const expected = { letter: 's', point: 1 };

        expect(LettersFactory.s).to.eql(expected);
    });
    it('should create a "t" letter with point 1', () => {
        const expected = { letter: 't', point: 1 };

        expect(LettersFactory.t).to.eql(expected);
    });
    it('should create a "u" letter with point 1', () => {
        const expected = { letter: 'u', point: 1 };

        expect(LettersFactory.u).to.eql(expected);
    });
    it('should create a "v" letter with point 4', () => {
        const expected = { letter: 'v', point: 4 };

        expect(LettersFactory.v).to.eql(expected);
    });
    it('should create a "w" letter with point 10', () => {
        const expected = { letter: 'w', point: 10 };

        expect(LettersFactory.w).to.eql(expected);
    });
    it('should create a "x" letter with point 10', () => {
        const expected = { letter: 'x', point: 10 };

        expect(LettersFactory.x).to.eql(expected);
    });
    it('should create a "y" letter with point 10', () => {
        const expected = { letter: 'y', point: 10 };

        expect(LettersFactory.y).to.eql(expected);
    });
    it('should create a "z" letter with point 10', () => {
        const expected = { letter: 'z', point: 10 };

        expect(LettersFactory.z).to.eql(expected);
    });
    it('should create a "*" letter with point 0', () => {
        const expected = { letter: '*', point: 0 };

        expect(LettersFactory.blank).to.eql(expected);
    });
});
