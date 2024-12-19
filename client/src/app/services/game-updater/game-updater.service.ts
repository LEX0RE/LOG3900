import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_NUMBER_OF_LETTERS } from '@app/constants/easel';
import { DEFAULT_LETTERS_IN_STASH, DEFAULT_SCORE } from '@app/constants/game';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { BOARD_UPDATE, EASEL_UPDATE, GAME_UPDATE, REDIRECT_TO_GAME, REDIRECT_TO_HOME, REDIRECT_TO_TOURNAMENT } from '@common/constants/communication';
import { BoardUpdate } from '@common/interfaces/board-update';
import { CommonPlayerInfo } from '@common/interfaces/common-player-info';
import { EaselUpdate, UserEaselUpdate } from '@common/interfaces/easel-update';
import { GameUpdate } from '@common/interfaces/game-update';
import { CommonBoard } from '@common/interfaces/game-view-related/common-board';
import { CommonEasel } from '@common/interfaces/game-view-related/common-easel';
import { CommonStash } from '@common/interfaces/game-view-related/common-stash';

@Injectable({
    providedIn: 'root',
})
export class GameUpdaterService {
    easelUpdateEvent: EventEmitter<EaselUpdate>;
    socketService: SocketClientService;
    isLoading: boolean;
    hasToResetHint: boolean;
    private gameUpdate: GameUpdate;
    private boardUpdate: BoardUpdate;
    private easelUpdate: EaselUpdate;
    private readonly router: Router;

    constructor(socketService: SocketClientService, router: Router) {
        this.easelUpdateEvent = new EventEmitter();
        this.socketService = socketService;
        this.router = router;
        this.configureSocket();
        this.reset();
        this.isLoading = false;
        this.hasToResetHint = true;
    }

    get board(): CommonBoard {
        return this.boardUpdate.board;
    }

    get easel(): CommonEasel {
        return this.easelUpdate.easel;
    }

    get playerInfo(): CommonPlayerInfo {
        return this.gameUpdate.playerInfo;
    }

    get otherPlayersInfo(): CommonPlayerInfo[] {
        return this.gameUpdate.otherPlayersInfo;
    }

    get stash(): CommonStash {
        return this.gameUpdate.stash;
    }

    reset(): void {
        this.isLoading = true;
        this.gameUpdate = {
            otherPlayersInfo: [],
            playerInfo: { nLetterLeft: DEFAULT_NUMBER_OF_LETTERS, name: '', score: DEFAULT_SCORE, turn: false, userId: '' },
            stash: { nLettersLeft: DEFAULT_LETTERS_IN_STASH },
        };
        this.boardUpdate = { board: { tiles: [] } };

        this.easelUpdate = { easel: { letters: [] } };
        this.hasToResetHint = true;
    }

    private configureSocket(): void {
        this.socketService.on(GAME_UPDATE, (update: GameUpdate) => {
            this.isLoading = false;
            this.hasToResetHint = update.playerInfo.turn;
            this.gameUpdate = update;
        });

        this.socketService.on(REDIRECT_TO_GAME, async () => {
            if (!/game/.test(this.router.url)) this.router.navigate(['/game']);
        });
        this.socketService.on(REDIRECT_TO_TOURNAMENT, async () => {
            if (!/bracket/.test(this.router.url)) this.router.navigate(['/bracket']);
        });
        this.socketService.on(REDIRECT_TO_HOME, async () => {
            if (!/home/.test(this.router.url)) this.router.navigate(['/home']);
        });

        this.socketService.on(BOARD_UPDATE, (update: BoardUpdate) => (this.boardUpdate = update));

        this.socketService.on(EASEL_UPDATE, (update: EaselUpdate | UserEaselUpdate) => {
            if (!('userId' in update)) this.replayEaselUpdate(update);
            else this.observerEaselUpdate(update);

            this.easelUpdateEvent.emit();
        });
    }

    private replayEaselUpdate(update: EaselUpdate) {
        this.easelUpdate = update;
    }

    private observerEaselUpdate(update: UserEaselUpdate): void {
        if (this.gameUpdate.playerInfo.userId === update.userId) {
            this.gameUpdate.playerInfo.easel = update.easel;
        } else {
            const updatedUser = this.gameUpdate.otherPlayersInfo.find((player: CommonPlayerInfo) => player.userId === update.userId);

            if (updatedUser) updatedUser.easel = update.easel;
        }
    }
}
