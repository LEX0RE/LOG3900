import { TURN_TIMES } from '@app/constants/turn-times';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { Service } from 'typedi';

@Service()
export class TurnTimesService {
    async getTurnTimes(): Promise<CommonTimer[]> {
        return TURN_TIMES;
    }
}
