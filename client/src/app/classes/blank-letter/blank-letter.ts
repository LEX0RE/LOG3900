import { ZERO_POINT } from '@app/constants/font-letter';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';
export class BlankLetter implements CommonLetter {
    point: number;
    letter: string;

    constructor(letter: string) {
        this.letter = letter.toUpperCase();
        this.point = ZERO_POINT;
    }

    static commonToBlank(letter: CommonLetter): BlankLetter {
        return new BlankLetter(letter.letter);
    }
}
