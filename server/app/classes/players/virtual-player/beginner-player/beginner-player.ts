import { Easel } from '@app/classes/easel/easel';
import { VirtualPlayer } from '@app/classes/players/virtual-player/virtual-player-abstract';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import {
    MAX_PART_THIRD,
    MAX_PART_TWO,
    MIN_PART_ONE,
    MIN_PART_THIRD,
    MIN_PART_TWO,
    PLACE_POSSIBILITY,
    PROBABILITY,
    SEVEN_TO_TWELVE,
    THIRTEEN_TO_EIGHTEEN,
    TIME_LIMIT,
    TRADE_POSSIBILITY,
} from '@app/constants/beginner-player';
import { Possibility } from '@app/enum/beginner-player';
import { Action } from '@app/interface/action-interface';
import { Hint } from '@app/interface/hint';
import { Gameplay } from '@app/services/gameplay/gameplay.service';
import { UserProfile } from '@common/interfaces/user-profile';
import { Container } from 'typedi';

export class BeginnerPlayer extends VirtualPlayer {
    timeLimit: number;
    gameplay: Gameplay;

    override get score(): number {
        return super.score;
    }

    override set score(newScore: number) {
        super.score = newScore;
    }

    constructor(user: UserProfile, easel: Easel = new Easel()) {
        super(user, easel);
        this.timeLimit = TIME_LIMIT;
        this.gameplay = Container.get(Gameplay);
    }

    copy(): BeginnerPlayer {
        return new BeginnerPlayer(this.user);
    }

    async handleAction(): Promise<Action> {
        switch (this.chooseAction(PLACE_POSSIBILITY, TRADE_POSSIBILITY)) {
            case Possibility.FirstPossibility:
                return this.placeAction();
            case Possibility.SecondPossibility:
                return this.tradeAction();
            case Possibility.ThirdPossibility:
                return this.skipAction();
            default:
                return this.skipAction();
        }
    }

    async chooseTradeAction(): Promise<Action> {
        return this.skipAction();
    }

    private chooseAction(firstPercentage: number, secondPercentage: number): Possibility {
        const randomNumber = MathUtils.randomNumberInInterval(0, PROBABILITY);
        let number = firstPercentage;

        if (randomNumber <= number) return Possibility.FirstPossibility;
        number += secondPercentage;

        if (randomNumber <= number) return Possibility.SecondPossibility;

        return Possibility.ThirdPossibility;
    }

    private async tradeAction(): Promise<Action> {
        return this.trade(MathUtils.randomNumberInInterval(1, this.easel.letters.length));
    }

    private async placeAction(): Promise<Action> {
        const possibilities: Hint[] = await this.gameplay.getPossibilities(this.id, { maxTime: this.timeLimit });
        const randomNumber: number = Math.random();
        const maxPossibilityTwo = THIRTEEN_TO_EIGHTEEN + SEVEN_TO_TWELVE;
        let found: Hint | null = null;

        if (randomNumber < THIRTEEN_TO_EIGHTEEN) found = this.chooseWordToPlace(0, MIN_PART_ONE, possibilities);
        if (THIRTEEN_TO_EIGHTEEN < randomNumber && randomNumber < maxPossibilityTwo && !found)
            found = this.chooseWordToPlace(MIN_PART_TWO, MAX_PART_TWO, possibilities);
        if (maxPossibilityTwo < randomNumber && !found) found = this.chooseWordToPlace(MIN_PART_THIRD, MAX_PART_THIRD, possibilities);

        if (found) return Promise.resolve(found.action);

        return this.skipAction();
    }

    private chooseWordToPlace(min: number, max: number, possibilities: Hint[]): Hint | null {
        const newPossibilities = possibilities.filter((hint: Hint) => {
            return min <= hint.score && hint.score <= max;
        });

        if (!newPossibilities.length) return null;
        const randomNumber = MathUtils.randomNumberInInterval(0, newPossibilities.length);

        return newPossibilities[randomNumber];
    }
}
