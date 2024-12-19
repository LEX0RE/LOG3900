import { Component, OnInit } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { UserGameStatistic } from '@common/interfaces/user/user-game-statistic';
import { UserTournamentStatistic } from '@common/interfaces/user/user-tournament-statistic';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-statistic-page',
    templateUrl: './statistic-page.component.html',
    styleUrls: ['./statistic-page.component.scss'],
})
export class StatisticPageComponent implements OnInit {
    translationsContainer: TranslateContainer;
    userGameStatistics: UserGameStatistic[];
    userTournamentStatistics: UserTournamentStatistic[];
    private readonly httpManager: HttpRequestManagerService;

    // eslint-disable-next-line max-lines-per-function
    constructor(translate: TranslateService, httpManager: HttpRequestManagerService) {
        this.httpManager = httpManager;
        this.userGameStatistics = [];
        this.userTournamentStatistics = [];
        this.translationsContainer = new TranslateContainer(translate, [
            'statistics',
            'nPlayedGames',
            'nWonGames',
            'meanScore',
            'meanDuration',
            'userGameStatistic',
            'tournamentGameStatistic',
            'nTournamentPlayed',
            'nPoints',
            'nFirstPlace',
            'nSecondPlace',
            'nThirdPlace',
            'nFourthPlace',
            'return',
        ]);
    }

    ngOnInit(): void {
        this.httpManager.getGameStatistics().subscribe({
            next: (value) => (this.userGameStatistics = [value]),
        });
        this.httpManager.getTournamentStatistics().subscribe({
            next: (value) => (this.userTournamentStatistics = [value]),
        });
    }
}
