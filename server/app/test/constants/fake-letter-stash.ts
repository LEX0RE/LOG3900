/* eslint-disable @typescript-eslint/no-magic-numbers -- necessaire pour la map d'occurrences */
import { Letter } from '@app/classes/letters/letter/letter';

// eslint-disable-next-line max-lines-per-function -- ne fait que retourner les lettres de la réserve
export const FAKE_LETTER_STACK = (): Letter[] => [
    { letter: 'a', point: 1 },
    { letter: 'a', point: 1 },
    { letter: 'a', point: 1 },
    { letter: 'a', point: 1 },
    { letter: 'a', point: 1 },
    { letter: 'a', point: 1 },
    { letter: 'a', point: 1 },
    { letter: 'a', point: 1 },
    { letter: 'a', point: 1 },
    { letter: 'c', point: 3 },
    { letter: 'c', point: 3 },
    { letter: 'c', point: 3 },
    { letter: 'd', point: 2 },
    { letter: 'd', point: 2 },
    { letter: 'd', point: 2 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'e', point: 1 },
    { letter: 'f', point: 4 },
    { letter: 'f', point: 4 },
    { letter: 'g', point: 2 },
    { letter: 'g', point: 2 },
    { letter: 'h', point: 4 },
    { letter: 'h', point: 4 },
    { letter: 'i', point: 1 },
    { letter: 'i', point: 1 },
    { letter: 'i', point: 1 },
    { letter: 'i', point: 1 },
    { letter: 'i', point: 1 },
    { letter: 'i', point: 1 },
    { letter: 'i', point: 1 },
    { letter: 'i', point: 1 },
    { letter: 'j', point: 8 },
    { letter: 'k', point: 10 },
    { letter: 'l', point: 1 },
    { letter: 'l', point: 1 },
    { letter: 'l', point: 1 },
    { letter: 'l', point: 1 },
    { letter: 'l', point: 1 },
    { letter: 'm', point: 2 },
    { letter: 'm', point: 2 },
    { letter: 'm', point: 2 },
    { letter: 'n', point: 1 },
    { letter: 'n', point: 1 },
    { letter: 'n', point: 1 },
    { letter: 'n', point: 1 },
    { letter: 'n', point: 1 },
    { letter: 'n', point: 1 },
    { letter: 'o', point: 1 },
    { letter: 'o', point: 1 },
    { letter: 'o', point: 1 },
    { letter: 'o', point: 1 },
    { letter: 'o', point: 1 },
    { letter: 'o', point: 1 },
    { letter: 'p', point: 3 },
    { letter: 'p', point: 3 },
    { letter: 'q', point: 8 },
    { letter: 'r', point: 1 },
    { letter: 'r', point: 1 },
    { letter: 'r', point: 1 },
    { letter: 'r', point: 1 },
    { letter: 'r', point: 1 },
    { letter: 'r', point: 1 },
    { letter: 's', point: 1 },
    { letter: 's', point: 1 },
    { letter: 's', point: 1 },
    { letter: 's', point: 1 },
    { letter: 's', point: 1 },
    { letter: 's', point: 1 },
    { letter: 't', point: 1 },
    { letter: 't', point: 1 },
    { letter: 't', point: 1 },
    { letter: 't', point: 1 },
    { letter: 't', point: 1 },
    { letter: 't', point: 1 },
    { letter: 'u', point: 1 },
    { letter: 'u', point: 1 },
    { letter: 'u', point: 1 },
    { letter: 'u', point: 1 },
    { letter: 'u', point: 1 },
    { letter: 'u', point: 1 },
    { letter: 'v', point: 4 },
    { letter: 'v', point: 4 },
    { letter: 'w', point: 10 },
    { letter: 'x', point: 10 },
    { letter: 'y', point: 10 },
    { letter: 'z', point: 10 },
    { letter: '*', point: 0 },
    { letter: '*', point: 0 },
];

// eslint-disable-next-line max-lines-per-function -- ne fait que retourner la map des occurrences
export const FAKE_OCCURRENCE_STACK = (): Map<string, number> => {
    const map = new Map<string, number>();

    map.set('a', 9);
    map.set('c', 3);
    map.set('d', 3);
    map.set('e', 15);
    map.set('f', 2);
    map.set('g', 2);
    map.set('h', 2);
    map.set('i', 8);
    map.set('j', 1);
    map.set('k', 1);
    map.set('l', 5);
    map.set('m', 3);
    map.set('n', 6);
    map.set('o', 6);
    map.set('p', 2);
    map.set('q', 1);
    map.set('r', 6);
    map.set('s', 6);
    map.set('t', 6);
    map.set('u', 6);
    map.set('v', 2);
    map.set('w', 1);
    map.set('x', 1);
    map.set('y', 1);
    map.set('z', 1);
    map.set('*', 2);
    return map;
};
