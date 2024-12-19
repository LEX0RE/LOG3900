import { ServerMessage } from '@common/interfaces/chat/server-message';
import { User } from '@common/interfaces/user/user';

export interface Chat {
    serverMessage: ServerMessage[];
    id: string;
    name: string;
    creator: User;
}
