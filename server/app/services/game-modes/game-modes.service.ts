import { GameModes } from '@common/enums/game-modes';
import { Service } from 'typedi';

@Service()
export class GameModesService {
    async getGameModes(): Promise<string[]> {
        return Object.values(GameModes);
    }
}
