export interface Dictionary {
    title: string;
    description: string;
    dictionaryId: number;
}

export interface DictionaryWithWords extends Dictionary {
    words: string[];
}
