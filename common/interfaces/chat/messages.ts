import { ServerMessage } from '@common/interfaces/chat/server-message';
export interface MessageFromChat {
    chatId: string;
    messages: ServerMessage[];
}
