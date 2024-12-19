import { TurnTimesService } from '@app/services/turn-times/turn-times.service';
import { expect } from 'chai';
import { restore } from 'sinon';
import { Container } from 'typedi';

describe('TurnTimesService', () => {
    let service: TurnTimesService;

    beforeEach(() => {
        service = Container.get(TurnTimesService);
    });

    afterEach(() => restore());

    it('should give timers', async () => {
        const expected = [
            { minute: 0, second: 30 },
            { minute: 1, second: 0 },
            { minute: 1, second: 30 },
            { minute: 2, second: 0 },
            { minute: 2, second: 30 },
            { minute: 3, second: 0 },
            { minute: 3, second: 30 },
            { minute: 4, second: 0 },
            { minute: 4, second: 30 },
            { minute: 5, second: 0 },
        ];
        const result = await service.getTurnTimes();

        expect(expected).to.have.deep.members(result);
    });
});
