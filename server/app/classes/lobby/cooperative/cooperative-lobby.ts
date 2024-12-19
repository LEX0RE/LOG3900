import { Lobby, LobbyOptions } from '@app/classes/lobby/lobby-abstract';
import { MAX_PLAYER_COOPERATIVE } from '@app/constants/game';
import { GameFactoryCooperative } from '@app/services/game-factory/cooperative-game-factory/cooperative-game-factory.service';
import { GameModes } from '@common/enums/game-modes';
import { Container } from 'typedi';

export class LobbyCooperative extends Lobby {
    gameFactory: GameFactoryCooperative;
    maxPlayers: number = MAX_PLAYER_COOPERATIVE;
    gameMode: GameModes = GameModes.Cooperative;

    constructor(lobbyOption: LobbyOptions) {
        super(lobbyOption);
        this.gameFactory = Container.get(GameFactoryCooperative);
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
            virtualPlayerNames: [],
            gameMode: this.gameMode,
            playerResponse: this.playerResponse,
        };
    }

    protected fillSeats(): void {
        return;
    }
}
