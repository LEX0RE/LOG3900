import { Injectable } from '@angular/core';
import {
    BOARD_COLUMNS,
    BOX_BY_ROW_WITH_NUMBER,
    CONVERSION_FONT_STAR,
    DEFAULT_BOARD,
    DEFAULT_SIZE,
    FONT_LETTER_WORD,
    LINE_WIDTH,
    NUMBER_FILL_STYLE,
    POSITION_X_ALPHABET,
    POSITION_X_LETTER,
    POSITION_X_MULTIPLY,
    POSITION_X_NUMBER,
    POSITION_X_STAR,
    POSITION_X_WORD,
    POSITION_Y_ALPHABET,
    POSITION_Y_MULTIPLY,
    POSITION_Y_NUMBER,
    POSITION_Y_STAR,
    POSITION_Y_WORD_LETTER,
    SPACE_BETWEEN_CASE,
    STEP_LETTER,
    STEP_MULTIPLY,
    STEP_WORD,
} from '@app/constants/grid';
import {
    BOARD_CENTER_TILE,
    BONUS_ON_LETTER,
    BONUS_ON_WORD,
    FONT,
    FONT_UNIT,
    LETTER_TIMES_2_COLOR,
    LETTER_TIMES_3_COLOR,
    TIMES_2,
    TIMES_3,
    WORD_TIMES_2_COLOR,
    WORD_TIMES_3_COLOR,
} from '@app/constants/grid-style';
import { Section, TypeCase, Word } from '@app/enum/grid';
import { PositionOption } from '@app/interface/position-option';
import { GridThemeStyle } from '@app/interface/theme-style';
import { Vector2D } from '@app/interface/vector-2d';
import { GridContextService } from '@app/services/grid-context/grid-context.service';
import { ThemeManagerService } from '@app/services/theme-manager/theme-manager.service';
import { ALPHABET_BOARD } from '@common/constants/alphabet';

@Injectable({
    providedIn: 'root',
})
export class GridCreateBoardService {
    private grid: GridContextService;
    private gridStyle: GridThemeStyle;
    private scrabbleTable: TypeCase[][];

    constructor(grid: GridContextService, themeManager: ThemeManagerService) {
        this.grid = grid;
        this.gridStyle = themeManager.currentGridStyle;
        this.scrabbleTable = DEFAULT_BOARD;
    }

    createBoard(): void {
        this.grid.gridContext.beginPath();
        this.createLines();
        this.createColumns();
        this.createScrabble();
        this.grid.gridContext.stroke();
    }

    createLines(): void {
        this.grid.gridContext.strokeStyle = this.gridStyle.lineColor;
        this.grid.gridContext.lineWidth = LINE_WIDTH;

        for (let i = 0; i < BOX_BY_ROW_WITH_NUMBER; i++) {
            this.grid.gridContext.moveTo(SPACE_BETWEEN_CASE, SPACE_BETWEEN_CASE * (i + 1));
            this.grid.gridContext.lineTo(DEFAULT_SIZE, SPACE_BETWEEN_CASE * (i + 1));
            this.grid.gridContext.moveTo(SPACE_BETWEEN_CASE * (i + 1), SPACE_BETWEEN_CASE);
            this.grid.gridContext.lineTo(SPACE_BETWEEN_CASE * (i + 1), DEFAULT_SIZE);
        }
    }

    createColumns(): void {
        this.grid.gridContext.fillStyle = this.gridStyle.numberFillColor;
        this.grid.gridContext.font = `${NUMBER_FILL_STYLE}${FONT_UNIT} white`;

        for (let number = 0; number < BOX_BY_ROW_WITH_NUMBER - 1; number++) {
            this.grid.gridContext.fillText(BOARD_COLUMNS[number], SPACE_BETWEEN_CASE * (number + POSITION_X_NUMBER), POSITION_Y_NUMBER);
            this.grid.gridContext.fillText(ALPHABET_BOARD[number], POSITION_X_ALPHABET, SPACE_BETWEEN_CASE * number + POSITION_Y_ALPHABET);
        }
    }

    createScrabble(): void {
        this.createScrabbleTable(Section.DownLeft);
        this.createScrabbleTable(Section.DownRight);
        this.createScrabbleTable(Section.UpLeft);
        this.createScrabbleTable(Section.UpRight);
    }

    createScrabbleTable(section: Section): void {
        const option = this.setStartPosition(section);

        this.scrabbleTable.forEach((i: TypeCase[], index1: number) => {
            i.forEach((j: TypeCase, index2: number) => {
                const position: Vector2D = {
                    x: (DEFAULT_SIZE * Math.abs(index1 - option.inverse1) + option.moveX) / BOX_BY_ROW_WITH_NUMBER,
                    y: (DEFAULT_SIZE * Math.abs(index2 - option.inverse2) + option.moveY) / BOX_BY_ROW_WITH_NUMBER,
                };

                this.placeTile(position, j);
            });
        });
    }

    createSpecialSquare(position: Vector2D, tile: { color: string; type: Word; multiply: string }): void {
        this.createSquare(position, tile.color);
        this.drawWord(tile.type, tile.multiply, position);
    }

    wordXThreeSquare(position: Vector2D): void {
        this.createSpecialSquare(position, { color: WORD_TIMES_3_COLOR, type: Word.Word, multiply: TIMES_3 });
    }

    letterXThreeSquare(position: Vector2D): void {
        this.createSpecialSquare(position, { color: LETTER_TIMES_3_COLOR, type: Word.Letter, multiply: TIMES_3 });
    }

    letterXTwoSquare(position: Vector2D): void {
        this.createSpecialSquare(position, { color: LETTER_TIMES_2_COLOR, type: Word.Letter, multiply: TIMES_2 });
    }

    wordXTwoSquare(position: Vector2D): void {
        this.createSpecialSquare(position, { color: WORD_TIMES_2_COLOR, type: Word.Word, multiply: TIMES_2 });
    }

    starSquare(position: Vector2D): void {
        this.createSquare(position, WORD_TIMES_2_COLOR);
        this.grid.gridContext.fillStyle = this.gridStyle.fontColor;
        this.grid.gridContext.font = `${CONVERSION_FONT_STAR}${FONT_UNIT} ${FONT}`;
        this.grid.gridContext.fillText(BOARD_CENTER_TILE, position.x * POSITION_X_STAR, position.y + POSITION_Y_STAR);
    }

    createSquare(position: Vector2D, color: string): void {
        this.grid.gridContext.fillStyle = color;
        this.grid.gridContext.fillRect(position.x, position.y, SPACE_BETWEEN_CASE, SPACE_BETWEEN_CASE);
    }

    private drawWord(type: Word, multiply: string, position: Vector2D): void {
        this.grid.gridContext.fillStyle = this.gridStyle.fontColor;
        this.grid.gridContext.font = `${FONT_LETTER_WORD}${FONT_UNIT} ${FONT}`;
        this.drawTile(type, multiply, position);
    }

    private setStartPosition(section: Section): PositionOption {
        const nTile = BOX_BY_ROW_WITH_NUMBER - 1;
        const option: PositionOption = { moveX: 0, moveY: 0, inverse1: 0, inverse2: 0 };

        if (this.validatePosition(Section.UpLeft, Section.DownLeft, section)) option.moveX = DEFAULT_SIZE;
        if (this.validatePosition(Section.UpLeft, Section.UpRight, section)) option.moveY = DEFAULT_SIZE;
        if (this.validatePosition(Section.UpRight, Section.DownRight, section)) option.inverse1 = nTile;
        if (this.validatePosition(Section.DownRight, Section.DownLeft, section)) option.inverse2 = nTile;

        return option;
    }

    private validatePosition(firstSection: Section, secondSection: Section, sectionToCheck: Section): boolean {
        return firstSection === sectionToCheck || secondSection === sectionToCheck;
    }

    private placeTile(position: Vector2D, type: TypeCase): void {
        switch (type) {
            case TypeCase.Word3:
                this.wordXThreeSquare(position);
                break;
            case TypeCase.Word2:
                this.wordXTwoSquare(position);
                break;
            case TypeCase.Letter3:
                this.letterXThreeSquare(position);
                break;
            case TypeCase.Letter2:
                this.letterXTwoSquare(position);
                break;
            case TypeCase.Normal:
                this.createSquare(position, this.gridStyle.defaultTileColor);
                break;
            case TypeCase.Star:
                this.starSquare(position);
                break;
        }
    }

    private drawTile(type: Word, multiply: string, position: Vector2D): void {
        if (type === Word.Letter) {
            this.drawText(BONUS_ON_LETTER, position, STEP_LETTER);
        } else {
            this.drawText(BONUS_ON_WORD, position, STEP_WORD);
        }

        this.drawMultiply(multiply, position);
    }

    private drawMultiply(multiply: string, position: Vector2D): void {
        for (let i = 0; i < multiply.length; i++) {
            this.grid.gridContext.fillText(
                multiply[i],
                position.x + DEFAULT_SIZE / POSITION_X_MULTIPLY + STEP_MULTIPLY * i,
                position.y + DEFAULT_SIZE / POSITION_Y_MULTIPLY,
            );
        }
    }

    private drawText(word: string, position: Vector2D, steps: number): void {
        const positionText = word === BONUS_ON_LETTER ? POSITION_X_LETTER : POSITION_X_WORD;

        for (let i = 0; i < word.length; i++) {
            this.grid.gridContext.fillText(word[i], position.x + positionText + steps * i, position.y + POSITION_Y_WORD_LETTER);
        }
    }
}
