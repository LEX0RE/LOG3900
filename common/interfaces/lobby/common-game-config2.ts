import { CommonTimer } from '../game-view-related/common-timer';
import { User } from '../user/user';

export interface CommonGameConfig2 {
    turnTimer: CommonTimer;
    dictionaryTitle: string;
    creator?: User;
}
