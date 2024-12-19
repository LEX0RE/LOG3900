import { DictionaryService } from '@app/services/dictionary/dictionary.service';
import { doNothing } from '@app/test/do-nothing-function';
import { promises as fsAsync } from 'fs';
import { createStubInstance, SinonStubbedInstance, stub } from 'sinon';

export const stubDictionaryService = (): SinonStubbedInstance<DictionaryService> => {
    stub(fsAsync, 'readFile').callsFake(doNothing);

    const service = createStubInstance(DictionaryService);

    return service;
};
