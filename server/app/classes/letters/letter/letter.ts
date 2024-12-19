import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';
export class Letter implements CommonLetter {
    letter: string;
    readonly point: number;

    constructor(letter: string, point: number) {
        this.letter = letter.toLowerCase();
        this.point = point;
    }
}
