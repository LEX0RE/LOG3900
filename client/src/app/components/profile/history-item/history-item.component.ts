import { Component, Input } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { IdentityService } from '@app/services/identity/identity.service';
import { ReplayService } from '@app/services/replay/replay.service';
import { MAX_REPLAYS_PER_USER } from '@common/constants/replay';
import { GameInfoHistory } from '@common/interfaces/replay/game-history';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-history-item',
    templateUrl: './history-item.component.html',
    styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent {
    @Input() history: GameInfoHistory;
    @Input() index: number;
    translationsContainer: TranslateContainer;
    private readonly identity: IdentityService;
    private readonly replayService: ReplayService;

    constructor(translate: TranslateService, identity: IdentityService, replayService: ReplayService) {
        this.identity = identity;
        this.replayService = replayService;
        this.translationsContainer = new TranslateContainer(translate, ['victory', 'defeat']);
    }

    get date(): string {
        const date = new Date(this.history.beginningDate);

        return date.toLocaleDateString();
    }

    get time(): string {
        const date = new Date(this.history.beginningDate);

        return date.toLocaleTimeString();
    }

    get isWin(): boolean {
        return Boolean(this.history.winners.find((winner) => winner.id === this.identity.getUser()?.userId));
    }

    get hasReplay(): boolean {
        return this.index < MAX_REPLAYS_PER_USER;
    }

    toReplay(): void {
        this.replayService.getReplay(this.history.gameId);
    }
}
