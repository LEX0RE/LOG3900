import { Game } from '@app/classes/game/game';
import { Tile } from '@app/classes/tiles/tile';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { RuleName } from '@app/enum/rules';
import { Action } from '@app/interface/action-interface';
import { Rule } from '@app/interface/rule-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { ActionType } from '@common/enums/action-type';

export class ScoringNewWords implements Rule {
    name: string;

    constructor() {
        this.name = RuleName.ScoringNewWords;
    }

    verify(action: Action, _game: Game, rulesVisitorResponse: RulesVisitorResponse): RulesVisitorResponse {
        if (action.actionType !== ActionType.PlaceLetters) return rulesVisitorResponse;

        const bonusTile: Tile[] = [];

        rulesVisitorResponse.score = MathUtils.accumulator<number, Tile[]>(
            rulesVisitorResponse.newlyFormedWordAsTile,
            rulesVisitorResponse.score,
            this.scoring(bonusTile),
        );
        bonusTile.forEach((tile: Tile) => (tile.isBonusActive = false));
        return rulesVisitorResponse;
    }

    private scoring(bonusTile: Tile[]): (score: number, wordAsTile: Tile[]) => number {
        return (score: number, wordAsTile: Tile[]): number => {
            let wordMultiplier = 1;
            let wordScore = 0;

            wordAsTile.forEach((tile: Tile) => {
                wordScore += tile.isBonusActive ? tile.letter.point * tile.letterBonus : tile.letter.point;
                wordMultiplier *= tile.isBonusActive ? tile.wordBonus : 1;
                if (tile.isBonusActive) bonusTile.push(tile);
            });
            return score + wordScore * wordMultiplier;
        };
    }
}
