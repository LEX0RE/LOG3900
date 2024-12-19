import { DictionaryFileHandler } from '@app/classes/dictionary-file-handler/dictionary-file-handler';
import { Dictionary } from '@app/classes/dictionary/dictionary';
import { LoadedDictionaryHandler } from '@app/classes/loaded-dictionary-handler/loaded-dictionary-handler';
import { DEFAULT_DICTIONARY_TITLE, DICTIONARY_FORMAT } from '@app/constants/dictionary';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { AvailableDictionary, ClientDictionary, DictionaryWithNodes, DictionaryWithWords } from '@app/interface/dictionary-interface';
import { Service } from 'typedi';

@Service()
export class DictionaryService {
    private availableDictionaries: AvailableDictionary[];
    private dictionaryId: number;
    private loadedDictionariesHandler: LoadedDictionaryHandler;
    private fileHandler: DictionaryFileHandler;

    constructor() {
        this.availableDictionaries = [];
        this.dictionaryId = 0;
        this.loadedDictionariesHandler = new LoadedDictionaryHandler();
        this.fileHandler = new DictionaryFileHandler();
        this.readFiles();
    }

    validateWords(words: string[], dictionaryId: number): boolean {
        return this.loadedDictionariesHandler.validateWords(words, dictionaryId);
    }

    getDictionary(dictionaryId: number): Dictionary | undefined {
        return this.loadedDictionariesHandler.getDictionary(dictionaryId);
    }

    async getDictionaryDownload(title: string): Promise<DictionaryWithWords> {
        return this.fileHandler.getDownloadDictionary(title);
    }

    async getDictionaries(): Promise<ClientDictionary[]> {
        const clientDictionary: ClientDictionary[] = [];

        this.availableDictionaries
            .filter((dictionary) => dictionary.available)
            .forEach((dictionary: AvailableDictionary) =>
                clientDictionary.push({ title: dictionary.title, description: dictionary.description, dictionaryId: dictionary.dictionaryId }),
            );

        const defaultDictionary = clientDictionary.splice(
            clientDictionary.findIndex((dictionary) => dictionary.title === DEFAULT_DICTIONARY_TITLE),
            1,
        );

        clientDictionary.unshift(defaultDictionary[0]);

        return clientDictionary;
    }

    async uploadDictionary(file: DictionaryWithWords): Promise<void> {
        const dictionaryWithNodes = await this.fileHandler.transformDictionary(file);

        await this.fileHandler.setDictionary({ words: file.words, ...dictionaryWithNodes }).catch((error: Error) => {
            const dictionary = this.availableDictionaries.find(
                (dictionaryAvailable: AvailableDictionary) => dictionaryAvailable.title === dictionaryWithNodes.title,
            );

            if (dictionary) this.availableDictionaries.splice(this.availableDictionaries.indexOf(dictionary), 1);
            throw error;
        });

        await this.addAvailableDictionary(dictionaryWithNodes);
    }

    async addAvailableDictionary(file: DictionaryWithNodes): Promise<void> {
        this.availableDictionaries.push({
            title: file.title,
            description: file.description,
            dictionaryId: this.dictionaryId,
            gameCounter: 0,
            available: true,
        });
        this.dictionaryId++;
    }

    async loadDictionary(title: string): Promise<number> {
        const dictionary = this.findAvailableDictionaryTitle(title);
        let dictionaryId = INDEX_NOT_FOUND;

        if (dictionary) {
            const index = this.availableDictionaries.indexOf(dictionary);

            this.availableDictionaries[index].gameCounter++;
            dictionaryId = this.availableDictionaries[index].dictionaryId;
            await this.loadedDictionariesHandler.loadDictionaryServer(dictionaryId, title);
        }

        return dictionaryId;
    }

    unloadDictionary(dictionaryId: number): void {
        const dictionary = this.findAvailableDictionaryId(dictionaryId);

        if (dictionary) {
            const index = this.availableDictionaries.indexOf(dictionary);

            if (this.availableDictionaries[index].gameCounter) this.availableDictionaries[index].gameCounter--;
        }

        this.availableDictionaries = this.loadedDictionariesHandler.unloadUnavailableDictionaries(this.availableDictionaries);
    }

    private findAvailableDictionaryId(dictionaryId: number): AvailableDictionary | undefined {
        return this.availableDictionaries.find((dictionaryAvailable: AvailableDictionary) => dictionaryAvailable.dictionaryId === dictionaryId);
    }

    private findAvailableDictionaryTitle(title: string): AvailableDictionary | undefined {
        return this.availableDictionaries.find((dictionaryAvailable: AvailableDictionary) => dictionaryAvailable.title === title);
    }

    private async readFiles() {
        const dictionaries = await this.fileHandler.getDictionaries();
        const titles = dictionaries.map((dictionary) => dictionary.title + DICTIONARY_FORMAT);

        dictionaries.forEach(async (dictionary: DictionaryWithNodes) => this.addAvailableDictionary(dictionary));
        const defaultDictionary = await this.fileHandler.getDefaultDictionaries(titles);

        defaultDictionary.forEach(async (dictionary: DictionaryWithWords) => this.uploadDictionary(dictionary));
    }
}
