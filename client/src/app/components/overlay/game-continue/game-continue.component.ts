import { Component } from '@angular/core';
import { EndGameService } from '@app/services/end-game/end-game.service';
import { TranslateContainer } from '@client/src/app/classes/translate-container/translate-container';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-game-continue',
    templateUrl: './game-continue.component.html',
    styleUrls: ['./game-continue.component.scss'],
})
export class GameContinueComponent {
    open: boolean;
    translationsContainer: TranslateContainer;
    private readonly endGameService: EndGameService;

    constructor(translate: TranslateService, endGame: EndGameService) {
        this.open = true;
        this.endGameService = endGame;
        this.translationsContainer = new TranslateContainer(translate, ['gameContinueText', 'ok']);
    }

    get isEndGame(): boolean {
        return this.endGameService.canEndGame;
    }

    close(): void {
        this.open = false;
    }
}
