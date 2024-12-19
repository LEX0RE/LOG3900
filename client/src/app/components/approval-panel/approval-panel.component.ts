import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { ActionResponse } from '@app/enum/action-response';
import { CooperativeGameApproval } from '@app/services/cooperative-game-approval/cooperative-game-approval.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { ActionType } from '@common/enums/action-type';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-approval-panel',
    templateUrl: './approval-panel.component.html',
    styleUrls: ['./approval-panel.component.scss'],
})
export class ApprovalPanelComponent {
    cooperativeGameApprovalService: CooperativeGameApproval;
    gameUpdate: GameUpdaterService;
    translateContainer: TranslateContainer;

    get actionToApprove(): string {
        const commandComponents = this.cooperativeGameApprovalService.actionToApprove.command.split(' ');

        switch (commandComponents[0]) {
            case ActionType.PlaceLetters:
                return this.translateContainer.get('placeAction') + ' ' + commandComponents[1] + ' ' + commandComponents[2];
            case ActionType.Trade:
                return this.translateContainer.get('tradeAction') + ' ' + commandComponents[1];
            case ActionType.SkipTurn:
                return this.translateContainer.get('skipTurnAction');
            default:
                return this.cooperativeGameApprovalService.actionToApprove.command;
        }
    }

    get actionPlayer(): string {
        return this.cooperativeGameApprovalService.actionToApprove.actionPlayerName;
    }

    get approvingPlayers(): string[] {
        return this.cooperativeGameApprovalService.approvalsList.approvingPlayersNames;
    }

    get noResponsePlayers(): string[] {
        return this.cooperativeGameApprovalService.approvalsList.noResponsePlayersNames;
    }

    get rejectingPlayers(): string[] {
        return this.cooperativeGameApprovalService.approvalsList.rejectingPlayersNames;
    }

    get isActionToApprove(): boolean {
        return this.actionToApprove !== '';
    }

    get isPreviewingAction(): boolean {
        return this.cooperativeGameApprovalService.isPreviewingAction;
    }

    get isActionPropositionPreviewable(): boolean {
        return this.cooperativeGameApprovalService.actionToApprove.command.includes(ActionType.PlaceLetters);
    }

    constructor(cooperativeGameApprovalService: CooperativeGameApproval, translate: TranslateService) {
        this.cooperativeGameApprovalService = cooperativeGameApprovalService;
        this.translateContainer = new TranslateContainer(translate, [
            'waitingForApproval',
            'preview',
            'cancel',
            'approvals',
            'waiting',
            'rejected',
            'approve',
            'reject',
            'placeAction',
            'tradeAction',
            'skipTurnAction',
        ]);
    }

    disableResponseButton(isApprovalButton: boolean): boolean {
        return isApprovalButton
            ? this.cooperativeGameApprovalService.response === ActionResponse.Approved
            : this.cooperativeGameApprovalService.response === ActionResponse.Rejected;
    }

    isPlayersProposition(): boolean {
        return this.cooperativeGameApprovalService.isActionProposedByMe;
    }

    onApproveActionProposition(): void {
        this.cooperativeGameApprovalService.approveAction();
    }

    onRejectActionProposition(): void {
        this.cooperativeGameApprovalService.rejectAction();
    }

    onActionCancellation(): void {
        this.cooperativeGameApprovalService.sendActionCancellation();
    }

    onPreviewActionProposed(): void {
        this.cooperativeGameApprovalService.previewActionProposed();
    }

    onQuitPreviewing(): void {
        this.cooperativeGameApprovalService.quitPreviewing();
    }
}
