import { Chat } from '@app/interface/chat-room2';
import { ServerMessage } from '@common/interfaces/chat/server-message';
import { SERVER_USER } from '@common/interfaces/user/server';

export const DEFAULT_CHAT: Chat = {
    userMessages: new Map<string, ServerMessage[]>(),
    id: 'default',
    name: 'Public',
    creator: SERVER_USER,
};
