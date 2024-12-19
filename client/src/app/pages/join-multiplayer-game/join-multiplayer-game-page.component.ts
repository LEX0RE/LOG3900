import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { BracketUpdaterService } from '@app/services/bracket-updater/bracket-updater.service';
import { GameNavigationService } from '@app/services/game-navigation/game-navigation.service';
import { GamesService } from '@app/services/lobby/games/games.service';
import { LobbiesService } from '@app/services/lobby/lobbies/lobbies.service';
import { LobbyService } from '@app/services/lobby/lobby/lobby.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { NeedPassword } from '@client/src/app/interface/need-password';
import {
    CANCEL_JOIN_REQUEST,
    UNSUBSCRIBE_CLASSIC_GAMES,
    UNSUBSCRIBE_CLASSIC_LOBBIES,
    UNSUBSCRIBE_COOPERATIVE_GAMES,
    UNSUBSCRIBE_COOPERATIVE_LOBBIES,
    UNSUBSCRIBE_TOURNAMENT_GAMES,
    UNSUBSCRIBE_TOURNAMENT_LOBBIES,
} from '@common/constants/communication';
import { GameModes } from '@common/enums/game-modes';
import { Game } from '@common/interfaces/game-info';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { Lobby } from '@common/interfaces/lobby/lobby';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-join-multiplayer-game-page',
    templateUrl: './join-multiplayer-game-page.component.html',
    styleUrls: ['./join-multiplayer-game-page.component.scss'],
})
export class JoinMultiplayerGameComponent implements OnDestroy {
    password: FormControl;
    translationsContainer: TranslateContainer;
    private readonly socketManager: SocketClientService;
    private readonly lobbiesService: LobbiesService;
    private readonly gamesService: GamesService;
    private readonly gameNavigationService: GameNavigationService;

    // eslint-disable-next-line max-params, max-lines-per-function -- 5 is the maximum number of parameters
    constructor(
        translate: TranslateService,
        socketManager: SocketClientService,
        lobbiesService: LobbiesService,
        gamesService: GamesService,
        lobbyService: LobbyService,
        gameNavigationService: GameNavigationService,
        bracketUpdater: BracketUpdaterService,
    ) {
        this.socketManager = socketManager;
        this.lobbiesService = lobbiesService;
        this.gamesService = gamesService;
        this.password = new FormControl('', Validators.required);
        this.translationsContainer = new TranslateContainer(translate, [
            'creator',
            'joinMultiplayerGame',
            'parameters',
            'numberOfPlayers',
            'numberOfVirtualPlayers',
            'numberOfObservers',
            'createNewGame',
            'createTournament',
            'return',
            'joinClassicGame',
            'joinCoopGame',
            'joinATournament',
            'visibility',
            'ok',
            'waitingForCreatorApprobation',
            'youWereRejected',
            'cancel',
            'invaldiPasswordNewGame',
            'enterPasswordNewGame',
            'emptyField',
            'goToGame',
            'cancel',
        ]);
        this.gameNavigationService = gameNavigationService;
        bracketUpdater.wakeUp();
        lobbyService.wakeUp();
        lobbyService.reset();
    }

    get gameMode() {
        return this.gameNavigationService.getGameMode();
    }

    ngOnDestroy(): void {
        this.leave();
    }

    get lobbies(): Lobby[] {
        switch (this.gameNavigationService.getGameMode()) {
            case GameModes.Classic:
                return this.lobbiesService.lobbiesClassic;
            case GameModes.Cooperative:
                return this.lobbiesService.lobbiesCooperative;
            case GameModes.Tournament:
                return this.lobbiesService.lobbiesTournament;
            default:
                return [];
        }
    }

    get games(): Game[] {
        switch (this.gameNavigationService.getGameMode()) {
            case GameModes.Classic:
                return this.gamesService.gamesClassic;
            case GameModes.Cooperative:
                return this.gamesService.gamesCooperative;
            case GameModes.Tournament:
                return this.gamesService.gamesTournament;
            default:
                return [];
        }
    }

    get isRejected(): boolean {
        return this.lobbiesService.isRejected;
    }

    get isWaiting(): boolean {
        return this.lobbiesService.waitingOnLobby.isWaiting;
    }

    get needPassword(): boolean {
        return this.lobbiesService.needPassword.needPassword;
    }

    get passwordValid(): boolean {
        return this.lobbiesService.passwordValid;
    }

    // eslint-disable-next-line max-lines-per-function
    leave(): void {
        let gameModeToUnsubscribeFrom;
        let gamesToUnsubscribeFrom;

        switch (this.gameNavigationService.getGameMode()) {
            case GameModes.Classic:
                gameModeToUnsubscribeFrom = UNSUBSCRIBE_CLASSIC_LOBBIES;
                gamesToUnsubscribeFrom = UNSUBSCRIBE_CLASSIC_GAMES;
                break;
            case GameModes.Cooperative:
                gameModeToUnsubscribeFrom = UNSUBSCRIBE_COOPERATIVE_LOBBIES;
                gamesToUnsubscribeFrom = UNSUBSCRIBE_COOPERATIVE_GAMES;
                break;
            case GameModes.Tournament:
                gameModeToUnsubscribeFrom = UNSUBSCRIBE_TOURNAMENT_LOBBIES;
                gamesToUnsubscribeFrom = UNSUBSCRIBE_TOURNAMENT_GAMES;
                break;
            default:
                gameModeToUnsubscribeFrom = '';
                gamesToUnsubscribeFrom = '';
        }
        this.socketManager.send(gameModeToUnsubscribeFrom);
        this.socketManager.send(gamesToUnsubscribeFrom);
    }

    formatTimer(timer: CommonTimer): string {
        return (
            timer.minute.toString() +
            ' min ' +
            timer.second.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
                maximumFractionDigits: 0,
            }) +
            ' sec'
        );
    }

    openWaitingOverlay(lobbyId: string): void {
        this.lobbiesService.waitingOnLobby = {
            isWaiting: true,
            lobbyId,
        };
    }

    openPasswordOverlay(needPassword: NeedPassword): void {
        this.lobbiesService.needPassword = needPassword;
    }

    closeRejectionOverlay() {
        this.lobbiesService.isRejected = false;
    }

    closePasswordOverlay() {
        this.lobbiesService.needPassword = { needPassword: false };
        this.lobbiesService.passwordValid = true;
        this.password.reset();
    }

    cancelJoinRequest(): void {
        this.socketManager.send(CANCEL_JOIN_REQUEST, this.lobbiesService.waitingOnLobby.lobbyId);
        this.lobbiesService.waitingOnLobby = { isWaiting: false };
    }

    validatePassword(): void {
        this.lobbiesService.validatePassword(this.password.value);
    }

    isCooperativeGameMode(): boolean {
        return this.gameNavigationService.getGameMode() === GameModes.Cooperative;
    }

    isClassicGameMode(): boolean {
        return this.gameNavigationService.getGameMode() === GameModes.Classic;
    }

    isTournamentMode(): boolean {
        return this.gameNavigationService.getGameMode() === GameModes.Tournament;
    }
}
