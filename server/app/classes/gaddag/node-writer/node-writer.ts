import { GaddagBitsControl } from '@app/classes/gaddag/gaddag-bits-control/gaddag-bits-control';
import { END } from '@app/constants/dictionary';
import { CHILD_NOT_FOUND } from '@app/constants/error/gaddag';
import { GaddagNodeType } from '@app/constants/gaddag-node-type';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { ROOT_INDEX, TERMINAL_OFFSET } from '@app/constants/tiny-gaddag';
import { NodeVisitor } from '@app/interface/node-visitor';
import { QueueEntry } from '@app/interface/queue-entry';

export class NodeWriter {
    insertionIndex: number;
    private nodes: Int32Array;
    constructor(nodes: Int32Array) {
        this.nodes = nodes;
        this.insertionIndex = ROOT_INDEX;
    }

    updateInsertionIndex(nodeVisitor: NodeVisitor): void {
        const childrenInsertOffset = nodeVisitor.nChildren > 1 ? nodeVisitor.nChildren + 1 : nodeVisitor.nChildren;

        this.insertionIndex += childrenInsertOffset + (nodeVisitor.hasTerminal ? 1 : 0);
    }

    insertMultipleChildrenNode(node: NodeVisitor): void {
        const index = node.hasTerminal ? this.insertionIndex + TERMINAL_OFFSET : this.insertionIndex;

        if (node.hasTerminal) GaddagBitsControl.setMultipleChildrenFlag(this.nodes, this.insertionIndex);
        GaddagBitsControl.addCharactersForChild(this.nodes, index, node.letters);
        GaddagBitsControl.setMultipleChildrenFlag(this.nodes, index);
    }

    insertSingleChildNode(node: NodeVisitor): void {
        const index = node.hasTerminal ? this.insertionIndex + TERMINAL_OFFSET : this.insertionIndex;

        if (node.hasTerminal) GaddagBitsControl.setSingleChildFlag(this.nodes, this.insertionIndex);
        GaddagBitsControl.addSingleChildCharacter(this.nodes, index, node.letters[0]);
        GaddagBitsControl.setSingleChildFlag(this.nodes, index);
    }

    insertTerminals(terminals: string[]): void {
        GaddagBitsControl.setTerminal(this.nodes, this.insertionIndex);
        GaddagBitsControl.addCharactersForChild(this.nodes, this.insertionIndex, terminals);
    }

    writeParentIndex(entry: QueueEntry): void {
        if (entry.character === END) return;
        switch (GaddagBitsControl.getType(this.nodes, entry.parentIndex)) {
            case GaddagNodeType.MultipleWithTerminal:
                return this.writeOffsetMultiple(true, entry);
            case GaddagNodeType.MultipleWithoutTerminal:
                return this.writeOffsetMultiple(false, entry);
            case GaddagNodeType.SingleWithTerminal:
                return this.writeOffsetSingle(true, entry);
            case GaddagNodeType.SingleWithoutTerminal:
                return this.writeOffsetSingle(false, entry);
        }
    }

    private writeOffsetSingle(isTerminal: boolean, entry: QueueEntry): void {
        const index = isTerminal ? entry.parentIndex + TERMINAL_OFFSET : entry.parentIndex;

        GaddagBitsControl.setIndexForSingleChild(this.nodes, index, this.insertionIndex);
    }

    private writeOffsetMultiple(isTerminal: boolean, entry: QueueEntry): void {
        const index = isTerminal ? entry.parentIndex + TERMINAL_OFFSET : entry.parentIndex;
        const children = GaddagBitsControl.getChildCharacters(this.nodes, index);
        const childIndex = children.indexOf(entry.character);

        if (childIndex === INDEX_NOT_FOUND) throw new Error(CHILD_NOT_FOUND);

        this.nodes[index + childIndex + 1] = this.insertionIndex;
    }
}
