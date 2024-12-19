import { Vector2D } from '@app/interface/vector-2d-interface';
import { Orientation } from '@common/enums/orientation';

export interface Anchor {
    position: Vector2D;
    possibilities: LetterOrientation[];
}

export interface LetterOrientation {
    letter: string;
    directions: Orientation[];
}
