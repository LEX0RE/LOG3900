import { Difficulty } from '@common/enums/difficulty';
import { CommonGameConfig } from '@common/interfaces/common-game-config';

export interface SoloGameConfig extends CommonGameConfig {
    player2Name: string;
    player2Difficulty: Difficulty;
}
