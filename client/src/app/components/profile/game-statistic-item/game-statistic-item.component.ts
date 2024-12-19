import { Component, Input } from '@angular/core';
import { UserGameStatistic } from '@common/interfaces/user/user-game-statistic';
import { duration } from 'moment';

@Component({
    selector: 'app-game-statistic-item',
    templateUrl: './game-statistic-item.component.html',
    styleUrls: ['./game-statistic-item.component.scss'],
})
export class GameStatisticItemComponent {
    @Input() userGameStatistic: UserGameStatistic;

    get nPlayedGames(): string {
        return this.userGameStatistic.nPlayedGames.toString();
    }

    get nWonGames(): string {
        return this.userGameStatistic.nWonGames.toString();
    }

    get meanScore(): string {
        return this.userGameStatistic.meanScore.toPrecision(2);
    }

    get meanDuration(): string {
        return (
            duration(this.userGameStatistic.meanDuration).hours().toString().padStart(2, '0') +
            ' h ' +
            duration(this.userGameStatistic.meanDuration).minutes().toString().padStart(2, '0') +
            ' m ' +
            duration(this.userGameStatistic.meanDuration).seconds().toString().padStart(2, '0') +
            ' s'
        );
    }
}
