import { FAKE_LETTERS } from '@app/test/constants/fake-letters';
import { scenarioBoard } from '@common/constants/board-scenario';
import { BoardUpdate } from '@common/interfaces/board-update';
import { CommonPlayerInfo } from '@common/interfaces/common-player-info';
import { EaselUpdate } from '@common/interfaces/easel-update';
import { GameUpdate } from '@common/interfaces/game-update';

export const FAKE_OTHER_PLAYER_INFO = (): CommonPlayerInfo => {
    return { nLetterLeft: 2, name: 'james', score: 100, turn: false, userId: '456' };
};

export const FAKE_PLAYER_INFO = (): CommonPlayerInfo => {
    return { nLetterLeft: 3, name: 'nicolas', score: 10, turn: true, userId: '123' };
};

export const FAKE_OTHER_PLAYER_INFO_2 = (): CommonPlayerInfo => {
    return { nLetterLeft: 4, name: 'julie', score: 100, turn: false, userId: '456234' };
};

export const FAKE_OTHER_PLAYER_INFO_3 = (): CommonPlayerInfo => {
    return { nLetterLeft: 7, name: 'alexandre', score: 50, turn: false, userId: '45623wer34' };
};

export const FAKE_N_LETTER_LEFT_STASH = 15;

export const FAKE_GAME_UPDATE = (): GameUpdate => {
    return {
        otherPlayersInfo: [FAKE_OTHER_PLAYER_INFO(), FAKE_OTHER_PLAYER_INFO_2(), FAKE_OTHER_PLAYER_INFO_3()],
        playerInfo: FAKE_PLAYER_INFO(),
        stash: { nLettersLeft: FAKE_N_LETTER_LEFT_STASH },
    };
};

export const FAKE_BOARD_UPDATE = (): BoardUpdate => {
    return { board: scenarioBoard };
};

export const FAKE_EASEL_UPDATE = (): EaselUpdate => {
    return { easel: { letters: FAKE_LETTERS() } };
};
