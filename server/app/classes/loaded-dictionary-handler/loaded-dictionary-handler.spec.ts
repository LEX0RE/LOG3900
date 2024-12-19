import { DictionaryFileHandler } from '@app/classes/dictionary-file-handler/dictionary-file-handler';
import { LoadedDictionaryHandler } from '@app/classes/loaded-dictionary-handler/loaded-dictionary-handler';
import { DICTIONARY_MUST_EXIST } from '@app/constants/error/rules';
import {
    FAKE_AVAILABLE_DICTIONARIES,
    FAKE_DICTIONARY_DESCRIPTION,
    FAKE_DICTIONARY_FULL,
    FAKE_DICTIONARY_WITH_NODES,
} from '@app/test/constants/fake-dictionary';
import { FAKE_DICTIONARY_ID, FAKE_DICTIONARY_TITLE } from '@app/test/constants/fake-game';
import { FAKE_WORDS } from '@app/test/constants/gaddag';
import { expect } from 'chai';
import { createStubInstance, restore, SinonStubbedInstance, stub } from 'sinon';

describe('LoadedDictionaryHandler', () => {
    let loadedDictionaryHandler: LoadedDictionaryHandler;
    let fileHandler: SinonStubbedInstance<DictionaryFileHandler>;
    const badWords = ['sdfg', 'asdfg'];

    beforeEach(() => {
        loadedDictionaryHandler = new LoadedDictionaryHandler();
        restore();
        fileHandler = createStubInstance(DictionaryFileHandler);
        // eslint-disable-next-line dot-notation -- méthode privée
        loadedDictionaryHandler['fileHandler'] = fileHandler;
        // eslint-disable-next-line dot-notation -- méthode privée
        loadedDictionaryHandler['dictionaries'].push(FAKE_DICTIONARY_FULL());
    });

    afterEach(() => restore());

    it('should be created', () => expect(loadedDictionaryHandler).to.exist);

    it('should validate words that does not exist', () => {
        const hasFound = loadedDictionaryHandler.validateWords(badWords, FAKE_DICTIONARY_ID);

        expect(hasFound).to.be.equal(false);
    });

    it('should handle duplicates words as input for validation', () => {
        const hasFound = loadedDictionaryHandler.validateWords([...FAKE_WORDS(), ...FAKE_WORDS()], FAKE_DICTIONARY_ID);

        expect(hasFound).to.be.equal(true);
    });

    it('validateWords should throw when dictionary is not loaded', () => {
        const randomId = 12345;

        expect(() => loadedDictionaryHandler.validateWords(FAKE_WORDS(), randomId)).to.throw(DICTIONARY_MUST_EXIST);
    });

    it('should return undefined when given a invalid dictionaryId', () => {
        const wrongDictionaryId = 2;

        expect(loadedDictionaryHandler.getDictionary(wrongDictionaryId)).to.be.eql(undefined);
    });

    it('should get the french dictionary', () => {
        // eslint-disable-next-line dot-notation -- méthode privée
        loadedDictionaryHandler['dictionaries'].push(FAKE_DICTIONARY_FULL());
        const dict = loadedDictionaryHandler.getDictionary(FAKE_DICTIONARY_ID);

        expect(dict).ownProperty('title');
        expect(dict).ownProperty('description');
        expect(dict?.dictionaryId).to.equal(FAKE_DICTIONARY_ID);
    });

    it('loadDictionaryServer should add dictionary to dictionaries', async () => {
        fileHandler.getDictionary.resolves(FAKE_DICTIONARY_WITH_NODES());

        await loadedDictionaryHandler.loadDictionaryServer(FAKE_DICTIONARY_ID + 1, FAKE_DICTIONARY_TITLE);

        // eslint-disable-next-line dot-notation -- méthode privée
        expect(loadedDictionaryHandler['dictionaries'][1].title).to.be.eql(FAKE_DICTIONARY_TITLE);
        // eslint-disable-next-line dot-notation -- méthode privée
        expect(loadedDictionaryHandler['dictionaries'][1].description).to.be.eql(FAKE_DICTIONARY_DESCRIPTION);
        // eslint-disable-next-line dot-notation -- méthode privée
        expect(loadedDictionaryHandler['dictionaries'][1].dictionaryId).to.be.eql(FAKE_DICTIONARY_ID + 1);
    });

    it('loadDictionaryServer should not add dictionary to dictionaries if it is already loaded', async () => {
        fileHandler.getDictionary.resolves(FAKE_DICTIONARY_WITH_NODES());

        await loadedDictionaryHandler.loadDictionaryServer(FAKE_DICTIONARY_ID, FAKE_DICTIONARY_TITLE);

        // eslint-disable-next-line dot-notation -- méthode privée
        expect(loadedDictionaryHandler['dictionaries'].length).to.be.eql(1);
    });

    it('unloadUnavailableDictionaries should erase dictionary from availableDictionaries and dictionaries', async () => {
        const result = loadedDictionaryHandler.unloadUnavailableDictionaries(FAKE_AVAILABLE_DICTIONARIES());

        expect(result.length).to.be.eql(FAKE_AVAILABLE_DICTIONARIES().length - 1);
        // eslint-disable-next-line dot-notation -- méthode privée
        expect(loadedDictionaryHandler['dictionaries'].length).to.be.eql(0);
    });

    it('unloadUnavailableDictionaries should not erase dictionary from availableDictionaries and dictionaries if find is undefined', async () => {
        // eslint-disable-next-line dot-notation -- méthode privée
        stub(loadedDictionaryHandler['dictionaries'], 'find').returns(undefined);
        const result = loadedDictionaryHandler.unloadUnavailableDictionaries(FAKE_AVAILABLE_DICTIONARIES());

        expect(result.length).to.be.eql(FAKE_AVAILABLE_DICTIONARIES().length - 1);
        // eslint-disable-next-line dot-notation -- méthode privée
        expect(loadedDictionaryHandler['dictionaries'].length).to.be.eql(1);
    });
});
