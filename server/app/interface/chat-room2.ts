import { ServerMessage } from '@common/interfaces/chat/server-message';
import { User } from '@common/interfaces/user/user';

export interface Chat {
    userMessages: Map<string, ServerMessage[]>;
    id: string;
    name: string;
    creator: User;
}
