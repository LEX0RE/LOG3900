import { User } from '@common/interfaces/user/user';

export interface ServerMessage {
    time: Date;
    user: User;
    profilePicture: string;
    content: string;
}
