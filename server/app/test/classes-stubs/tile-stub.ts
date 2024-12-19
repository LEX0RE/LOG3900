import { Letter } from '@app/classes/letters/letter/letter';
import { Tile } from '@app/classes/tiles/tile';
import { SinonStub, stub } from 'sinon';

export class TileStub extends Tile {
    isStared: boolean;
    letter: Letter;
    letterBonus: number;
    wordBonus: number;
    isBonusActive: boolean;
    clone: SinonStub;

    constructor() {
        super();
        this.isStared = false;
        this.letter = { letter: 'a', point: 3 };
        this.letterBonus = 0;
        this.wordBonus = 0;
        this.isBonusActive = false;
        this.clone = stub();
    }
}
