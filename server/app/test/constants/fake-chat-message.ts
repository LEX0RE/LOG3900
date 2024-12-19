import { Chat } from '@app/interface/chat-room';
import { FAKE_CHAT_ID_1 } from '@app/test/constants/fake-chat';
import { FAKE_PLAYER_1_NAME, FAKE_SOCKET_ID_PLAYER_1 } from '@app/test/constants/fake-player';
import { ROOM_ONE } from '@app/test/constants/fake-room-id';
import { FAKE_DATABASE_USER_1, FAKE_USER_1 } from '@app/test/constants/fake-user';
import { ClientPushMessage } from '@common/interfaces/chat/client-push-message';
import { Message } from '@common/interfaces/chat/message';
import { ServerMessage } from '@common/interfaces/chat/server-message';

export const FAKE_CHAT = (): Chat => {
    return { id: ROOM_ONE, userMessages: new Map<string, Message[]>() };
};
export const FAKE_MESSAGE_CONTENT = 'hello wolrd!';

export const FAKE_MESSAGE = (): Message => {
    return { content: FAKE_MESSAGE_CONTENT, senderId: FAKE_SOCKET_ID_PLAYER_1, senderName: FAKE_PLAYER_1_NAME, time: new Date() };
};

export const FAKE_CLIENT_MESSAGE_1 = (): ClientPushMessage => {
    return { content: FAKE_MESSAGE_CONTENT, chatId: FAKE_CHAT_ID_1, time: new Date() };
};

export const FAKE_SERVER_MESSAGE_1 = (): ServerMessage => {
    return {
        content: FAKE_MESSAGE_CONTENT,
        user: FAKE_USER_1(),
        profilePicture: FAKE_DATABASE_USER_1().profilePicture,
        time: new Date(),
    };
};
