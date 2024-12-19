import { UserDatabase } from '@common/interfaces/user/database-user';
import { UsersLogin } from '@common/interfaces/user/user-login';

export interface Profile extends UsersLogin, UserDatabase {
    token: string;
    userId: string;
}
