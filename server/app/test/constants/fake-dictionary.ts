import { Dictionary } from '@app/classes/dictionary/dictionary';
import { DEFAULT_DICTIONARY_TITLE, DICTIONARY_FORMAT } from '@app/constants/dictionary';
import {
    AvailableDictionary,
    ClientDictionary,
    DictionaryWithAll,
    DictionaryWithNodes,
    DictionaryWithWords,
} from '@app/interface/dictionary-interface';
import { FAKE_DICTIONARY_ID, FAKE_DICTIONARY_TITLE } from '@app/test/constants/fake-game';
import { FAKE_NODES } from '@app/test/constants/gaddag';

export const FAKE_DICTIONARY_DESCRIPTION = 'my description';
export const FAKE_DICTIONARY_WORDS = (): string[] => ['call', 'ball', 'all'];

export const FAKE_DICTIONARY_WITH_WORDS = (): DictionaryWithWords => {
    return { title: FAKE_DICTIONARY_TITLE, description: FAKE_DICTIONARY_DESCRIPTION, dictionaryId: 10, words: FAKE_DICTIONARY_WORDS() };
};

export const FAKE_DICTIONARY_WITH_NODES = (): DictionaryWithNodes => {
    return { title: FAKE_DICTIONARY_TITLE, description: FAKE_DICTIONARY_DESCRIPTION, dictionaryId: 10, nodes: new Int32Array() };
};

export const FAKE_DICTIONARY_WITH_ALL = (): DictionaryWithAll => {
    return {
        title: FAKE_DICTIONARY_TITLE,
        description: FAKE_DICTIONARY_DESCRIPTION,
        dictionaryId: 10,
        nodes: new Int32Array(),
        words: FAKE_DICTIONARY_WORDS(),
    };
};

export const FAKE_CLIENT_DICTIONARY = (): ClientDictionary => {
    return { description: FAKE_DICTIONARY_DESCRIPTION, dictionaryId: FAKE_DICTIONARY_ID, title: FAKE_DICTIONARY_TITLE };
};

export const FAKE_DICTIONARY_FULL = (): Dictionary => {
    return new Dictionary(FAKE_CLIENT_DICTIONARY(), FAKE_NODES());
};

export const FAKE_AVAILABLE_DICTIONARIES = (): AvailableDictionary[] => [
    { available: false, description: FAKE_DICTIONARY_DESCRIPTION, dictionaryId: FAKE_DICTIONARY_ID, title: FAKE_DICTIONARY_TITLE, gameCounter: 0 },
    { available: false, description: FAKE_DICTIONARY_DESCRIPTION, dictionaryId: FAKE_DICTIONARY_ID, title: FAKE_DICTIONARY_TITLE, gameCounter: 1 },
    { available: true, description: FAKE_DICTIONARY_DESCRIPTION, dictionaryId: FAKE_DICTIONARY_ID, title: FAKE_DICTIONARY_TITLE, gameCounter: 1 },
    { available: true, description: FAKE_DICTIONARY_DESCRIPTION, dictionaryId: FAKE_DICTIONARY_ID, title: FAKE_DICTIONARY_TITLE, gameCounter: 0 },
];

export const FAKE_FILES_NAMES = (): string[] => [FAKE_DICTIONARY_TITLE + DICTIONARY_FORMAT, DEFAULT_DICTIONARY_TITLE + DICTIONARY_FORMAT];
