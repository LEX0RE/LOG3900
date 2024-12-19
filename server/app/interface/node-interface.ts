import { GaddagTreeNode } from '@app/classes/gaddag/gaddag-tree/gaddag-tree-node/gaddag-tree-node';

export interface NodeInterface {
    children: { [key: string]: GaddagTreeNode };
    terminals: string[];
    hasTerminal: boolean;
}
