import { BoardHelper } from '@app/classes/board-helper/board-helper';
import { Gaddag } from '@app/classes/gaddag/gaddag';
import { ALL_POSSIBILITIES } from '@app/constants/board-helper';
import { BREAK } from '@app/constants/dictionary';
import { MIDDLE_POSITION } from '@app/constants/game';
import { Anchor, LetterOrientation } from '@app/interface/anchor';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { ALPHABET } from '@common/constants/alphabet';
import { BOARD_SIZE, DOWN_OFFSET, LEFT_OFFSET, RIGHT_OFFSET, UP_OFFSET } from '@common/constants/board';
import { Orientation } from '@common/enums/orientation';

export class AnchorGenerator {
    private gaddag!: Gaddag;
    private boardHelper!: BoardHelper;

    constructor(boardHelper: BoardHelper, gaddag: Gaddag) {
        this.gaddag = gaddag;
        this.boardHelper = boardHelper;
    }

    generate(): Anchor[] {
        const anchors: Anchor[] = [];
        let position: Vector2D;

        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                position = { x: i, y: j };
                if (this.isAnchor(position)) anchors.push(...this.generatePossibilities(position));
            }
        }

        if (!this.boardHelper.board.toCommonBoard.tiles.length) anchors.push(...this.generatePossibilities(MIDDLE_POSITION));
        return anchors;
    }

    private generatePossibilities(position: Vector2D): Anchor[] {
        let result: LetterOrientation[] = ALL_POSSIBILITIES;
        const offsets: Vector2D[] = [LEFT_OFFSET, RIGHT_OFFSET, UP_OFFSET, DOWN_OFFSET];

        offsets.forEach((offset: Vector2D, index: number) => {
            if (this.boardHelper.adjacentTile(position, offset)) {
                const wordBefore = index % 2 ? this.boardHelper.adjacentWord(position, offset) : '';
                const wordAfter = index % 2 ? '' : this.boardHelper.adjacentWord(position, offset);

                result = this.reducePossibilities(
                    result,
                    this.findPossibilities(wordBefore, wordAfter, index < 2 ? Orientation.Horizontal : Orientation.Vertical),
                );
            }
        });

        return this.generateBetweenTwo(position, result);
    }

    private generateBetweenTwo(position: Vector2D, result: LetterOrientation[]): Anchor[] {
        const wordLeft = this.boardHelper.adjacentWord(position, LEFT_OFFSET);
        const wordRight = this.boardHelper.adjacentWord(position, RIGHT_OFFSET);
        const wordUp = this.boardHelper.adjacentWord(position, UP_OFFSET);
        const wordDown = this.boardHelper.adjacentWord(position, DOWN_OFFSET);

        if (wordLeft && wordRight) result = this.reducePossibilities(result, this.findPossibilities(wordRight, wordLeft, Orientation.Horizontal));
        if (wordUp && wordDown) result = this.reducePossibilities(result, this.findPossibilities(wordDown, wordUp, Orientation.Vertical));

        return [{ position, possibilities: result }];
    }

    private isAnchor(position: Vector2D): boolean {
        if (this.boardHelper.board.letterAt(position)) return false;
        if (this.boardHelper.adjacentTile(position, LEFT_OFFSET)) return true;
        if (this.boardHelper.adjacentTile(position, RIGHT_OFFSET)) return true;
        if (this.boardHelper.adjacentTile(position, UP_OFFSET)) return true;
        if (this.boardHelper.adjacentTile(position, DOWN_OFFSET)) return true;
        return false;
    }

    private reducePossibilities(initial: LetterOrientation[], add: LetterOrientation[]): LetterOrientation[] {
        const result: LetterOrientation[] = [];

        initial.forEach((valueInitial: LetterOrientation) => {
            const found = add.find((valueAdd) => valueAdd.letter === valueInitial.letter);

            if (found) result.push(...this.reduceOrientation(valueInitial, found));
        });

        return result;
    }

    private reduceOrientation(initial: LetterOrientation, add: LetterOrientation): LetterOrientation[] {
        const orientations: Orientation[] = [];

        initial.directions.forEach((orientation: Orientation) => {
            if (add.directions.includes(orientation)) orientations.push(orientation);
        });

        return orientations.length ? [{ letter: initial.letter, directions: orientations }] : [];
    }

    private findPossibilities(prefix: string, suffix: string, orientation: Orientation): LetterOrientation[] {
        const letters: string[] = ALPHABET;
        const result: LetterOrientation[] = [];

        letters.forEach((letter: string) => {
            const possibilities: Orientation[] = this.findPossibilitiesOrientation(prefix + letter + suffix, orientation);

            if (possibilities.length) result.push({ letter, directions: possibilities });
        });

        return result;
    }

    private findPossibilitiesOrientation(word: string, orientation: Orientation): Orientation[] {
        const result: Orientation[] = [];
        const revertOrientation: Orientation = orientation === Orientation.Horizontal ? Orientation.Vertical : Orientation.Horizontal;

        if (this.gaddag.root.isContaining(word)) {
            const node = this.gaddag.root.getChild(word);

            if (this.gaddag.root.isEnd(word)) result.push(revertOrientation);
            if (node.getPossibilities().length || (node.isContaining(BREAK) && node.getChild(BREAK).getPossibilities().length))
                result.push(orientation);
        }

        return result;
    }
}
