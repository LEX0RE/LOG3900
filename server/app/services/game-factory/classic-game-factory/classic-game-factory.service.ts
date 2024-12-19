import { Easel } from '@app/classes/easel/easel';
import { Game } from '@app/classes/game/game';
import { LobbyClassic } from '@app/classes/lobby/classic/classic-lobby';
import { Player } from '@app/classes/players/player-abstract';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { BeginnerPlayer } from '@app/classes/players/virtual-player/beginner-player/beginner-player';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { GameFactory } from '@app/interface/game-factory';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { ObserverManager } from '@app/services/observer-manager/observer-manager';
import { GameModes } from '@common/enums/game-modes';
import { CommonGameConfig } from '@common/interfaces/common-game-config';
import { UserProfile } from '@common/interfaces/user-profile';
import { User } from '@common/interfaces/user/user';
import { Container, Service } from 'typedi';

@Service()
export class GameFactoryClassic implements GameFactory {
    private gameManager: GameManager;
    private observerManager: ObserverManager;

    constructor() {
        this.gameManager = Container.get(GameManager);
        this.observerManager = Container.get(ObserverManager);
    }

    createGame(lobby: LobbyClassic): Game {
        const gameId = this.gameManager.nextId();

        const players: Player[] = [
            ...lobby.players.map((player: UserProfile) => new RealPlayer(player, new Easel())),
            ...lobby.virtualPlayers.map((virtualPlayer: UserProfile) => new BeginnerPlayer(virtualPlayer, new Easel())),
        ];

        const observers: User[] | undefined = this.observerManager.observersByRoomLobby.get(lobby.lobbyId);

        const config: CommonGameConfig = {
            dictionaryId: INDEX_NOT_FOUND,
            dictionaryTitle: lobby.gameConfig.dictionaryTitle,
            gameId,
            gameModeName: GameModes.Classic,
            turnTimer: lobby.gameConfig.turnTimer,
            creator: lobby.gameConfig.creator,
            chatId: lobby.chatId,
        };

        return new Game(gameId, config, players, lobby.visibilityManager, observers);
    }
}
