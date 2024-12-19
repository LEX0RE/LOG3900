import { emptyLetter } from '@app/classes/letters/letterFactory/letter-factory';
import { LetterTimes2 } from '@app/classes/tiles/letter-times-2/letter-times-2';
import { LetterTimes3 } from '@app/classes/tiles/letter-times-3/letter-times-3';
import { StandardTile } from '@app/classes/tiles/standard-tile/standard-tile';
import { WordTimes2 } from '@app/classes/tiles/word-times-2/word-times-2';
import { WordTimes3 } from '@app/classes/tiles/word-times-3/word-times-3';

export const defaultStandardTile = (): StandardTile => {
    return new StandardTile(emptyLetter());
};

export const defaultLetterTimes2Tile = (): LetterTimes2 => {
    return new LetterTimes2(emptyLetter());
};

export const defaultLetterTimes3Tile = (): LetterTimes3 => {
    return new LetterTimes3(emptyLetter());
};

export const defaultWordTimes2Tile = (): WordTimes2 => {
    return new WordTimes2(emptyLetter());
};

export const defaultWordTimes3Tile = (): WordTimes3 => {
    return new WordTimes3(emptyLetter());
};
