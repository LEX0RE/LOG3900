import { Game } from '@app/classes/game/game';
import { Action } from '@app/interface/action-interface';
import { Rule } from '@app/interface/rule-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';

export interface GameMode {
    rules: Rule[];
    mode: string;

    verifyRules(action: Action, game: Game): RulesVisitorResponse;
    removeRule(ruleName: string): void;
    addRule(rule: Rule): void;
}
