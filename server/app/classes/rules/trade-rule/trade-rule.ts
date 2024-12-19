import { TradeLetter } from '@app/classes/actions/trade-letters/trade-letters';
import { Game } from '@app/classes/game/game';
import { MUST_BE_CONTAIN_IN_EASEL } from '@app/constants/error/rules';
import { RuleName } from '@app/enum/rules';
import { Action } from '@app/interface/action-interface';
import { Rule } from '@app/interface/rule-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { ActionType } from '@common/enums/action-type';

export class TradeLetterRule implements Rule {
    name: string;

    constructor() {
        this.name = RuleName.TradeLetterRule;
    }

    verify(action: Action, game: Game, rulesVisitorResponse: RulesVisitorResponse): RulesVisitorResponse {
        if (action.actionType !== ActionType.Trade) return rulesVisitorResponse;

        const trade = action as TradeLetter;

        if (!game.activePlayer.easel.isContaining(trade.letters)) throw new Error(MUST_BE_CONTAIN_IN_EASEL);

        rulesVisitorResponse.gameModification.push(this.exchange(trade));
        return rulesVisitorResponse;
    }

    private exchange(trade: TradeLetter): (game: Game) => void {
        return (game: Game): void => {
            game.activePlayer.easel.removeLetters(trade.letters);
            const newLetters = game.letterStash.tradeLetters(trade.letters);

            game.activePlayer.easel.addLetters(newLetters);
        };
    }
}
