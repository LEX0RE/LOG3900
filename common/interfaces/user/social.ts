import { UserProfile } from '@common/interfaces/user-profile';

export interface Social {
    allUser: UserProfile[];
    friends: UserProfile[];
    usersBlock: UserProfile[];
    friendsRequest: UserProfile[];
}
