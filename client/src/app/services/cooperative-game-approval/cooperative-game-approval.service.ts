import { Injectable } from '@angular/core';
import { SPACE } from '@app/constants/easel';
import { ActionResponse } from '@app/enum/action-response';
import { PlacementStep } from '@app/enum/placements';
import { CommandConversionService } from '@app/services/command-conversion/command-conversion.service';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { GridMouseEventLogic } from '@app/services/grid-mouse-event/logic/grid-mouse-event-logic.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import {
    ACTION_APPROVAL,
    ACTION_APPROVED_BY_ALL,
    ACTION_CANCELLATION,
    ACTION_CONFIRMATION,
    ACTION_HAS_BEEN_CANCELLED,
    ACTION_REJECTION,
    ACTION_SUGGESTION,
    APPROVALS_LIST_UPDATE,
    NEW_ACTION_TO_APPROVE,
} from '@common/constants/communication';
import { ActionType } from '@common/enums/action-type';
import { ApprovalsListUpdate } from '@common/interfaces/approvals-list-update';
import { NewActionToApprove } from '@common/interfaces/new-action-to-approve';

@Injectable({
    providedIn: 'root',
})
export class CooperativeGameApproval {
    socketService: SocketClientService;
    gridMouseEventLogicService: GridMouseEventLogic;
    commandConversionService: CommandConversionService;
    easelSelectionService: EaselSelectionService;
    actionToApprove: NewActionToApprove;
    approvalsList: ApprovalsListUpdate;
    response: ActionResponse;
    isActionProposedByMe: boolean;
    isPreviewingAction: boolean;

    // eslint-disable-next-line max-params -- Construction du service
    constructor(
        socketService: SocketClientService,
        gridMouseEventLogicService: GridMouseEventLogic,
        commandConversionService: CommandConversionService,
        easelSelectionService: EaselSelectionService,
    ) {
        this.socketService = socketService;
        this.gridMouseEventLogicService = gridMouseEventLogicService;
        this.commandConversionService = commandConversionService;
        this.easelSelectionService = easelSelectionService;
        this.response = ActionResponse.NoResponse;
        this.isActionProposedByMe = false;
        this.isPreviewingAction = false;
        this.resetActionToApprove();
        this.configureSocket();
    }

    sendPlacementProposition(): void {
        if (this.gridMouseEventLogicService.grid.placement.step === PlacementStep.CooperativePlacementToApprove) {
            const commandToApprove = this.commandConversionService.formatCommand(
                this.gridMouseEventLogicService.grid.initialPlacementAsCoordinate,
                this.gridMouseEventLogicService.grid.placement.orientation,
                this.gridMouseEventLogicService.letterToSend(),
            );

            this.sendActionProposition(commandToApprove);
        }
    }

    sendTradeProposition(): void {
        this.sendActionProposition(this.commandConversionService.formatTradeCommand());
    }

    sendPassProposition(): void {
        this.sendActionProposition(ActionType.SkipTurn);
    }

    sendActionProposition(commandToApprove: string): void {
        this.socketService.send(ACTION_SUGGESTION, commandToApprove);
        this.actionToApprove = {
            command: commandToApprove,
            actionPlayerName: '',
        };
        this.isActionProposedByMe = true;
    }

    approveAction(): void {
        this.response = ActionResponse.Approved;
        this.socketService.send(ACTION_APPROVAL);
    }

    rejectAction(): void {
        this.response = ActionResponse.Rejected;
        this.socketService.send(ACTION_REJECTION);
    }

    sendActionCancellation(): void {
        this.gridMouseEventLogicService.gridReset();
        this.resetActionToApprove();
        this.socketService.send(ACTION_CANCELLATION);
    }

    previewActionProposed(): void {
        if (!this.isActionProposedByMe) {
            this.isPreviewingAction = true;
            const commandComponents = this.actionToApprove.command.split(SPACE);

            if (commandComponents.length === 0) return;
            switch (commandComponents[0]) {
                case ActionType.PlaceLetters:
                    this.gridMouseEventLogicService.previewPlacementByCommand(commandComponents);
                    this.gridMouseEventLogicService.grid.placement.step = PlacementStep.PlacementPreview;
                    break;
                case ActionType.Trade:
                    this.easelSelectionService.previewTrade(commandComponents[1]);
                    break;
                case ActionType.SkipTurn:
                    break;
            }
        }
    }

    quitPreviewing(): void {
        this.isPreviewingAction = false;
        this.gridMouseEventLogicService.reset();
    }

    private configureSocket(): void {
        this.socketService.on(NEW_ACTION_TO_APPROVE, (newActionToApprove: NewActionToApprove) => this.initializeActionToApprove(newActionToApprove));
        this.socketService.on(ACTION_APPROVED_BY_ALL, () => this.resetActionToApprove());
        this.socketService.on(ACTION_CONFIRMATION, () => this.playAction());
        this.socketService.on(APPROVALS_LIST_UPDATE, (updatedApprovalsList: ApprovalsListUpdate) => (this.approvalsList = updatedApprovalsList));
        this.socketService.on(ACTION_HAS_BEEN_CANCELLED, () => this.resetActionToApprove());
    }

    private playAction(): void {
        if (this.actionToApprove.command.includes(ActionType.PlaceLetters)) this.playPlacement();
        else if (this.actionToApprove.command.includes(ActionType.Trade)) this.commandConversionService.sendTradeLetter();
        else if (this.actionToApprove.command.includes(ActionType.SkipTurn)) this.commandConversionService.sendSkipTurn();
        this.resetActionToApprove();
    }

    private playPlacement(): void {
        this.gridMouseEventLogicService.grid.placement.step = PlacementStep.KeyboardPlacement;
        this.gridMouseEventLogicService.sendToServer();
    }

    private initializeActionToApprove(newActionToApprove: NewActionToApprove): void {
        this.resetActionToApprove();
        this.actionToApprove = {
            command: newActionToApprove.command,
            actionPlayerName: newActionToApprove.actionPlayerName,
        };
        this.response = ActionResponse.NoResponse;
    }

    private resetActionToApprove(): void {
        this.quitPreviewing();
        this.actionToApprove = { command: '', actionPlayerName: '' };
        this.approvalsList = {
            approvingPlayersNames: [],
            rejectingPlayersNames: [],
            noResponsePlayersNames: [],
        };
        this.isActionProposedByMe = false;
    }
}
