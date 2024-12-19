import { Letter } from '@app/classes/letters/letter/letter';
import { StandardTile } from '@app/classes/tiles/standard-tile/standard-tile';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('StandardTile', () => {
    let letterStub: Letter;
    let aLetterStub: Letter;

    beforeEach(async () => {
        letterStub = { letter: '', point: 0 };
        aLetterStub = { letter: 'a', point: 3 };
    });

    it('should create a simple StandardTile', () => {
        const tile = new StandardTile(letterStub);

        expect(tile).to.ownProperty('letter', letterStub);
        expect(tile).to.ownProperty('letterBonus', 1);
        expect(tile).to.ownProperty('wordBonus', 1);
        expect(tile).to.ownProperty('isBonusActive', false);
    });

    it('should place the letter on the', () => {
        const tile = new StandardTile(letterStub);

        tile.placeLetter(aLetterStub);
        expect(tile).to.ownProperty('letter', aLetterStub);
    });

    it('should clone tile', () => {
        const tile = new StandardTile(letterStub);
        const newTile = tile.clone();

        tile.isStared = true;
        expect(newTile).to.not.eql(tile);
    });
});
