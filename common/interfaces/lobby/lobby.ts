import { GameModes } from '@common/enums/game-modes';
import { GameVisibilities } from '@common/enums/game-visibilities';
import { CommonGameConfig2 } from '@common/interfaces/lobby/common-game-config2';
import { UserProfile } from '@common/interfaces/user-profile';

export interface Lobby {
    gameConfig: CommonGameConfig2;
    visibility: GameVisibilities;
    lobbyId: string;
    chatId: string;
    players: UserProfile[];
    observers: UserProfile[];
    potentialPlayers: UserProfile[];
    playerResponse: string[];
    virtualPlayerNames: string[];
    gameMode: GameModes;
}
