import { Injectable } from '@angular/core';
import { Placement } from '@app/interface/placement';
import { Vector2D } from '@app/interface/vector-2d';
import { GridContextService } from '@app/services/grid-context/grid-context.service';
import { GridCreateBoardService } from '@app/services/grid-create-board/grid-create-board.service';
import { GridMouseEvent } from '@app/services/grid-mouse-event/grid-mouse-event.service';
import { GridPlaceLetterService } from '@app/services/grid-place-letter/grid-place-letter.service';
import { CommonBoard } from '@common/interfaces/game-view-related/common-board';

@Injectable({
    providedIn: 'root',
})
export class GridService {
    private context: GridContextService;
    private gridCreation: GridCreateBoardService;
    private gridPlaceLetter: GridPlaceLetterService;
    private gridMouseEvent: GridMouseEvent;

    get placement(): Placement {
        return this.context.placement;
    }

    // eslint-disable-next-line max-params
    constructor(
        gridCreation: GridCreateBoardService,
        gridPlaceLetter: GridPlaceLetterService,
        gridMouseEvent: GridMouseEvent,
        context: GridContextService,
    ) {
        this.gridCreation = gridCreation;
        this.gridPlaceLetter = gridPlaceLetter;
        this.context = context;
        this.gridMouseEvent = gridMouseEvent;
    }

    drawGrid(): void {
        this.gridCreation.createBoard();
    }

    changeFontSize(fontSize: number): void {
        this.gridPlaceLetter.changeFontSize(fontSize);
    }

    putWord(word: CommonBoard): void {
        this.gridPlaceLetter.putWord(word);
    }

    replacePlacement(placement: Placement): void {
        this.gridReset();
        this.context.placement = { ...placement };
        this.gridMouseEvent.update();
    }

    mouseClick(coordinateClick: Vector2D): void {
        this.gridMouseEvent.mouseClick(coordinateClick);
    }

    getGridPosition(coordinateClick: Vector2D): Vector2D {
        return this.gridMouseEvent.getCoordinate(coordinateClick);
    }

    getClickCoordinateFromPosition(position: Vector2D): Vector2D {
        return this.gridMouseEvent.getClickCoordinateFromPosition(position);
    }

    nextPosition(positionPlacement: Vector2D): Vector2D {
        return this.gridMouseEvent.nextPosition(positionPlacement);
    }

    validatePlacement(placement: Placement): boolean {
        return this.gridMouseEvent.validatePlacement(placement);
    }

    putPlacement(): void {
        this.gridMouseEvent.update();
    }

    keyboardClick(event: string): void {
        this.gridMouseEvent.keyboardClick(event);
    }

    reset(): void {
        this.gridMouseEvent.reset();
    }

    gridReset(): void {
        this.gridMouseEvent.gridReset();
    }
}
