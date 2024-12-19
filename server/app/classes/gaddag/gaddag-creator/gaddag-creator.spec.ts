import { Gaddag } from '@app/classes/gaddag/gaddag';
import { GaddagCompressor } from '@app/classes/gaddag/gaddag-compressor/gaddag-compressor';
import { GaddagCreator } from '@app/classes/gaddag/gaddag-creator/gaddag-creator';
import { BREAK, END } from '@app/constants/dictionary';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { FAKE_NODES, FAKE_WORDS } from '@app/test/constants/gaddag';
import { expect } from 'chai';
import { assert, createStubInstance, stub } from 'sinon';

describe('GaddagCreator', () => {
    let creator: GaddagCreator;

    beforeEach(() => {
        creator = new GaddagCreator();
    });

    it('should be defined', () => expect(creator).to.exist);

    it('should create a valid gaddag', async () => {
        const gaddag = await creator.createGaddag(FAKE_WORDS());
        const gaddag2 = new Gaddag(FAKE_NODES());

        expect(gaddag.length).to.be.eql(gaddag2.nodes.length);
    });

    it('should return empty gaddag when no words', async () => {
        const gaddag = await creator.createGaddag([]);

        expect(gaddag.length).to.be.eql(0);
    });

    it('should call garbage collector', async () => {
        const collectorStub = stub();

        global.gc = collectorStub;
        await creator.createGaddag(FAKE_WORDS());
        assert.called(collectorStub);
    });

    it('should not call if undefined', async () => {
        global.gc = undefined;
        await creator.createGaddag(FAKE_WORDS());
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        expect(creator['compressor']).to.be.eql(null);
    });

    it('buildNodes should empty array if processor is undefined', async () => {
        // eslint-disable-next-line dot-notation -- acces aux membres privés
        const nodes = await creator['buildNodes']([]);

        expect(nodes.length).to.be.eql(0);
    });

    it('should handle undefined pop of stack', async () => {
        const processor = createStubInstance(GaddagCompressor);

        processor.nodes = new Int32Array();
        processor.waitingForConstructionStack = [
            { character: END, parentIndex: INDEX_NOT_FOUND, suffix: BREAK },
            { character: END, parentIndex: INDEX_NOT_FOUND, suffix: BREAK },
        ];
        // eslint-disable-next-line no-undefined -- sert de valeur limite pour le test
        stub(processor.waitingForConstructionStack, 'pop').returns(undefined);
        // eslint-disable-next-line dot-notation -- acces aux membres prives
        creator['compressor'] = processor as unknown as GaddagCompressor;
        // eslint-disable-next-line dot-notation -- acces aux membres prives
        const nodes = await creator['buildNodes']([]);

        expect(nodes.length).to.be.eql(0);
    });

    it('should handle stack', async () => {
        const processor = createStubInstance(GaddagCompressor);

        processor.nodes = new Int32Array();
        processor.waitingForConstructionStack = [
            { character: END, parentIndex: INDEX_NOT_FOUND, suffix: BREAK },
            { character: END, parentIndex: INDEX_NOT_FOUND, suffix: BREAK },
        ];
        // eslint-disable-next-line dot-notation -- acces aux membres prives
        creator['compressor'] = processor as unknown as GaddagCompressor;
        // eslint-disable-next-line dot-notation -- acces aux membres prives
        const nodes = await creator['buildNodes'](FAKE_WORDS());

        expect(nodes.length).to.be.eql(0);
    });
});
