import { Component } from '@angular/core';
import { EndTournamentService } from '@app/services/end-tournament/end-tournament.service';
import { RankingProfile } from '@common/interfaces/tournament/ranking-profile';

@Component({
    selector: 'app-end-tournament-overlay',
    templateUrl: './end-tournament-overlay.component.html',
    styleUrls: ['./end-tournament-overlay.component.scss'],
})
export class EndTournamentOverlayComponent {
    open: boolean;
    private readonly endTournamentService: EndTournamentService;

    constructor(endTournament: EndTournamentService) {
        this.open = true;
        this.endTournamentService = endTournament;
    }

    get ranking(): RankingProfile[] {
        return this.endTournamentService.endTournament?.players ?? [];
    }

    get isEndTournament(): boolean {
        return Boolean(this.endTournamentService.endTournament);
    }

    close(): void {
        this.open = false;
    }
}
