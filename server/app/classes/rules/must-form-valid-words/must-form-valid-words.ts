import { Game } from '@app/classes/game/game';
import { ERROR_IN_TURN } from '@app/constants/error/error-messages';
import { RuleName } from '@app/enum/rules';
import { Action } from '@app/interface/action-interface';
import { Rule } from '@app/interface/rule-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { DictionaryService } from '@app/services/dictionary/dictionary.service';
import { ScrabbleAlgo } from '@app/services/scrabble-algorithm/scrabble-algorithm.service';
import { ActionType } from '@common/enums/action-type';
import { Container } from 'typedi';

export class MustFormValidWords implements Rule {
    name: string;
    dictService: DictionaryService;
    scrabbleAlgo: ScrabbleAlgo;

    constructor() {
        this.name = RuleName.MustFormValidWords;
        this.dictService = Container.get(DictionaryService);
        this.scrabbleAlgo = Container.get(ScrabbleAlgo);
    }

    verify(action: Action, game: Game, rulesVisitorResponse: RulesVisitorResponse): RulesVisitorResponse {
        if (action.actionType !== ActionType.PlaceLetters) return rulesVisitorResponse;
        const words = this.scrabbleAlgo.tilesToWords(rulesVisitorResponse.newlyFormedWordAsTile);
        const isWordsValid = this.dictService.validateWords(words, game.gameConfig.dictionaryId);

        if (isWordsValid) return rulesVisitorResponse;
        throw new Error(ERROR_IN_TURN);
    }
}
