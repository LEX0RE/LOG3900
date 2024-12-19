import { DictionaryFileHandler } from '@app/classes/dictionary-file-handler/dictionary-file-handler';
import { Dictionary } from '@app/classes/dictionary/dictionary';
import { DICTIONARY_MUST_EXIST } from '@app/constants/error/rules';
import { AvailableDictionary, ClientDictionary, DictionaryWithNodes } from '@app/interface/dictionary-interface';

export class LoadedDictionaryHandler {
    private dictionaries: Dictionary[];
    private fileHandler: DictionaryFileHandler;

    constructor() {
        this.dictionaries = [];
        this.fileHandler = new DictionaryFileHandler();
    }

    validateWords(words: string[], dictionaryId: number): boolean {
        const dictionary = this.getDictionary(dictionaryId);

        if (!dictionary) throw new Error(DICTIONARY_MUST_EXIST);
        const foundWords = words.filter((wordToFind: string) => dictionary.isContaining(wordToFind.toLowerCase()));

        return foundWords.length === words.length;
    }

    getDictionary(dictionaryId: number): Dictionary | undefined {
        const foundDictionary = this.dictionaries.find((dictionary: Dictionary) => dictionary.dictionaryId === dictionaryId);

        if (!foundDictionary) return;
        return foundDictionary;
    }

    async loadDictionaryServer(dictionaryId: number, title: string): Promise<void> {
        const dictionaryServer = this.dictionaries.find((dictionaryAvailable: Dictionary) => dictionaryAvailable.dictionaryId === dictionaryId);

        if (!dictionaryServer) await this.loadDictionaryInMemory(dictionaryId, await this.fileHandler.getDictionary(title));
    }

    unloadUnavailableDictionaries(availableDictionaries: AvailableDictionary[]): AvailableDictionary[] {
        availableDictionaries.forEach((dictionary: AvailableDictionary) => {
            if (!dictionary.available && !dictionary.gameCounter) {
                const dictionaryServer = this.dictionaries.find(
                    (dictionaryUnavailable: Dictionary) => dictionaryUnavailable.dictionaryId === dictionary.dictionaryId,
                );

                if (dictionaryServer) this.dictionaries.splice(this.dictionaries.indexOf(dictionaryServer), 1);
                availableDictionaries.splice(availableDictionaries.indexOf(dictionary), 1);
            }
        });
        return availableDictionaries;
    }

    private async loadDictionaryInMemory(dictionaryId: number, dictionary: DictionaryWithNodes): Promise<void> {
        const information: ClientDictionary = { description: dictionary.description, title: dictionary.title, dictionaryId };
        const dictionaryObject = new Dictionary(information, dictionary.nodes);

        this.dictionaries.push(dictionaryObject);
    }
}
