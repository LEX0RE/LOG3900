import { Timer } from '@app/classes/timer/timer';
import { createStubInstance } from 'sinon';

export const stubTimer = (): Timer => {
    const timer = createStubInstance(Timer);

    return timer as unknown as Timer;
};
