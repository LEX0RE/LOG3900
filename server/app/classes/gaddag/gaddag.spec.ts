import { Gaddag } from '@app/classes/gaddag/gaddag';
import { GaddagNode } from '@app/classes/gaddag/gaddag-node/gaddag-node';
import { FAKE_NODES, FAKE_WORDS } from '@app/test/constants/gaddag';
import { expect } from 'chai';

describe('GaddagClass', () => {
    let gaddag: Gaddag;

    beforeEach(() => {
        gaddag = new Gaddag(new Int32Array([...FAKE_NODES(), 0, 0, 0, 0]));
    });

    it('should be defined', () => expect(gaddag).to.exist);

    it('contains should return true', () => FAKE_WORDS().forEach((word) => expect(gaddag.isContaining(word)).to.be.true));

    it('contains should return false', () => {
        expect(gaddag.isContaining('someRandomWord')).to.be.eql(false);
        expect(gaddag.isContaining('')).to.be.eql(false);
    });

    it('iterator should return an iterator', () => expect(gaddag.root).to.be.an.instanceof(GaddagNode));

    it('reformat should reformat word', () => {
        const word = 'all';

        expect(Gaddag.reformat(Gaddag.reverse(word))).to.be.eql(word);
    });
});
