import { Game } from '@app/classes/game/game';
import { Player } from '@app/classes/players/player-abstract';
import { GAME_END_EVENT, GAME_START_EVENT } from '@app/constants/events/game-events';
import { ON_ADD_GAME } from '@app/constants/events/game-manager-events';
import { GameHistoryDatabase } from '@app/services/game-history-manager/game-history-database/game-history-database.service';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { GameInfoHistory } from '@common/interfaces/replay/game-history';
import { Container, Service } from 'typedi';

@Service()
export class GameHistoryManager {
    gameInfoHistory: Map<string, GameInfoHistory>;
    gameHistoryService: GameHistoryDatabase;
    private gameManager: GameManager;

    constructor() {
        this.gameManager = Container.get(GameManager);
        this.gameHistoryService = Container.get(GameHistoryDatabase);
        this.gameInfoHistory = new Map<string, GameInfoHistory>();
        this.gameManager.eventEmitter.on(ON_ADD_GAME, (game: Game) => this.addGameToHistory(game));
    }

    private addGameToHistory(game: Game): void {
        const info: GameInfoHistory = {
            beginningDate: new Date(0),
            duration: 0,
            gameId: game.gameId,
            realPlayers: game.realUsers,
            losers: [],
            winners: [],
            scores: [],
        };

        this.gameInfoHistory.set(game.gameId, info);
        game.events.on(GAME_START_EVENT, this.onGameStart(this, game));
        game.events.on(GAME_END_EVENT, this.onGameEnd(this, game));
    }

    private onGameStart(self: GameHistoryManager, game: Game): () => void {
        return () => {
            const info = self.gameInfoHistory.get(game.gameId);

            if (!info) return;
            info.beginningDate = new Date();
            self.gameInfoHistory.set(game.gameId, info);
        };
    }

    private onGameEnd(self: GameHistoryManager, game: Game): () => void {
        return () => {
            const info = self.gameInfoHistory.get(game.gameId);

            if (!info) return;
            info.duration = new Date().getTime() - info.beginningDate.getTime();
            info.losers = game.losers.map((player: Player) => player.user);
            info.winners = game.winners.map((player: Player) => player.user);
            info.scores = game.players.map((player: Player) => [player.user.id, player.score]);

            self.gameHistoryService.addGameToHistory(info);
            self.gameInfoHistory.delete(game.gameId);
        };
    }
}
