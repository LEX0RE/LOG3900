import { FAKE_CHAT_ID, FAKE_COMMON_TIMER, FAKE_DICTIONARY_ID, FAKE_DICTIONARY_TITLE, FAKE_GAME_ID } from '@app/test/constants/fake-game';
import { FAKE_PLAYER_2_NAME, FAKE_SOCKET_ID_PLAYER_1, FAKE_SOCKET_ID_PLAYER_2 } from '@app/test/constants/fake-player';
import { CLASSIC } from '@common/constants/game-modes';
import { CommonGameConfig } from '@common/interfaces/common-game-config';
import { JoinGameInfo } from '@common/interfaces/join-game';

export const FAKE_JOIN_GAME = (): JoinGameInfo => {
    return {
        gameId: FAKE_GAME_ID,
        player1SocketId: FAKE_SOCKET_ID_PLAYER_1,
        player2SocketId: FAKE_SOCKET_ID_PLAYER_2,
        playerName: FAKE_PLAYER_2_NAME,
    };
};

export const FAKE_COMMON_GAME_CONFIG = (): CommonGameConfig => {
    return {
        dictionaryTitle: FAKE_DICTIONARY_TITLE,
        dictionaryId: FAKE_DICTIONARY_ID,
        gameId: FAKE_GAME_ID,
        chatId: FAKE_CHAT_ID,
        gameModeName: CLASSIC,
        turnTimer: FAKE_COMMON_TIMER(),
    };
};
