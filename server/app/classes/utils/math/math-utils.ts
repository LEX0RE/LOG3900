export class MathUtils {
    static randomNumberInInterval(lowerBound: number, upperBound: number): number {
        lowerBound = Math.ceil(lowerBound);
        upperBound = Math.floor(upperBound);
        return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
    }

    static randomInArray<T>(values: T[], numberOfElementsToChose: number): T[] {
        values = Array.from(new Set(values).values());
        const chosenElements: Set<T> = new Set();

        if (values.length < numberOfElementsToChose) return values;
        while (chosenElements.size < numberOfElementsToChose) {
            const position: number = this.randomNumberInInterval(0, values.length - 1);

            chosenElements.add(values[position]);
        }
        return Array.from(chosenElements.values());
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

    static accumulator<T, U>(values: U[], initialValue: T, callback: ((accumulatedValueType: T, valueType: U) => T) | null): T {
        let accumulatedValue: T = initialValue;

        values.forEach((value: U) => {
            if (callback) accumulatedValue = callback(accumulatedValue, value);
        });
        callback = null;
        return accumulatedValue;
    }
}
