import { TradeLetter } from '@app/classes/actions/trade-letters/trade-letters';
import { FAKE_LETTERS } from '@app/test/constants/fake-letter-easel';

export const FAKE_STASH_INFO =
    'Réserve:\n' +
    'A: 9\n' +
    'B: 0\n' +
    'C: 3\n' +
    'D: 3\n' +
    'E: 15\n' +
    'F: 2\n' +
    'G: 2\n' +
    'H: 2\n' +
    'I: 8\n' +
    'J: 1\n' +
    'K: 1\n' +
    'L: 5\n' +
    'M: 3\n' +
    'N: 6\n' +
    'O: 6\n' +
    'P: 2\n' +
    'Q: 1\n' +
    'R: 6\n' +
    'S: 6\n' +
    'T: 6\n' +
    'U: 6\n' +
    'V: 2\n' +
    'W: 1\n' +
    'X: 1\n' +
    'Y: 1\n' +
    'Z: 1\n' +
    '*: 2\n';

export const FAKE_TRADE = (): TradeLetter => {
    return new TradeLetter(FAKE_LETTERS());
};
