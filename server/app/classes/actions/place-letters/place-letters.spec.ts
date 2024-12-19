import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { BlankLettersFactory as blf } from '@app/classes/letters/blank-factory/blank-factory';
import { Letter } from '@app/classes/letters/letter/letter';
import { LettersFactory as l } from '@app/classes/letters/letterFactory/letter-factory';
import { MIDDLE_POSITION } from '@app/constants/game';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { ActionType } from '@common/enums/action-type';
import { Orientation } from '@common/enums/orientation';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('PlaceLetters', () => {
    const aLetter: Letter = { letter: 'a', point: 3 };
    const lLetter: Letter = { letter: 'l', point: 2 };
    const oLetter: Letter = { letter: 'o', point: 4 };
    const testWord: Letter[] = [aLetter, lLetter, lLetter, oLetter];
    const beginPos: Vector2D = { x: 0, y: 1 };
    const orientation: Orientation = Orientation.Horizontal;
    let action: PlaceLetters;

    beforeEach(() => {
        action = new PlaceLetters(testWord, beginPos, orientation);
    });

    it('should create a simple action PlaceLetters', () => {
        expect(action).to.be.ownProperty('actionType', ActionType.PlaceLetters);
        expect(action).to.be.ownProperty('beginPosition', beginPos);
        expect(action).to.be.ownProperty('orientation', orientation);
        expect(action).to.be.ownProperty('letters', testWord);
    });

    it('transformToAction should return the correct PlaceLetter object', () => {
        const word = 'mEs';
        let expectedAction: PlaceLetters = new PlaceLetters([l.m, blf.e, l.s], MIDDLE_POSITION, Orientation.Horizontal);

        expect(PlaceLetters.transformToAction(MIDDLE_POSITION, Orientation.Horizontal, word)).to.eql(expectedAction);

        expectedAction = new PlaceLetters([l.m, blf.e, l.s], MIDDLE_POSITION, Orientation.Vertical);
        expect(PlaceLetters.transformToAction(MIDDLE_POSITION, Orientation.Vertical, word)).to.eql(expectedAction);
    });

    it('should produce the right string', () => {
        const expected = '!placer B1h allo';

        expect(action.toString()).to.eql(expected);
    });
});
