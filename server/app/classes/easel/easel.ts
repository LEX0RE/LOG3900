import { BlankLetter } from '@app/classes/letters/blank-letter/blank-letter';
import { Letter } from '@app/classes/letters/letter/letter';
import { LettersFactory } from '@app/classes/letters/letterFactory/letter-factory';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { LETTER_MISSING, TOO_MANY_LETTERS } from '@app/constants/error/easel';
import { EASEL_SIZE } from '@app/constants/miscellaneous';
import { BLANK } from '@common/constants/blank';
import { CommonEasel } from '@common/interfaces/game-view-related/common-easel';

export class Easel implements CommonEasel {
    letters: Letter[];

    constructor() {
        this.letters = [];
    }

    get hand(): string {
        return MathUtils.accumulator(this.letters, '', (hand: string, letter: Letter) => {
            hand += letter.letter;
            return hand;
        });
    }

    get totalScore(): number {
        return MathUtils.accumulator<number, Letter>(this.letters, 0, (scoreSum: number, letter: Letter) => {
            scoreSum += letter.point;
            return scoreSum;
        });
    }

    get size(): number {
        return this.letters.length;
    }

    isContaining(letters: Letter[]): boolean {
        let hand = this.hand;
        let contain = true;

        letters.forEach((letter: Letter) => {
            const sizeBefore = hand.length;

            if (letter.letter === letter.letter.toUpperCase()) hand = hand.replace(BLANK, '');
            else hand = hand.replace(letter.letter, '');

            if (hand.length !== sizeBefore - 1) contain = false;
        });
        return contain;
    }

    addLetters(letters: Letter[]) {
        if (this.letters.length + letters.length > EASEL_SIZE) throw new Error(TOO_MANY_LETTERS);
        this.letters = [...this.letters, ...letters];
    }

    removeLetters(characters: Letter[]): Letter[] {
        const removed: Letter[] = [];

        characters.forEach((character: Letter) => this.removeChar(character, removed));
        return removed;
    }

    private removeChar(character: Letter, removed: Letter[]): void {
        let found = false;

        if (character instanceof BlankLetter) character = LettersFactory.blank;

        this.letters = this.letters.reduce((letters: Letter[], letter: Letter) => {
            if (letter.letter === character.letter && !found) {
                found = true;
                removed.push(letter);
            } else letters.push(letter);
            return letters;
        }, []);
        if (!found) throw Error(LETTER_MISSING);
    }
}
