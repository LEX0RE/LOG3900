import { CommonEasel } from '@common/interfaces/game-view-related/common-easel';

export interface CommonPlayerInfo {
    name: string;
    userId: string;
    score: number;
    nLetterLeft: number;
    turn: boolean;
    easel?: CommonEasel;
    profilePicture?: string;
}
