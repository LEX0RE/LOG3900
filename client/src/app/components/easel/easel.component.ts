import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, HostListener } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { ViewLetter } from '@app/classes/view-letter';
import { PlayAreaComponent } from '@app/components/play-area/play-area.component';
import { DEFAULT_FONT_SIZE_EASEL, DEFAULT_LETTER_SIZE } from '@app/constants/font-letter';
import { EASEL_SIZE } from '@app/constants/game-page';
import { BOX_BY_ROW_WITH_NUMBER } from '@app/constants/grid';
import { ARROW_LEFT, ARROW_RIGHT, SHIFT } from '@app/constants/keyboard';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { Vector2D } from '@app/interface/vector-2d';
import { CommandConversionService } from '@app/services/command-conversion/command-conversion.service';
import { CooperativeGameApproval } from '@app/services/cooperative-game-approval/cooperative-game-approval.service';
import { DragAndDropManager } from '@app/services/drag-drop-manager/drag-drop-manager.service';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { GameNavigationService } from '@app/services/game-navigation/game-navigation.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { GridService } from '@app/services/grid/grid.service';
import { PlacementActions, PlacementActionsService } from '@app/services/placement-actions/placement-actions.service';
import { GameModes } from '@common/enums/game-modes';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-easel',
    templateUrl: './easel.component.html',
    styleUrls: ['./easel.component.scss'],
})
export class EaselComponent {
    letterSize: number;
    isTradeTouched: boolean;
    isCancelTouched: boolean;
    isDragging: boolean;
    draggingIndexPosition: [number, Vector2D?];
    translationsContainer: TranslateContainer;
    cooperativeGameApprovalService: CooperativeGameApproval;
    readonly gameUpdate: GameUpdaterService;
    private readonly easelService: EaselSelectionService;
    private readonly commandSender: CommandConversionService;
    private readonly dragAndDropManager: DragAndDropManager;
    private readonly playArea: PlayAreaComponent;
    private readonly placementActionsService: PlacementActionsService;
    private readonly gridService: GridService;
    private readonly gameNavigation: GameNavigationService;

    // eslint-disable-next-line max-params, max-lines-per-function -- ne fait que construire l'application
    constructor(
        translate: TranslateService,
        cooperativeGameApprovalService: CooperativeGameApproval,
        easelService: EaselSelectionService,
        gameUpdate: GameUpdaterService,
        commandSender: CommandConversionService,
        dragAndDropManager: DragAndDropManager,
        playArea: PlayAreaComponent,
        placementActionsService: PlacementActionsService,
        gridService: GridService,
        gameNavigation: GameNavigationService,
    ) {
        this.letterSize = DEFAULT_LETTER_SIZE;
        this.cooperativeGameApprovalService = cooperativeGameApprovalService;
        this.easelService = easelService;
        this.gameUpdate = gameUpdate;
        this.gridService = gridService;
        this.dragAndDropManager = dragAndDropManager;
        this.commandSender = commandSender;
        this.placementActionsService = placementActionsService;
        this.playArea = playArea;
        this.gameNavigation = gameNavigation;
        this.gameUpdate.easelUpdateEvent.subscribe(this.onEaselUpdateEvent(this.easelService));
        this.translationsContainer = new TranslateContainer(translate, ['easelError1', 'easelError2', 'cancel', 'trade']);
    }

    get fontSize(): number {
        return DEFAULT_FONT_SIZE_EASEL;
    }

    get isMyTurn(): boolean {
        return this.gameUpdate.playerInfo.turn;
    }

    get isDraggable(): boolean {
        return this.placementActionsService.isDragAndDrop || this.placementActionsService.isNone;
    }

    get isGoodToExchange() {
        return this.isSelected && this.gameUpdate.stash.nLettersLeft >= EASEL_SIZE;
    }

    get letters(): ViewLetter[] {
        return this.easelService.letters;
    }

    get errorEasel(): string {
        return this.easelService.errorWord;
    }

    get isSelected(): boolean {
        return this.easelService.tradeLetters.length !== 0;
    }

    get isTradeAllowed(): boolean {
        return this.isGoodToExchange && this.gameUpdate.playerInfo.turn;
    }

    get isCooperativeGame(): boolean {
        return this.gameNavigation.getGameMode() === GameModes.Cooperative;
    }

    @HostListener('wheel', ['$event'])
    onScroll(event: WheelEvent): void {
        if (event.deltaY <= 0) this.easelService.moveManipulationLeft();
        else this.easelService.moveManipulationRight();
    }

    @HostListener('window:keydown.enter', ['$event'])
    onEnter() {
        if (this.isGoodToExchange) this.onClickExchange();
    }

    isHidden(index: number): boolean {
        return this.easelService.letters[index].selection === EaselSelectionType.Hidden;
    }

    dragHandleCss(index: number) {
        let position = this.dragAndDropManager.placedPosition.get(index);

        if (this.isDragging && this.draggingIndexPosition[0] === index) position = this.draggingIndexPosition[1];

        if (!position) return {};

        const playAreaRect = this.playArea.gridCanvasElement.getBoundingClientRect();
        const relativePlayAreaCoordinate = this.gridService.getClickCoordinateFromPosition(position);

        const playAreaX = playAreaRect.left + window.scrollX;
        const playAreaY = playAreaRect.top + window.scrollY;

        const dropPoint: Vector2D = {
            x: playAreaX + relativePlayAreaCoordinate.x,
            y: playAreaY + relativePlayAreaCoordinate.y,
        };

        const css = {
            border: '4px solid blue',
            height: `${playAreaRect.height / (BOX_BY_ROW_WITH_NUMBER + 1)}px`,
            width: `${playAreaRect.width / (BOX_BY_ROW_WITH_NUMBER + 1)}px`,
            position: 'absolute',
            left: `${dropPoint.x - 2}px`,
            top: `${dropPoint.y - 2}px`,
        };

        return css;
    }

    onDragStarted(event: unknown, index: number) {
        this.isDragging = true;
        this.draggingIndexPosition = [index, this.dragAndDropManager.placedPosition.get(index)];
        if (this.easelService.letters[index].selection !== EaselSelectionType.Hidden) return;
        this.dragAndDropManager.removeFromPlacement(index);
        this.easelService.selectHandler.unselectHiddenLetterByIndex(index);
    }

    onClickExchange(): void {
        if (!this.gameUpdate.playerInfo.turn) return;
        if (this.isCooperativeGame) {
            this.cooperativeGameApprovalService.sendTradeProposition();
        } else this.commandSender.sendTradeLetter();
    }

    onCancelClick(): void {
        this.easelService.cancelManipulation();
        this.easelService.cancelTrade();
    }

    onKeyPressed(event: KeyboardEvent): void {
        switch (event.key) {
            case ARROW_RIGHT:
                return this.easelService.moveManipulationRight();
            case ARROW_LEFT:
                return this.easelService.moveManipulationLeft();
            case SHIFT:
                return;
            default:
                return this.defaultManipulation(event.key);
        }
    }

    onDragEnded(event: CdkDragEnd<number>, index: number): void {
        this.isDragging = false;
        if (!this.isMyTurn) return;

        if (!this.placementActionsService.isDragAndDrop && !this.placementActionsService.acquiredLock(PlacementActions.DragAndDrop)) return;
        const dropPoint = event.dropPoint;

        const playAreaRect = this.playArea.gridCanvasElement.getBoundingClientRect();
        const playAreaX = playAreaRect.left + window.scrollX;
        const playAreaY = playAreaRect.top + window.scrollY;
        const relativeX = dropPoint.x - playAreaX;
        const relativeY = dropPoint.y - playAreaY;

        const coordinateClick: Vector2D = { x: relativeX, y: relativeY };

        // make sur the click is in the play area
        if (coordinateClick.x < 0 || coordinateClick.y < 0 || coordinateClick.x > playAreaRect.width || coordinateClick.y > playAreaRect.height) {
            // eslint-disable-next-line no-underscore-dangle
            event.source._dragRef.reset();
            return;
        }

        this.dragAndDropManager.onDragEnded(coordinateClick, index);
        // eslint-disable-next-line no-underscore-dangle
        event.source._dragRef.reset();
    }

    onLeftClick(index: number): void {
        this.easelService.selectManipulationByIndex(index);
    }

    onRightClick(index: number): void {
        this.easelService.selectTrade(index);
    }

    private defaultManipulation(keyBoardChar: string): void {
        if (this.easelService.isInEasel(keyBoardChar)) this.easelService.selectManipulationByString(keyBoardChar);
        else this.easelService.cancelManipulation();
    }

    private onEaselUpdateEvent(easelService: EaselSelectionService): () => void {
        return (): void => {
            easelService.cancelHidden();
        };
    }
}
