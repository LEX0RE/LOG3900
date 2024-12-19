import { Board } from '@app/classes/board/board';
import { Game } from '@app/classes/game/game';
import { Tile } from '@app/classes/tiles/tile';
import { Vector2D } from '@app/interface/vector-2d-interface';

export interface RulesVisitorResponse {
    score: number;
    gameModification: ((game: Game) => void)[];
    newlyFormedWordAsTile: Tile[][];
    newBoard: Board;
    placedPosition: Vector2D[];
}
