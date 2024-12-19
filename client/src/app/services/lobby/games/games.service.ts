import { Injectable } from '@angular/core';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { PUBLISH_CLASSIC_GAMES, PUBLISH_COOPERATIVE_GAMES, PUBLISH_TOURNAMENT_GAMES } from '@common/constants/communication';
import { GameClassic, GameCooperative, GameTournament } from '@common/interfaces/game-info';
import { AvailableClassicGames } from '@common/interfaces/lobby/available-classic-lobbies';
import { AvailableCooperativeGames } from '@common/interfaces/lobby/available-cooperative-lobbies';
import { AvailableTournamentGames } from '@common/interfaces/lobby/available-tournament-lobbies';

@Injectable({
    providedIn: 'root',
})
export class GamesService {
    gamesClassic: GameClassic[];
    gamesCooperative: GameCooperative[];
    gamesTournament: GameTournament[];
    private readonly socketManager: SocketClientService;

    constructor(socketManager: SocketClientService) {
        this.socketManager = socketManager;
        this.gamesClassic = [];
        this.configureSocket();
    }

    private configureSocket(): void {
        this.socketManager.on(PUBLISH_CLASSIC_GAMES, (gamesClassic: AvailableClassicGames) => {
            this.gamesClassic = gamesClassic.availableGames;
        });
        this.socketManager.on(PUBLISH_COOPERATIVE_GAMES, (gamesCooperative: AvailableCooperativeGames) => {
            this.gamesCooperative = gamesCooperative.availableGames;
        });
        this.socketManager.on(PUBLISH_TOURNAMENT_GAMES, (gamesTournament: AvailableTournamentGames) => {
            this.gamesTournament = gamesTournament.availableGames;
        });
    }
}
