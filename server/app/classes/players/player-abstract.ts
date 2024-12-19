import { Easel } from '@app/classes/easel/easel';
import { Action } from '@app/interface/action-interface';
import { UserProfile } from '@common/interfaces/user-profile';

export abstract class Player {
    easel: Easel;
    requiredUpdates: boolean;
    timeLimit: number;
    user: UserProfile;
    outsideResolve!: (value: Action | PromiseLike<Action>) => void;
    private _score: number;

    get id(): string {
        return this.user.id;
    }

    get score(): number {
        // eslint-disable-next-line no-underscore-dangle -- Pour retourner la valeur de _score
        return this._score;
    }

    set score(newScore: number) {
        // eslint-disable-next-line no-underscore-dangle -- Pour modifier la propriété _score
        this._score = newScore;
    }

    get name(): string {
        return this.user.name;
    }

    constructor(user: UserProfile, easel: Easel = new Easel()) {
        // eslint-disable-next-line no-underscore-dangle -- Pour initialiser la propriété _score
        this._score = 0;
        this.easel = easel;
        this.requiredUpdates = false;
        this.timeLimit = 0;
        this.user = user;
    }

    abstract nextAction(): Promise<Action>;

    abstract copy(): Player;
}
