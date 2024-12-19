import { Player } from '@app/classes/players/player-abstract';
import { RealPlayer } from '@app/classes/players/real-player/real-player';
import { stubEasel } from '@app/test/classes-stubs/easel-stub';
import {
    FAKE_PLAYER_1_NAME,
    FAKE_PLAYER_2_NAME,
    FAKE_PLAYER_3_NAME,
    FAKE_PLAYER_4_NAME,
    FAKE_SCORE_PLAYER_1,
    FAKE_SCORE_PLAYER_2,
    FAKE_SCORE_PLAYER_3,
    FAKE_SCORE_PLAYER_4,
    FAKE_SOCKET_ID_PLAYER_1,
    FAKE_SOCKET_ID_PLAYER_2,
    FAKE_SOCKET_ID_PLAYER_3,
    FAKE_SOCKET_ID_PLAYER_4,
} from '@app/test/constants/fake-player';
import { createStubInstance } from 'sinon';

export const stubPlayer1 = (): Player => {
    const player = createStubInstance(RealPlayer);

    player.requiredUpdates = true;
    player.timeLimit = 0;
    player.user = { name: FAKE_PLAYER_1_NAME, id: FAKE_SOCKET_ID_PLAYER_1 };
    player.score = FAKE_SCORE_PLAYER_1;
    player.easel = stubEasel();

    return player as unknown as Player;
};

export const stubPlayer2 = (): Player => {
    const player = createStubInstance(RealPlayer);

    player.requiredUpdates = false;
    player.timeLimit = 0;
    player.user = { name: FAKE_PLAYER_2_NAME, id: FAKE_SOCKET_ID_PLAYER_2 };
    player.score = FAKE_SCORE_PLAYER_2;
    player.easel = stubEasel();

    return player as unknown as Player;
};

export const stubPlayer3 = (): Player => {
    const player = createStubInstance(RealPlayer);

    player.requiredUpdates = true;
    player.timeLimit = 0;
    player.user = { name: FAKE_PLAYER_3_NAME, id: FAKE_SOCKET_ID_PLAYER_3 };
    player.score = FAKE_SCORE_PLAYER_3;
    player.easel = stubEasel();

    return player as unknown as Player;
};

export const stubPlayer4 = (): Player => {
    const player = createStubInstance(RealPlayer);

    player.requiredUpdates = true;
    player.timeLimit = 0;
    player.user = { name: FAKE_PLAYER_4_NAME, id: FAKE_SOCKET_ID_PLAYER_4 };
    player.score = FAKE_SCORE_PLAYER_4;
    player.easel = stubEasel();

    return player as unknown as Player;
};
