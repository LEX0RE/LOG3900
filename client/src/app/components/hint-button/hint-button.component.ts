import { Component, Input } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { PreviewableHint } from '@app/interface/previewable-hint';
import { CommandConversionService } from '@app/services/command-conversion/command-conversion.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { HintPreviewService } from '@app/services/hint-preview/hint-preview.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-hint-button',
    templateUrl: './hint-button.component.html',
    styleUrls: ['./hint-button.component.scss'],
})
export class HintButtonComponent {
    @Input() isTouched = false;
    selectionState: boolean[];
    isHintSectionOpened: boolean;
    translationsContainer: TranslateContainer;
    readonly gameUpdate: GameUpdaterService;
    private readonly conversionService: CommandConversionService;
    private readonly hintPreviewService: HintPreviewService;

    get hints(): PreviewableHint[] {
        return this.hintPreviewService.hints;
    }

    get isLookingForHints(): boolean {
        return this.hintPreviewService.isLookingForHints;
    }

    get hintBoxMessage(): string {
        return this.hintPreviewService.hintStateMessage;
    }

    // eslint-disable-next-line max-params -- Construction du component
    constructor(
        translate: TranslateService,
        conversion: CommandConversionService,
        gameUpdate: GameUpdaterService,
        hintPreviewService: HintPreviewService,
    ) {
        this.conversionService = conversion;
        this.gameUpdate = gameUpdate;
        this.translationsContainer = new TranslateContainer(translate, ['hint']);
        this.hintPreviewService = hintPreviewService;
        this.isHintSectionOpened = false;
        this.initiateSelectionState();
    }

    sendHint(): void {
        this.isHintSectionOpened = !this.isHintSectionOpened;
        if (this.isHintSectionOpened) this.conversionService.sendHint();
    }

    isSelectedHint(index: number): boolean {
        return this.selectionState[index] ? this.selectionState[index] : false;
    }

    selectHint(index: number): void {
        const nHints = this.hintPreviewService.hints.length;

        if (index < 0 || index >= nHints) return;
        for (let i = 0; i < nHints; i++) {
            if (i === index) {
                this.selectionState[i] = !this.selectionState[i];
                if (!this.selectionState[i]) {
                    this.hintPreviewService.cancelPreviewing();
                    return;
                }
            } else this.selectionState[i] = false;
        }
        this.hintPreviewService.previewHint(index);
    }

    canOpenHintSection(): boolean {
        if (this.gameUpdate.hasToResetHint) {
            this.hintPreviewService.reset();
            this.isHintSectionOpened = false;
            this.initiateSelectionState();
            this.gameUpdate.hasToResetHint = false;
            return false;
        }
        return this.isHintSectionOpened;
    }

    private initiateSelectionState(): void {
        const nHints = this.hintPreviewService.hints.length;

        this.selectionState = [];
        for (let i = 0; i < nHints; i++) this.selectionState.push(false);
    }
}
