import { Chat } from '@common/interfaces/chat/chat';

export interface ChatDatabase extends Chat {
    userIdJoined: string[];
}
