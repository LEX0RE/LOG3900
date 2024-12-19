import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { Easel } from '@app/classes/easel/easel';
import { Player } from '@app/classes/players/player-abstract';
import { Action } from '@app/interface/action-interface';
import { PlayerTurnsQueueEntry } from '@app/interface/player-turns-queue-entry';
import { stubPlayer1 } from '@app/test/classes-stubs/player-stub';
import * as Sinon from 'sinon';
import { stub } from 'sinon';

export const FAKE_PLAYER_1_NAME = 'fake_player_1_name';
export const FAKE_SOCKET_ID_PLAYER_1 = 'fake_socket_id_player_1';
export const FAKE_SCORE_PLAYER_1 = 23;

export const FAKE_PLAYER_2_NAME = 'fake_player_2_name';
export const FAKE_SOCKET_ID_PLAYER_2 = 'fake_socket_id_player_2';
export const FAKE_SCORE_PLAYER_2 = 243;

export const FAKE_PLAYER_3_NAME = 'fake_player_3_name';
export const FAKE_SOCKET_ID_PLAYER_3 = 'fake_socket_id_player_3';
export const FAKE_SCORE_PLAYER_3 = 0;

export const FAKE_PLAYER_4_NAME = 'fake_player_4_name';
export const FAKE_SOCKET_ID_PLAYER_4 = 'fake_socket_id_player_4';
export const FAKE_SCORE_PLAYER_4 = 36;

export const FAKE_PLAYER_TURN_ENTRY = (): PlayerTurnsQueueEntry => {
    return { endAction: stub(), player: stubPlayer1(), resolve: stub() };
};

class FakePlayer extends Player {
    get score(): number {
        return this.score;
    }

    set score(newScore: number) {
        this.score = newScore;
    }

    constructor(name: string, id: string) {
        super({ name, id }, new Easel());
    }

    async nextAction(): Promise<Action> {
        return Sinon.stub().resolves(new SkipTurn())();
    }

    copy(): FakePlayer {
        return new FakePlayer(this.name, this.id);
    }
}

export const FAKE_PLAYER_1 = (): Player => {
    return new FakePlayer(FAKE_PLAYER_1_NAME, FAKE_SOCKET_ID_PLAYER_1);
};

export const FAKE_PLAYER_2 = (): Player => {
    return new FakePlayer(FAKE_PLAYER_2_NAME, FAKE_SOCKET_ID_PLAYER_2);
};

export const FAKE_PLAYER_3 = (): Player => {
    return new FakePlayer(FAKE_PLAYER_3_NAME, FAKE_SOCKET_ID_PLAYER_3);
};

export const FAKE_PLAYER_4 = (): Player => {
    return new FakePlayer(FAKE_PLAYER_4_NAME, FAKE_SOCKET_ID_PLAYER_4);
};
