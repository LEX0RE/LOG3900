import { Component, Input } from '@angular/core';
import { UserTournamentStatistic } from '@common/interfaces/user/user-tournament-statistic';

@Component({
    selector: 'app-tournament-statistic-item',
    templateUrl: './tournament-statistic-item.component.html',
    styleUrls: ['./tournament-statistic-item.component.scss'],
})
// eslint-disable-next-line id-length
export class TournamentStatisticItemComponent {
    @Input() userTournamentStatistic: UserTournamentStatistic;

    get nPlayedTournaments(): string {
        return this.userTournamentStatistic.nTournamentPlayed.toString();
    }

    get nPoints(): string {
        return this.userTournamentStatistic.nPoints.toString();
    }

    get percentFirstPlace(): string {
        return this.percent(this.userTournamentStatistic.nFirstPlace);
    }

    get percentSecondPlace(): string {
        return this.percent(this.userTournamentStatistic.nSecondPlace);
    }

    get percentThirdPlace(): string {
        return this.percent(this.userTournamentStatistic.nThirdPlace);
    }

    get percentFourthPlace(): string {
        return this.percent(this.userTournamentStatistic.nFourthPlace);
    }

    private percent(number: number): string {
        const aHundred = 100;
        const percent = (number / this.userTournamentStatistic.nTournamentPlayed) * aHundred;

        if (isNaN(percent)) return '00 %';

        return percent.toPrecision(2).padStart(2, '0') + ' %';
    }
}
