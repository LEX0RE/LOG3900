import { Injectable } from '@angular/core';
import { GameModes } from '@common/enums/game-modes';

@Injectable({
    providedIn: 'root',
})
export class GameNavigationService {
    private gameMode: GameModes;

    constructor() {
        this.gameMode = GameModes.Classic;
    }

    setGameMode(gameMode: GameModes): void {
        if (gameMode === GameModes.Classic || gameMode === GameModes.Cooperative || gameMode === GameModes.Tournament) this.gameMode = gameMode;
    }

    getGameMode(): GameModes {
        return this.gameMode;
    }
}
