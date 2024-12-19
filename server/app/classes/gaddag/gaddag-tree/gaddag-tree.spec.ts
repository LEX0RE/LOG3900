import { GaddagTree } from '@app/classes/gaddag/gaddag-tree/gaddag-tree';
import { GaddagTreeNode } from '@app/classes/gaddag/gaddag-tree/gaddag-tree-node/gaddag-tree-node';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { END } from '@app/constants/dictionary';
import { GADDAG_TREE_DEPTH } from '@app/constants/gaddag';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { FAKE_LONG_WORD, FAKE_WORDS } from '@app/test/constants/gaddag';
import { fail } from 'assert';
import { expect } from 'chai';
import { assert, spy } from 'sinon';

describe('GaddagTreeClass', () => {
    let fragment: GaddagTree;

    beforeEach(() => {
        fragment = new GaddagTree(INDEX_NOT_FOUND, END, [...FAKE_WORDS(), ...FAKE_LONG_WORD()]);
    });

    it('should be defined', () => expect(fragment).to.exist);

    it('should root have 10 children', () => {
        const expectedNChildren = 10;

        if (fragment.root.children) expect(Object.keys(fragment.root.children).length).to.be.eql(expectedNChildren);
        else fail();
    });

    it('should create from string', () => {
        const all: string = MathUtils.accumulator(FAKE_WORDS(), END, (allWords: string, word: string) => {
            allWords += END + word;
            return allWords;
        });

        fragment = new GaddagTree(INDEX_NOT_FOUND, END, all);
        const expectedNChildren = 3;

        if (fragment.root.children) expect(Object.keys(fragment.root.children).length).to.be.eql(expectedNChildren);
        else fail();
    });

    it('should have 0 children when no words', () => {
        fragment = new GaddagTree(INDEX_NOT_FOUND, END, []);
        expect(fragment.root.children).to.be.eql(null);
    });

    it('addWord should do nothing when empty string.', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- acces membre prive
        const addSpy = spy(fragment, 'addNode' as any);

        // eslint-disable-next-line dot-notation -- acces membre prive
        fragment['addWord']('');

        assert.notCalled(addSpy);
    });

    it('addLongWords should add terminal to node if word is only one letter more then the target length', () => {
        const longWord = 'a'.repeat(GADDAG_TREE_DEPTH + 1);
        const root = new GaddagTreeNode();

        // eslint-disable-next-line dot-notation -- acces membre prive
        fragment['addLongWords'](longWord, root);
        let node = root;

        for (const letter of longWord) if (node.children) node = node.children[letter];
        expect(node?.terminals).to.have.deep.members([longWord[longWord.length - 1]]);
    });
});
