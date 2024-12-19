import { Injectable } from '@angular/core';
import { MathUtils } from '@app/classes/utils/math-utils';
import { ViewLetter } from '@app/classes/view-letter';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EASEL_SIZE } from '@app/constants/game-page';
import { ADJUST_POSITION_X, BOX_BY_ROW_WITH_NUMBER, HEAD_LENGTH, INITIAL_PLACEMENT, POSITION_ARROW, SPACE_BETWEEN_CASE } from '@app/constants/grid';
import { ANGLE } from '@app/constants/grid-mouse-event';
import { NEXT_TILE_PLACEMENT_COLOR, PLACED_TILE_COLOR } from '@app/constants/grid-style';
import { HORIZONTAL_PLACEMENT, VERTICAL_PLACEMENT } from '@app/constants/placement-manipulation';
import { PositionLetter } from '@app/interface/position-letter';
import { Vector2D } from '@app/interface/vector-2d';
import { GridContextService } from '@app/services/grid-context/grid-context.service';
import { GridPlaceLetterService } from '@app/services/grid-place-letter/grid-place-letter.service';
import { Orientation } from '@common/enums/orientation';

@Injectable({
    providedIn: 'root',
})
export class GridMouseEventView {
    letterInGrid: PositionLetter[];
    private grid: GridContextService;
    private placeLetter: GridPlaceLetterService;

    constructor(grid: GridContextService, placeLetter: GridPlaceLetterService) {
        this.grid = grid;
        this.placeLetter = placeLetter;
    }

    updateView(): boolean {
        if (this.grid.placement.letters.length === 1) return this.handleFirstLetterView();
        let positionPlacement: Vector2D = { x: this.grid.placement.initialPlacement.x, y: this.grid.placement.initialPlacement.y };
        const letterInGrid: PositionLetter[] = [];

        if (!this.isGoodPosition(this.grid.placement.initialPlacement)) return false;
        this.grid.placement.letters.forEach((letter: ViewLetter) => {
            if (this.isPositionInGrid(positionPlacement)) {
                letterInGrid.push(this.putLetterInGrid(positionPlacement, letter));
                positionPlacement = this.nextPosition(positionPlacement);
            }
        });
        return this.updatePositionPlacement(positionPlacement, letterInGrid);
    }

    handleFirstLetterView(): boolean {
        const positionPlacement: Vector2D = { x: this.grid.placement.initialPlacement.x, y: this.grid.placement.initialPlacement.y };
        const letterInGrid: PositionLetter[] = [];

        if (!this.isGoodPosition(this.grid.placement.initialPlacement)) return false;
        letterInGrid.push(this.putLetterInGrid(positionPlacement, this.grid.placement.letters[0]));

        let nextPosition = this.nextPosition(positionPlacement);

        if (nextPosition.x === INDEX_NOT_FOUND && nextPosition.y === INDEX_NOT_FOUND) {
            this.grid.placement.orientation =
                this.grid.placement.orientation === Orientation.Horizontal ? Orientation.Vertical : Orientation.Horizontal;
            nextPosition = this.nextPosition(positionPlacement);
        }

        return this.updatePositionPlacement(nextPosition, letterInGrid);
    }

    createPlacement(positionPlacement: Vector2D): void {
        this.grid.gridContext.beginPath();
        this.grid.gridContext.strokeStyle = NEXT_TILE_PLACEMENT_COLOR;
        const position: Vector2D = {
            x: positionPlacement.x * SPACE_BETWEEN_CASE,
            y: positionPlacement.y * SPACE_BETWEEN_CASE,
        };

        this.placementInGrid(position);
        this.grid.gridContext.stroke();
        this.grid.gridContext.closePath();
    }

    nextPosition(positionPlacement: Vector2D): Vector2D {
        const position: Vector2D = { x: positionPlacement.x, y: positionPlacement.y };

        do {
            this.applyOnOrientation(
                () => position.x++,
                () => position.y++,
            );
            if (!this.isPositionInGrid(position)) return { x: INDEX_NOT_FOUND, y: INDEX_NOT_FOUND };
        } while (!this.isGoodPosition(position));
        return { x: position.x, y: position.y };
    }

    private isPositionInGrid(positionPlacement: Vector2D): boolean {
        const isInPositionX: boolean = MathUtils.isInInterval({ min: INITIAL_PLACEMENT.x, max: BOX_BY_ROW_WITH_NUMBER }, positionPlacement.x);
        const isInPositionY: boolean = MathUtils.isInInterval({ min: INITIAL_PLACEMENT.y, max: BOX_BY_ROW_WITH_NUMBER }, positionPlacement.y);

        return isInPositionX && isInPositionY;
    }

    private updatePositionPlacement(positionPlacement: Vector2D, letterInGrid: PositionLetter[]): boolean {
        if (this.isPositionInGrid(positionPlacement) && this.grid.placement.letters.length < EASEL_SIZE) this.createPlacement(positionPlacement);
        this.letterInGrid = letterInGrid;
        return this.grid.placement.letters.length <= EASEL_SIZE;
    }

    private putLetterInGrid(positionPlacement: Vector2D, letter: ViewLetter): PositionLetter {
        this.placeLetter.createLetterSquare(positionPlacement, letter.letter);
        this.grid.gridContext.strokeStyle = PLACED_TILE_COLOR;
        this.grid.gridContext.rect(
            positionPlacement.x * SPACE_BETWEEN_CASE,
            positionPlacement.y * SPACE_BETWEEN_CASE,
            SPACE_BETWEEN_CASE,
            SPACE_BETWEEN_CASE,
        );
        this.grid.gridContext.stroke();
        return { position: positionPlacement, letter: letter.letter };
    }

    private placementInGrid(position: Vector2D): void {
        this.grid.gridContext.rect(position.x, position.y, SPACE_BETWEEN_CASE, SPACE_BETWEEN_CASE);
        const arrow = this.arrowDirection();

        this.createArrow(this.addVector(position, arrow[HORIZONTAL_PLACEMENT]), this.addVector(position, arrow[VERTICAL_PLACEMENT]));
    }

    private addVector(position1: Vector2D, position2: Vector2D): Vector2D {
        return { x: position1.x + position2.x, y: position1.y + position2.y };
    }

    private createArrow(from: Vector2D, to: Vector2D): void {
        const angle = Math.atan2(to.y - from.y, to.x - from.x);

        this.grid.gridContext.moveTo(from.x, from.y);
        this.grid.gridContext.lineTo(to.x, to.y);
        this.grid.gridContext.lineTo(to.x - HEAD_LENGTH * Math.cos(angle - ANGLE), to.y - HEAD_LENGTH * Math.sin(angle - ANGLE));
        this.grid.gridContext.moveTo(to.x, to.y);
        this.grid.gridContext.lineTo(to.x - HEAD_LENGTH * Math.cos(angle + ANGLE), to.y - HEAD_LENGTH * Math.sin(angle + ANGLE));
    }

    private applyOnOrientation(horizontalFunction: () => void, verticalFunction: () => void): void {
        switch (this.grid.placement.orientation) {
            case Orientation.Horizontal:
                return horizontalFunction();
            case Orientation.Vertical:
                return verticalFunction();
            default:
                return verticalFunction();
        }
    }

    private arrowDirection(): Vector2D[] {
        const arrow: Vector2D[] = [];

        this.applyOnOrientation(
            () => {
                arrow.push({ x: SPACE_BETWEEN_CASE / ADJUST_POSITION_X, y: POSITION_ARROW });
                arrow.push({ x: SPACE_BETWEEN_CASE, y: POSITION_ARROW });
            },

            () => {
                arrow.push({ x: POSITION_ARROW, y: POSITION_ARROW });
                arrow.push({ x: POSITION_ARROW, y: SPACE_BETWEEN_CASE });
            },
        );
        return arrow;
    }

    private isGoodPosition(position: Vector2D): boolean {
        let goodPosition = true;

        this.grid.saveLetterSquare.forEach((letter) => {
            if (this.grid.samePosition(position, letter.position)) {
                const letterFromUs = this.letterInGrid.find((letterPlace) => this.grid.samePosition(position, letterPlace.position));

                if (!letterFromUs) goodPosition = false;
            }
        });
        return goodPosition;
    }
}
