import { GameFlags } from '@app/interface/game-flags';
import { GameModes } from '@common/enums/game-modes';
import { CommonGameConfig } from '@common/interfaces/common-game-config';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';

export const FAKE_GAME_ID = 'game_id';
export const FAKE_CHAT_ID = 'CHAT_id';
export const FAKE_DICTIONARY_TITLE = 'fake_dictionary_title';
export const FAKE_DICTIONARY_ID = 10;
export const FAKE_COMMON_TIMER = (): CommonTimer => {
    return { minute: 1, second: 0 };
};
export const FAKE_GAME_CONFIG = (): CommonGameConfig => {
    return {
        dictionaryTitle: FAKE_DICTIONARY_TITLE,
        dictionaryId: FAKE_DICTIONARY_ID,
        gameId: FAKE_GAME_ID,
        gameModeName: GameModes.Classic,
        turnTimer: FAKE_COMMON_TIMER(),
        chatId: FAKE_CHAT_ID,
    };
};

export const FAKE_GAME_FLAGS = (): GameFlags => {
    return { firstTimePlacingLetter: true, isGameOver: false };
};
