import { BracketUser } from '@common/interfaces/tournament/bracket-profile';

export interface CommonBracket {
    children: CommonBracket[];
    currentPlayers: BracketUser[];
    isMatchInProgress: boolean;
    gameId: string;
}
