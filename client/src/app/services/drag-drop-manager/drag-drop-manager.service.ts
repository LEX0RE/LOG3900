import { Injectable } from '@angular/core';
import { BlankLetter } from '@app/classes/blank-letter/blank-letter';
import { ViewLetter } from '@app/classes/view-letter';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { Placement } from '@app/interface/placement';
import { Vector2D } from '@app/interface/vector-2d';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { GridService } from '@app/services/grid/grid.service';
import { PlacementActionsService } from '@app/services/placement-actions/placement-actions.service';
import { Orientation } from '@common/enums/orientation';

@Injectable({
    providedIn: 'root',
})
export class DragAndDropManager {
    isBlankFormOverlayOpen: boolean;
    private readonly easelService: EaselSelectionService;
    private readonly gridService: GridService;
    private readonly gameUpdate: GameUpdaterService;
    private readonly placeActions: PlacementActionsService;
    private blankCoordinateClick: Vector2D | null;
    private blankIndex: number | null;

    get isMyTurn(): boolean {
        return this.gameUpdate.playerInfo.turn;
    }

    get letters(): ViewLetter[] {
        return this.easelService.letters;
    }

    get placement(): Placement {
        return this.gridService.placement;
    }

    get isFirstLetterToBePlaced(): boolean {
        return !this.placement.letters.length;
    }

    get isSecondLetterToBePlaced(): boolean {
        return this.placement.letters.length === 1;
    }

    get placedPosition(): Map<number, Vector2D> {
        const placedPosition = new Map<number, Vector2D>();
        const blackListIndexes: Set<number> = new Set<number>();

        this.letters.forEach((letter: ViewLetter, easelIndex: number) => {
            const placementIndex = this.getPlacementFromIndex(blackListIndexes, letter, this.placement.letters);

            if (placementIndex === INDEX_NOT_FOUND) return;
            const positionInGrid = this.getLetterPositionOnGrid(placementIndex);

            placedPosition.set(easelIndex, positionInGrid);
            blackListIndexes.add(placementIndex);
        });
        return placedPosition;
    }

    // eslint-disable-next-line max-params
    constructor(
        easelService: EaselSelectionService,
        gridService: GridService,
        gameUpdate: GameUpdaterService,
        placeActions: PlacementActionsService,
    ) {
        this.easelService = easelService;
        this.gridService = gridService;
        this.gameUpdate = gameUpdate;
        this.placeActions = placeActions;
        this.isBlankFormOverlayOpen = false;
        this.blankCoordinateClick = null;
        this.blankIndex = null;
    }

    getLetterPositionOnGrid(placementIndex: number): Vector2D {
        let position = this.placement.initialPlacement;

        for (let i = 0; i < placementIndex; i++) {
            position = this.gridService.nextPosition(position);
        }
        return position;
    }

    getPlacementFromIndex(blackListIndexes: Set<number>, letter: ViewLetter, letters: ViewLetter[]): number {
        const condition = letter.isBlank ? (aLetter: ViewLetter) => aLetter.isBlank : (aLetter: ViewLetter) => aLetter.letter === letter.letter;

        let placementIndex = INDEX_NOT_FOUND;

        letters.forEach((aLetter: ViewLetter, index: number) => {
            if (blackListIndexes.has(index)) return;
            if (condition(aLetter)) placementIndex = index;
        });
        return placementIndex;
    }

    onDragEnded(coordinateClick: Vector2D, index: number): void {
        const letter = this.letters[index];

        if (letter.isBlank) {
            this.openBlankFormOverlay();
            this.blankCoordinateClick = coordinateClick;
            this.blankIndex = index;
            return;
        }
        this.handleDragEnd(coordinateClick, letter);
    }

    removeFromPlacement(index: number): void {
        const newPlacement = this.copyAndRemoveFromPlacement(index);

        if (!this.gridService.validatePlacement(newPlacement)) return;

        this.gridService.replacePlacement(newPlacement);
        if (!newPlacement.letters.length) this.placeActions.releaseLock();
    }

    onBlankFormOverlayClosed(letter: string): void {
        this.isBlankFormOverlayOpen = false;
        const blankLetter = new BlankLetter(letter.toUpperCase());

        // explicit check on null because 0 is a valid index but falsy
        if (!this.blankCoordinateClick || this.blankIndex === null) return;
        this.handleDragEnd(this.blankCoordinateClick, new ViewLetter(blankLetter, EaselSelectionType.Hidden));
        this.blankCoordinateClick = null;
        this.blankIndex = null;
    }

    private handleDragEnd(coordinateClick: Vector2D, letter: ViewLetter): void {
        if (this.isFirstLetterToBePlaced) this.gridService.mouseClick(coordinateClick);

        const position = this.gridService.getGridPosition(coordinateClick);
        const newPlacement = this.getNewPlacement(position, letter);

        if (!this.gridService.validatePlacement(newPlacement)) return;

        this.gridService.replacePlacement(newPlacement);
        this.easelService.selectHandler.cancel.cancelHiddenSelection();
        this.placedPosition.forEach((_, i: number) => this.easelService.selectHiddenByIndex(i));
    }

    private openBlankFormOverlay(): void {
        this.isBlankFormOverlayOpen = true;
    }

    // eslint-disable-next-line max-lines-per-function
    private getNewPlacement(position: Vector2D, letter: ViewLetter): Placement {
        const placement: Placement = {
            initialPlacement: { ...this.placement.initialPlacement },
            letters: [...this.placement.letters],
            orientation: this.placement.orientation,
            step: this.placement.step,
        };

        if (this.isFirstLetterToBePlaced) {
            placement.initialPlacement = { ...position };
            placement.orientation = Orientation.Horizontal;
        }
        if (this.isSecondLetterToBePlaced) placement.orientation = this.determineOrientation(position);

        placement.letters.push(letter);

        if (this.isPositionBehindInitialPlacement(position)) {
            placement.initialPlacement = position;
            placement.letters.pop();
            placement.letters = [letter, ...placement.letters];
        }

        return placement;
    }

    private copyAndRemoveFromPlacement(index: number): Placement {
        const letter = this.easelService.letters[index];
        const placement: Placement = {
            initialPlacement: { ...this.placement.initialPlacement },
            letters: [...this.placement.letters],
            orientation: this.placement.orientation,
            step: this.placement.step,
        };

        if (letter.isBlank) placement.letters = this.removeBlank(placement.letters);
        else placement.letters = this.removeLetter(placement.letters, letter);

        return placement;
    }

    private removeLetter(letters: ViewLetter[], letterToRemove: ViewLetter): ViewLetter[] {
        const letterIndex = letters.findIndex((letter) => letter.letter === letterToRemove.letter);
        const newLetters = [...letters];

        newLetters.splice(letterIndex, 1);
        return newLetters;
    }

    private removeBlank(letters: ViewLetter[]): ViewLetter[] {
        const blankIndex = letters.findIndex((letter) => letter.isBlank);

        if (blankIndex === INDEX_NOT_FOUND) return letters;

        const newLetters = [...letters];

        newLetters.splice(blankIndex, 1);
        return newLetters;
    }

    // eslint-disable-next-line id-length -- more comprehensible
    private isPositionBehindInitialPlacement(position: Vector2D): boolean {
        return position.x === this.placement.initialPlacement.x - 1 || position.y === this.placement.initialPlacement.y - 1;
    }

    private determineOrientation(position: Vector2D): Orientation {
        if (position.x === this.placement.initialPlacement.x) return Orientation.Vertical;
        if (position.y === this.placement.initialPlacement.y) return Orientation.Horizontal;
        return this.placement.orientation;
    }
}
