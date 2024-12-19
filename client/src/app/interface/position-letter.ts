import { Vector2D } from '@app/interface/vector-2d';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';

export interface PositionLetter {
    position: Vector2D;
    letter: CommonLetter;
}
