import { EaselUpdate } from '@common/interfaces/easel-update';
import { GameUpdate } from '@common/interfaces/game-update';

export interface TurnInfo {
    easelUpdate: EaselUpdate;
    gameUpdate: GameUpdate;
}
