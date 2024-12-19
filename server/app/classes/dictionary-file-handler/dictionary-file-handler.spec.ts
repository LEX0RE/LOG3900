import { DictionaryFileHandler } from '@app/classes/dictionary-file-handler/dictionary-file-handler';
import { GaddagCreator } from '@app/classes/gaddag/gaddag-creator/gaddag-creator';
import { DEFAULT_DICTIONARY_PATH, DICTIONARY_FORMAT, DICTIONARY_PATH, FILE_ENCODING } from '@app/constants/dictionary';
import {
    FAKE_DICTIONARY_WITH_ALL,
    FAKE_DICTIONARY_WITH_NODES,
    FAKE_DICTIONARY_WITH_WORDS,
    FAKE_FILES_NAMES,
} from '@app/test/constants/fake-dictionary';
import { FAKE_DICTIONARY_TITLE } from '@app/test/constants/fake-game';
import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { promises as fsAsync } from 'fs';
import { assert, restore, SinonStub, stub } from 'sinon';

describe('DictionaryFileHandler', () => {
    let fileHandler: DictionaryFileHandler;
    let readDirStub: SinonStub;
    let writeStub: SinonStub;
    let readFileStub: SinonStub;

    beforeEach(() => {
        restore();
        use(chaiAsPromised);
        fileHandler = new DictionaryFileHandler();
        readDirStub = stub(fsAsync, 'readdir').resolves();
        readFileStub = stub(fsAsync, 'readFile').resolves();
        writeStub = stub(fsAsync, 'writeFile').resolves();
    });

    afterEach(() => restore());

    it('should be defined', () => expect(fileHandler).to.exist);

    it('setDictionary should write file', async () => {
        await fileHandler.setDictionary(FAKE_DICTIONARY_WITH_ALL());
        const expected = {
            title: FAKE_DICTIONARY_WITH_ALL().title,
            description: FAKE_DICTIONARY_WITH_ALL().description,
            dictionaryId: FAKE_DICTIONARY_WITH_ALL().dictionaryId,
            nodes: Array.from(FAKE_DICTIONARY_WITH_ALL().nodes),
            words: FAKE_DICTIONARY_WITH_ALL().words,
        };

        assert.calledWith(writeStub, DICTIONARY_PATH + FAKE_DICTIONARY_WITH_ALL().title + DICTIONARY_FORMAT, JSON.stringify(expected, null, 2));
    });

    it('getDictionary should return the right dictionary', async () => {
        readFileStub.resolves(JSON.stringify(FAKE_DICTIONARY_WITH_NODES(), null, 2));
        await fileHandler.getDictionary(FAKE_DICTIONARY_TITLE).then((dictionary) => expect(dictionary).to.be.eql(FAKE_DICTIONARY_WITH_NODES()));
    });

    it('getDownloadDictionary should return the right dictionary', async () => {
        readFileStub.resolves(JSON.stringify(FAKE_DICTIONARY_WITH_WORDS(), null, 2));
        await fileHandler
            .getDownloadDictionary(FAKE_DICTIONARY_TITLE)
            .then((dictionary) => expect(dictionary).to.be.eql(FAKE_DICTIONARY_WITH_WORDS()));
    });

    it('getDictionaryWithAll should return the right dictionary', async () => {
        readFileStub.resolves(JSON.stringify(FAKE_DICTIONARY_WITH_WORDS(), null, 2));
        await fileHandler.getDictionaryWithAll(FAKE_DICTIONARY_TITLE).then((dictionary) => expect(dictionary).to.be.eql(FAKE_DICTIONARY_WITH_ALL()));
    });

    it('getDictionaries should return dictionaries', async () => {
        readDirStub.resolves(FAKE_FILES_NAMES());
        readFileStub.resolves(JSON.stringify(FAKE_DICTIONARY_WITH_ALL(), null, 2));
        readFileStub.withArgs(DICTIONARY_PATH + FAKE_FILES_NAMES()[0], FILE_ENCODING).resolves('');
        const result = await fileHandler.getDictionaries();

        expect(result.length).to.be.eql(FAKE_FILES_NAMES().length - 1);
    });

    it('getDefaultDictionaries should return dictionaries', async () => {
        readDirStub.resolves(FAKE_FILES_NAMES());
        readFileStub.resolves(JSON.stringify(FAKE_DICTIONARY_WITH_WORDS(), null, 2));
        readFileStub.withArgs(DEFAULT_DICTIONARY_PATH + FAKE_FILES_NAMES()[0], FILE_ENCODING).resolves('');
        const result = await fileHandler.getDefaultDictionaries([]);

        expect(result.length).to.be.eql(FAKE_FILES_NAMES().length - 1);
    });

    it('transformDictionary should create a compressed dictionary', async () => {
        const dictionary = FAKE_DICTIONARY_WITH_ALL();
        const compressedDictionary = {
            title: dictionary.title,
            description: dictionary.description,
            nodes: dictionary.nodes,
            dictionaryId: dictionary.dictionaryId,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Pour remplacer la fonction de creation
        stub(GaddagCreator.prototype, 'createGaddag' as any).resolves(dictionary.nodes);

        await fileHandler.transformDictionary(dictionary).then((result) => expect(result).to.be.eql(compressedDictionary));
    });
});
