import { User } from '@common/interfaces/user/user';

export interface GameInfoHistory {
    gameId: string;
    realPlayers: User[];
    beginningDate: Date;
    duration: number;
    winners: User[];
    losers: User[];
    scores: [string, number][];
}
