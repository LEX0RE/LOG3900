import { BlankLettersFactory } from '@app/classes/letters/blank-factory/blank-factory';
import { BlankLetter } from '@app/classes/letters/blank-letter/blank-letter';
import { Letter } from '@app/classes/letters/letter/letter';
import { LettersFactory } from '@app/classes/letters/letterFactory/letter-factory';
import { coordinateToVector2D } from '@app/classes/utils/vector-2d/vector-2d';
import { BOARD_LENGTH, ONE_LETTER_PLACEMENT } from '@app/constants/command-formatting';
import { SYNTAX_ERROR } from '@app/constants/error/error-messages';
import { EASEL_SIZE } from '@app/constants/miscellaneous';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { BLANK } from '@common/constants/blank';
import { ActionType } from '@common/enums/action-type';
import { Orientation } from '@common/enums/orientation';
import { Service } from 'typedi';
@Service()
export class CommandFormattingService {
    formatOrientation(orientation: string, nbLetters: number): Orientation {
        if (orientation === Orientation.Horizontal) return Orientation.Horizontal;
        else if (orientation === Orientation.Vertical) return Orientation.Vertical;
        else if (this.isValidWithoutOrientation(orientation, nbLetters)) return Orientation.None;
        throw new Error(SYNTAX_ERROR);
    }

    formatLetters(characters: string, action: ActionType): Letter[] {
        if (characters.length <= EASEL_SIZE) {
            const letters: Letter[] = [];

            for (const character of this.tidyAccent(characters)) {
                if (this.isCharacterALetterValidToTrade(character)) letters.push(this.toLetterType(character));
                else if (this.isABlank(character) && action !== ActionType.Trade) letters.push(this.toBlankType(character));
                else throw new Error(SYNTAX_ERROR);
            }
            return letters;
        }
        throw new Error(SYNTAX_ERROR);
    }

    formatPlacement(placement: string): Vector2D {
        const row = placement.slice(0, 1);
        const column = placement.slice(1);

        if (this.isRow(row) && this.isColumn(column)) {
            return coordinateToVector2D({ row, column: parseInt(column, 10) });
        }
        throw new Error(SYNTAX_ERROR);
    }

    private isCharacterALetterValidToTrade(character: string): boolean {
        return /^[a-z*]$/.test(character);
    }

    private isABlank(character: string): boolean {
        return /^[A-Z]$/.test(character);
    }

    private toLetterType(character: string): Letter {
        if (character === BLANK) return LettersFactory.blank;
        return LettersFactory[character];
    }

    private toBlankType(character: string): BlankLetter {
        return BlankLettersFactory[character.toLowerCase()];
    }

    private isRow(row: string): boolean {
        return row.length === 1 ? /^[a-oA-O]$/.test(row) : false;
    }

    private isColumn(column: string): boolean {
        return +column > 0 && +column < BOARD_LENGTH;
    }

    private isValidWithoutOrientation(orientation: string, nbLetters: number): boolean {
        return orientation !== Orientation.Vertical && orientation !== Orientation.Horizontal && nbLetters === ONE_LETTER_PLACEMENT;
    }

    private tidyAccent(characters: string): string {
        characters = this.lowercaseLetterTidyAccent(characters);
        return this.capitalLetterTidyAccent(characters);
    }

    // Inspiré de https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    private lowercaseLetterTidyAccent(characters: string): string {
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
    private capitalLetterTidyAccent(characters: string): string {
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
