import { Easel } from '@app/classes/easel/easel';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { CooperativeScore } from '@app/interface/cooperative-score';
import { UserProfile } from '@common/interfaces/user-profile';

export class CooperativePlayer extends RealPlayer {
    cooperativeScore: CooperativeScore;

    constructor(player: UserProfile, cooperativeScore: CooperativeScore, easel: Easel) {
        super(player, easel);
        this.cooperativeScore = cooperativeScore;
    }

    override get score(): number {
        return this.cooperativeScore.score;
    }

    override set score(newScore: number) {
        this.cooperativeScore.score = newScore;
        super.score = newScore;
    }
}
