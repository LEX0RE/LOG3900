import { CommonPlayerInfo } from '@common/interfaces/common-player-info';

export interface CommonEndGame {
    winners: CommonPlayerInfo[];
    losers: CommonPlayerInfo[];
}
