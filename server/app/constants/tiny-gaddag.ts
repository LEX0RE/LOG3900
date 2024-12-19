import { BREAK } from '@app/constants/dictionary';

export const TERMINATOR_MASK = 0b10000000000000000000000000000000;
export const HAS_SINGLE_CHILD_MASK = 0b01000000000000000000000000000000;
export const HAS_MULTIPLE_CHILDREN_MASK = 0b00100000000000000000000000000000;
export const BREAK_MASK = 0b00000000000000000000000000000001;
export const A_MASK = 0b00000000000000000000000000000010;
export const B_MASK = 0b00000000000000000000000000000100;
export const C_MASK = 0b00000000000000000000000000001000;
export const D_MASK = 0b00000000000000000000000000010000;
export const E_MASK = 0b00000000000000000000000000100000;
export const F_MASK = 0b00000000000000000000000001000000;
export const G_MASK = 0b00000000000000000000000010000000;
export const H_MASK = 0b00000000000000000000000100000000;
export const I_MASK = 0b00000000000000000000001000000000;
export const J_MASK = 0b00000000000000000000010000000000;
export const K_MASK = 0b00000000000000000000100000000000;
export const L_MASK = 0b00000000000000000001000000000000;
export const M_MASK = 0b00000000000000000010000000000000;
export const N_MASK = 0b00000000000000000100000000000000;
export const O_MASK = 0b00000000000000001000000000000000;
export const P_MASK = 0b00000000000000010000000000000000;
export const Q_MASK = 0b00000000000000100000000000000000;
export const R_MASK = 0b00000000000001000000000000000000;
export const S_MASK = 0b00000000000010000000000000000000;
export const T_MASK = 0b00000000000100000000000000000000;
export const U_MASK = 0b00000000001000000000000000000000;
export const V_MASK = 0b00000000010000000000000000000000;
export const W_MASK = 0b00000000100000000000000000000000;
export const X_MASK = 0b00000001000000000000000000000000;
export const Y_MASK = 0b00000010000000000000000000000000;
export const Z_MASK = 0b00000100000000000000000000000000;
export const CHARACTER_OF_CHILD_MASK = 0b00111110000000000000000000000000;
export const INDEX_OF_CHILD_MASK = 0b00000001111111111111111111111111;
export const CHILD_INDEX_BIT_POSITION = 7;
export const CHILD_CHARACTER_BIT_POSITION = 25;
export const ZERO_CHAR_INDEX = 96;
export const EXTENDED_ALPHABET: string[] = [
    BREAK,
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];

export const LETTER_MASKS = [
    BREAK_MASK,
    A_MASK,
    B_MASK,
    C_MASK,
    D_MASK,
    E_MASK,
    F_MASK,
    G_MASK,
    H_MASK,
    I_MASK,
    J_MASK,
    K_MASK,
    L_MASK,
    M_MASK,
    N_MASK,
    O_MASK,
    P_MASK,
    Q_MASK,
    R_MASK,
    S_MASK,
    T_MASK,
    U_MASK,
    V_MASK,
    W_MASK,
    X_MASK,
    Y_MASK,
    Z_MASK,
];

export const LETTER_MASK_MAP = new Map<string, number>([
    [BREAK, BREAK_MASK],
    ['a', A_MASK],
    ['b', B_MASK],
    ['c', C_MASK],
    ['d', D_MASK],
    ['e', E_MASK],
    ['f', F_MASK],
    ['g', G_MASK],
    ['h', H_MASK],
    ['i', I_MASK],
    ['j', J_MASK],
    ['k', K_MASK],
    ['l', L_MASK],
    ['m', M_MASK],
    ['n', N_MASK],
    ['o', O_MASK],
    ['p', P_MASK],
    ['q', Q_MASK],
    ['r', R_MASK],
    ['s', S_MASK],
    ['t', T_MASK],
    ['u', U_MASK],
    ['v', V_MASK],
    ['w', W_MASK],
    ['x', X_MASK],
    ['y', Y_MASK],
    ['z', Z_MASK],
]);

export const MASK_LETTER_MAP = new Map<number, string>([
    [BREAK_MASK, BREAK],
    [A_MASK, 'a'],
    [B_MASK, 'b'],
    [C_MASK, 'c'],
    [D_MASK, 'd'],
    [E_MASK, 'e'],
    [F_MASK, 'f'],
    [G_MASK, 'g'],
    [H_MASK, 'h'],
    [I_MASK, 'i'],
    [J_MASK, 'j'],
    [K_MASK, 'k'],
    [L_MASK, 'l'],
    [M_MASK, 'm'],
    [N_MASK, 'n'],
    [O_MASK, 'o'],
    [P_MASK, 'p'],
    [Q_MASK, 'q'],
    [R_MASK, 'r'],
    [S_MASK, 's'],
    [T_MASK, 't'],
    [U_MASK, 'u'],
    [V_MASK, 'v'],
    [W_MASK, 'w'],
    [X_MASK, 'x'],
    [Y_MASK, 'y'],
    [Z_MASK, 'z'],
]);

export const ROOT_INDEX = 1;
export const N_INT32_PER_NODE = 29;
export const TERMINAL_OFFSET = 1;
