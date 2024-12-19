import { MathUtils } from '@app/classes/utils/math/math-utils';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('MathUtils', () => {
    const lowerBound = 10;
    const upperBound = 10;
    const numberOfTest = 10;
    let testArray: number[];
    const numberOfElementsToChose = 2;
    const numberArrayW = 0;
    const numberArrayX = 3;
    const numberArrayY = 5;
    const numberArrayZ = 8;

    beforeEach(() => {
        testArray = [numberArrayW, numberArrayZ, numberArrayX, numberArrayY];
    });

    it('should generate a random number between 0 and 10', () => {
        const results: number[] = [];

        for (let i = 0; i < numberOfTest; i++) {
            results.push(MathUtils.randomNumberInInterval(lowerBound, upperBound));
        }
        results.forEach((number: number) => {
            expect(number).to.be.above(lowerBound - 1);
            expect(number).to.be.below(upperBound + 1);
        });
    });

    it('randomInArray should return same elements array if no elements are the same', () => {
        expect(MathUtils.randomInArray(testArray, testArray.length)).to.have.deep.members(testArray);
    });

    it('randomInArray should return smaller array if some elements are the same', () => {
        testArray = [numberArrayW, numberArrayZ, numberArrayZ, numberArrayY];
        const expectedArray: number[] = [numberArrayW, numberArrayY, numberArrayZ];

        expect(MathUtils.randomInArray(testArray, testArray.length)).to.have.deep.members(expectedArray);
    });

    it('randomInArray should return empty array if we dont want to chose any elements', () => {
        expect(MathUtils.randomInArray(testArray, 0)).to.have.deep.members([]);
    });

    it('randomInArray should return empty array if array is empty', () => {
        expect(MathUtils.randomInArray([], numberOfElementsToChose)).to.have.deep.members([]);
    });

    it('randomInArray should return random array with letters', () => {
        const randomArray1: number[] = MathUtils.randomInArray(testArray, numberOfElementsToChose);
        const randomArray2: number[] = MathUtils.randomInArray(testArray, numberOfElementsToChose);
        const randomArray3: number[] = MathUtils.randomInArray(testArray, numberOfElementsToChose);

        const isSame: boolean = randomArray1 === randomArray2 && randomArray1 === randomArray3 && randomArray2 === randomArray3;

        expect(randomArray1.length).to.eql(numberOfElementsToChose);
        expect(randomArray2.length).to.eql(numberOfElementsToChose);
        expect(randomArray3.length).to.eql(numberOfElementsToChose);
        expect(isSame).to.eql(false);
    });

    it('randomInArray should return random array with strings', () => {
        const testArrayString: string[] = ['allo', 'bonjour'];
        const randomArray1: string[] = MathUtils.randomInArray(testArrayString, numberOfElementsToChose);
        const randomArray2: string[] = MathUtils.randomInArray(testArrayString, numberOfElementsToChose);
        const randomArray3: string[] = MathUtils.randomInArray(testArrayString, numberOfElementsToChose);

        const isSame: boolean = randomArray1 === randomArray2 && randomArray1 === randomArray3 && randomArray2 === randomArray3;

        expect(randomArray1.length).to.eql(numberOfElementsToChose);
        expect(randomArray2.length).to.eql(numberOfElementsToChose);
        expect(randomArray3.length).to.eql(numberOfElementsToChose);
        expect(isSame).to.eql(false);
    });

    it('should shuffle an array', () => {
        const array = [];

        for (let i = 0; i < upperBound; i++) array.push(i);
        for (let i = 0; i < numberOfTest; i++) {
            const originalArray = [...array];

            MathUtils.shuffleArray(array);
            expect(array).to.have.deep.members(originalArray);
            expect(array).to.not.eq(originalArray);
        }
    });

    it('should return an empty array when shuffling an empty array', () => {
        const array: unknown[] = [];

        MathUtils.shuffleArray(array);
        expect(array).to.eql([]);
    });

    it('should do the sum of xs when accumulated', () => {
        const array: Vector2D[] = [
            { x: 5, y: 4 },
            { x: 5, y: 4 },
            { x: 5, y: 4 },
        ];
        const expected = 15;
        let sum = 0;

        sum = MathUtils.accumulator<number, Vector2D>(array, sum, (acc, vec: Vector2D) => {
            acc += vec.x;
            return acc;
        });
        expect(sum).to.be.equal(expected);
    });

    it('should do skip sum of xs when non callback', () => {
        const array: Vector2D[] = [
            { x: 5, y: 4 },
            { x: 5, y: 4 },
            { x: 5, y: 4 },
        ];
        const expected = 0;
        let sum = 0;

        sum = MathUtils.accumulator<number, Vector2D>(array, sum, null);
        expect(sum).to.be.equal(expected);
    });
});
