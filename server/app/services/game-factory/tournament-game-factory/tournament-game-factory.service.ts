import { LobbyTournament } from '@app/classes/lobby/tournament/tournament-lobby';
import { Player } from '@app/classes/players/player-abstract';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { BeginnerPlayer } from '@app/classes/players/virtual-player/beginner-player/beginner-player';
import { Tournament } from '@app/classes/tournament/tournament';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { GameFactory } from '@app/interface/game-factory';
import { ObserverManager } from '@app/services/observer-manager/observer-manager';
import { TournamentManager } from '@app/services/tournament-manager/tournament-manager.service';
import { GameModes } from '@common/enums/game-modes';
import { CommonGameConfig } from '@common/interfaces/common-game-config';
import { UserProfile } from '@common/interfaces/user-profile';
import { User } from '@common/interfaces/user/user';
import { Container, Service } from 'typedi';

@Service()
export class GameFactoryTournament implements GameFactory {
    private tournamentManager: TournamentManager;
    private observerManager: ObserverManager;

    constructor() {
        this.tournamentManager = Container.get(TournamentManager);
        this.observerManager = Container.get(ObserverManager);
    }

    createGame(lobby: LobbyTournament): Tournament {
        const tournamentId = this.tournamentManager.nextId();

        const players: Player[] = [
            ...lobby.players.map((player: UserProfile) => new RealPlayer(player)),
            ...lobby.virtualPlayers.map((virtualPlayer: UserProfile) => new BeginnerPlayer(virtualPlayer)),
        ];

        const observers: User[] | undefined = this.observerManager.observersByRoomLobby.get(lobby.lobbyId);

        const config: CommonGameConfig = {
            dictionaryId: INDEX_NOT_FOUND,
            dictionaryTitle: lobby.gameConfig.dictionaryTitle,
            gameId: tournamentId,
            gameModeName: GameModes.Tournament,
            turnTimer: lobby.gameConfig.turnTimer,
            creator: lobby.gameConfig.creator,
            chatId: lobby.chatId,
        };

        return new Tournament(tournamentId, config, players, lobby.visibilityManager, observers);
    }
}
