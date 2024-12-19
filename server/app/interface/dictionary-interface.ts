export interface ClientDictionary {
    title: string;
    description: string;
    dictionaryId: number;
}
export interface AvailableDictionary extends ClientDictionary {
    dictionaryId: number;
    gameCounter: number;
    available: boolean;
}

export interface DictionaryWithNodes extends ClientDictionary {
    nodes: Int32Array;
}

export interface DictionaryWithWords extends ClientDictionary {
    words: string[];
}

export interface DictionaryWithAll extends DictionaryWithNodes, DictionaryWithWords {}
