import { Coordinate } from '@common/interfaces/coordinate';
import { CommonLetter } from './common-letter';

export interface CommonTile {
    coordinate: Coordinate;
    letter: CommonLetter;
}
