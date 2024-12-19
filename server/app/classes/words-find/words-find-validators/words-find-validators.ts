import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { BoardHelper } from '@app/classes/board-helper/board-helper';
import { Game } from '@app/classes/game/game';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { TIME_TO_END_FINDING, TIME_TO_QUEUE_RESET } from '@app/constants/turn-times';
import { EndSearching } from '@app/interface/end-searching';
import { Hint } from '@app/interface/hint';
import { WordsFindState } from '@app/interface/words-find';
import { delay } from '@app/test/delay';
import { Orientation } from '@common/enums/orientation';

export class WordsFindValidators {
    boardHelper: BoardHelper;
    game: Game;
    end: EndSearching;

    constructor(boardHelper: BoardHelper, game: Game, end: EndSearching) {
        this.boardHelper = boardHelper;
        this.game = game;
        this.end = end;
    }

    async tryPlacement(index: number, word: string, wordsFindState: WordsFindState): Promise<void> {
        const position = this.boardHelper.currentPosition(index);
        const orientation = wordsFindState.worksHorizontal ? Orientation.Horizontal : Orientation.Vertical;
        const action = PlaceLetters.transformToAction(position, orientation, word);

        if (this.isNew(action, wordsFindState.result)) this.validateScore(action, wordsFindState);
    }

    async queueReset(): Promise<void> {
        await delay(0);
    }

    async endSearch(startTime: number, resultPresentLength: number): Promise<boolean> {
        return (await this.isTimesUp(startTime)) || this.hasFound(resultPresentLength);
    }

    private async validateScore(action: PlaceLetters, wordsFindState: WordsFindState): Promise<void> {
        const score = this.validatePlacement(action);

        if (score !== INDEX_NOT_FOUND) wordsFindState.result.push({ action, score });
    }

    private validatePlacement(action: PlaceLetters): number {
        if (this.game.board.letterAt(action.beginPosition)) return INDEX_NOT_FOUND;

        try {
            const response = this.game.gameMode.verifyRules(action, this.game);

            return response.score;
        } catch (err) {
            return INDEX_NOT_FOUND;
        }
    }

    private async isTimesUp(startTime: number): Promise<boolean> {
        if (!this.end.maxTime) return false;
        if (!((Date.now() - startTime) % TIME_TO_QUEUE_RESET)) await this.queueReset();
        return Boolean(Date.now() - startTime >= this.end.maxTime - TIME_TO_END_FINDING);
    }

    private hasFound(resultPresentLength: number): boolean {
        return Boolean(this.end.found && 0 < this.end.found && this.end.found <= resultPresentLength);
    }

    private isNew(action: PlaceLetters, result: Hint[]): boolean {
        for (const save of result) {
            if (save.action.toString() === action.toString()) return false;
        }
        return true;
    }
}
