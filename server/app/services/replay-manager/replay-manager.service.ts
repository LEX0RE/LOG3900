import { Game } from '@app/classes/game/game';
import { Player } from '@app/classes/players/player-abstract';
import { GAME_TURN_CHANGE_EVENT } from '@app/constants/events/game-events';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { ReplayDatabaseManager } from '@app/services/replay-manager/replay-database-manager/replay-database-manager.service';
import { TurnInfo } from '@common/interfaces/replay/turn-info';
import { Container, Service } from 'typedi';

@Service()
export class ReplayManager {
    replayDatabaseManager: ReplayDatabaseManager;
    gameManager: GameManager;

    constructor() {
        this.replayDatabaseManager = Container.get(ReplayDatabaseManager);
        this.gameManager = Container.get(GameManager);
    }

    async createReplay(game: Game): Promise<void> {
        await this.replayDatabaseManager.createEmptyReplay(game);
        game.events.on(GAME_TURN_CHANGE_EVENT, this.onTurnChange(this, game));
    }

    private onTurnChange(self: ReplayManager, game: Game): () => void {
        return () => {
            const playersTurnInfos = new Map<string, TurnInfo>();

            game.players.forEach((player: Player) => {
                playersTurnInfos.set(player.user.id, {
                    easelUpdate: game.watchTower.setEaselUpdate(player),
                    gameUpdate: game.watchTower.setGameUpdate(player),
                });
            });

            self.replayDatabaseManager.addTurnToReplay(game.gameId, playersTurnInfos, game.watchTower.setBoardUpdate());
        };
    }
}
