import { Game } from '@app/classes/game/game';
import { Player } from '@app/classes/players/player-abstract';
import { ON_CHANGE } from '@app/constants/events';
import { ON_ADD_GAME, ON_REMOVE_GAME } from '@app/constants/events/game-manager-events';
import { User } from '@common/interfaces/user/user';
import { EventEmitter } from 'stream';
import { Service } from 'typedi';
import { v4 as idGenerator } from 'uuid';

@Service()
export class GameManager {
    eventEmitter: EventEmitter;
    readonly games: Map<string, Game>;

    constructor() {
        this.games = new Map<string, Game>();
        this.eventEmitter = new EventEmitter();
    }

    addGame(game: Game): void {
        this.games.set(game.gameId, game);
        this.eventEmitter.emit(ON_ADD_GAME, game);
        this.eventEmitter.emit(ON_CHANGE);
    }

    deleteGame(gameId: string): boolean {
        const game = this.games.get(gameId);

        if (!game) return false;
        this.eventEmitter.emit(ON_REMOVE_GAME, game.gameId);
        const success = this.games.delete(gameId);

        this.eventEmitter.emit(ON_CHANGE);
        return success;
    }

    getGame(gameId: string): Game | null {
        return this.games.get(gameId) ?? null;
    }

    getGames(): Game[] {
        return Array.from(this.games.values());
    }

    getGameByPlayerId(playerId: string): Game | null {
        let gameFound: Game | null = null;

        this.games.forEach((game: Game) => {
            if (game.players.find((player: Player) => player.user.id === playerId)) gameFound = game;
        });

        return gameFound;
    }

    nextId(): string {
        return idGenerator();
    }

    observeGame(user: User, gameId: string): void {
        const game = this.getGame(gameId);

        if (!game) return;
        game.addObserver(user);
        this.eventEmitter.emit(ON_CHANGE, gameId);
    }

    removeObserver(user: User, gameId: string) {
        const game = this.getGame(gameId);

        if (!game) return;
        game.removeObserver(user);
        this.eventEmitter.emit(ON_CHANGE, gameId);
    }
}
