import { GaddagBitsControl } from '@app/classes/gaddag/gaddag-bits-control/gaddag-bits-control';
import { NodeWriter } from '@app/classes/gaddag/node-writer/node-writer';
import { BREAK } from '@app/constants/dictionary';
import { ROOT_INDEX, TERMINAL_OFFSET, ZERO_CHAR_INDEX } from '@app/constants/tiny-gaddag';
import { QueueEntry } from '@app/interface/queue-entry';
import { FAKE_NODE_MULTIPLE_CHILD, FAKE_NODE_MULTIPLE_TERMINAL, FAKE_NODE_SINGLE_CHILD, FAKE_NODE_SINGLE_TERMINAL } from '@app/test/constants/gaddag';
import { expect } from 'chai';

describe('NodeWriter', () => {
    let writer: NodeWriter;
    let nodes: Int32Array;
    const nodeSize = 10;

    beforeEach(() => {
        nodes = new Int32Array(nodeSize);
        writer = new NodeWriter(nodes);
    });

    it('should create an instance', () => expect(writer).to.exist);

    it('insertMultipleChildrenNode should insert - no terminal', () => {
        const visitor = FAKE_NODE_MULTIPLE_CHILD();

        writer.insertMultipleChildrenNode(visitor);
        const letters = GaddagBitsControl.getChildCharacters(nodes, ROOT_INDEX);

        expect(letters).to.have.deep.members(visitor.letters);
    });

    it('insertMultipleChildrenNode should insert - with terminal', () => {
        const visitor = FAKE_NODE_MULTIPLE_TERMINAL();

        writer.insertMultipleChildrenNode(visitor);
        const letters = GaddagBitsControl.getChildCharacters(nodes, ROOT_INDEX + TERMINAL_OFFSET);

        expect(letters).to.have.deep.members(visitor.letters);
    });

    it('insertSingleChildNode should insert - with terminal', () => {
        const visitor = FAKE_NODE_SINGLE_TERMINAL();

        writer.insertSingleChildNode(visitor);
        const letter = GaddagBitsControl.getCharacterForSingleChild(nodes, ROOT_INDEX + TERMINAL_OFFSET);

        expect(letter).to.eql(visitor.letters[0].charCodeAt(0) - ZERO_CHAR_INDEX);
    });

    it('insertSingleChildNode should insert - no terminal', () => {
        const visitor = FAKE_NODE_SINGLE_CHILD();

        writer.insertSingleChildNode(visitor);
        const letter = GaddagBitsControl.getCharacterForSingleChild(nodes, ROOT_INDEX);

        expect(letter).to.eql(visitor.letters[0].charCodeAt(0) - ZERO_CHAR_INDEX);
    });

    it('insertTerminals should insert terminals', () => {
        const terminals = ['a', 'b', 'c'];

        writer.insertTerminals(terminals);
        expect(GaddagBitsControl.getChildCharacters(nodes, ROOT_INDEX)).to.have.deep.members(terminals);
    });

    it('should insert parent Index for MultipleWithoutTerminal', () => {
        const visitor = FAKE_NODE_MULTIPLE_CHILD();
        const entry: QueueEntry = { character: 'a', parentIndex: ROOT_INDEX };

        writer.insertMultipleChildrenNode(visitor);
        writer.writeParentIndex(entry);

        expect(nodes[ROOT_INDEX + 1]).to.eql(writer.insertionIndex);
    });

    it('should insert parent Index for MultipleWitTerminal', () => {
        const visitor = FAKE_NODE_MULTIPLE_TERMINAL();
        const entry: QueueEntry = { character: 'a', parentIndex: ROOT_INDEX };

        writer.insertTerminals(visitor.letters);
        writer.insertMultipleChildrenNode(visitor);
        writer.writeParentIndex(entry);

        expect(nodes[ROOT_INDEX + TERMINAL_OFFSET + 1]).to.eql(writer.insertionIndex);
    });

    it('should insert parent Index for SingleWithTerminal', () => {
        const visitor = FAKE_NODE_SINGLE_TERMINAL();
        const entry: QueueEntry = { character: 'a', parentIndex: ROOT_INDEX };

        writer.insertTerminals(visitor.letters);
        writer.insertSingleChildNode(visitor);
        writer.writeParentIndex(entry);

        expect(GaddagBitsControl.getSingleChildIndex(nodes, ROOT_INDEX + TERMINAL_OFFSET)).to.eql(writer.insertionIndex);
    });

    it('should insert parent Index for SingleWithoutTerminal', () => {
        const visitor = FAKE_NODE_SINGLE_CHILD();
        const entry: QueueEntry = { character: 'a', parentIndex: ROOT_INDEX };

        writer.insertSingleChildNode(visitor);
        writer.writeParentIndex(entry);

        expect(GaddagBitsControl.getSingleChildIndex(nodes, ROOT_INDEX)).to.eql(writer.insertionIndex);
    });

    it('insert parent Index should throw if parent has not this child', () => {
        const visitor = FAKE_NODE_MULTIPLE_CHILD();
        const entry: QueueEntry = { character: BREAK, parentIndex: ROOT_INDEX };

        writer.insertMultipleChildrenNode(visitor);
        expect(() => writer.writeParentIndex(entry)).to.throw();
    });
});
