import { Action } from '@app/interface/action-interface';
import { ActionType } from '@common/enums/action-type';

export class SkipTurn implements Action {
    actionType: ActionType;

    constructor() {
        this.actionType = ActionType.SkipTurn;
    }

    toString(): string {
        return `${this.actionType}`;
    }
}
