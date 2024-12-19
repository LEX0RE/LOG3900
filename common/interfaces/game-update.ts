import { CommonStash } from '@common/interfaces/game-view-related/common-stash';
import { CommonPlayerInfo } from './common-player-info';

export interface GameUpdate {
    playerInfo: CommonPlayerInfo;
    otherPlayersInfo: CommonPlayerInfo[];
    stash: CommonStash;
}
