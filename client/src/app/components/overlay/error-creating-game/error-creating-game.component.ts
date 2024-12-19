import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { NewGameConfigurationService } from '@app/services/new-game-configuration/new-game-configuration.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-error-creating-game',
    templateUrl: './error-creating-game.component.html',
    styleUrls: ['./error-creating-game.component.scss'],
})
export class ErrorCreatingGameComponent {
    translationsContainer: TranslateContainer;
    private newGameConfigurationService: NewGameConfigurationService;

    constructor(translate: TranslateService, newGameConfigurationService: NewGameConfigurationService) {
        this.newGameConfigurationService = newGameConfigurationService;
        this.translationsContainer = new TranslateContainer(translate, ['errorHasOccurred', 'ok', 'impossibleToCreateGameTryAgain']);
    }

    close(): void {
        this.newGameConfigurationService.openErrorCreatingGameOverlay = false;
    }
}
