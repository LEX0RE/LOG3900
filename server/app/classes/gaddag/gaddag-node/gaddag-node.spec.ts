import { Gaddag } from '@app/classes/gaddag/gaddag';
import { GaddagBitsControl } from '@app/classes/gaddag/gaddag-bits-control/gaddag-bits-control';
import { GaddagNode } from '@app/classes/gaddag/gaddag-node/gaddag-node';
import { BREAK, END } from '@app/constants/dictionary';
import { TERMINAL_OFFSET } from '@app/constants/tiny-gaddag';
import { FAKE_NODES, FAKE_WORDS } from '@app/test/constants/gaddag';
import { expect } from 'chai';
import { restore, stub } from 'sinon';

describe('GaddagNode', () => {
    let node: GaddagNode;
    let gaddag: Gaddag;
    let nodes: Int32Array;
    const testIndex = 0;
    const arc = ['a', 'b', 'c'];

    beforeEach(() => {
        gaddag = new Gaddag(FAKE_NODES());
        nodes = gaddag.nodes;
        node = new GaddagNode(gaddag, testIndex);
    });

    afterEach(() => restore());

    it('should create an instance', () => expect(node).to.exist);

    it('child should return this when letter is empty.', () => {
        expect(node.getChild('').index).to.be.eql(node.index);
    });

    it('child should return this if it do not contain child', () => {
        expect(node.getChild(END + END).index).to.be.eql(node.index);
    });

    it('child should return right child for letter', () => {
        const expectedIndex = 6;
        const child = gaddag.root.getChild('a');

        expect(child.index).to.equal(expectedIndex);
    });

    it('child should child when bottom child is defined', () => {
        GaddagBitsControl.setTerminal(nodes, testIndex);
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex);
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex + TERMINAL_OFFSET);
        GaddagBitsControl.addCharactersForChild(nodes, testIndex + TERMINAL_OFFSET, arc);
        expect(node.getChild(arc[0]).index).to.equal(testIndex);
    });

    it('should contains words', () => {
        for (let word of FAKE_WORDS()) {
            word = word.toLowerCase();

            for (let i = 1; i <= word.length; i++) {
                const prefix = word.substring(0, i);
                const suffix = i !== word.length ? word.substring(i) : '';
                const wordNode = Gaddag.format(prefix, suffix);

                expect(gaddag.isContaining(Gaddag.reverse(wordNode))).to.be.eql(true);
            }
            expect(gaddag.isContaining(word)).to.be.eql(true);
        }
    });

    it('should give possibilities', () => {
        const expected = 'abc';

        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex);
        GaddagBitsControl.addCharactersForChild(nodes, testIndex, arc);
        node = new GaddagNode(gaddag, testIndex);
        expect(node.getPossibilities()).to.equal(expected);
    });

    it('isEnd should return false', () => expect(node.isEnd(END)).to.be.false);

    it('analyzeMultipleWithTerminal should analyze node ', () => {
        GaddagBitsControl.setTerminal(nodes, testIndex);
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex);
        GaddagBitsControl.addCharactersForChild(nodes, testIndex, arc);
        node = new GaddagNode(gaddag, testIndex);
        expect(node.isContaining('a')).to.be.eql(true);
    });

    it('makeWay should return both nodes', () => {
        const arcWay = node.makeWay(END);

        expect(arcWay.newNode.index).to.be.eql(arcWay.oldNode.index);
    });

    it('isEnd should support whole suffix', () => {
        FAKE_WORDS().forEach((word: string) => {
            word = Gaddag.reverse(word);
            expect(gaddag.root.isEnd(word)).to.be.eql(true);
        });
    });

    it('isEnd should return false if contains is false', () => {
        stub(node, 'isContaining').returns(false);
        expect(node.isEnd(END + END)).to.be.eql(false);
    });

    it('contains should return false if letter is not in children', () => {
        expect(node.isContaining(END + END)).to.be.eql(false);
    });

    it('contains should return false if empty string', () => expect(node.isContaining('')).to.be.eql(false));

    it('contains should return true', () => {
        GaddagBitsControl.setTerminal(nodes, testIndex);
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex);
        GaddagBitsControl.addCharactersForChild(nodes, testIndex, arc);
        node = new GaddagNode(gaddag, testIndex);

        expect(node.isContaining('a')).to.be.eql(true);
    });

    it('contains should return true', () => {
        GaddagBitsControl.setTerminal(nodes, testIndex);
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex);
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex + TERMINAL_OFFSET);
        GaddagBitsControl.addCharactersForChild(nodes, testIndex + TERMINAL_OFFSET, arc);
        node = new GaddagNode(gaddag, testIndex);

        expect(node.isContaining('ab')).to.be.eql(true);
    });

    it('possibilities should not include break for terminal', () => {
        const expected = 'abcl';

        GaddagBitsControl.setTerminal(nodes, testIndex);
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex);
        GaddagBitsControl.addCharactersForChild(nodes, testIndex, [...arc, BREAK]);
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex + TERMINAL_OFFSET);
        GaddagBitsControl.addCharactersForChild(nodes, testIndex + TERMINAL_OFFSET, arc);
        node = new GaddagNode(gaddag, testIndex);
        expect(node.getPossibilities()).to.equal(expected);
    });

    it('possibilities should not include break for arc', () => {
        const expected = 'abcld';

        GaddagBitsControl.setTerminal(nodes, testIndex);
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex);
        GaddagBitsControl.addCharactersForChild(nodes, testIndex, ['d']);
        GaddagBitsControl.setMultipleChildrenFlag(nodes, testIndex + TERMINAL_OFFSET);
        GaddagBitsControl.addCharactersForChild(nodes, testIndex + TERMINAL_OFFSET, [...arc, BREAK]);
        node = new GaddagNode(gaddag, testIndex);
        expect(node.getPossibilities()).to.equal(expected);
    });
});
