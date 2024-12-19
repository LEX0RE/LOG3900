import { GameTournament } from '@common/interfaces/game-info';
import { LobbyTournament } from '@common/interfaces/lobby/lobby-tournament';

export interface AvailableTournamentLobbies {
    availableLobbies: LobbyTournament[];
}

export interface AvailableTournamentGames {
    availableGames: GameTournament[];
}
