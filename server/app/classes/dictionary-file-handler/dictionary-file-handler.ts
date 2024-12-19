import { Dictionary } from '@app/classes/dictionary/dictionary';
import { GaddagCreator } from '@app/classes/gaddag/gaddag-creator/gaddag-creator';
import { DEFAULT_DICTIONARY_PATH, DICTIONARY_FORMAT, DICTIONARY_PATH, FILE_ENCODING } from '@app/constants/dictionary';
import { ClientDictionary, DictionaryWithAll, DictionaryWithNodes, DictionaryWithWords } from '@app/interface/dictionary-interface';
import { doNothing } from '@app/test/do-nothing-function';
import { promises as fsAsync } from 'fs';
export class DictionaryFileHandler {
    async getDictionary(title: string): Promise<DictionaryWithNodes> {
        const temporary = JSON.parse(await fsAsync.readFile(DICTIONARY_PATH + title + DICTIONARY_FORMAT, FILE_ENCODING));

        return {
            title: temporary.title,
            description: temporary.description,
            dictionaryId: temporary.dictionaryId,
            nodes: new Int32Array(temporary.nodes),
        };
    }

    async getDownloadDictionary(title: string): Promise<DictionaryWithWords> {
        const temporary = JSON.parse(await fsAsync.readFile(DICTIONARY_PATH + title + DICTIONARY_FORMAT, FILE_ENCODING));

        return {
            title: temporary.title,
            description: temporary.description,
            dictionaryId: temporary.dictionaryId,
            words: temporary.words,
        };
    }

    async getDictionaryWithAll(title: string): Promise<DictionaryWithAll> {
        const temporary = JSON.parse(await fsAsync.readFile(DICTIONARY_PATH + title + DICTIONARY_FORMAT, FILE_ENCODING));

        return {
            title: temporary.title,
            description: temporary.description,
            dictionaryId: temporary.dictionaryId,
            nodes: new Int32Array(temporary.nodes),
            words: temporary.words,
        };
    }

    async setDictionary(dictionary: DictionaryWithAll): Promise<void> {
        // a enlever
        const saved = {
            title: dictionary.title,
            description: dictionary.description,
            dictionaryId: dictionary.dictionaryId,
            nodes: Array.from(dictionary.nodes),
            words: dictionary.words,
        };

        return fsAsync.writeFile(DICTIONARY_PATH + dictionary.title + DICTIONARY_FORMAT, JSON.stringify(saved, null, 2));
    }

    async getDictionaries(): Promise<DictionaryWithNodes[]> {
        const dictionaries: DictionaryWithNodes[] = [];
        const filesName = await fsAsync.readdir(DICTIONARY_PATH);

        for (const file of filesName) {
            const fileText = await fsAsync.readFile(DICTIONARY_PATH + file, FILE_ENCODING).catch(doNothing);

            if (!fileText) continue;
            const dictionary = JSON.parse(fileText);

            dictionaries.push(dictionary);
        }

        return dictionaries;
    }

    async getDefaultDictionaries(alreadyLoad: string[]): Promise<DictionaryWithWords[]> {
        const dictionaries: DictionaryWithWords[] = [];

        let filesName: string[] = await fsAsync.readdir(DEFAULT_DICTIONARY_PATH);

        filesName = filesName.filter((file) => !alreadyLoad.includes(file));
        for (const file of filesName) {
            const fileText = await fsAsync.readFile(DEFAULT_DICTIONARY_PATH + file, FILE_ENCODING);

            if (!fileText) continue;
            dictionaries.push(JSON.parse(fileText));
        }

        return dictionaries;
    }

    async transformDictionary(dictionary: DictionaryWithWords): Promise<DictionaryWithNodes> {
        const startTime = Date.now();
        const creator = new GaddagCreator();
        const nodes = await creator.createGaddag(dictionary.words);
        const information: ClientDictionary = {
            description: dictionary.description,
            title: dictionary.title,
            dictionaryId: dictionary.dictionaryId,
        };

        // eslint-disable-next-line no-console -- Permet de voir le temps d'exécution de la conversion des dictionnaires
        console.log(`Dictionary ${dictionary.title} was created in ${Date.now() - startTime} ms`);

        return new Dictionary(information, nodes);
    }
}
