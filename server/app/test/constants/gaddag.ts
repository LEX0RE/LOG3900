import { NodeVisitor } from '@app/interface/node-visitor';

export const FAKE_NODES = (): Int32Array =>
    new Int32Array([
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- necessaire pour la valeur de test
        0, 536875022, 6, 13, 14, 10, 536870925, 15, 16, 17, 536875010, 18, 22, 1073741848, 1073741849, 1476395034, 1073741851, 1073741852, 536870925,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- necessaire pour la valeur de test
        29, 30, 31, -1073741822, 1107296288, 1107296289, 1107296290, -2147479552, 1476395043, 1476395044, -2147479552, 1073741861, 1073741862,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- necessaire pour la valeur de test
        -2147483636, 1476395047, 1476395048, -2147479552, -2147479552, -2147479552, -2147479552, -2147479552, -2147479552,
    ]);

export const FAKE_WORDS = (): string[] => ['all', 'call', 'ball'];
export const FAKE_LONG_WORD = (): string[] => ['longWord', 'lowWord'];

export const FAKE_NODE_SINGLE_TERMINAL = (): NodeVisitor => {
    return { letters: ['a'], nChildren: 1, hasTerminal: true };
};

export const FAKE_NODE_MULTIPLE_TERMINAL = (): NodeVisitor => {
    return { letters: ['a', 'b'], nChildren: 1, hasTerminal: true };
};

export const FAKE_NODE_SINGLE_CHILD = (): NodeVisitor => {
    return { letters: ['a'], nChildren: 1, hasTerminal: false };
};

export const FAKE_NODE_MULTIPLE_CHILD = (): NodeVisitor => {
    return { letters: ['a', 'b'], nChildren: 1, hasTerminal: false };
};
