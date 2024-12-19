import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { ReplayService } from '@app/services/replay/replay.service';
import { User } from '@common/interfaces/user/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-replay-overlay',
    templateUrl: './replay-overlay.component.html',
    styleUrls: ['./replay-overlay.component.scss'],
})
export class ReplayOverlayComponent {
    translationsContainer: TranslateContainer;
    private readonly replayService: ReplayService;

    constructor(translate: TranslateService, replayService: ReplayService) {
        this.replayService = replayService;
        this.translationsContainer = new TranslateContainer(translate, ['return']);
    }

    get pointOfViews(): User[] {
        return this.replayService.pointOfView;
    }

    get nTurns(): number {
        return this.replayService.replay?.turns.length || 0;
    }

    get timelineClassName(): string {
        return 'n n' + this.nTurns.toString();
    }

    get turnIndex(): number {
        return this.replayService.turnIndex;
    }

    get isEndOfTimeline(): boolean {
        return this.turnIndex === this.nTurns - 1;
    }

    get isStartOfTimeline(): boolean {
        return !this.turnIndex;
    }

    isSelected(userId: string): boolean {
        return this.replayService.userIdForPointOfView === userId;
    }

    setTurnIndex(event: Event): void {
        this.replayService.setTurn((event.target as HTMLInputElement).valueAsNumber - 1);
    }

    nextTurn(): void {
        if (this.isEndOfTimeline) return;
        this.replayService.setTurn(this.turnIndex + 1);
    }

    previousTurn(): void {
        if (this.isStartOfTimeline) return;
        this.replayService.setTurn(this.turnIndex - 1);
    }

    selectPointOfView(userId: string): void {
        this.replayService.setPointOfView(userId);
    }
}
