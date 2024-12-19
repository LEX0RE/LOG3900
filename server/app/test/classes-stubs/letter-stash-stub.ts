import { LetterStash } from '@app/classes/letter-stash/letter-stash';
import { DEFAULT_QUANTITIES } from '@app/constants/default/default-letter';
import { FAKE_LETTER_STACK, FAKE_OCCURRENCE_STACK } from '@app/test/constants/fake-letter-stash';
import { createStubInstance } from 'sinon';

export const stubLetterStash = (): LetterStash => {
    const stash = createStubInstance(LetterStash);

    stash.letterStack = FAKE_LETTER_STACK();
    Object.defineProperty(stash, 'toOccurrences', { value: FAKE_OCCURRENCE_STACK() });
    Object.defineProperty(stash, 'letterQuantities', { value: DEFAULT_QUANTITIES });
    return stash as unknown as LetterStash;
};
