import { CommonGameConfig2 } from '@common/interfaces/lobby/common-game-config2';

export interface CommonGameConfig extends CommonGameConfig2 {
    gameModeName: string;
    dictionaryId: number;
    gameId: string;
    chatId: string;
}
