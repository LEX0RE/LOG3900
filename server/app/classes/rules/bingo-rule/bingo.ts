import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Game } from '@app/classes/game/game';
import { BINGO_POINTS } from '@app/constants/bingo';
import { EASEL_SIZE } from '@app/constants/miscellaneous';
import { RuleName } from '@app/enum/rules';
import { Action } from '@app/interface/action-interface';
import { Rule } from '@app/interface/rule-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { ActionType } from '@common/enums/action-type';

export class Bingo implements Rule {
    name: string;

    constructor() {
        this.name = RuleName.Bingo;
    }

    verify(action: Action, _game: Game, rulesVisitorResponse: RulesVisitorResponse): RulesVisitorResponse {
        if (action.actionType !== ActionType.PlaceLetters) return rulesVisitorResponse;
        const placerLetter = action as PlaceLetters;

        if (placerLetter.letters.length >= EASEL_SIZE) rulesVisitorResponse.score += BINGO_POINTS;
        return rulesVisitorResponse;
    }
}
