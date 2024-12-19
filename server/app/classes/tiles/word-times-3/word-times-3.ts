import { Letter } from '@app/classes/letters/letter/letter';
import { BONUS_MULTIPLIER, Tile } from '@app/classes/tiles/tile';

export class WordTimes3 extends Tile {
    letter: Letter;
    letterBonus: number;
    wordBonus: number;
    isBonusActive: boolean;

    constructor(letter: Letter) {
        super();
        this.letter = letter;
        this.letterBonus = BONUS_MULTIPLIER.defaultMultiplier;
        this.wordBonus = BONUS_MULTIPLIER.timesThreeMultiplier;
        this.isBonusActive = true;
    }

    clone(): Tile {
        return ((): WordTimes3 => {
            const cloned = new WordTimes3({ letter: this.letter.letter, point: this.letter.point });

            cloned.isBonusActive = this.isBonusActive;
            return cloned;
        })();
    }
}
