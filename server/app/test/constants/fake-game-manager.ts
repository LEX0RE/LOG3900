import { WaitingGame } from '@app/interface/waiting-game';
import { stubPlayer1 } from '@app/test/classes-stubs/player-stub';
import { FAKE_GAME_CONFIG, FAKE_GAME_ID } from '@app/test/constants/fake-game';

export const FAKE_WAITING_GAME = (): WaitingGame => {
    return {
        gameConfig: FAKE_GAME_CONFIG(),
        gameId: FAKE_GAME_ID,
        player: stubPlayer1(),
        isWaitingForConfirmation: false,
    };
};
