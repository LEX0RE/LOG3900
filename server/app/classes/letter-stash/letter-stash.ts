import { Letter } from '@app/classes/letters/letter/letter';
import { LettersFactory } from '@app/classes/letters/letterFactory/letter-factory';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { DEFAULT_QUANTITIES } from '@app/constants/default/default-letter';
import { TOO_MANY_LETTERS_REMOVE } from '@app/constants/error/letter-stash';
import { QuantityEntry } from '@app/interface/letter-quantities';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';

export class LetterStash {
    letterStack: Letter[];
    letterQuantities: QuantityEntry[];

    constructor(letterQuantities: QuantityEntry[] = DEFAULT_QUANTITIES, letterStack: Letter[] = []) {
        this.letterStack = letterStack;
        this.letterQuantities = letterQuantities;
        this.letterQuantities.forEach((entry: QuantityEntry) => {
            for (let i = 0; i < entry.quantity; i++) this.letterStack.push(LettersFactory[entry.letter]);
        });
        this.mixLetters();
    }

    get size(): number {
        return this.letterStack.length;
    }

    get isEmpty(): boolean {
        return !this.size;
    }

    get toOccurrences(): Map<string, number> {
        const occurrencesMap = new Map<string, number>();

        this.letterStack.forEach((letter: CommonLetter) => {
            let letterOccurrences = occurrencesMap.get(letter.letter);

            if (!letterOccurrences) letterOccurrences = 0;
            occurrencesMap.set(letter.letter.toLowerCase(), letterOccurrences + 1);
        });
        return occurrencesMap;
    }

    mixLetters(): void {
        MathUtils.shuffleArray(this.letterStack);
    }

    addLetters(letters: Letter[]): void {
        letters.forEach((letter: Letter) => {
            this.letterStack.push(letter);
        });
        this.mixLetters();
    }

    removeLetters(quantity: number): Letter[] {
        if (quantity > this.size) throw new Error(TOO_MANY_LETTERS_REMOVE);
        else {
            const letterGiven: Letter[] = [];

            for (let i = 0; i < quantity; i++) {
                const letterPicked = this.letterStack.pop();

                if (!letterPicked) throw new Error(TOO_MANY_LETTERS_REMOVE);
                letterGiven.push(letterPicked);
            }
            return letterGiven;
        }
    }

    tradeLetters(letters: Letter[]): Letter[] {
        const lettersToGive = this.removeLetters(letters.length);

        this.addLetters(letters);
        return lettersToGive;
    }
}
