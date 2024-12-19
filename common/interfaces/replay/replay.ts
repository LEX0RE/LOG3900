import { CommonEndGame } from '@common/interfaces/common-end-game';
import { Turn } from '@common/interfaces/replay/turn';
import { User } from '@common/interfaces/user/user';

export interface Replay {
    date: Date;
    gameId: string;
    realPlayers: User[];
    turns: Turn[];
    endGame: CommonEndGame;
}
