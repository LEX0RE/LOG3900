import { GameVisibilities } from '@common/enums/game-visibilities';
import { CommonGameConfig2 } from '@common/interfaces/lobby/common-game-config2';
import { User } from '@common/interfaces/user/user';

export interface Game {
    gameConfig: CommonGameConfig2;
    visibility: GameVisibilities;
    lobbyId: string;
    players: User[];
    observers: User[];
    virtualPlayerNames: string[];
    isOngoing: boolean;
}

export interface GameClassic extends Game {}

export interface GameTournament extends Game {}

export interface GameCooperative extends Game {}
