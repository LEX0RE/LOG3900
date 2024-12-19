import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { EndGameService } from '@app/services/end-game/end-game.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-home-button',
    templateUrl: './home-button.component.html',
    styleUrls: ['./home-button.component.scss'],
})
export class HomeButtonComponent {
    translationsContainer: TranslateContainer;
    private endGameService: EndGameService;

    constructor(translate: TranslateService, endGameService: EndGameService) {
        this.endGameService = endGameService;
        this.translationsContainer = new TranslateContainer(translate, ['quit']);
    }

    get isEndGame(): boolean {
        return Boolean(this.endGameService.endGame) || this.endGameService.canEndGame;
    }

    exitGame() {
        this.endGameService.leave();
    }
}
