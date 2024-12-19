import { Player } from '@app/classes/players/player-abstract';
import { CommonGameConfig } from '@common/interfaces/common-game-config';

export interface WaitingGame {
    player: Player;
    readonly gameId: string;
    readonly gameConfig: CommonGameConfig;
    isWaitingForConfirmation: boolean;
}
