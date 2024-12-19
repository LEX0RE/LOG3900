import { Letter } from '@app/classes/letters/letter/letter';
import { TileStub } from '@app/test/classes-stubs/tile-stub';
import { expect } from 'chai';

describe('AbstractTile', () => {
    let tile: TileStub;
    let letter: Letter;

    beforeEach(() => {
        tile = new TileStub();
        letter = { letter: 'e', point: 1 };
    });

    it('should create an instance', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-unused-expressions -- sert pour assert
        expect(tile).to.exist;
    });

    it('should placeLetter', () => {
        let modifiedTile = tile.placeLetter(letter);

        expect(tile.letter).to.deep.equal(letter);
        expect(modifiedTile).to.equal(tile);

        letter = { letter: 'x', point: 10 };
        modifiedTile = tile.placeLetter(letter);
        expect(tile.letter).to.deep.equal(letter);
        expect(modifiedTile).to.equal(tile);
    });
});
