import { Gaddag } from '@app/classes/gaddag/gaddag';
import { ClientDictionary } from '@app/interface/dictionary-interface';

export class Dictionary extends Gaddag {
    title: string;
    description: string;
    dictionaryId: number;

    constructor(information: ClientDictionary, nodes: Int32Array) {
        super(nodes);
        this.title = information.title;
        this.description = information.description;
        this.dictionaryId = information.dictionaryId;
    }
}
