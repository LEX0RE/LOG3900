import { User } from '@common/interfaces/user/user';

export interface JoinResponse {
    user: User;
    lobbyId: string | undefined;
}
