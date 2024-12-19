import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Game } from '@app/classes/game/game';
import { MUST_BE_CONTAIN_IN_EASEL } from '@app/constants/error/rules';
import { RuleName } from '@app/enum/rules';
import { Action } from '@app/interface/action-interface';
import { Rule } from '@app/interface/rule-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { ActionType } from '@common/enums/action-type';

export class MustKeepEaselFull implements Rule {
    name: string;

    constructor() {
        this.name = RuleName.MustKeepEaselFull;
    }

    verify(action: Action, game: Game, rulesVisitorResponse: RulesVisitorResponse): RulesVisitorResponse {
        if (action.actionType !== ActionType.PlaceLetters) return rulesVisitorResponse;

        const placeLetters = action as PlaceLetters;

        if (!game.activePlayer.easel.isContaining(placeLetters.letters)) throw new Error(MUST_BE_CONTAIN_IN_EASEL);
        rulesVisitorResponse.gameModification.push(this.refillEasel(placeLetters));
        return rulesVisitorResponse;
    }

    private refillEasel(placeLetters: PlaceLetters): (game: Game) => void {
        return (game: Game): void => {
            game.activePlayer.easel.removeLetters(placeLetters.letters);
            const nLetters = game.letterStash.size < placeLetters.letters.length ? game.letterStash.size : placeLetters.letters.length;
            const newLetters = game.letterStash.removeLetters(nLetters);

            game.activePlayer.easel.addLetters(newLetters);
        };
    }
}
