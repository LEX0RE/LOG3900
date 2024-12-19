import { EventEmitter } from '@angular/core';
import { FAKE_BOARD_UPDATE, FAKE_EASEL_UPDATE, FAKE_GAME_UPDATE } from '@app/test/constants/fake-game-update';

export const gameUpdaterStub = () =>
    jasmine.createSpyObj('GameUpdaterService', ['reset'], {
        easelUpdateEvent: new EventEmitter(),
        board: FAKE_BOARD_UPDATE().board,
        easel: FAKE_EASEL_UPDATE().easel,
        playerInfo: FAKE_GAME_UPDATE().playerInfo,
        otherPlayerInfo: FAKE_GAME_UPDATE().otherPlayersInfo,
        stash: FAKE_GAME_UPDATE().stash,
        isLoading: true,
    });
