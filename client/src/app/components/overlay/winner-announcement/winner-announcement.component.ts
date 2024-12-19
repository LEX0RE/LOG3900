import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { EndGameService } from '@app/services/end-game/end-game.service';
import { CommonPlayerInfo } from '@common/interfaces/common-player-info';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-winner-announcement',
    templateUrl: './winner-announcement.component.html',
    styleUrls: ['./winner-announcement.component.scss'],
})
export class WinnerAnnouncementComponent {
    open: boolean;
    translationsContainer: TranslateContainer;
    private readonly endGameService: EndGameService;

    constructor(translate: TranslateService, endGame: EndGameService) {
        this.open = true;
        this.endGameService = endGame;
        this.translationsContainer = new TranslateContainer(translate, ['won', 'lost', 'ok']);
    }

    get winners(): string[] {
        return this.endGameService.endGame?.winners.map((winner: CommonPlayerInfo) => winner.name) ?? [];
    }

    get losers(): string[] {
        return this.endGameService.endGame?.losers.map((loser: CommonPlayerInfo) => loser.name) ?? [];
    }

    get isEndGame(): boolean {
        return Boolean(this.endGameService.endGame);
    }

    close(): void {
        this.open = false;
    }
}
