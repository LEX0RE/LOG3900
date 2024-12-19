import { Profile } from '@common/interfaces/profile';

export const FAKE_PROFILE = (): Profile => {
    return {
        userName: 'User',
        email: 'user123@hotmail.com',
        password: 'password',
        profilePicture: '',
        theme: '',
        language: '',
        token: '12345',
        userId: '12345',
        friends: [],
        friendsRequest: [],
        usersBlock: [],
    };
};
