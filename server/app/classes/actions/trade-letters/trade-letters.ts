import { Letter } from '@app/classes/letters/letter/letter';
import { Action } from '@app/interface/action-interface';
import { ActionType } from '@common/enums/action-type';

export class TradeLetter implements Action {
    letters: Letter[];
    actionType: ActionType;

    constructor(lettersToTrade: Letter[]) {
        this.letters = lettersToTrade;
        this.actionType = ActionType.Trade;
    }

    toString(): string {
        return `${this.actionType} ${this.letters.length} lettres`;
    }
}
