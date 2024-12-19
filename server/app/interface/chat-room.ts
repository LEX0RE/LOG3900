import { Message } from '@common/interfaces/chat/message';

export interface Chat {
    userMessages: Map<string, Message[]>;
    id: string;
}
