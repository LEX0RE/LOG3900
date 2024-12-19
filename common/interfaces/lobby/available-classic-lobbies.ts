import { GameClassic } from '@common/interfaces/game-info';
import { LobbyClassic } from './lobby-classic';

export interface AvailableClassicLobbies {
    availableLobbies: LobbyClassic[];
}

export interface AvailableClassicGames {
    availableGames: GameClassic[];
}
