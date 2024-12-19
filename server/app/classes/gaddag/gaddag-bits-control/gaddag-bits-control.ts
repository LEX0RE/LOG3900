import { GaddagNodeType } from '@app/constants/gaddag-node-type';
import {
    CHARACTER_OF_CHILD_MASK,
    CHILD_CHARACTER_BIT_POSITION,
    HAS_MULTIPLE_CHILDREN_MASK,
    HAS_SINGLE_CHILD_MASK,
    INDEX_OF_CHILD_MASK,
    LETTER_MASK_MAP,
    MASK_LETTER_MAP,
    TERMINATOR_MASK,
    ZERO_CHAR_INDEX,
} from '@app/constants/tiny-gaddag';

/* eslint-disable no-bitwise -- necessaire pour minimiser l'utilisation de la memoire en manipulant les bits*/
export class GaddagBitsControl {
    static isTerminal(nodes: Int32Array, index: number): boolean {
        return Boolean(nodes[index] & TERMINATOR_MASK);
    }

    static setTerminal(nodes: Int32Array, index: number): void {
        nodes[index] |= TERMINATOR_MASK;
    }

    static hasSingleChild(nodes: Int32Array, index: number): boolean {
        return Boolean(nodes[index] & HAS_SINGLE_CHILD_MASK);
    }

    static setMultipleChildrenFlag(nodes: Int32Array, index: number): void {
        nodes[index] &= ~HAS_SINGLE_CHILD_MASK;
        nodes[index] |= HAS_MULTIPLE_CHILDREN_MASK;
    }

    static setSingleChildFlag(nodes: Int32Array, index: number): void {
        nodes[index] |= HAS_SINGLE_CHILD_MASK;
    }

    static hasMultipleChildren(nodes: Int32Array, index: number): boolean {
        return Boolean(nodes[index] & HAS_MULTIPLE_CHILDREN_MASK && !GaddagBitsControl.hasSingleChild(nodes, index));
    }

    static getSingleChildIndex(nodes: Int32Array, index: number): number {
        return nodes[index] & INDEX_OF_CHILD_MASK;
    }

    static setIndexForSingleChild(nodes: Int32Array, index: number, childIndex: number): void {
        nodes[index] &= ~INDEX_OF_CHILD_MASK;
        nodes[index] |= childIndex;
    }

    static getCharacterForSingleChild(nodes: Int32Array, index: number): number {
        return (nodes[index] & CHARACTER_OF_CHILD_MASK) >> CHILD_CHARACTER_BIT_POSITION;
    }

    static addSingleChildCharacter(nodes: Int32Array, index: number, childCharacter: string): void {
        nodes[index] &= ~CHARACTER_OF_CHILD_MASK;
        nodes[index] |= (childCharacter.charCodeAt(0) - ZERO_CHAR_INDEX) << CHILD_CHARACTER_BIT_POSITION;
    }

    static getChildCharacters(nodes: Int32Array, index: number): string[] {
        const characters: string[] = [];

        MASK_LETTER_MAP.forEach((letter: string, mask: number) => {
            if (nodes[index] & mask) characters.push(letter);
        });
        return characters;
    }

    static addCharactersForChild(nodes: Int32Array, index: number, characters: string[]): void {
        characters.forEach((character: string) => {
            const mask = LETTER_MASK_MAP.get(character);

            if (mask) nodes[index] |= mask;
        });
    }

    static getType(nodes: Int32Array, index: number): GaddagNodeType {
        const isTerminal = GaddagBitsControl.isTerminal(nodes, index);
        const singleChild = GaddagBitsControl.hasSingleChild(nodes, index);

        if (isTerminal && singleChild) return GaddagNodeType.SingleWithTerminal;
        if (!isTerminal && singleChild) return GaddagNodeType.SingleWithoutTerminal;

        const multipleChildren = GaddagBitsControl.hasMultipleChildren(nodes, index);

        if (isTerminal && multipleChildren) return GaddagNodeType.MultipleWithTerminal;
        if (!isTerminal && multipleChildren) return GaddagNodeType.MultipleWithoutTerminal;

        if (isTerminal) return GaddagNodeType.OnlyTerminal;
        return GaddagNodeType.ChildOffset;
    }
}
