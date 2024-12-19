import { User } from '@common/interfaces/user/user';

export interface LobbySendInvitation {
    lobbyId: string;
    creator: User;
    profilePicture: string;
}
