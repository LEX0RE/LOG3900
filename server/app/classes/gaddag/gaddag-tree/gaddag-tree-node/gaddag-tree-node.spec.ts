import { GaddagTreeNode } from '@app/classes/gaddag/gaddag-tree/gaddag-tree-node/gaddag-tree-node';
import { END } from '@app/constants/dictionary';
import { fail } from 'assert';
import { expect } from 'chai';

describe('GaddagTreeNode', () => {
    let node: GaddagTreeNode;

    beforeEach(() => {
        node = new GaddagTreeNode();
    });

    it('should create an instance', () => expect(node).to.exist);

    it('create should add value to children and return node', () => {
        const letter = 'a';
        const secondLetter = 'b';
        const child = node.createNode(letter);
        const secondChild = node.createNode(secondLetter);

        if (node.children) {
            expect(node.children[letter]).to.be.eql(child);
            expect(node.children[secondLetter]).to.be.eql(secondChild);
            expect(node.isContaining(letter)).to.be.eql(true);
            expect(node.isContaining(secondLetter)).to.be.eql(true);
        } else fail();
    });

    it('addSuffix should add suffix', () => {
        const suffix1 = 'abc';
        const suffix2 = 'def';
        const expectedSuffix = '$abc$def$';

        node.addSuffix(suffix1);
        node.addSuffix(suffix2);
        expect(node.suffix).to.be.eql(expectedSuffix);
    });

    it('addTerminal should add terminal once', () => {
        const terminal1 = 'a';
        const terminal2 = 'b';

        node.addTerminal(terminal1);
        node.addTerminal(terminal2);
        node.addTerminal(terminal1);
        expect(node.terminals).to.be.eql([terminal1, terminal2]);
    });

    it('contains should return false', () => expect(node.isContaining(END)).to.be.eql(false));

    it('push should return child when it exist', () => {
        const letter = 'a';
        const child = node.createNode(letter);
        const child2 = node.push(letter, node);

        child.push(letter, node);

        expect(child).to.be.eql(child2);
        expect(child.children).to.not.be.eql(null);
    });
});
