import { Injectable } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { SPACE } from '@app/constants/easel';
import { MAX_HINTS } from '@app/constants/hint';
import { PlacementStep } from '@app/enum/placements';
import { PreviewableHint } from '@app/interface/previewable-hint';
import { CommandConversionService } from '@app/services/command-conversion/command-conversion.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { GridMouseEventLogic } from '@app/services/grid-mouse-event/logic/grid-mouse-event-logic.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { HINT_COMMAND_NO_RESULT, HINT_COMMAND_PARTIAL_RESULTS, HINT_COMMAND_RESULTS, RESEARCH_HINT } from '@common/constants/communication';
import { HintToSend, Hints } from '@common/interfaces/hints';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class HintPreviewService {
    socketService: SocketClientService;
    gridMouseEventLogicService: GridMouseEventLogic;
    commandConversionService: CommandConversionService;
    translationsContainer: TranslateContainer;
    gameUpdaterService: GameUpdaterService;
    hints: PreviewableHint[];
    isLookingForHints: boolean;
    isPreviewingHint: boolean;
    hintStateMessage: string;
    isHintSectionOpened: boolean;

    // eslint-disable-next-line max-params, max-lines-per-function -- Construction du service
    constructor(
        socketService: SocketClientService,
        gridMouseEventLogicService: GridMouseEventLogic,
        commandConversionService: CommandConversionService,
        translate: TranslateService,
        gameUpdaterService: GameUpdaterService,
    ) {
        this.socketService = socketService;
        this.gridMouseEventLogicService = gridMouseEventLogicService;
        this.commandConversionService = commandConversionService;
        this.translationsContainer = new TranslateContainer(translate, [
            'hintResearch',
            'hintFoundAll',
            'hintFoundSome',
            'noHintFound',
            'placeAction',
        ]);
        this.gameUpdaterService = gameUpdaterService;
        this.hints = [];
        this.isLookingForHints = false;
        this.isPreviewingHint = false;
        this.hintStateMessage = '';
        this.isHintSectionOpened = false;
        this.configureSocket();
    }

    previewHint(index: number): void {
        this.cancelPreviewing();
        this.isPreviewingHint = true;
        const commanCompoenents = this.hints[index].command.split(SPACE);

        this.gridMouseEventLogicService.previewPlacementByCommand(commanCompoenents);
    }

    cancelPreviewing(): void {
        this.isPreviewingHint = false;
        if (this.gridMouseEventLogicService.grid.placement.step === PlacementStep.CooperativePlacementToApprove) return;
        this.gridMouseEventLogicService.reset();
    }

    reset(): void {
        this.cancelPreviewing();
        this.hints = [];
    }

    private configureSocket(): void {
        this.socketService.on(HINT_COMMAND_RESULTS, (hints: Hints) => this.handleReceivedHints(hints.hints));
        this.socketService.on(HINT_COMMAND_PARTIAL_RESULTS, (hints: Hints) => this.handleReceivedHints(hints.hints));
        this.socketService.on(HINT_COMMAND_NO_RESULT, () => this.handleReceivedHints([]));
        this.socketService.on(RESEARCH_HINT, () => this.handleLookingForHints());
    }

    private handleReceivedHints(hints: HintToSend[]): void {
        if (this.areSameHints(hints)) return;
        this.hints = [];
        this.generateHintsToDisplay(hints);
        if (hints.length === MAX_HINTS) this.hintStateMessage = this.translationsContainer.get('hintFoundAll');
        else if (hints.length > 0) this.hintStateMessage = this.translationsContainer.get('hintFoundSome');
        else this.hintStateMessage = this.translationsContainer.get('noHintFound');
        this.isLookingForHints = false;
    }

    private handleLookingForHints(): void {
        this.isLookingForHints = true;
        this.hintStateMessage = this.translationsContainer.get('hintResearch');
    }

    private generateHintsToDisplay(hints: HintToSend[]): void {
        hints.forEach((hint) =>
            this.hints.push({
                wordHint: this.translationsContainer.get('placeAction') + ' ' + hint.wordPlacement + ' ' + hint.command.split(' ')[3] + ' point(s)',
                command: hint.command,
            }),
        );
    }

    private areSameHints(newHints: HintToSend[]): boolean {
        if (newHints.length !== this.hints.length) return false;
        for (const hintIndex in newHints) {
            if (newHints[hintIndex].command !== this.hints[hintIndex].command) return false;
        }
        return true;
    }
}
