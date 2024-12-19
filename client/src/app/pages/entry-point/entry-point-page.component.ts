import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { GameNavigationService } from '@app/services/game-navigation/game-navigation.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import {
    SUBSCRIBE_CLASSIC_GAMES,
    SUBSCRIBE_CLASSIC_LOBBIES,
    SUBSCRIBE_COOPERATIVE_GAMES,
    SUBSCRIBE_COOPERATIVE_LOBBIES,
    SUBSCRIBE_TOURNAMENT_GAMES,
    SUBSCRIBE_TOURNAMENT_LOBBIES,
} from '@common/constants/communication';
import { GameModes } from '@common/enums/game-modes';
import { TranslateService } from '@ngx-translate/core';

const PATH_TO_GAME_LOBBIES = '/joinGame';

@Component({
    selector: 'app-entry-point-page',
    templateUrl: './entry-point-page.component.html',
    styleUrls: ['./entry-point-page.component.scss'],
})
export class EntryPointPageComponent {
    translationsContainer: TranslateContainer;
    private readonly socketManager: SocketClientService;
    private readonly router: Router;
    private readonly gameNavigation: GameNavigationService;

    // eslint-disable-next-line max-params
    constructor(translate: TranslateService, socketManager: SocketClientService, router: Router, gameNavigation: GameNavigationService) {
        this.translationsContainer = new TranslateContainer(translate, ['welcome', 'play', 'tournament', 'myProfile', 'coop', 'classic']);
        this.socketManager = socketManager;
        this.router = router;
        this.gameNavigation = gameNavigation;
    }

    toClassicLobbies(): void {
        this.gameNavigation.setGameMode(GameModes.Classic);
        this.socketManager.send(SUBSCRIBE_CLASSIC_LOBBIES);
        this.socketManager.send(SUBSCRIBE_CLASSIC_GAMES);
        this.router.navigate([PATH_TO_GAME_LOBBIES]);
    }

    toCooperativeLobbies(): void {
        this.gameNavigation.setGameMode(GameModes.Cooperative);
        this.socketManager.send(SUBSCRIBE_COOPERATIVE_LOBBIES);
        this.socketManager.send(SUBSCRIBE_COOPERATIVE_GAMES);
        this.router.navigate([PATH_TO_GAME_LOBBIES]);
    }

    toTournamentLobbies(): void {
        this.gameNavigation.setGameMode(GameModes.Tournament);
        this.socketManager.send(SUBSCRIBE_TOURNAMENT_LOBBIES);
        this.socketManager.send(SUBSCRIBE_TOURNAMENT_GAMES);
        this.router.navigate([PATH_TO_GAME_LOBBIES]);
    }
}
