import { ClassicMode } from '@app/classes/game-mode/classic-mode/classic-mode';
import { CLASSIC } from '@common/constants/game-modes';
import { createStubInstance } from 'sinon';

export const stubClassicMode = (): ClassicMode => {
    const gameMode = createStubInstance(ClassicMode);

    gameMode.mode = CLASSIC;
    return gameMode as unknown as ClassicMode;
};
