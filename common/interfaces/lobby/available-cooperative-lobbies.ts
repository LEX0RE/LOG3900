import { GameCooperative } from '../game-info';
import { LobbyCooperative } from './lobby-cooperative';

export interface AvailableCooperativeLobbies {
    availableLobbies: LobbyCooperative[];
}

export interface AvailableCooperativeGames {
    availableGames: GameCooperative[];
}
