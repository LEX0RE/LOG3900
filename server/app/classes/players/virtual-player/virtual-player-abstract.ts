import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { TradeLetter } from '@app/classes/actions/trade-letters/trade-letters';
import { Easel } from '@app/classes/easel/easel';
import { Game } from '@app/classes/game/game';
import { Letter } from '@app/classes/letters/letter/letter';
import { Player } from '@app/classes/players/player-abstract';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { TURN_DELAY } from '@app/constants/beginner-player';
import { SKIP_TIMEOUT } from '@app/constants/user/virtual-players';
import { Action } from '@app/interface/action-interface';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { delay } from '@app/test/delay';
import { UserProfile } from '@common/interfaces/user-profile';
import { Container } from 'typedi';

export abstract class VirtualPlayer extends Player {
    requiredUpdates: boolean;
    private gameManagerService: GameManager;
    private game!: Game | undefined;

    constructor(user: UserProfile, easel: Easel = new Easel()) {
        super(user, easel);
        this.requiredUpdates = false;
        this.gameManagerService = Container.get(GameManager);
    }

    async nextAction(): Promise<Action> {
        this.setGame();
        const action = await Promise.race(this.getAction());

        return Promise.resolve(action);
    }

    async trade(numberToChange: number): Promise<Action> {
        if (!this.game) return this.skipAction();

        if (numberToChange >= this.game.letterStash.size) return this.chooseTradeAction(this.game.letterStash.size);

        return this.tradeLetters(numberToChange);
    }

    async tradeLetters(numberToChange: number): Promise<Action> {
        const letter: Letter[] = this.chooseLetter(numberToChange);

        return Promise.resolve(new TradeLetter(letter));
    }

    async skipAction(): Promise<Action> {
        await delay(Math.min(SKIP_TIMEOUT, this.timeLimit));

        return Promise.resolve(new SkipTurn());
    }

    private chooseLetter(numberChange: number): Letter[] {
        const letterToChange = [];
        const letterFromEasel: Letter[] = [];

        this.easel.letters.forEach((letter: Letter) => letterFromEasel.push(letter));
        for (let letter = 0; letter < numberChange; letter++) {
            const index = MathUtils.randomNumberInInterval(0, letterFromEasel.length - 1);

            letterToChange.push(letterFromEasel[index]);
            letterFromEasel.splice(index, 1);
        }
        return letterToChange;
    }

    private getAction(): Promise<Action>[] {
        const normalAction: Promise<Action> = this.actionPromise(TURN_DELAY);
        const skipAction: Promise<Action> = this.actionPromise(this.timeLimit, true);
        const end: Promise<Action> = this.endAction();

        return [normalAction, skipAction, end];
    }

    private async actionPromise(time: number, isSkip: boolean = false): Promise<Action> {
        const startTime = Date.now();
        const action = isSkip ? new SkipTurn() : await this.handleAction();

        await this.startDelay(startTime, time);
        return action;
    }

    private async startDelay(startTime: number, time: number): Promise<void> {
        const now = Date.now();
        const newDelay = time - (now - startTime);

        await delay(newDelay);
    }

    private setGame(): void {
        if (!this.game) {
            const game = this.gameManagerService.getGameByPlayerId(this.id);

            if (game) this.game = game;
        }
    }

    private async endAction(): Promise<Action> {
        return new Promise<Action>((resolve) => {
            this.outsideResolve = resolve;
        });
    }

    abstract handleAction(): Promise<Action>;

    abstract chooseTradeAction(stashSize: number): Promise<Action>;
}
