import { Gaddag } from '@app/classes/gaddag/gaddag';
import { GaddagTreeNode } from '@app/classes/gaddag/gaddag-tree/gaddag-tree-node/gaddag-tree-node';
import { END } from '@app/constants/dictionary';
import { GADDAG_TREE_DEPTH } from '@app/constants/gaddag';
import { ROOT_INDEX } from '@app/constants/tiny-gaddag';

export class GaddagTree {
    root: GaddagTreeNode;
    parentIndex: number;
    character: string;

    constructor(parentIndex: number, character: string, words: string[] | string) {
        this.parentIndex = parentIndex;
        this.character = character;
        this.root = new GaddagTreeNode();
        if (words instanceof Array) this.buildFromArray(words);
        else this.buildFromString(words);
    }

    private buildFromArray(words: string[]): void {
        if (!words.length) return;
        for (const word of words) this.addWord(word);
    }

    private buildFromString(words: string): void {
        let index = ROOT_INDEX;

        while (index < words.length) {
            let word = '';

            while (words[index] !== END && index < words.length) {
                word += words[index];
                index++;
            }
            this.addNode(word, this.root);
            index++;
        }
    }

    private addWord(word: string): void {
        if (!word) return;
        const node = this.root;

        word = word.toLowerCase();

        for (let i = 1; i <= word.length; i++) {
            const prefix = word.substring(0, i);
            const suffix = i !== word.length ? word.substring(i) : '';
            const wordNode = Gaddag.format(prefix, suffix);

            this.addNode(wordNode, node);
        }
    }

    private addNode(word: string, node: GaddagTreeNode): void {
        if (word.length <= GADDAG_TREE_DEPTH) this.addSmallWord(word, node);
        else this.addLongWords(word, node);
    }

    private addSmallWord(word: string, node: GaddagTreeNode): void {
        for (let i = 0; i < word.length; i++) {
            if (i === word.length - 1) node.addTerminal(word[i]);
            else node = node.createNode(word[i]);
        }
    }

    private addLongWords(word: string, node: GaddagTreeNode): void {
        for (let i = 0; i < GADDAG_TREE_DEPTH; i++) node = node.createNode(word[i]);

        if (word.length === GADDAG_TREE_DEPTH + 1) {
            node.addTerminal(word[GADDAG_TREE_DEPTH]);
            return;
        }

        node.createNode(word[GADDAG_TREE_DEPTH]);
        node.addSuffix(word.substring(GADDAG_TREE_DEPTH));
    }
}
