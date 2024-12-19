import { MathUtils } from '@app/classes/utils/math-utils';
import { Interval } from '@app/interface/interval';
import { Vector2D } from '@app/interface/vector-2d';

describe('MathUtils', () => {
    const lowerBound = 10;
    const upperBound = 10;
    const numberOfTest = 10;

    it('should generate a random number between 0 and 10', () => {
        const results: number[] = [];

        for (let i = 0; i < numberOfTest; i++) {
            results.push(MathUtils.randomNumberInInterval(lowerBound, upperBound));
        }
        results.forEach((number: number) => {
            expect(number).toBeGreaterThan(lowerBound - 1);
            expect(number).toBeLessThan(upperBound + 1);
        });
    });

    it('should shuffle an array', () => {
        const array = [];

        for (let i = 0; i < upperBound; i++) array.push(i);
        for (let i = 0; i < numberOfTest; i++) {
            const originalArray = [...array];

            MathUtils.shuffleArray(array);
            for (const number of originalArray) {
                expect(array).toContain(number);
            }

            expect(array).not.toEqual(originalArray);
        }
    });

    it('should retrun an empty array when shuffeling an empty array', () => {
        const array: unknown[] = [];

        MathUtils.shuffleArray(array);
        expect(array).toEqual([]);
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
        expect(sum).toEqual(expected);
    });

    it('should return true if the value is in the interval', () => {
        const interval: Interval = { min: 0, max: 4 };
        const value = 1;

        const expected = MathUtils.isInInterval(interval, value);

        expect(expected).toBeTruthy();
    });

    it('should return false if the value is not in the interval', () => {
        const interval: Interval = { min: 0, max: 4 };
        const value = -1;

        const expected = MathUtils.isInInterval(interval, value);

        expect(expected).toBeFalsy();
    });
});
