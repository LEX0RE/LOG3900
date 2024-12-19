import { AfterViewInit, Component, DoCheck, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { DEFAULT_SIZE } from '@app/constants/grid';
import { ENTER } from '@app/constants/keyboard';
import { PlacementStep } from '@app/enum/placements';
import { Vector2D } from '@app/interface/vector-2d';
import { CommandConversionService } from '@app/services/command-conversion/command-conversion.service';
import { CooperativeGameApproval } from '@app/services/cooperative-game-approval/cooperative-game-approval.service';
import { DragAndDropManager } from '@app/services/drag-drop-manager/drag-drop-manager.service';
import { EndGameService } from '@app/services/end-game/end-game.service';
import { GameNavigationService } from '@app/services/game-navigation/game-navigation.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { GridContextService } from '@app/services/grid-context/grid-context.service';
import { GridService } from '@app/services/grid/grid.service';
import { HintPreviewService } from '@app/services/hint-preview/hint-preview.service';
import { PlacementActions, PlacementActionsService } from '@app/services/placement-actions/placement-actions.service';
import { GameModes } from '@common/enums/game-modes';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-play-area',
    templateUrl: './play-area.component.html',
    styleUrls: ['./play-area.component.scss'],
})
export class PlayAreaComponent implements AfterViewInit, DoCheck {
    @Input() isObservationPage: boolean;
    @ViewChild('gridCanvas', { static: false }) private gridCanvas!: ElementRef<HTMLCanvasElement>;
    isPlacement: boolean;
    translationsContainer: TranslateContainer;
    readonly gameUpdate: GameUpdaterService;
    readonly endGame: EndGameService;
    private canvasSize: number;
    private coordinateClick: Vector2D;
    private gridContext: GridContextService;
    private readonly gridService: GridService;
    private readonly commandSender: CommandConversionService;
    private readonly gameNavigation: GameNavigationService;
    private readonly cooperativeGameApproval: CooperativeGameApproval;
    private readonly hintPreview: HintPreviewService;
    private readonly placementActionsService: PlacementActionsService;
    private readonly dragAndDropManager: DragAndDropManager;

    // eslint-disable-next-line max-params, max-lines-per-function -- a besoin de ces 4 services pour fonctionner
    constructor(
        translate: TranslateService,
        endGame: EndGameService,
        commandSender: CommandConversionService,
        gridService: GridService,
        gridContext: GridContextService,
        gameUpdate: GameUpdaterService,
        gameNavigation: GameNavigationService,
        cooperativeGameApproval: CooperativeGameApproval,
        hintPreview: HintPreviewService,
        placementActionsService: PlacementActionsService,
        dragAndDropManager: DragAndDropManager,
    ) {
        this.gameUpdate = gameUpdate;
        this.endGame = endGame;
        this.canvasSize = DEFAULT_SIZE;
        this.gridService = gridService;
        this.gridContext = gridContext;
        this.commandSender = commandSender;
        this.gameNavigation = gameNavigation;
        this.dragAndDropManager = dragAndDropManager;
        this.placementActionsService = placementActionsService;
        this.cooperativeGameApproval = cooperativeGameApproval;
        this.hintPreview = hintPreview;
        this.translationsContainer = new TranslateContainer(translate, ['place', 'pass', 'propose']);
    }

    get size(): number {
        return this.canvasSize;
    }

    get isCooperativeGame(): boolean {
        return this.gameNavigation.getGameMode() === GameModes.Cooperative;
    }

    get playButtonText(): string {
        return this.isCooperativeGame ? this.translationsContainer.get('propose') : this.translationsContainer.get('place');
    }

    get gridCanvasElement(): HTMLCanvasElement {
        return this.gridCanvas.nativeElement;
    }

    get isActionProposed(): boolean {
        return this.cooperativeGameApproval.isActionProposedByMe;
    }

    buttonDetect(event: KeyboardEvent): void {
        if (!this.placementActionsService.isClickAndKeyBoard && !this.placementActionsService.acquiredLock(PlacementActions.ClickAndKeyBoard)) return;
        if (event.key === ENTER && this.gameNavigation.getGameMode() === GameModes.Cooperative) {
            this.onProposePlacement();
            return;
        }
        this.gridService.keyboardClick(event.key);
    }

    ngDoCheck(): void {
        if (this.gridContext.gridContext) {
            this.isPlacement = this.gridContext.placement.step === PlacementStep.KeyboardPlacement || this.placementActionsService.isDragAndDrop;
            this.gridContext.gridContext.clearRect(0, 0, this.size, this.size);
            this.gridService.drawGrid();
            this.gridService.putWord(this.gameUpdate.board);
            if (!this.gameUpdate.playerInfo.turn && !this.cooperativeGameApproval.isPreviewingAction) {
                this.gridService.gridReset();
            }
            this.gridService.putPlacement();
        }
    }

    ngAfterViewInit(): void {
        this.gridContext.gridContext = this.gridCanvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
        this.gridService.drawGrid();
        this.gridService.putWord(this.gameUpdate.board);
        this.gridCanvas.nativeElement.focus();
    }

    onClickPass(): void {
        if (!this.gameUpdate.playerInfo.turn) return;
        if (this.isCooperativeGame) this.onProposePass();
        else this.commandSender.sendSkipTurn();
    }

    onMouseDown(event: MouseEvent): void {
        if (!this.placementActionsService.isClickAndKeyBoard && !this.placementActionsService.acquiredLock(PlacementActions.ClickAndKeyBoard)) return;

        this.coordinateClick = { x: event.offsetX, y: event.offsetY };
        if (this.gameUpdate.playerInfo.turn) this.gridService.mouseClick(this.coordinateClick);
    }

    onClickPlay(): void {
        if (this.placementActionsService.isDragAndDrop) this.gridContext.placement.step = PlacementStep.DragAndDropPlacement;
        if (this.isCooperativeGame) this.onProposePlacement();
        else this.gridService.keyboardClick(ENTER);
    }

    onFocusOut(): void {
        if (this.dragAndDropManager.isBlankFormOverlayOpen) return;
        if (this.cooperativeGameApproval.isActionProposedByMe || this.cooperativeGameApproval.isPreviewingAction || this.hintPreview.isPreviewingHint)
            return;
        if (this.gameUpdate.playerInfo.turn) this.gridService.reset();
        this.placementActionsService.releaseLock();
    }

    private onProposePlacement(): void {
        this.gridContext.placement.step = PlacementStep.CooperativePlacementToApprove;
        this.cooperativeGameApproval.sendPlacementProposition();
    }

    private onProposePass(): void {
        this.cooperativeGameApproval.sendPassProposition();
    }
}
