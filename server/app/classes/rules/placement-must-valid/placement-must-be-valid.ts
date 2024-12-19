import { Game } from '@app/classes/game/game';
import { MUST_BE_CONNECTED, MUST_FORM_AT_LEAST_ONE_WORD } from '@app/constants/error/rules';
import { RuleName } from '@app/enum/rules';
import { Action } from '@app/interface/action-interface';
import { Rule } from '@app/interface/rule-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { ScrabbleAlgo } from '@app/services/scrabble-algorithm/scrabble-algorithm.service';
import { ActionType } from '@common/enums/action-type';
import { Container } from 'typedi';

export class PlacementMustBeValid implements Rule {
    name: string;
    private algo: ScrabbleAlgo;

    constructor() {
        this.name = RuleName.PlacementMustBeValid;
        this.algo = Container.get(ScrabbleAlgo);
    }

    verify(action: Action, _game: Game, rulesVisitorResponse: RulesVisitorResponse): RulesVisitorResponse {
        if (action.actionType !== ActionType.PlaceLetters) return rulesVisitorResponse;
        if (!rulesVisitorResponse.newlyFormedWordAsTile.length) throw new Error(MUST_FORM_AT_LEAST_ONE_WORD);
        const isConnected = this.algo.isWordConnected(rulesVisitorResponse.newBoard, rulesVisitorResponse.placedPosition);

        if (!isConnected) throw new Error(MUST_BE_CONNECTED);

        return rulesVisitorResponse;
    }
}
