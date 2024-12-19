import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { GameNavigationService } from '@app/services/game-navigation/game-navigation.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { TimerService } from '@app/services/timer/timer.service';
import { GameModes } from '@common/enums/game-modes';
import { CommonPlayerInfo } from '@common/interfaces/common-player-info';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-informative-panel',
    templateUrl: './informative-panel.component.html',
    styleUrls: ['./informative-panel.component.scss'],
})
export class InformativePanelComponent {
    @Input() isObservationPage: boolean;
    isImageTouched: boolean;
    translationsContainer: TranslateContainer;
    router: Router;
    private readonly gameUpdate: GameUpdaterService;
    private readonly timerUpdater: TimerService;
    private readonly gameNavigationService: GameNavigationService;

    // eslint-disable-next-line max-params -- ne fait que construire l'application
    constructor(
        translate: TranslateService,
        gameUpdate: GameUpdaterService,
        timerUpdater: TimerService,
        gameNavigationService: GameNavigationService,
        router: Router,
    ) {
        this.gameUpdate = gameUpdate;
        this.timerUpdater = timerUpdater;
        this.router = router;
        this.translationsContainer = new TranslateContainer(translate, ['stash', 'letters']);
        this.gameNavigationService = gameNavigationService;
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

    get isReplay(): boolean {
        return /replay/.test(this.router.url);
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

    get isCooperativeGame(): boolean {
        return this.gameNavigationService.getGameMode() === GameModes.Cooperative;
    }
}
