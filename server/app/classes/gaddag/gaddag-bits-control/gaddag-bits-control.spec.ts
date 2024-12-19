import { GaddagBitsControl } from '@app/classes/gaddag/gaddag-bits-control/gaddag-bits-control';
import { END } from '@app/constants/dictionary';
import { GaddagNodeType } from '@app/constants/gaddag-node-type';
import { ZERO_CHAR_INDEX } from '@app/constants/tiny-gaddag';
import { FAKE_NODES } from '@app/test/constants/gaddag';
import { expect } from 'chai';

describe('GaddagBitControl', () => {
    let nodes: Int32Array;
    const testIndex = 0;
    const childIndex = 2;
    const childCharacter = 'a';

    beforeEach(() => {
        nodes = FAKE_NODES();
    });

    it('should be able to handle terminal', () => {
        GaddagBitsControl.setTerminal(nodes, testIndex);
        expect(GaddagBitsControl.isTerminal(nodes, testIndex)).to.be.eql(true);
    });

    it('should be able to handle singleChild', () => {
        GaddagBitsControl.setSingleChildFlag(nodes, testIndex);
        expect(GaddagBitsControl.hasSingleChild(nodes, testIndex)).to.be.eql(true);
    });

    it('should be able to handle multiple children', () => {
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex);
        expect(GaddagBitsControl.hasMultipleChildren(nodes, testIndex)).to.be.eql(true);
    });

    it('should be able to handle single child index', () => {
        GaddagBitsControl.setIndexForSingleChild(nodes, testIndex, childIndex);
        expect(GaddagBitsControl.getSingleChildIndex(nodes, testIndex)).to.be.eql(childIndex);
    });

    it('should be able to handle single child character', () => {
        GaddagBitsControl.addSingleChildCharacter(nodes, testIndex, childCharacter);
        expect(GaddagBitsControl.getCharacterForSingleChild(nodes, testIndex)).to.be.eql(childCharacter.charCodeAt(0) - ZERO_CHAR_INDEX);
    });

    it('should be able to handle multiple children characters', () => {
        const characters = ['a', 'b', 'c'];

        GaddagBitsControl.addCharactersForChild(nodes, testIndex, characters);
        expect(GaddagBitsControl.getChildCharacters(nodes, testIndex)).to.have.deep.members(characters);
    });

    it('should be able to handle multiple children characters without the invalid character', () => {
        const characters = ['a', 'b', 'c', END];

        GaddagBitsControl.addCharactersForChild(nodes, testIndex, characters);
        expect(GaddagBitsControl.getChildCharacters(nodes, testIndex).length).to.be.eql(characters.length - 1);
    });

    it('should handle SingleWithTerminal type', () => {
        GaddagBitsControl.setTerminal(nodes, testIndex);
        GaddagBitsControl.setSingleChildFlag(nodes, testIndex);
        expect(GaddagBitsControl.getType(nodes, testIndex)).to.be.eql(GaddagNodeType.SingleWithTerminal);
    });

    it('should handle SingleWithoutTerminal type', () => {
        GaddagBitsControl.setSingleChildFlag(nodes, testIndex);
        expect(GaddagBitsControl.getType(nodes, testIndex)).to.be.eql(GaddagNodeType.SingleWithoutTerminal);
    });

    it('should handle MultipleWithoutTerminal type', () => {
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex);
        expect(GaddagBitsControl.getType(nodes, testIndex)).to.be.eql(GaddagNodeType.MultipleWithoutTerminal);
    });

    it('should handle MultipleWithTerminal type', () => {
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex);
        GaddagBitsControl.setTerminal(nodes, testIndex);
        expect(GaddagBitsControl.getType(nodes, testIndex)).to.be.eql(GaddagNodeType.MultipleWithTerminal);
    });

    it('should handle OnlyTerminal type', () => {
        GaddagBitsControl.setTerminal(nodes, testIndex);
        expect(GaddagBitsControl.getType(nodes, testIndex)).to.be.eql(GaddagNodeType.OnlyTerminal);
    });

    it('should handle ChildOffset type', () => expect(GaddagBitsControl.getType(nodes, testIndex)).to.be.eql(GaddagNodeType.ChildOffset));
});
