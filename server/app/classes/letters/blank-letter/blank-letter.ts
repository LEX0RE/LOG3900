import { Letter } from '@app/classes/letters/letter/letter';
export class BlankLetter extends Letter {
    constructor(letter: string, point: number) {
        super(letter, point);
        this.letter = this.letter.toUpperCase();
    }
}
