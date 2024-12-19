import { Game } from '@app/classes/game/game';
import { BeginnerPlayer } from '@app/classes/players/virtual-player/beginner-player/beginner-player';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { ON_CHANGE } from '@app/constants/events/game-manager-events';
import { VIRTUAL_PLAYER } from '@app/constants/user/virtual-players';
import { ChatManager2 } from '@app/services/chat-manager2/chat-manager2.service';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { END_GAME, GAME_CONTINUE_EVENT, LEAVE_GAME, SURRENDER_EVENT } from '@common/constants/communication';
import { GameModes } from '@common/enums/game-modes';
import { CommonEndGame } from '@common/interfaces/common-end-game';
import { User } from '@common/interfaces/user/user';
import { Container, Service } from 'typedi';

@Service()
export class EndGameManager {
    chatManager: ChatManager2;
    private socketManager: SocketManager;
    private gameManager: GameManager;

    constructor() {
        this.socketManager = Container.get(SocketManager);
        this.gameManager = Container.get(GameManager);
        this.chatManager = Container.get(ChatManager2);
        this.configureSocket();
    }

    sendEndGame(user: User, endGame: CommonEndGame): void {
        this.socketManager.sendPrivate(END_GAME, user.id, endGame);
    }

    deleteFromGameManager(game: Game) {
        this.gameManager.deleteGame(game.gameId);
    }

    private configureSocket(): void {
        this.socketManager.on(SURRENDER_EVENT, (user: User) => async () => this.giveUpHandler(user));
        this.socketManager.onDisconnect((user: User) => async () => this.giveUpHandler(user));
        this.socketManager.on(LEAVE_GAME, (user: User) => () => {
            const game = this.gameManager.getGameByPlayerId(user.id);

            if (game && game.remainingPlayer().length === 1) game.forceEnd();
        });
    }

    private async giveUpHandler(user: User): Promise<void> {
        const game = this.gameManager.getGameByPlayerId(user.id);

        if (!game) return;
        const player = game.getPlayer(user);

        if (!player) return;

        if (game.gameConfig.gameModeName === GameModes.Cooperative) {
            game.removePlayer(player);
        } else {
            const newPlayer = new BeginnerPlayer(MathUtils.randomInArray(VIRTUAL_PLAYER, 1)[0]);

            game.replacePlayer(player, newPlayer);
        }
        this.gameManager.eventEmitter.emit(ON_CHANGE);
        this.isGameContinue(game);

        await this.chatManager.leaveChat(user, game.gameConfig.chatId);
    }

    private isGameContinue(game: Game) {
        if (game.remainingPlayer().length === 1 && game.gameConfig.gameModeName !== GameModes.Cooperative)
            this.socketManager.sendPrivate(GAME_CONTINUE_EVENT, game.remainingPlayer()[0].id);
    }
}
