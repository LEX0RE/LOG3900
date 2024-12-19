import { CooperativePlayer } from '@app/classes/players/cooperative-player/cooperative-player';

export interface ActionToApprove {
    action: string;
    gameId: string;
    actionPlayer: CooperativePlayer;
    approvalsFromPlayers: CooperativePlayer[];
    rejectionsFromPlayers: CooperativePlayer[];
    noResponsePlayers: CooperativePlayer[];
}
