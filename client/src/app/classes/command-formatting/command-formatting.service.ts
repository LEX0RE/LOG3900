import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { BOARD_COLUMNS, INVALID_VECTOR2D } from '@app/constants/grid';
import { Vector2D } from '@app/interface/vector-2d';
import { ALPHABET_BOARD } from '@common/constants/alphabet';
import { Orientation } from '@common/enums/orientation';
import { Coordinate } from '@common/interfaces/coordinate';

export class CommandFormattingService {
    static tidyAccent(characters: string): string {
        characters = this.lowercaseLetterTidyAccent(characters);
        return this.capitalLetterTidyAccent(characters);
    }

    static isAlpha(characters: string): boolean {
        return /^[a-z*]+$/i.test(characters);
    }

    static isCharacterValidForEasel(character: string): boolean {
        return /^[a-z*]$/.test(character);
    }

    static isABlank(character: string): boolean {
        return /^[A-Z]$/.test(character);
    }

    static formatOrientation(orientation: string, nbLetters: number): Orientation {
        if (orientation === Orientation.Horizontal) return Orientation.Horizontal;
        else if (orientation === Orientation.Vertical) return Orientation.Vertical;
        else if (nbLetters === 1) return Orientation.None;
        return Orientation.Horizontal;
    }

    static formatInitialPlacement(initialPosition: string): Vector2D {
        const row = initialPosition.slice(0, 1);
        const column = initialPosition.slice(1);

        if (this.isRow(row) && this.isColumn(column)) {
            return this.coordinateToVector2D({ row, column: parseInt(column, 10) });
        }

        return { x: -1, y: -1 };
    }

    static coordinateToVector2D(coordinate: Coordinate): Vector2D {
        let y = INDEX_NOT_FOUND;

        ALPHABET_BOARD.forEach((char: string, index: number) => {
            if (char.toUpperCase() === coordinate.row.toUpperCase()) y = index;
        });

        if (y === INDEX_NOT_FOUND) return INVALID_VECTOR2D;
        return { x: coordinate.column, y: y + 1 };
    }

    private static isRow(row: string): boolean {
        return row.length === 1 ? /^[a-oA-O]$/.test(row) : false;
    }

    private static isColumn(column: string): boolean {
        return +column > 0 && +column <= BOARD_COLUMNS.length;
    }

    // Inspiré de https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    private static lowercaseLetterTidyAccent(characters: string): string {
        characters = characters.replace(new RegExp('[àáâä]', 'g'), 'a');
        characters = characters.replace(new RegExp('ç', 'g'), 'c');
        characters = characters.replace(new RegExp('[èéêë]', 'g'), 'e');
        characters = characters.replace(new RegExp('[ìíîï]', 'g'), 'i');
        characters = characters.replace(new RegExp('ñ', 'g'), 'n');
        characters = characters.replace(new RegExp('[òóôõö]', 'g'), 'o');
        characters = characters.replace(new RegExp('[ùúûü]', 'g'), 'u');
        characters = characters.replace(new RegExp('[ýÿ]', 'g'), 'y');
        return characters;
    }

    // Inspiré de https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    private static capitalLetterTidyAccent(characters: string): string {
        characters = characters.replace(new RegExp('[ÀÁÂÄ]', 'g'), 'A');
        characters = characters.replace(new RegExp('Ç', 'g'), 'C');
        characters = characters.replace(new RegExp('[ÈÉÊË]', 'g'), 'E');
        characters = characters.replace(new RegExp('[ÌÍÎÏ]', 'g'), 'I');
        characters = characters.replace(new RegExp('Ñ', 'g'), 'N');
        characters = characters.replace(new RegExp('[ÒÓÔÕÖ]', 'g'), 'O');
        characters = characters.replace(new RegExp('[ÙÚÛÜ]', 'g'), 'U');
        characters = characters.replace(new RegExp('[ÝŸ]', 'g'), 'Y');
        return characters;
    }
}
