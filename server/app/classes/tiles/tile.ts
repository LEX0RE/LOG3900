import { Letter } from '@app/classes/letters/letter/letter';

export abstract class Tile {
    isStared: boolean;
    abstract letter: Letter;
    abstract letterBonus: number;
    abstract wordBonus: number;
    abstract isBonusActive: boolean;

    constructor() {
        this.isStared = false;
    }

    placeLetter(letter: Letter): Tile {
        this.letter = letter;
        return this;
    }

    abstract clone(): Tile;
}

export const BONUS_MULTIPLIER = {
    defaultMultiplier: 1,
    timesTwoMultiplier: 2,
    timesThreeMultiplier: 3,
};
