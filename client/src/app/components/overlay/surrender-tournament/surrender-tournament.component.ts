import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EndTournamentService } from '@app/services/end-tournament/end-tournament.service';
import { TranslateContainer } from '@client/src/app/classes/translate-container/translate-container';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-surrender-tournament',
    templateUrl: './surrender-tournament.component.html',
    styleUrls: ['./surrender-tournament.component.scss'],
})
export class SurrenderTournamentComponent {
    change: boolean;
    translationsContainer: TranslateContainer;
    private readonly endTournamentService: EndTournamentService;
    private readonly router: Router;

    constructor(translate: TranslateService, endTournamentService: EndTournamentService, router: Router) {
        this.change = false;
        this.endTournamentService = endTournamentService;
        this.router = router;
        this.translationsContainer = new TranslateContainer(translate, ['surrender', 'areYouSureYouWantToSurrender', 'yes', 'no']);
    }

    get isBracketPage(): boolean {
        return /bracket/.test(this.router.url);
    }

    get isEndTournament(): boolean {
        return this.endTournamentService.canLeave;
    }

    onClick(): void {
        this.endTournamentService.surrenderTournament();
    }
}
