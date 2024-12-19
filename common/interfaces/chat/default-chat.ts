import { Chat } from '@common/interfaces/chat/chat';
import { SERVER_USER } from '@common/interfaces/user/server';

export const DEFAULT_CHAT: Chat = {
    id: 'default',
    name: 'Public',
    creator: SERVER_USER,
    serverMessage: [],
};
