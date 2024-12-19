/* eslint-disable @typescript-eslint/no-magic-numbers -- pour tester les différents cas*/
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { TimeUtils } from 'app/classes/utils/time/time';
import { expect } from 'chai';
import { describe } from 'mocha';

describe('TimeUtils', () => {
    it('should convert time to milliseconds', () => {
        let time: CommonTimer = { minute: 0, second: 0 };
        let expectedMS = 0;

        expect(TimeUtils.toMS(time)).to.equal(expectedMS);

        time = { minute: 10, second: 0 };
        expectedMS = 600000;
        expect(TimeUtils.toMS(time)).to.equal(expectedMS);

        time = { minute: 0, second: 10 };
        expectedMS = 10000;
        expect(TimeUtils.toMS(time)).to.equal(expectedMS);

        time = { minute: 4, second: 30.8 };
        expectedMS = 270800;
        expect(TimeUtils.toMS(time)).to.equal(expectedMS);

        time = { minute: -4, second: 30.8 };
        expectedMS = 0;
        expect(TimeUtils.toMS(time)).to.equal(expectedMS);
    });

    it('should convert milliseconds to time', () => {
        let milliseconds = 0;
        let expectedTime: CommonTimer = { minute: 0, second: 0 };

        expect(TimeUtils.toCommonTimer(milliseconds)).to.deep.equal(expectedTime);

        milliseconds = 600000;
        expectedTime = { minute: 10, second: 0 };
        expect(TimeUtils.toCommonTimer(milliseconds)).to.deep.equal(expectedTime);

        milliseconds = 8;
        expectedTime = { minute: 0, second: 0 };
        expect(TimeUtils.toCommonTimer(milliseconds)).to.deep.equal(expectedTime);

        milliseconds = 270800;
        expectedTime = { minute: 4, second: 30 };
        expect(TimeUtils.toCommonTimer(milliseconds)).to.deep.equal(expectedTime);

        milliseconds = -305;
        expectedTime = { minute: 0, second: 0 };
        expect(TimeUtils.toCommonTimer(milliseconds)).to.deep.equal(expectedTime);

        milliseconds = 1000;
        expectedTime = { minute: 0, second: 1 };
        expect(TimeUtils.toCommonTimer(milliseconds)).to.deep.equal(expectedTime);

        milliseconds = 59999;
        expectedTime = { minute: 0, second: 59 };
        expect(TimeUtils.toCommonTimer(milliseconds)).to.deep.equal(expectedTime);
    });
});
