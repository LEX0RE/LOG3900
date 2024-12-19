import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';

export const FAKE_TIMERS: CommonTimer[] = [
    { minute: 5, second: 0 },
    { minute: 5, second: 0 },
    { minute: 4, second: 59 },
    { minute: 4, second: 1 },
    { minute: 1, second: 59 },
    { minute: 0, second: 0 },
];

export const FAKE_TURN_TIMES = (): CommonTimer[] => [
    { minute: 0, second: 30 },
    { minute: 1, second: 0 },
    { minute: 1, second: 30 },
    { minute: 2, second: 0 },
    { minute: 2, second: 30 },
];
