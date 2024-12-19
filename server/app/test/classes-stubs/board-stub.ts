import { Board } from '@app/classes/board/board';
import { SCENARIO_3_TILES } from '@app/test/constants/boardScenarios/board-scenario-3';
import { createStubInstance } from 'sinon';

export const stubBoard = (): Board => {
    const board = createStubInstance(Board);

    board.tiles = SCENARIO_3_TILES();

    return board as unknown as Board;
};
