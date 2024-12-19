import { GameWatchTower } from '@app/classes/game/game-watch-tower/game-watch-tower';
import { EndGameManager } from '@app/services/end-game-manager/end-game-manager.service';
import { Gameplay } from '@app/services/gameplay/gameplay.service';
import { createStubInstance } from 'sinon';
import { Container } from 'typedi';

export const stubGameWatchTowerWithOutGame = (): GameWatchTower => {
    const tower = createStubInstance(GameWatchTower);

    tower.endGameManager = Container.get(EndGameManager);
    tower.gameplay = Container.get(Gameplay);
    return tower as unknown as GameWatchTower;
};
