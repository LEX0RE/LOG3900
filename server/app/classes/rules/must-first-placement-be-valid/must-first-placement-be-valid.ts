import { Game } from '@app/classes/game/game';
import { MUST_NOT_BE_ONE_LETTER, MUST_START_AT_MIDDLE } from '@app/constants/error/rules';
import { MIDDLE_POSITION } from '@app/constants/game';
import { RuleName } from '@app/enum/rules';
import { Action } from '@app/interface/action-interface';
import { Rule } from '@app/interface/rule-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { ActionType } from '@common/enums/action-type';

export class MustFirstPlacementBeValid implements Rule {
    name: string;

    constructor() {
        this.name = RuleName.MustFirstPlacementBeValid;
    }

    verify(action: Action, _game: Game, rulesVisitorResponse: RulesVisitorResponse): RulesVisitorResponse {
        if (action.actionType !== ActionType.PlaceLetters) return rulesVisitorResponse;

        if (this.isMiddleOccupied(rulesVisitorResponse)) throw new Error(MUST_START_AT_MIDDLE);
        if (!this.hasMinimumLength(rulesVisitorResponse)) throw new Error(MUST_NOT_BE_ONE_LETTER);

        return rulesVisitorResponse;
    }

    private isMiddleOccupied(rulesVisitorResponse: RulesVisitorResponse): boolean {
        return !rulesVisitorResponse.newBoard.tiles[MIDDLE_POSITION.x][MIDDLE_POSITION.y].letter.letter;
    }

    private hasMinimumLength(rulesVisitorResponse: RulesVisitorResponse): boolean {
        return rulesVisitorResponse.newlyFormedWordAsTile.length >= 1;
    }
}
