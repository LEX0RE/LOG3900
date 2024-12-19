import { VirtualPlayer } from '@app/classes/players/virtual-player/virtual-player-abstract';
import { Chat } from '@app/interface/chat-room';
import { stubGame } from '@app/test/classes-stubs/game-stub';
import { FAKE_PLAYER_1_NAME, FAKE_SOCKET_ID_PLAYER_1 } from '@app/test/constants/fake-player';
import { createStubInstance } from 'sinon';

export const stubVirtualPlayer = (): VirtualPlayer => {
    const virtualAbstractplayer = createStubInstance(VirtualPlayer);

    // eslint-disable-next-line dot-notation -- Propriété privée
    virtualAbstractplayer['game'] = stubGame();

    virtualAbstractplayer.user = { name: FAKE_PLAYER_1_NAME, id: FAKE_SOCKET_ID_PLAYER_1 };
    const chat: Chat = { userMessages: new Map(), id: FAKE_SOCKET_ID_PLAYER_1 };

    // eslint-disable-next-line dot-notation -- Propriété privée
    virtualAbstractplayer['chat'] = { chat };
    return virtualAbstractplayer as unknown as VirtualPlayer;
};
