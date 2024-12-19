import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { Game } from '@app/classes/game/game';
import { Player } from '@app/classes/players/player-abstract';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { MAX_SKIP_ALLOWED } from '@app/constants/game';
import { RuleName } from '@app/enum/rules';
import { Action } from '@app/interface/action-interface';
import { Rule } from '@app/interface/rule-interface';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { ActionType } from '@common/enums/action-type';
import { GameModes } from '@common/enums/game-modes';

export class EndGame implements Rule {
    name: string;
    nSkip: number;

    constructor() {
        this.name = RuleName.EndGame;
        this.nSkip = 0;
    }

    verify(action: Action, game: Game, rulesVisitorResponse: RulesVisitorResponse): RulesVisitorResponse {
        if (action.actionType === ActionType.SkipTurn) {
            if (game.activePlayer instanceof RealPlayer) rulesVisitorResponse.gameModification.push(this.addNewSkip(this));

            if (!this.isMaxSkipReached(game)) return rulesVisitorResponse;
            rulesVisitorResponse.gameModification.push(this.endGame(game.players));
            return rulesVisitorResponse;
        } else if (action.actionType === ActionType.PlaceLetters) {
            this.verifyEmptyStashAndEasel(action, game, rulesVisitorResponse);
        } else if (game.gameConfig.gameModeName === GameModes.Cooperative) {
            this.isOnlyPlayerInCooperativeGame(game, rulesVisitorResponse);
        }
        rulesVisitorResponse.gameModification.push(this.resetSkip(this));

        return rulesVisitorResponse;
    }

    private verifyEmptyStashAndEasel(action: Action, game: Game, rulesVisitorResponse: RulesVisitorResponse): void {
        const placeLetter = action as PlaceLetters;

        if (game.letterStash.isEmpty && game.activePlayer.easel.size === placeLetter.letters.length) {
            rulesVisitorResponse.score = this.updateScore(game, rulesVisitorResponse);
            if (game.gameConfig.gameModeName === GameModes.Cooperative)
                rulesVisitorResponse.gameModification.push(this.endCooperativeGame(game.players));
            else rulesVisitorResponse.gameModification.push(this.endGame(game.otherPlayer));
        }
    }

    private updateScore(game: Game, rulesVisitorResponse: RulesVisitorResponse): number {
        return MathUtils.accumulator<number, Player>(game.otherPlayer, rulesVisitorResponse.score, (sum: number, player: Player) => {
            sum += player.easel.totalScore;
            return sum;
        });
    }

    private endGame(players: Player[]): (game: Game) => void {
        return (game: Game): void => {
            players.forEach((player: Player) => {
                player.score -= player.easel.totalScore;
            });
            game.end();
        };
    }

    private endCooperativeGame(players: Player[]): (game: Game) => void {
        return (game: Game): void => {
            players[0].score -= players[0].easel.totalScore;
            game.end();
        };
    }

    private isMaxSkipReached(game: Game): boolean {
        const realPlayers = game.players.filter((player: Player) => player instanceof RealPlayer);

        if (!realPlayers.length) return true;
        if (game.gameConfig.gameModeName === GameModes.Cooperative) return this.nSkip === MAX_SKIP_ALLOWED - 1;
        return this.nSkip === MAX_SKIP_ALLOWED * realPlayers.length - 1;
    }

    private isOnlyPlayerInCooperativeGame(game: Game, rulesVisitorResponse: RulesVisitorResponse): void {
        if (game.players.length === 1) {
            rulesVisitorResponse.gameModification.push(this.endCooperativeGame(game.players));
        }
    }

    private addNewSkip(endGame: EndGame): () => void {
        return () => endGame.nSkip++;
    }

    private resetSkip(endGame: EndGame): () => void {
        return () => (endGame.nSkip = 0);
    }
}
