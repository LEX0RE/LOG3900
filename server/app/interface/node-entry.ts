import { GaddagTreeNode } from '@app/classes/gaddag/gaddag-tree/gaddag-tree-node/gaddag-tree-node';
import { QueueEntry } from '@app/interface/queue-entry';

export interface NodeEntry extends QueueEntry {
    node: GaddagTreeNode;
}
