import { Player } from '@app/classes/players/player-abstract';
import { Action } from '@app/interface/action-interface';

export interface PlayerTurnsQueueEntry {
    player: Player;
    resolve: (value: Action | PromiseLike<Action>) => void;
    endAction: () => void;
}
