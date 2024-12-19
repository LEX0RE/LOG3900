import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { EndGameService } from '@app/services/end-game/end-game.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-surrender',
    templateUrl: './surrender.component.html',
    styleUrls: ['./surrender.component.scss'],
})
export class SurrenderComponent {
    change: boolean;
    translationsContainer: TranslateContainer;
    private readonly endGameService: EndGameService;
    private readonly router: Router;

    constructor(translate: TranslateService, endGameService: EndGameService, router: Router) {
        this.change = false;
        this.endGameService = endGameService;
        this.router = router;
        this.translationsContainer = new TranslateContainer(translate, ['surrender', 'areYouSureYouWantToSurrender', 'yes', 'no']);
    }

    get isGamePage(): boolean {
        return /game/.test(this.router.url);
    }

    get isEndGame(): boolean {
        return this.endGameService.canLeave;
    }

    onClick(): void {
        this.endGameService.surrender();
    }
}
