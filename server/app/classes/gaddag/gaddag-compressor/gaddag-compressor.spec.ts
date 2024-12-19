import { GaddagCompressor } from '@app/classes/gaddag/gaddag-compressor/gaddag-compressor';
import { GaddagTree } from '@app/classes/gaddag/gaddag-tree/gaddag-tree';
import { GaddagTreeNode } from '@app/classes/gaddag/gaddag-tree/gaddag-tree-node/gaddag-tree-node';
import { END } from '@app/constants/dictionary';
import { DICTIONARY_RESET_ASYNC, GARBAGE_COLLECT_INTERVAL } from '@app/constants/gaddag';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { ROOT_INDEX } from '@app/constants/tiny-gaddag';
import { NodeEntry } from '@app/interface/node-entry';
import { FAKE_WORDS } from '@app/test/constants/gaddag';
import { expect } from 'chai';
import { assert, spy, stub } from 'sinon';

describe('GaddagCompressor', () => {
    let compressor: GaddagCompressor;
    let fragment: GaddagTree;

    beforeEach(() => {
        fragment = new GaddagTree(INDEX_NOT_FOUND, END, FAKE_WORDS());
        compressor = new GaddagCompressor(FAKE_WORDS());
    });

    it('should create an instance', () => expect(compressor).to.exist);

    it('should compress fragment', async () => {
        await compressor.processFragment(fragment);

        // eslint-disable-next-line dot-notation -- acces aux membres privés
        expect(compressor['writer'].insertionIndex).to.not.be.eql(ROOT_INDEX);
    });

    it('should processNode reset startTime when time is up', async () => {
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        compressor['startTime'] = 0;
        stub(Date, 'now').callsFake(() => DICTIONARY_RESET_ASYNC * 2);

        // eslint-disable-next-line dot-notation -- acces aux membres privés
        await compressor['processNode']();
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        expect(compressor['startTime']).to.be.eql(DICTIONARY_RESET_ASYNC * 2);
    });

    it('should processNode do nothing when queue is empty', async () => {
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        await compressor['processNode']();
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        expect(compressor['writer'].insertionIndex).to.be.eql(ROOT_INDEX);
    });

    it('should enqueueChildren when merging with a parent', async () => {
        const parentCharacter = 'a';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- acces aux membres privés
        const enqueueSpy = spy(compressor, 'enqueueMergeChildren' as any);

        fragment = new GaddagTree(0, parentCharacter, FAKE_WORDS());

        await compressor.processFragment(fragment);
        assert.calledWith(enqueueSpy, fragment);
    });

    it('should call garbage collector', async () => {
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        compressor['nodeCount'] = GARBAGE_COLLECT_INTERVAL - 1;
        const garbageCollectorSpy = stub();

        global.gc = garbageCollectorSpy;

        await compressor.processFragment(fragment);

        assert.calledOnce(garbageCollectorSpy);
    });

    it('enQueueMergeChildren should do nothing when fragment root have no children', () => {
        fragment.root.children = null;
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        compressor['enqueueMergeChildren'](fragment);
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        expect(compressor['queue'].length).to.be.eql(0);
    });

    it('enQueueAllChildren should always have current node not null', () => {
        const fakeEntry: NodeEntry = { character: END, parentIndex: ROOT_INDEX, node: new GaddagTreeNode() };

        // eslint-disable-next-line dot-notation -- acces aux membres privés
        compressor['enqueueAllChildren'](fakeEntry);
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        expect(compressor['currentNode'].children).to.be.eql({});
    });

    it('enqueueWaitingForConstruction should push on stack when node has suffix ', () => {
        const node = new GaddagTreeNode();

        node.suffix = '$al$';
        const entry = { character: 'a', parentIndex: ROOT_INDEX, node };

        // eslint-disable-next-line dot-notation -- acces aux membres privés
        compressor['enqueueWaitingForConstruction'](entry, INDEX_NOT_FOUND);
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        expect(compressor['waitingForConstructionStack'].length).to.be.eql(1);
    });

    it('enQueueAllChildren should always have current node not null', () => {
        const node = new GaddagTreeNode();

        node.children = { a: new GaddagTreeNode() };
        node.suffix = '$al$';

        const entry = { character: 'a', parentIndex: ROOT_INDEX, node };

        // eslint-disable-next-line dot-notation -- acces aux membres privés
        compressor['enqueueAllChildren'](entry);
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        expect(compressor['queue'].length).to.be.eql(0);
    });
});
