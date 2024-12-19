import { END } from '@app/constants/dictionary';

export class GaddagTreeNode {
    children: { [key: string]: GaddagTreeNode } | null;
    terminals: string[] | null;
    suffix: string | null;

    constructor() {
        this.children = null;
        this.terminals = null;
        this.suffix = null;
    }

    push(value: string, node: GaddagTreeNode): GaddagTreeNode {
        if (!this.children) this.children = {};
        if (this.isContaining(value)) return this.children[value];

        this.children[value] = node;
        return node;
    }

    addTerminal(value: string): void {
        if (!this.terminals) this.terminals = [];
        if (!this.terminals.includes(value)) this.terminals.push(value);
    }

    createNode(value: string): GaddagTreeNode {
        if (!this.children) this.children = {};
        if (this.isContaining(value)) return this.children[value];
        const node = new GaddagTreeNode();

        return this.push(value, node);
    }

    isContaining(value: string): boolean {
        return this.children ? value in this.children : false;
    }

    addSuffix(suffix: string): void {
        if (!this.suffix) this.suffix = END;
        this.suffix += suffix + END;
    }
}
