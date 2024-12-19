import { Letter } from '@app/classes/letters/letter/letter';
import { LetterTimes2 } from '@app/classes/tiles/letter-times-2/letter-times-2';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('LetterTimes2', () => {
    let letterStub: Letter;
    let aLetterStub: Letter;

    beforeEach(async () => {
        letterStub = { letter: '', point: 0 };
        aLetterStub = { letter: 'a', point: 3 };
    });

    it('should create a simple LetterTimes2', () => {
        const tile = new LetterTimes2(letterStub);

        expect(tile).to.ownProperty('letter', letterStub);
        expect(tile).to.ownProperty('letterBonus', 2);
        expect(tile).to.ownProperty('wordBonus', 1);
        expect(tile).to.ownProperty('isBonusActive', true);
    });

    it('should place the letter on the', () => {
        const tile = new LetterTimes2(letterStub);

        tile.placeLetter(aLetterStub);
        expect(tile).to.ownProperty('letter', aLetterStub);
    });

    it('should clone tile', () => {
        const tile = new LetterTimes2(letterStub);
        const newTile = tile.clone();

        tile.isStared = true;
        expect(newTile).to.not.eql(tile);
    });
});
