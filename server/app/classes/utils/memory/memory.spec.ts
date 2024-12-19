import { memory } from '@app/classes/utils/memory/memory';
import { expect } from 'chai';
import { describe } from 'mocha';
import { memoryUsage } from 'process';

describe('Memory', () => {
    it('should be empty', () => {
        const mega = 1024;
        const lessThanExpected = memoryUsage().heapUsed / mega / mega;

        expect(memory()).to.be.greaterThanOrEqual(lessThanExpected);
    });
});
