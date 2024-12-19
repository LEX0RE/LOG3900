import { GaddagNode } from '@app/classes/gaddag/gaddag-node/gaddag-node';
import { BREAK } from '@app/constants/dictionary';
// Référence : https://williame.github.io/post/87682811573.html
export class Gaddag {
    nodes: Int32Array;

    constructor(nodes: Int32Array) {
        this.nodes = nodes;
    }

    get root(): GaddagNode {
        return new GaddagNode(this);
    }

    static reformat(wordNode: string): string {
        const result = wordNode.split(BREAK);

        result[0] = this.reverse(result[0]);
        return result.join('');
    }

    static format(prefix: string, suffix: string): string {
        return this.reverse(prefix) + (suffix.length ? BREAK + suffix : '');
    }

    static reverse(word: string): string {
        return word.split('').reverse().join('');
    }

    isContaining(word: string): boolean {
        word = word.toLowerCase();
        word = Gaddag.format(word, '');

        return this.root.isEnd(word);
    }
}
