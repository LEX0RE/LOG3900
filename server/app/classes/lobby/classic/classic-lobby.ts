import { Lobby, LobbyOptions } from '@app/classes/lobby/lobby-abstract';
import { MAX_PLAYER_CLASSIC } from '@app/constants/game';
import { GameFactoryClassic } from '@app/services/game-factory/classic-game-factory/classic-game-factory.service';
import { GameModes } from '@common/enums/game-modes';
import { UserProfile } from '@common/interfaces/user-profile';
import { Container } from 'typedi';

export class LobbyClassic extends Lobby {
    gameFactory: GameFactoryClassic;
    maxPlayers: number = MAX_PLAYER_CLASSIC;
    gameMode: GameModes = GameModes.Classic;

    constructor(lobbyOption: LobbyOptions) {
        super(lobbyOption);
        this.gameFactory = Container.get(GameFactoryClassic);
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
