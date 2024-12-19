import {
    defaultLetterTimes2Tile as lx2,
    defaultLetterTimes3Tile as lx3,
    defaultStandardTile as std,
    defaultWordTimes2Tile as wx2,
    defaultWordTimes3Tile as wx3,
} from '@app/constants/default/default-tile';

export const defaultBoard = [
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [lx2(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std(), std(), wx2(), std(), std(), lx2()],
    [std(), std(), std(), std(), wx2(), std(), std(), std(), std(), std(), wx2(), std(), std(), std(), std()],
    [std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std()],
    [std(), std(), lx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), lx2(), std(), std()],
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std(), wx3()],
    [std(), std(), lx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), lx2(), std(), std()],
    [std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std()],
    [std(), std(), std(), std(), wx2(), std(), std(), std(), std(), std(), wx2(), std(), std(), std(), std()],
    [lx2(), std(), std(), wx2(), std(), std(), std(), lx2(), std(), std(), std(), wx2(), std(), std(), lx2()],
    [std(), std(), wx2(), std(), std(), std(), lx2(), std(), lx2(), std(), std(), std(), wx2(), std(), std()],
    [std(), wx2(), std(), std(), std(), lx3(), std(), std(), std(), lx3(), std(), std(), std(), wx2(), std()],
    [wx3(), std(), std(), lx2(), std(), std(), std(), wx3(), std(), std(), std(), lx2(), std(), std(), wx3()],
];
