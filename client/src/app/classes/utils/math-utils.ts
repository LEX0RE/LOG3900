import { Interval } from '@app/interface/interval';
export class MathUtils {
    static randomNumberInInterval(lowerBound: number, upperBound: number): number {
        lowerBound = Math.ceil(lowerBound);
        upperBound = Math.floor(upperBound);
        return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
    }

    /**
     * Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     */
    static shuffleArray(values: unknown[]): void {
        for (let i = 0; i < values.length; i++) {
            const j = MathUtils.randomNumberInInterval(i, values.length - 1);
            const temporaryValue = values[i];

            values[i] = values[j];
            values[j] = temporaryValue;
        }
    }

    static accumulator<T, U>(values: U[], initialValue: T, callback: (accType: T, valueType: U) => T): T {
        let acc: T = initialValue;

        values.forEach((value: U) => (acc = callback(acc, value)));
        return acc;
    }

    static isInInterval(interval: Interval, value: number): boolean {
        return interval.min < value && value < interval.max;
    }
}
