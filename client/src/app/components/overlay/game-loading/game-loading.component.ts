import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-game-loading',
    templateUrl: './game-loading.component.html',
    styleUrls: ['./game-loading.component.scss'],
})
export class GameLoadingComponent {
    translationsContainer: TranslateContainer;
    private gameUpdate: GameUpdaterService;

    get isGameLoading(): boolean {
        return this.gameUpdate.isLoading;
    }

    constructor(translate: TranslateService, gameUpdate: GameUpdaterService) {
        this.gameUpdate = gameUpdate;
        this.translationsContainer = new TranslateContainer(translate, ['gameLoading']);
    }
}
