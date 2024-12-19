import { Easel } from '@app/classes/easel/easel';
import { FAKE_LETTERS } from '@app/test/constants/fake-letter-easel';
import { createStubInstance } from 'sinon';

export const stubEasel = (): Easel => {
    const easel = createStubInstance(Easel);

    easel.letters = FAKE_LETTERS();
    return easel as unknown as Easel;
};
