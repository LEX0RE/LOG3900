import { CLASSIC } from '@common/constants/game-modes';

export const FAKE_HISTORY = () => [
    {
        beginningDate: new Date('March 21, 2022 03:24:00'),
        duration: 1500,
        player1: { name: 'james', score: 230 },
        player2: { name: 'nicolas', score: 205 },
        gameModeName: CLASSIC,
        isSurrendered: false,
    },
];
