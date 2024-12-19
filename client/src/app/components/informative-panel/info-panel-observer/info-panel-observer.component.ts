import { Component, Input } from '@angular/core';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { TimerService } from '@app/services/timer/timer.service';
import { TranslateContainer } from '@client/src/app/classes/translate-container/translate-container';
import { CommonPlayerInfo } from '@common/interfaces/common-player-info';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-info-panel-observer',
    templateUrl: './info-panel-observer.component.html',
    styleUrls: ['./info-panel-observer.component.scss'],
})
export class InfoPanelObserverComponent {
    @Input() isObservationPage: boolean;
    isImageTouched: boolean;
    translationsContainer: TranslateContainer;
    private readonly gameUpdate: GameUpdaterService;
    private readonly timerUpdater: TimerService;

    // eslint-disable-next-line max-params -- ne fait que construire l'application
    constructor(translate: TranslateService, gameUpdate: GameUpdaterService, timerUpdater: TimerService) {
        this.gameUpdate = gameUpdate;
        this.timerUpdater = timerUpdater;
        this.translationsContainer = new TranslateContainer(translate, ['stash', 'letters']);
    }

    get timer(): string {
        const timer = this.timerUpdater.timer;

        return (
            timer.minute.toString() +
            ':' +
            timer.second.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
                maximumFractionDigits: 0,
            })
        );
    }

    get player(): CommonPlayerInfo {
        return this.gameUpdate.playerInfo;
    }

    get opponents(): CommonPlayerInfo[] {
        return this.gameUpdate.otherPlayersInfo;
    }

    get remainingLetter(): number {
        return this.gameUpdate.stash.nLettersLeft;
    }
}
