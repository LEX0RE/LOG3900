import { UserProfile } from '@common/interfaces/user-profile';

export enum PlayerGameState {
    NO_RESULT = -1,
    LOSER = 0,
    WINNER = 1,
}

export interface BracketUser extends UserProfile {
    winner: PlayerGameState;
}
