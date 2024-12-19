/* eslint-disable dot-notation -- Méthodes privées*/
import { DictionaryFileHandler } from '@app/classes/dictionary-file-handler/dictionary-file-handler';
import { LoadedDictionaryHandler } from '@app/classes/loaded-dictionary-handler/loaded-dictionary-handler';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { AvailableDictionary } from '@app/interface/dictionary-interface';
import { DictionaryService } from '@app/services/dictionary/dictionary.service';
import {
    FAKE_AVAILABLE_DICTIONARIES,
    FAKE_CLIENT_DICTIONARY,
    FAKE_DICTIONARY_WITH_NODES,
    FAKE_DICTIONARY_WITH_WORDS,
} from '@app/test/constants/fake-dictionary';
import { FAKE_DICTIONARY_ID, FAKE_DICTIONARY_TITLE } from '@app/test/constants/fake-game';
import { FAKE_WORDS } from '@app/test/constants/gaddag';
import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { promises as fsAsync } from 'fs';
import { describe } from 'mocha';
import { SinonStubbedInstance, assert, createStubInstance, restore, stub } from 'sinon';

describe('DictionaryService', () => {
    let dictionaryService: DictionaryService;
    let fileHandler: SinonStubbedInstance<DictionaryFileHandler>;
    let loadedDictionaryHandler: SinonStubbedInstance<LoadedDictionaryHandler>;

    beforeEach(() => {
        restore();
        use(chaiAsPromised);
        Object.setPrototypeOf(DictionaryFileHandler, stub());
        Object.setPrototypeOf(LoadedDictionaryHandler, stub());
        stub(fsAsync, 'readdir').resolves();
        stub(fsAsync, 'readFile').resolves();
        stub(fsAsync, 'writeFile').resolves();
        stub(fsAsync, 'unlink').resolves();
        dictionaryService = new DictionaryService();
        fileHandler = createStubInstance(DictionaryFileHandler);
        loadedDictionaryHandler = createStubInstance(LoadedDictionaryHandler);
        dictionaryService['fileHandler'] = fileHandler as unknown as DictionaryFileHandler;
        dictionaryService['loadedDictionariesHandler'] = loadedDictionaryHandler as unknown as LoadedDictionaryHandler;
        dictionaryService['availableDictionaries'] = FAKE_AVAILABLE_DICTIONARIES();
    });

    afterEach(() => restore());

    it('should create', () => expect(dictionaryService).to.exist);

    it('validateWords should call validate word on loaded', () => {
        dictionaryService.validateWords(FAKE_WORDS(), FAKE_DICTIONARY_ID);
        assert.calledOnce(loadedDictionaryHandler.validateWords);
    });

    it('getDictionary should call getDictionary on loaded', () => {
        dictionaryService.getDictionary(FAKE_DICTIONARY_ID);
        assert.calledOnce(loadedDictionaryHandler.getDictionary);
    });

    it('getDictionaryDownload should call getDownloadDictionary on file Handler', async () => {
        await dictionaryService.getDictionaryDownload(FAKE_DICTIONARY_TITLE);
        assert.calledOnce(fileHandler.getDownloadDictionary);
    });

    it('should return dictionaries with only title, description and id', async () => {
        const clientDict = await dictionaryService.getDictionaries();

        expect(clientDict).to.have.deep.members([FAKE_CLIENT_DICTIONARY(), FAKE_CLIENT_DICTIONARY()]);
    });

    it('uploadDictionary should add dictionary to availableDictionaries and increment dictionaryId', async () => {
        const expectedGameCounter = 0;
        const expectedId = 0;
        const otherDictionary = FAKE_DICTIONARY_WITH_WORDS();
        const otherTitle = 'otherTitle';

        otherDictionary.title = otherTitle;
        fileHandler.transformDictionary.resolves(FAKE_DICTIONARY_WITH_NODES());
        fileHandler.setDictionary.resolves();
        await dictionaryService.uploadDictionary(otherDictionary);
        expect(dictionaryService['dictionaryId']).to.be.eql(expectedId + 1);
        const newDictionary: AvailableDictionary | undefined = dictionaryService['availableDictionaries'].pop();

        expect(newDictionary?.title).to.be.eql(FAKE_DICTIONARY_WITH_NODES().title);
        expect(newDictionary?.description).to.be.eql(otherDictionary.description);
        expect(newDictionary?.dictionaryId).to.be.eql(expectedId);
        expect(newDictionary?.gameCounter).to.be.eql(expectedGameCounter);
    });

    it('uploadDictionary throw if writeFile fails', async () => {
        const errorMessage = 'write failed';

        fileHandler.setDictionary.rejects(new Error(errorMessage));
        fileHandler.transformDictionary.resolves(FAKE_DICTIONARY_WITH_NODES());
        expect(dictionaryService.uploadDictionary(FAKE_DICTIONARY_WITH_WORDS())).to.eventually.rejectedWith(errorMessage);
    });

    it('uploadDictionary throw if writeFile fails and undefined find', async () => {
        const errorMessage = 'write failed';

        fileHandler.transformDictionary.resolves(FAKE_DICTIONARY_WITH_NODES());
        stub(dictionaryService['availableDictionaries'], 'find').returns(undefined);
        fileHandler.setDictionary.rejects(new Error(errorMessage));
        expect(dictionaryService.uploadDictionary(FAKE_DICTIONARY_WITH_WORDS())).to.eventually.rejectedWith(errorMessage);
    });

    it('loadDictionary should return dictionaryId', async () => {
        const expectedGameCounter = 1;

        await dictionaryService.loadDictionary(FAKE_DICTIONARY_TITLE).then((receivedId) => expect(receivedId).to.be.eql(FAKE_DICTIONARY_ID));
        expect(dictionaryService['availableDictionaries'][0].gameCounter).to.be.eql(expectedGameCounter);
    });

    it('loadDictionary should return dictionaryId', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- méthode privée
        stub(dictionaryService, 'findAvailableDictionaryTitle' as any).returns(undefined);

        await dictionaryService.loadDictionary(FAKE_DICTIONARY_TITLE).then((receivedId) => expect(receivedId).to.be.eql(INDEX_NOT_FOUND));
    });

    it('unloadDictionary should not decrement gameCounter if already to zero', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- stub membre prive
        const expectedGameCounter = 0;
        const otherId = 123;

        dictionaryService['availableDictionaries'][0].dictionaryId = otherId;

        loadedDictionaryHandler.unloadUnavailableDictionaries.returns(dictionaryService['availableDictionaries']);
        dictionaryService.unloadDictionary(otherId);
        expect(dictionaryService['availableDictionaries'][0].gameCounter).to.be.eql(expectedGameCounter);
    });

    it('unloadDictionary should decrement gameCounter', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- stub membre prive
        const expectedGameCounter = 0;
        const otherId = 123;

        dictionaryService['availableDictionaries'][0].dictionaryId = otherId;
        dictionaryService['availableDictionaries'][0].gameCounter = expectedGameCounter + 1;

        loadedDictionaryHandler.unloadUnavailableDictionaries.returns(dictionaryService['availableDictionaries']);
        dictionaryService.unloadDictionary(otherId);
        expect(dictionaryService['availableDictionaries'][0].gameCounter).to.be.eql(expectedGameCounter);
    });

    it('unloadDictionary should not decrement gameCounter if not a valid number', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- stub membre prive
        const expectedGameCounter = 0;

        loadedDictionaryHandler.unloadUnavailableDictionaries.returns(dictionaryService['availableDictionaries']);
        dictionaryService.unloadDictionary(NaN);
        expect(dictionaryService['availableDictionaries'][0].gameCounter).to.be.eql(expectedGameCounter);
    });

    it('readFiles should addAvailable dictionary', async () => {
        const addSpy = stub(dictionaryService, 'addAvailableDictionary');

        stub(dictionaryService, 'uploadDictionary');
        fileHandler.getDictionaries.resolves([FAKE_DICTIONARY_WITH_NODES()]);
        fileHandler.getDefaultDictionaries.resolves([FAKE_DICTIONARY_WITH_WORDS()]);
        await dictionaryService['readFiles']();
        assert.calledOnce(addSpy);
    });
});
