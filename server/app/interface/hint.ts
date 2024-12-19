import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';

export interface Hint {
    action: PlaceLetters;
    score: number;
}
