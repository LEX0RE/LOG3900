import { Injectable } from '@angular/core';
import { COLOR_LETTER, DEFAULT_FONT_SIZE } from '@app/constants/font-letter';
import {
    DEFAULT_RADIUS,
    FONT_LETTER_SQUARE,
    MINUS_POINT_SQUARE,
    NUMBER_OF_ARC_SQUARE,
    PLUS_POINT_LETTER_POSITION_X,
    PLUS_POINT_LETTER_POSITION_Y,
    PLUS_TEXT_LETTER_POSITION_X,
    PLUS_TEXT_LETTER_POSITION_Y,
    POSITION_LETTER_SQUARE,
    RADIUS_DIVISION_FACTOR,
    SPACE_BETWEEN_CASE,
} from '@app/constants/grid';
import { FONT_UNIT, LETTER_FONT, STYLE } from '@app/constants/grid-style';
import { A_ASCII_NUMBER, O_ASCII_NUMBER } from '@app/constants/utils';
import { PositionLetter } from '@app/interface/position-letter';
import { GridThemeStyle } from '@app/interface/theme-style';
import { Vector2D } from '@app/interface/vector-2d';
import { GridContextService } from '@app/services/grid-context/grid-context.service';
import { ThemeManagerService } from '@app/services/theme-manager/theme-manager.service';
import { CommonBoard } from '@common/interfaces/game-view-related/common-board';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';

@Injectable({
    providedIn: 'root',
})
export class GridPlaceLetterService {
    private fontLetterSize: number;
    private gridContext: GridContextService;
    private gridStyle: GridThemeStyle;

    constructor(grid: GridContextService, themeManager: ThemeManagerService) {
        this.fontLetterSize = DEFAULT_FONT_SIZE;
        this.gridContext = grid;
        this.gridStyle = themeManager.currentGridStyle;
    }

    putWord(word: CommonBoard): void {
        this.gridContext.saveLetterSquare = [];
        word.tiles.forEach((letter) => {
            const char = letter.coordinate.row.toUpperCase().charCodeAt(0);

            if (!isNaN(char) && A_ASCII_NUMBER <= char && char <= O_ASCII_NUMBER) {
                const position: Vector2D = { x: letter.coordinate.column, y: char - A_ASCII_NUMBER + 1 };

                if (letter.letter.letter) this.createLetterSquare(position, letter.letter);
            }
        });
    }

    createLetterSquare(position: Vector2D, letter: CommonLetter): void {
        this.isNewPosition(position, letter);
        this.gridContext.gridContext.fillStyle = this.gridStyle.letterColor;
        this.gridContext.gridContext.beginPath();
        this.gridContext.gridContext.moveTo(position.x * SPACE_BETWEEN_CASE + DEFAULT_RADIUS, position.y * SPACE_BETWEEN_CASE);
        this.makeArc(position);
        this.gridContext.gridContext.closePath();
        this.gridContext.gridContext.fill();
        this.gridContext.gridContext.stroke();
        this.drawText(position, letter);
    }

    changeFontSize(fontLetterSize: number): void {
        this.fontLetterSize = fontLetterSize;
        this.gridContext.saveLetterSquare.forEach((letter) => {
            this.createLetterSquare(letter.position, letter.letter);
        });
    }

    private drawText(position: Vector2D, letter: CommonLetter): void {
        const textPositionX = position.x * SPACE_BETWEEN_CASE + POSITION_LETTER_SQUARE + POSITION_LETTER_SQUARE + PLUS_TEXT_LETTER_POSITION_X;
        const textPositionY = position.y * SPACE_BETWEEN_CASE + POSITION_LETTER_SQUARE + POSITION_LETTER_SQUARE + PLUS_TEXT_LETTER_POSITION_Y;
        const pointPositionX = textPositionX + PLUS_POINT_LETTER_POSITION_X;
        const pointPositionY = textPositionY + PLUS_POINT_LETTER_POSITION_Y;

        this.gridContext.gridContext.font = `${STYLE} ${this.fontLetterSize * FONT_LETTER_SQUARE}${FONT_UNIT} ${LETTER_FONT}`;
        this.gridContext.gridContext.fillStyle = COLOR_LETTER;
        this.gridContext.gridContext.fillText(letter.letter.toUpperCase(), textPositionX, textPositionY);
        this.gridContext.gridContext.font = `${STYLE} ${(this.fontLetterSize - MINUS_POINT_SQUARE) * FONT_LETTER_SQUARE}${FONT_UNIT} ${LETTER_FONT}`;
        this.gridContext.gridContext.fillText(letter.point.toString(), pointPositionX, pointPositionY);
    }

    private makeArc(position: Vector2D): void {
        for (let i = 0; i < NUMBER_OF_ARC_SQUARE; i++) {
            const startX = i < NUMBER_OF_ARC_SQUARE / 2 ? (position.x + 1) * SPACE_BETWEEN_CASE : position.x * SPACE_BETWEEN_CASE;
            const startY = i % 3 ? (position.y + 1) * SPACE_BETWEEN_CASE : position.y * SPACE_BETWEEN_CASE;
            const endX = !(i % 3) ? (position.x + 1) * SPACE_BETWEEN_CASE : position.x * SPACE_BETWEEN_CASE;
            const endY = i < NUMBER_OF_ARC_SQUARE / 2 ? (position.y + 1) * SPACE_BETWEEN_CASE : position.y * SPACE_BETWEEN_CASE;
            const radius = i < NUMBER_OF_ARC_SQUARE / 2 ? DEFAULT_RADIUS : SPACE_BETWEEN_CASE / RADIUS_DIVISION_FACTOR;

            this.gridContext.gridContext.arcTo(startX, startY, endX, endY, radius);
        }
    }

    private isNewPosition(position: Vector2D, letter: CommonLetter): void {
        if (!this.gridContext.saveLetterSquare.find((letterSquare: PositionLetter) => this.gridContext.samePosition(position, letterSquare.position)))
            this.gridContext.saveLetterSquare.push({ position, letter });
    }
}
