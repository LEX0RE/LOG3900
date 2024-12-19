import { BoardUpdate } from '@common/interfaces/board-update';
import { TurnInfo } from '@common/interfaces/replay/turn-info';

export interface Turn {
    turn: number;
    boardUpdate: BoardUpdate;
    infos: [string, TurnInfo][];
}
