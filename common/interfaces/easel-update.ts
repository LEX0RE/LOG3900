import { CommonEasel } from '@common/interfaces/game-view-related/common-easel';
export interface EaselUpdate {
    easel: CommonEasel;
}

export interface UserEaselUpdate extends EaselUpdate {
    userId: string;
}
