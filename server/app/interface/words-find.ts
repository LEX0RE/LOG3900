import { GaddagNode } from '@app/classes/gaddag/gaddag-node/gaddag-node';
import { Hint } from '@app/interface/hint';
import { Vector2D } from '@app/interface/vector-2d-interface';

export interface ArcWay {
    newNode: GaddagNode;
    oldNode: GaddagNode;
}

export interface PlayableWord {
    word: string;
    hand: string;
}

export interface WordsFindState {
    worksHorizontal: boolean;
    current: Vector2D;
    result: Hint[];
}

export interface PlacingContext extends PlayableWord {
    letter: string;
}
