import { Easel } from '@app/classes/easel/easel';
import { Game } from '@app/classes/game/game';
import { LobbyCooperative } from '@app/classes/lobby/cooperative/cooperative-lobby';
import { CooperativePlayer } from '@app/classes/players/cooperative-player/cooperative-player';
import { Player } from '@app/classes/players/player-abstract';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { CooperativeScore } from '@app/interface/cooperative-score';
import { GameFactory } from '@app/interface/game-factory';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { GameModes } from '@common/enums/game-modes';
import { CommonGameConfig } from '@common/interfaces/common-game-config';
import { UserProfile } from '@common/interfaces/user-profile';
import { Container, Service } from 'typedi';

@Service()
export class GameFactoryCooperative implements GameFactory {
    private gameManager: GameManager;

    constructor() {
        this.gameManager = Container.get(GameManager);
    }

    // TODO: add observers;
    createGame(lobby: LobbyCooperative): Game {
        const gameId = this.gameManager.nextId();
        const cooperativeScore: CooperativeScore = { score: 0 };
        const cooperativeEasel: Easel = new Easel();

        const players: Player[] = [...lobby.players.map((player: UserProfile) => new CooperativePlayer(player, cooperativeScore, cooperativeEasel))];

        const config: CommonGameConfig = {
            dictionaryId: INDEX_NOT_FOUND,
            dictionaryTitle: lobby.gameConfig.dictionaryTitle,
            gameId,
            gameModeName: GameModes.Cooperative,
            turnTimer: { minute: Infinity, second: Infinity },
            creator: lobby.gameConfig.creator,
            chatId: lobby.chatId,
        };

        return new Game(gameId, config, players, lobby.visibilityManager);
    }
}
