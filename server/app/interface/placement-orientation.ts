import { Vector2D } from '@app/interface/vector-2d-interface';
import { Orientation } from '@common/enums/orientation';

export interface PlacementOrientation {
    placement: Vector2D;
    orientation: Orientation;
}
