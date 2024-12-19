import { User } from '@common/interfaces/user/user';

export interface UserProfile extends User {
    profilePicture?: string;
}
