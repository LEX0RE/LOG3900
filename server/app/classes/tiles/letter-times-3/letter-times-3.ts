import { Letter } from '@app/classes/letters/letter/letter';
import { BONUS_MULTIPLIER, Tile } from '@app/classes/tiles/tile';

export class LetterTimes3 extends Tile {
    letter: Letter;
    letterBonus: number;
    wordBonus: number;
    isBonusActive: boolean;

    constructor(letter: Letter) {
        super();
        this.letter = letter;
        this.letterBonus = BONUS_MULTIPLIER.timesThreeMultiplier;
        this.wordBonus = BONUS_MULTIPLIER.defaultMultiplier;
        this.isBonusActive = true;
    }

    clone(): Tile {
        return ((): LetterTimes3 => {
            const cloned = new LetterTimes3({ letter: this.letter.letter, point: this.letter.point });

            cloned.isBonusActive = this.isBonusActive;
            return cloned;
        })();
    }
}
