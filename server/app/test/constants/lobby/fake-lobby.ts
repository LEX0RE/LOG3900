import { FAKE_GAME_CONFIG } from '@app/test/constants/fake-game';
import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { GameModes } from '@common/enums/game-modes';
import { GameVisibilities } from '@common/enums/game-visibilities';
import { LobbyCreation } from '@common/interfaces/lobby/lobby-creation';

export const FAKE_LOBBY_CREATION = (): LobbyCreation => {
    return {
        gameConfig: { ...FAKE_GAME_CONFIG(), creator: FAKE_USER_1() },
        gameMode: GameModes.Classic,
        invitedFriends: [],
        visibility: GameVisibilities.PublicNoPassword,
        password: '12345678',
    };
};

export const FAKE_LOBBY_ID_1 = 'lobbyId1';

export const FAKE_LOBBY_CHAT_ID_1 = 'chatId1';
