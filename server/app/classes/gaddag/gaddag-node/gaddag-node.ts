import { Gaddag } from '@app/classes/gaddag/gaddag';
import { GaddagBitsControl } from '@app/classes/gaddag/gaddag-bits-control/gaddag-bits-control';
import { BREAK } from '@app/constants/dictionary';
import { GaddagNodeType } from '@app/constants/gaddag-node-type';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { ROOT_INDEX, TERMINAL_OFFSET, ZERO_CHAR_INDEX } from '@app/constants/tiny-gaddag';
import { ArcWay } from '@app/interface/words-find';

export class GaddagNode {
    index: number;
    private children: { [key: string]: number };
    private terminals: { [key: string]: string };
    private arcIndex: number;
    private terminalIndex: number;

    constructor(private tinyGaddag: Gaddag, index: number = ROOT_INDEX) {
        this.index = index;
        this.children = {};
        this.terminals = {};
        this.arcIndex = ROOT_INDEX;
        this.terminalIndex = INDEX_NOT_FOUND;
        this.analyzeNode();
    }

    private get nodes(): Int32Array {
        return this.tinyGaddag.nodes;
    }

    getChild(letters: string): GaddagNode {
        letters = letters.toLowerCase();

        if (!letters) return this;

        return letters[0] in this.children ? new GaddagNode(this.tinyGaddag, this.children[letters[0]]).getChild(letters.substring(1)) : this;
    }

    getPossibilities(): string {
        let result = '';

        Object.entries(this.children).forEach(([key]) => {
            if (key !== BREAK) result += key;
        });

        Object.entries(this.terminals).forEach(([key]) => {
            if (key !== BREAK && !result.includes(key)) result += key;
        });

        return result;
    }

    isContaining(letters: string): boolean {
        letters = letters.toLowerCase();

        if (letters.length === 1) return letters in this.children || letters in this.terminals;

        return letters[0] in this.children ? this.getChild(letters[0]).isContaining(letters.substring(1)) : false;
    }

    isEnd(letters: string): boolean {
        letters = letters.toLowerCase();

        if (!this.isContaining(letters)) return false;
        const suffix = letters.substring(0, letters.length - 1);

        return letters[letters.length - 1] in this.getChild(suffix).terminals;
    }

    makeWay(letter: string): ArcWay {
        return { oldNode: this, newNode: this.getChild(letter.toLowerCase()) };
    }

    private analyzeNode(): void {
        switch (GaddagBitsControl.getType(this.nodes, this.index)) {
            case GaddagNodeType.SingleWithTerminal:
                return this.analyzeSingleWithTerminal();
            case GaddagNodeType.SingleWithoutTerminal:
                return this.analyzeSingleWithoutTerminal();
            case GaddagNodeType.MultipleWithTerminal:
                return this.analyzeMultipleWithTerminal();
            case GaddagNodeType.MultipleWithoutTerminal:
                return this.analyzeMultipleWithoutTerminal();
            case GaddagNodeType.OnlyTerminal:
                return this.analyzeOnlyTerminal();
        }
    }

    private analyzeOnlyTerminal(): void {
        this.terminalIndex = this.index;
        this.arcIndex = INDEX_NOT_FOUND;
        this.analyzeTerminal();
    }

    private analyzeSingleWithTerminal(): void {
        this.terminalIndex = this.index;
        this.arcIndex = this.index + TERMINAL_OFFSET;
        this.analyzeTerminal();
        this.analyzeSingleChild();
    }

    private analyzeSingleWithoutTerminal(): void {
        this.terminalIndex = INDEX_NOT_FOUND;
        this.arcIndex = this.index;
        this.analyzeSingleChild();
    }

    private analyzeMultipleWithTerminal(): void {
        this.terminalIndex = this.index;
        this.arcIndex = this.index + TERMINAL_OFFSET;
        this.analyzeTerminal();
        this.analyzeMultipleChildren();
    }

    private analyzeMultipleWithoutTerminal(): void {
        this.terminalIndex = INDEX_NOT_FOUND;
        this.arcIndex = this.index;
        this.analyzeMultipleChildren();
    }

    private analyzeTerminal(): void {
        GaddagBitsControl.getChildCharacters(this.nodes, this.terminalIndex).forEach((child: string) => (this.terminals[child] = child));
    }

    private analyzeSingleChild(): void {
        const childCharacterCode = GaddagBitsControl.getCharacterForSingleChild(this.nodes, this.arcIndex);
        const letter = String.fromCharCode(childCharacterCode + ZERO_CHAR_INDEX);

        this.children[letter] = GaddagBitsControl.getSingleChildIndex(this.nodes, this.arcIndex);
    }

    private analyzeMultipleChildren(): void {
        GaddagBitsControl.getChildCharacters(this.nodes, this.arcIndex).forEach(
            (child: string, childIndex: number) => (this.children[child] = this.nodes[this.arcIndex + childIndex + 1]),
        );
    }
}
