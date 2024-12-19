import { Letter } from '@app/classes/letters/letter/letter';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- fake data
export const FAKE_LETTERS = (): Letter[] => [new Letter('j', 8), new Letter('a', 1), new Letter('m', 2), new Letter('e', 1), new Letter('s', 1)];

export const FAKE_LETTERS_2 = (): Letter[] => [
    { letter: '*', point: 0 },
    { letter: 'j', point: 10 },
    { letter: 'a', point: 3 },
    { letter: 'e', point: 3 },
    { letter: 's', point: 3 },
    { letter: '*', point: 0 },
];

export const FAKE_LETTERS_3 = (): Letter[] => [
    { letter: 'j', point: 10 },
    { letter: 'a', point: 3 },
    { letter: 'm', point: 8 },
    { letter: 'e', point: 3 },
    { letter: 's', point: 3 },
];
