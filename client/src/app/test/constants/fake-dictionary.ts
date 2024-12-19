import { Dictionary, DictionaryWithWords } from '@app/interface/dictionary';

export const FAKE_DICTIONARIES = (): Dictionary[] => [
    { title: 'Français', description: 'description de base', dictionaryId: 0 },
    { title: 'Autre dictionnaire', description: 'Un dictionnaire différent', dictionaryId: 0 },
];

export const FAKE_DICTIONARY = (): DictionaryWithWords => {
    return { title: 'Français', description: 'description de base', dictionaryId: 0, words: ['mot'] };
};
