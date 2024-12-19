import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { BracketUpdaterService } from '@app/services/bracket-updater/bracket-updater.service';
import { EndTournamentService } from '@app/services/end-tournament/end-tournament.service';
import { CommonBracket } from '@common/interfaces/tournament/common-bracket';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-tournament-bracket',
    templateUrl: './bracket.component.html',
    styleUrls: ['./bracket.component.scss'],
})
export class TournamentBracketComponent {
    translationsContainer: TranslateContainer;
    private readonly bracketUpdater: BracketUpdaterService;
    private readonly endTournament: EndTournamentService;

    get brackets(): CommonBracket[] {
        return this.bracketUpdater.brackets;
    }

    constructor(translate: TranslateService, endTournament: EndTournamentService, bracketUpdater: BracketUpdaterService) {
        this.endTournament = endTournament;
        this.bracketUpdater = bracketUpdater;
        this.translationsContainer = new TranslateContainer(translate, ['quit', 'tournament']);
    }

    surrender(): void {
        this.endTournament.surrenderTournament();
    }

    leave(): void {
        this.endTournament.leaveTournament();
    }

    isTournamentEnded(): boolean {
        return this.endTournament.canLeave;
    }
}
