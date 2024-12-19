import { Injectable } from '@angular/core';
import { Placement } from '@app/interface/placement';
import { PositionLetter } from '@app/interface/position-letter';
import { Vector2D } from '@app/interface/vector-2d';
import { GridContextService } from '@app/services/grid-context/grid-context.service';
import { GridMouseEventLogic } from '@app/services/grid-mouse-event/logic/grid-mouse-event-logic.service';
import { GridMouseEventView } from '@app/services/grid-mouse-event/view/grid-mouse-event-view.service';

@Injectable({
    providedIn: 'root',
})
export class GridMouseEvent {
    letterInGrid: PositionLetter[];
    private context: GridContextService;
    private gridMouseEventLogic: GridMouseEventLogic;
    private gridMouseEventView: GridMouseEventView;

    constructor(gridMouseEventLogic: GridMouseEventLogic, gridMouseEventView: GridMouseEventView, context: GridContextService) {
        this.gridMouseEventLogic = gridMouseEventLogic;
        this.gridMouseEventView = gridMouseEventView;
        this.context = context;
    }

    mouseClick(coordinateClick: Vector2D): void {
        this.gridMouseEventLogic.mouseClick(coordinateClick);
    }

    getCoordinate(coordinateClick: Vector2D): Vector2D {
        return this.gridMouseEventLogic.getCoordinate(coordinateClick);
    }

    getClickCoordinateFromPosition(position: Vector2D): Vector2D {
        return this.gridMouseEventLogic.getClickCoordinateFromPosition(position);
    }

    nextPosition(positionPlacement: Vector2D): Vector2D {
        return this.gridMouseEventView.nextPosition(positionPlacement);
    }

    validatePlacement(placement: Placement): boolean {
        const oldPlacement: Placement = { ...this.context.placement };

        this.gridReset();
        this.context.placement = { ...placement };
        const result = this.gridMouseEventView.updateView();

        this.gridReset();
        this.context.placement = { ...oldPlacement };
        this.gridMouseEventView.updateView();
        return result;
    }

    keyboardClick(event: string): void {
        this.gridMouseEventLogic.keyboardClick(event);
    }

    update(): void {
        this.gridMouseEventView.updateView();
    }

    sendToServer(): void {
        this.gridMouseEventLogic.sendToServer();
    }

    reset(): void {
        this.gridMouseEventLogic.reset();
    }

    gridReset(): void {
        this.gridMouseEventLogic.gridReset();
    }
}
