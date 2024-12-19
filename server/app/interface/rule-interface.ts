import { Game } from '@app/classes/game/game';
import { Action } from '@app/interface/action-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';

export interface Rule {
    name: string;
    verify(action: Action, game: Game, rulesVisitorResponse: RulesVisitorResponse): RulesVisitorResponse;
}
