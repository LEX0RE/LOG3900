import { GaddagCompressor } from '@app/classes/gaddag/gaddag-compressor/gaddag-compressor';
import { GaddagTree } from '@app/classes/gaddag/gaddag-tree/gaddag-tree';
import { executeOtherTask } from '@app/classes/utils/time/time';
import { END } from '@app/constants/dictionary';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';

export class GaddagCreator {
    private compressor: GaddagCompressor | null;

    constructor() {
        this.compressor = null;
    }

    async createGaddag(words: string[]): Promise<Int32Array> {
        if (!words.length) return new Int32Array();
        this.compressor = new GaddagCompressor(words);

        const nodes = await this.buildNodes(words);

        this.selfDestruct();
        return nodes;
    }

    private async buildNodes(words: string[]): Promise<Int32Array> {
        if (!this.compressor) return new Int32Array();
        const rootFragment = new GaddagTree(INDEX_NOT_FOUND, END, words);

        await this.compressor.processFragment(rootFragment);
        await executeOtherTask();
        while (this.compressor.waitingForConstructionStack.length) {
            const subRootNode = this.compressor.waitingForConstructionStack.pop();

            if (!subRootNode) break;
            const tree = new GaddagTree(subRootNode.parentIndex, subRootNode.character, subRootNode.suffix);

            await this.compressor.processFragment(tree);
        }
        return this.reduceArray(this.compressor.nodes);
    }

    private selfDestruct(): void {
        this.compressor = null;
        if (global.gc) global.gc();
    }

    private reduceArray(nodes: Int32Array): Int32Array {
        let index = nodes.length - 1;

        for (; index > 0; index--) if (nodes[index]) break;

        return nodes.slice(0, index + 1);
    }
}
