import { GamePossibility } from '@common/enums/game-possibility';

export const mockEndGameService = () =>
    jasmine.createSpyObj('EndGameService', ['reset'], {
        decision: GamePossibility.NotFinish,
    });
