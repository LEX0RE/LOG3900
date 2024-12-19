// Parties de code inspirées du code suivant : https://github.com/kmp3325/Scrabble/blob/master/src/Game/BestMoveMachine.java
import { AnchorGenerator } from '@app/classes/anchors-generator/anchors-generator';
import { Board } from '@app/classes/board/board';
import { Gaddag } from '@app/classes/gaddag/gaddag';
import { compareVector2D } from '@app/classes/utils/vector-2d/vector-2d';
import { ALL_POSSIBILITIES } from '@app/constants/board-helper';
import { Anchor, LetterOrientation } from '@app/interface/anchor';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { DOWN_OFFSET, LEFT_OFFSET, RIGHT_OFFSET, UP_OFFSET } from '@common/constants/board';
import { Orientation } from '@common/enums/orientation';

export class BoardHelper {
    anchors: Anchor[];
    current!: Vector2D;
    workHorizontal!: boolean;
    anchorGenerator!: AnchorGenerator;
    board!: Board;

    constructor(board: Board, gaddag: Gaddag) {
        this.board = board;
        this.anchors = [];
        this.anchorGenerator = new AnchorGenerator(this, gaddag);
        this.anchors = this.anchorGenerator.generate();
    }

    hasRoom(position: number, workBefore: boolean): boolean {
        let newPosition = position;

        while (this.board.isInTiles(this.currentPosition(newPosition))) {
            if (workBefore) newPosition--;
            else newPosition++;
            if (!this.board.letterAt(this.currentPosition(newPosition)) && this.board.isInTiles(this.currentPosition(newPosition))) return true;
        }

        return false;
    }

    currentPosition(position: number): Vector2D {
        return this.workHorizontal ? { x: this.current.x + position, y: this.current.y } : { x: this.current.x, y: this.current.y + position };
    }

    getPositionPossibility(position: number): string[] {
        const orientation = this.workHorizontal ? Orientation.Horizontal : Orientation.Vertical;
        const coordinate = this.currentPosition(position);
        const found = this.anchors.find((anchor: Anchor) => compareVector2D(anchor.position, coordinate));
        let result = ALL_POSSIBILITIES;

        if (found) result = found.possibilities.filter((possibility: LetterOrientation) => possibility.directions.includes(orientation));
        return result.map((possibility: LetterOrientation) => possibility.letter);
    }

    adjacentWord(position: Vector2D, offset: Vector2D): string {
        let result = '';
        let newPosition = { x: position.x, y: position.y };

        while (this.adjacentTile(newPosition, offset)) {
            if (offset === LEFT_OFFSET || offset === UP_OFFSET) result += this.adjacentTile(newPosition, offset);
            else result = this.adjacentTile(newPosition, offset) + result;
            newPosition = { x: newPosition.x + offset.x, y: newPosition.y + offset.y };
        }

        return result.toLocaleLowerCase();
    }

    wordBefore(position: Vector2D): string {
        return this.workHorizontal ? this.adjacentWord(position, LEFT_OFFSET) : this.adjacentWord(position, UP_OFFSET);
    }

    wordAfter(position: Vector2D): string {
        return this.workHorizontal ? this.adjacentWord(position, RIGHT_OFFSET) : this.adjacentWord(position, DOWN_OFFSET);
    }

    adjacentTile(position: Vector2D, offset: Vector2D): string {
        const newPosition = { x: position.x + offset.x, y: position.y + offset.y };

        if (!this.board.isInTiles(newPosition)) return '';
        return this.board.letterAt(newPosition);
    }

    tileBefore(position: number): string {
        return this.workHorizontal
            ? this.adjacentTile(this.currentPosition(position), LEFT_OFFSET)
            : this.adjacentTile(this.currentPosition(position), UP_OFFSET);
    }

    tileAfter(position: number): string {
        return this.workHorizontal
            ? this.adjacentTile(this.currentPosition(position), RIGHT_OFFSET)
            : this.adjacentTile(this.currentPosition(position), DOWN_OFFSET);
    }
}
