import { ViewLetter } from '@app/classes/view-letter';
import { PlacementStep } from '@app/enum/placements';
import { Vector2D } from '@app/interface/vector-2d';
import { Orientation } from '@common/enums/orientation';

export interface Placement {
    initialPlacement: Vector2D;
    orientation: Orientation;
    step: PlacementStep;
    letters: ViewLetter[];
}
