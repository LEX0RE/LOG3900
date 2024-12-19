import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Game } from '@app/classes/game/game';
import { Bingo } from '@app/classes/rules/bingo-rule/bingo';
import { EndGame } from '@app/classes/rules/end-game/end-game';
import { MustFirstPlacementBeValid } from '@app/classes/rules/must-first-placement-be-valid/must-first-placement-be-valid';
import { MustFormValidWords } from '@app/classes/rules/must-form-valid-words/must-form-valid-words';
import { MustKeepEaselFull } from '@app/classes/rules/must-keep-easel-full-when-placing-letter/must-keep-easel-full-when-placing-letter';
import { ScoringNewWords } from '@app/classes/rules/score/score-classic';
import { TradeLetterRule } from '@app/classes/rules/trade-rule/trade-rule';
import { Action } from '@app/interface/action-interface';
import { GameMode } from '@app/interface/game-mode';
import { Rule } from '@app/interface/rule-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { ScrabbleAlgo } from '@app/services/scrabble-algorithm/scrabble-algorithm.service';
import { CLASSIC } from '@common/constants/game-modes';
import { ActionType } from '@common/enums/action-type';
import { Container } from 'typedi';

export class ClassicMode implements GameMode {
    rules: Rule[];
    mode: string;
    private scrabbleAlgo: ScrabbleAlgo;

    constructor() {
        this.scrabbleAlgo = Container.get(ScrabbleAlgo);
        this.rules = [
            new MustFirstPlacementBeValid(),
            new ScoringNewWords(),
            new Bingo(),
            new MustKeepEaselFull(),
            new TradeLetterRule(),
            new EndGame(),
            new MustFormValidWords(),
        ];
        this.mode = CLASSIC;
    }

    verifyRules(action: Action, game: Game): RulesVisitorResponse {
        const basicVisitor = this.createBasicVisitor(game);

        let visitor = action.actionType === ActionType.PlaceLetters ? this.createVisitor(basicVisitor, action as PlaceLetters) : basicVisitor;

        this.rules.forEach((rule: Rule) => {
            visitor = rule.verify(action, game, visitor);
        });

        return visitor;
    }

    removeRule(ruleName: string): void {
        this.rules = this.rules.filter((rule: Rule) => rule.name !== ruleName);
    }

    addRule(rule: Rule): void {
        this.rules.push(rule);
    }

    private createVisitor(basicVisitor: RulesVisitorResponse, placeAction: PlaceLetters): RulesVisitorResponse {
        basicVisitor.placedPosition = basicVisitor.newBoard.placeLetters(placeAction);
        basicVisitor.newlyFormedWordAsTile = this.scrabbleAlgo.findNewFormedTiles(basicVisitor.newBoard, basicVisitor.placedPosition, placeAction);
        return basicVisitor;
    }

    private createBasicVisitor(game: Game): RulesVisitorResponse {
        return {
            gameModification: [],
            newlyFormedWordAsTile: [],
            score: 0,
            newBoard: game.board.clone(),
            placedPosition: [],
        };
    }
}
