import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateContainer } from '@client/src/app/classes/translate-container/translate-container';
import { BRACKET, HOME } from '@client/src/app/constants/router-path';
import { BracketUpdaterService } from '@client/src/app/services/bracket-updater/bracket-updater.service';
import { SocketClientService } from '@client/src/app/services/socket-client/socket-client.service';
import { STOP_OBSERVING_GAME } from '@common/constants/communication';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-observer-overlay',
    templateUrl: './observer-overlay.component.html',
    styleUrls: ['./observer-overlay.component.scss'],
})
export class ObserverOverlayComponent {
    translationsContainer: TranslateContainer;
    private readonly socketManager: SocketClientService;
    private readonly router: Router;
    private readonly bracketService: BracketUpdaterService;

    // eslint-disable-next-line max-params
    constructor(translate: TranslateService, socketManager: SocketClientService, router: Router, bracketService: BracketUpdaterService) {
        this.socketManager = socketManager;
        this.router = router;
        this.bracketService = bracketService;
        this.translationsContainer = new TranslateContainer(translate, ['return']);
    }

    stopObserving(): void {
        if (this.bracketService.brackets && this.bracketService.brackets.length) this.router.navigate([BRACKET]);
        else this.router.navigate([HOME]);
        this.socketManager.send(STOP_OBSERVING_GAME);
    }
}
