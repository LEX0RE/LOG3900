import { ONE_MINUTE, ONE_SECOND } from '@app/constants/miscellaneous';
import { delay } from '@app/test/delay';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';

export class TimeUtils {
    static toMS(time: CommonTimer): number {
        return time.minute < 0 || time.second < 0 ? 0 : time.minute * (ONE_SECOND * ONE_MINUTE) + time.second * ONE_SECOND;
    }

    static toCommonTimer(time: number): CommonTimer {
        if (time < 0) return { minute: 0, second: 0 };
        const minute = Math.floor(time / (ONE_SECOND * ONE_MINUTE));
        const second = Math.floor((time - minute * ONE_MINUTE * ONE_SECOND) / ONE_SECOND);

        return { minute, second };
    }
}

export const executeOtherTask = async () => {
    await delay(0);
};
