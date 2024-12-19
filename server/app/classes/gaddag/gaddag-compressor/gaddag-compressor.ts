import { GaddagTree } from '@app/classes/gaddag/gaddag-tree/gaddag-tree';
import { GaddagTreeNode } from '@app/classes/gaddag/gaddag-tree/gaddag-tree-node/gaddag-tree-node';
import { NodeWriter } from '@app/classes/gaddag/node-writer/node-writer';
import { Queue } from '@app/classes/queue/queue';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { executeOtherTask } from '@app/classes/utils/time/time';
import { END } from '@app/constants/dictionary';
import { DICTIONARY_RESET_ASYNC, GADDAG_MINIMUM_SIZE, GARBAGE_COLLECT_INTERVAL } from '@app/constants/gaddag';
import { N_INT32_PER_NODE } from '@app/constants/tiny-gaddag';
import { NodeEntry } from '@app/interface/node-entry';
import { NodeInterface } from '@app/interface/node-interface';
import { NodeVisitor } from '@app/interface/node-visitor';
import { WaitingForConstructionEntry } from '@app/interface/waiting-for-construction-entry';

export class GaddagCompressor {
    nodes!: Int32Array;
    waitingForConstructionStack: WaitingForConstructionEntry[];
    private queue: Queue<NodeEntry>;
    private currentNode: NodeInterface;
    private writer: NodeWriter;
    private nodeCount: number;
    private startTime: number;

    constructor(words: string[]) {
        this.startTime = Date.now();
        this.initializeArray(words);
        this.writer = new NodeWriter(this.nodes);
        this.queue = new Queue<NodeEntry>();
        this.nodeCount = 0;
        this.currentNode = { children: {}, terminals: [], hasTerminal: false };
        this.waitingForConstructionStack = [];
    }

    async processFragment(fragment: GaddagTree): Promise<void> {
        if (fragment.character === END) this.queue.enqueue({ node: fragment.root, parentIndex: fragment.parentIndex, character: fragment.character });
        else this.enqueueMergeChildren(fragment);
        while (this.queue.length) await this.processNode();
    }

    private initializeArray(words: string[]): void {
        const nNodeRequired = MathUtils.accumulator(words, 0, (total: number, word: string) => {
            total += word.length * (word.length + 1);
            return total;
        });
        const requiredSize = Math.ceil(nNodeRequired * N_INT32_PER_NODE) / (nNodeRequired / words.length);

        this.nodes = new Int32Array(Math.max(GADDAG_MINIMUM_SIZE, requiredSize));
    }

    private async processNode(): Promise<void> {
        if (Date.now() - this.startTime > DICTIONARY_RESET_ASYNC) {
            await executeOtherTask();
            this.startTime = Date.now();
        }
        const entry = this.queue.dequeue();

        if (!entry) return;

        this.writer.writeParentIndex(entry);
        this.enqueueAllChildren(entry);

        const nodeVisitor: NodeVisitor = this.getVisitor();

        this.insert(nodeVisitor);
        const insertedIndex = this.writer.insertionIndex;

        this.writer.updateInsertionIndex(nodeVisitor);

        this.enqueueWaitingForConstruction(entry, insertedIndex);
        this.destructNode(entry.node);
    }

    private getVisitor(): NodeVisitor {
        return {
            letters: Object.keys(this.currentNode.children),
            nChildren: this.nChildren(),
            hasTerminal: this.currentNode.hasTerminal,
        };
    }

    private insert(nodeVisitor: NodeVisitor): void {
        if (this.currentNode.hasTerminal) this.writer.insertTerminals(this.currentNode.terminals);
        if (nodeVisitor.nChildren === 1) this.writer.insertSingleChildNode(nodeVisitor);
        else if (nodeVisitor.nChildren > 1) this.writer.insertMultipleChildrenNode(nodeVisitor);
    }

    private destructNode(node: GaddagTreeNode): void {
        node.suffix = null;
        node.children = null;
        node.terminals = null;
        if (!(++this.nodeCount % GARBAGE_COLLECT_INTERVAL) && global.gc) global.gc();
    }

    private enqueueWaitingForConstruction(entry: NodeEntry, insertedIndex: number): void {
        if (entry.node.suffix)
            this.waitingForConstructionStack.push({ suffix: entry.node.suffix, parentIndex: insertedIndex, character: entry.character });
    }

    private nChildren(): number {
        return Object.keys(this.currentNode.children).length;
    }

    private enqueueAllChildren(entry: NodeEntry): void {
        this.currentNode.children = entry.node.children ? entry.node.children : {};
        this.currentNode.terminals = entry.node.terminals ? entry.node.terminals : [];
        this.currentNode.hasTerminal = Boolean(this.currentNode.terminals.length);
        const isDeepestNode = Boolean(entry.node.suffix);

        Object.entries(this.currentNode.children).forEach(([character, child]: [string, GaddagTreeNode]) => {
            if (isDeepestNode) return;
            this.queue.enqueue({ node: child, parentIndex: this.writer.insertionIndex, character });
        });
    }

    private enqueueMergeChildren(fragment: GaddagTree): void {
        if (!fragment.root.children) return;
        Object.entries(fragment.root.children).forEach(([character, child]: [string, GaddagTreeNode]) =>
            this.queue.enqueue({ node: child, parentIndex: fragment.parentIndex, character }),
        );
    }
}
