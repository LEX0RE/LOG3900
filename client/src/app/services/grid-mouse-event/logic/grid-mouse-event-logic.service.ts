import { Injectable } from '@angular/core';
import { BlankLetter } from '@app/classes/blank-letter/blank-letter';
import { CommandFormattingService } from '@app/classes/command-formatting/command-formatting.service';
import { MathUtils } from '@app/classes/utils/math-utils';
import { ViewLetter } from '@app/classes/view-letter';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { SPACE } from '@app/constants/easel';
import { BOX_BY_ROW_WITH_NUMBER, INITIAL_PLACEMENT, SPACE_BETWEEN_CASE } from '@app/constants/grid';
import { ADJUST_X, ADJUST_Y } from '@app/constants/grid-mouse-event';
import { BACKSPACE, ENTER, ESCAPE1, ESCAPE2 } from '@app/constants/keyboard';
import { PlacementStep } from '@app/enum/placements';
import { PositionLetter } from '@app/interface/position-letter';
import { Vector2D } from '@app/interface/vector-2d';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { GridContextService } from '@app/services/grid-context/grid-context.service';
import { GridMouseEventView } from '@app/services/grid-mouse-event/view/grid-mouse-event-view.service';
import { ALPHABET } from '@common/constants/alphabet';
import { BLANK, BLANK_IN_WORD } from '@common/constants/blank';
import { ActionType } from '@common/enums/action-type';
import { Orientation } from '@common/enums/orientation';
import { Coordinate } from '@common/interfaces/coordinate';

@Injectable({
    providedIn: 'root',
})
export class GridMouseEventLogic {
    letterInGrid: PositionLetter[];
    grid: GridContextService;
    private easelService: EaselSelectionService;
    private viewGrid: GridMouseEventView;

    constructor(grid: GridContextService, easelService: EaselSelectionService, viewGrid: GridMouseEventView) {
        this.grid = grid;
        this.easelService = easelService;
        this.viewGrid = viewGrid;
    }

    mouseClick(coordinateClick: Vector2D): void {
        if ((this.grid.placement.step === PlacementStep.NoClick || this.grid.placement.step === PlacementStep.ClickPlacement) && coordinateClick) {
            const position: Vector2D = this.getCoordinate(coordinateClick);

            if (position.x >= 1 && position.y >= 1 && this.isTileEmpty(position)) {
                this.checkPlacement(position);
                this.viewGrid.createPlacement(position);

                this.viewGrid.updateView();
                this.grid.placement.step = PlacementStep.ClickPlacement;
            }
        }
    }

    keyboardClick(event: string): void {
        if (
            this.grid.placement.step === PlacementStep.ClickPlacement ||
            this.grid.placement.step === PlacementStep.KeyboardPlacement ||
            this.grid.placement.step === PlacementStep.DragAndDropPlacement
        ) {
            this.handleSpecialButton(event);
            this.viewGrid.updateView();
        }
    }

    sendToServer(): void {
        if (this.grid.placement.step === PlacementStep.KeyboardPlacement || this.grid.placement.step === PlacementStep.DragAndDropPlacement) {
            const coordinate: Coordinate = this.grid.initialPlacementAsCoordinate;

            this.grid.conversionService.sendPlaceLetter(coordinate, this.grid.placement.orientation, this.letterToSend());
            this.gridReset();
        }
    }

    gridReset(): void {
        this.grid.saveLetterSquare = this.grid.saveLetterSquare.slice(0, this.grid.saveLetterSquare.length - this.grid.placement.letters.length);
        this.grid.placement.letters = [];
        this.grid.placement.initialPlacement = INITIAL_PLACEMENT;
        this.grid.placement.orientation = Orientation.None;
        this.grid.placement.step = PlacementStep.NoClick;
        this.easelService.errorWord = '';
    }

    reset(): void {
        this.handleSpecialButton(ESCAPE1);
    }

    letterToSend(): string {
        return MathUtils.accumulator(this.grid.placement.letters, '', (word: string, letter: ViewLetter) => {
            word += letter.letter instanceof BlankLetter ? letter.toCommonLetter.letter.toUpperCase() : letter.toCommonLetter.letter.toLowerCase();
            return word;
        });
    }

    getCoordinate(coordinateClick: Vector2D): Vector2D {
        return {
            x: Math.trunc((coordinateClick.x * ADJUST_X()) / SPACE_BETWEEN_CASE),
            y: Math.trunc((coordinateClick.y * ADJUST_Y()) / SPACE_BETWEEN_CASE),
        };
    }

    getClickCoordinateFromPosition(position: Vector2D): Vector2D {
        return {
            x: Math.trunc((position.x * SPACE_BETWEEN_CASE) / ADJUST_X()),
            y: Math.trunc((position.y * SPACE_BETWEEN_CASE) / ADJUST_Y()),
        };
    }

    previewActionByCommand(command: string): void {
        const commandComponents = command.split(SPACE);

        if (commandComponents.length !== 3) return;
        switch (commandComponents[0]) {
            case ActionType.PlaceLetters:
                this.previewPlacementByCommand(commandComponents);
                break;
            case ActionType.Trade:
                break;
        }
    }

    previewPlacementByCommand(commandComponents: string[]): void {
        this.grid.placement.orientation = CommandFormattingService.formatOrientation(
            commandComponents[1].slice(INDEX_NOT_FOUND),
            commandComponents[2].length,
        );
        this.grid.placement.initialPlacement = CommandFormattingService.formatInitialPlacement(
            this.grid.placement.orientation === Orientation.None ? commandComponents[1] : commandComponents[1].slice(0, INDEX_NOT_FOUND),
        );
        for (const letter of commandComponents[2]) {
            this.checkLetterInEasel(letter);
            this.viewGrid.updateView();
        }
    }

    private isTileEmpty(position: Vector2D): boolean {
        let notPositionLetter = true;

        this.grid.saveLetterSquare.forEach((letter) => {
            if (this.grid.samePosition(position, letter.position)) notPositionLetter = false;
        });
        return notPositionLetter;
    }

    private checkPlacement(position: Vector2D): void {
        if (this.grid.samePosition(position, this.grid.placement.initialPlacement)) {
            this.grid.placement.orientation =
                this.grid.placement.orientation === Orientation.Vertical ? Orientation.Horizontal : Orientation.Vertical;
        } else {
            this.grid.placement.initialPlacement = position;
            this.grid.placement.orientation = Orientation.Horizontal;
        }
    }

    private handleSpecialButton(key: string): void {
        key = key === ESCAPE2 ? ESCAPE1 : key;
        switch (key) {
            case BACKSPACE:
                return this.popLetter();
            case ENTER:
                return this.sendToServer();
            case ESCAPE1:
                return this.escapeCase();
            default:
                return this.checkLetterInEasel(key);
        }
    }

    private escapeCase(): void {
        this.gridReset();
        this.easelService.cancelHidden();
    }

    private checkLetterInEasel(key: string): void {
        const newKey = CommandFormattingService.tidyAccent(key);

        if (CommandFormattingService.isABlank(newKey)) return this.checkLetterInEaselBlank(newKey);

        if (!this.easelService.isInEasel(newKey) || this.isLimit())
            this.easelService.errorWord = ALPHABET.includes(newKey) && !this.isLimit() ? newKey : '';
        else this.pushLetter(newKey);
    }

    private pushLetter(newKey: string) {
        const newViewLetter = this.easelService.selectHiddenByString(newKey);

        if (newViewLetter) {
            this.grid.placement.letters.push(newViewLetter);
            this.easelService.errorWord = '';
        }
        this.grid.placement.step = PlacementStep.KeyboardPlacement;
    }

    private checkLetterInEaselBlank(blank: string): void {
        if (!this.easelService.isInEasel(BLANK) || this.isLimit()) {
            this.easelService.errorWord = !this.isLimit() ? BLANK_IN_WORD : '';
            return;
        }
        const newViewLetter = this.easelService.selectHiddenByString(BLANK);

        if (newViewLetter) {
            const blankLetter: ViewLetter = new ViewLetter(new BlankLetter(blank), newViewLetter.selection);

            this.grid.placement.letters.push(blankLetter);
        }
        this.grid.placement.step = PlacementStep.KeyboardPlacement;
    }

    private isLimit(): boolean {
        let initialPosition = 0;

        initialPosition =
            this.grid.placement.orientation === Orientation.Vertical
                ? this.grid.placement.initialPlacement.y
                : this.grid.placement.initialPlacement.x;

        return initialPosition + this.grid.placement.letters.length >= BOX_BY_ROW_WITH_NUMBER;
    }

    private popLetter(): void {
        const letter = this.grid.placement.letters.pop();

        if (letter) {
            this.grid.saveLetterSquare.pop();
            const keyboardCharacter = letter.letter instanceof BlankLetter ? BLANK : letter.toCommonLetter.letter;

            this.easelService.unselectHiddenByString(keyboardCharacter);
        }
        if (!this.grid.placement.letters.length) this.grid.placement.step = PlacementStep.ClickPlacement;
    }
}
