import { TradeLetter } from '@app/classes/actions/trade-letters/trade-letters';
import { Letter } from '@app/classes/letters/letter/letter';
import { ActionType } from '@common/enums/action-type';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('TradeLetter', () => {
    const aLetter: Letter = { letter: 'a', point: 3 };
    const lLetter: Letter = { letter: 'l', point: 2 };
    const oLetter: Letter = { letter: 'o', point: 4 };
    const testWord: Letter[] = [aLetter, lLetter, lLetter, oLetter];
    let action: TradeLetter;

    beforeEach(async () => {
        action = new TradeLetter(testWord);
    });

    it('should create a simple action TradeLetter', () => {
        expect(action).to.be.ownProperty('actionType', ActionType.Trade);
        expect(action).to.be.ownProperty('letters', testWord);
    });
});
