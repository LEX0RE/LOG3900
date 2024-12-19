import { Chat } from '@common/interfaces/chat/chat';
import { ChatName } from '@common/interfaces/chat/chat-name';

export interface AllChat {
    chatJoined: Chat[];
    otherChat: ChatName[];
}
