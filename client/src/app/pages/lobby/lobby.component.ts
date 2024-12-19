import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { BracketUpdaterService } from '@app/services/bracket-updater/bracket-updater.service';
import { EndGameService } from '@app/services/end-game/end-game.service';
import { EndTournamentService } from '@app/services/end-tournament/end-tournament.service';
import { GameNavigationService } from '@app/services/game-navigation/game-navigation.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { IdentityService } from '@app/services/identity/identity.service';

import { LobbyService } from '@app/services/lobby/lobby/lobby.service';
import { ObserverService } from '@app/services/observer/observer.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { LEAVE_LOBBY, START_GAME, START_TOURNAMENT, STOP_OBSERVING_LOBBY } from '@common/constants/communication';
import { GameModes } from '@common/enums/game-modes';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { UserProfile } from '@common/interfaces/user-profile';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
    translationsContainer: TranslateContainer;
    private readonly lobbyManager: LobbyService;
    private readonly socketManager: SocketClientService;
    private readonly identity: IdentityService;
    private readonly gameNavigation: GameNavigationService;

    get creatorName(): string {
        if (!this.lobbyManager.lobby?.gameConfig) return '';
        if (!this.lobbyManager.lobby.gameConfig.creator) return '';
        return this.lobbyManager.lobby.gameConfig.creator.name;
    }

    get players(): UserProfile[] {
        return this.lobbyManager.lobby?.players ?? [];
    }

    get observers(): UserProfile[] {
        return this.lobbyManager.lobby?.observers ?? [];
    }

    get isCreator(): boolean {
        return this.lobbyManager.lobby?.gameConfig.creator?.id === this.identity.getUser()?.userId ?? false;
    }

    get virtualPlayerNames(): string[] {
        return this.lobbyManager.lobby?.virtualPlayerNames ?? [];
    }

    get turnTimer(): string {
        return this.getTimerString(this.lobbyManager.lobby?.gameConfig.turnTimer ?? { minute: 0, second: 0 });
    }

    get dictionaryTitle(): string {
        return this.lobbyManager.lobby?.gameConfig.dictionaryTitle ?? '';
    }

    get hasToDisplayTurnTimer(): boolean {
        return this.lobbyManager.lobby?.gameMode !== GameModes.Cooperative;
    }

    // eslint-disable-next-line max-params, max-lines-per-function -- only services
    constructor(
        translate: TranslateService,
        lobbyManager: LobbyService,
        socketManager: SocketClientService,
        identity: IdentityService,
        gameNavigation: GameNavigationService,
        gameUpdater: GameUpdaterService,
        observerService: ObserverService,
        endGame: EndGameService,
        bracketUpdater: BracketUpdaterService,
        endTournament: EndTournamentService,
    ) {
        this.lobbyManager = lobbyManager;
        this.socketManager = socketManager;
        this.identity = identity;
        this.translationsContainer = new TranslateContainer(translate, [
            'classicGame',
            'players',
            'virtualPlayers',
            'startGame',
            'return',
            'startTournament',
            'tournamentTitle',
            'classicTitle',
            'cooperativeTitle',
        ]);
        this.gameNavigation = gameNavigation;
        this.lobbyManager.wakeUp();
        gameUpdater.reset();
        observerService.wakeUp();
        endGame.reset();
        bracketUpdater.reset();
        endTournament.reset();
    }

    startGame(): void {
        this.socketManager.send(this.isTournamentMode() ? START_TOURNAMENT : START_GAME, this.lobbyManager.lobby?.lobbyId);
    }

    leaveLobby(): void {
        this.socketManager.send(LEAVE_LOBBY, this.lobbyManager.lobby?.lobbyId);
        this.socketManager.send(STOP_OBSERVING_LOBBY, this.lobbyManager.lobby?.lobbyId);
    }

    isTournamentMode(): boolean {
        return this.gameNavigation.getGameMode() === GameModes.Tournament;
    }

    get isCooperativeGame(): boolean {
        return this.gameNavigation.getGameMode() === GameModes.Cooperative;
    }

    private getTimerString(timer: CommonTimer): string {
        return `${timer.minute}:${timer.second.toString().padStart(2, '0')}`;
    }
}
