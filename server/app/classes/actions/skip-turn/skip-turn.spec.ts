import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { ActionType } from '@common/enums/action-type';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('SkipTurn', () => {
    let action: SkipTurn;

    beforeEach(() => {
        action = new SkipTurn();
    });

    it('should create a simple action SkipTurn', () => {
        expect(action).to.be.ownProperty('actionType', ActionType.SkipTurn);
    });

    it('should produce the right string', () => {
        const expected = '!passer';

        expect(action.toString()).to.eql(expected);
    });
});
