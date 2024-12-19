import { DEFAULT_SIZE } from '@app/constants/grid';

export const ADJUST_ANGLE = 6;
export const ANGLE = Math.PI / ADJUST_ANGLE;

export const ADJUST_MOUSE_CLICK_X = 0.749;
export const ADJUST_MOUSE_CLICK_Y = 0.7186;

export const ADJUST_X = (): number => {
    return DEFAULT_SIZE / (ADJUST_MOUSE_CLICK_X * window.innerHeight);
};

export const ADJUST_Y = (): number => {
    return DEFAULT_SIZE / (ADJUST_MOUSE_CLICK_Y * window.innerHeight);
};
