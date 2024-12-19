import { Lobby, LobbyOptions } from '@app/classes/lobby/lobby-abstract';
import { MAX_PLAYER_TOURNAMENT } from '@app/constants/game';
import { GameFactoryTournament } from '@app/services/game-factory/tournament-game-factory/tournament-game-factory.service';
import { GameModes } from '@common/enums/game-modes';
import { UserProfile } from '@common/interfaces/user-profile';
import { Container } from 'typedi';

export class LobbyTournament extends Lobby {
    maxPlayers: number = MAX_PLAYER_TOURNAMENT;
    gameMode: GameModes = GameModes.Tournament;

    constructor(lobbyOption: LobbyOptions) {
        super(lobbyOption);
        this.gameFactory = Container.get(GameFactoryTournament);
    }

    getInfo() {
        return {
            lobbyId: this.lobbyId,
            chatId: this.chatId,
            gameConfig: this.gameConfig,
            visibility: this.visibilityManager.visibility,
            players: this.players,
            observers: this.observers,
            potentialPlayers: this.potentialPlayers,
            virtualPlayerNames: this.virtualPlayers.map((virtualPlayer: UserProfile) => virtualPlayer.name),
            gameMode: this.gameMode,
            playerResponse: this.playerResponse,
        };
    }
}
