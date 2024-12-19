import { FAKE_TOKEN } from '@app/test/constants/fake-token';
import { Profile } from '@common/interfaces/profile';
import { UserDatabase } from '@common/interfaces/user/database-user';
import { User } from '@common/interfaces/user/user';

export const FAKE_USER_1: () => User = () => {
    return {
        id: '1a2b3c4d5e6f7a8b9c0d1e2f',
        name: 'user1',
    };
};

export const FAKE_USER_2: () => User = () => {
    return {
        id: '2a3b4c5d6e7f8a9b0c1d2e3f',
        name: 'user2',
    };
};

export const FAKE_USER_3: () => User = () => {
    return {
        id: '3a4b5c6d7e8f9a0b1c2d3e4f',
        name: 'user3',
    };
};

export const FAKE_USER_4: () => User = () => {
    return {
        id: '4a5b6c7d8e9f0a1b2c3d4e5f',
        name: 'user4',
    };
};

export const FAKE_USER_5: () => User = () => {
    return {
        id: '5a6b7c8d9e0f1a2b3c4d5e6f',
        name: 'user5',
    };
};

export const FAKE_USER_6: () => User = () => {
    return {
        id: '6a7b8c9d0e1f2a3b4c5d6e7f',
        name: 'user6',
    };
};

export const FAKE_USER_7: () => User = () => {
    return {
        id: '7a8b9c0d1e2f3a4b5c6d7e8f',
        name: 'user7',
    };
};

export const FAKE_USER_8: () => User = () => {
    return {
        id: '8a9b0c1d2e3f4a5b6c7d8e9f',
        name: 'user8',
    };
};

export const FAKE_USER_9: () => User = () => {
    return {
        id: '9a0b1c2d3e4f5a6b7c8d9e0f',
        name: 'user9',
    };
};

export const FAKE_USER_10: () => User = () => {
    return {
        id: '0a1b2c3d4e5f6a7b8c9d0e1f',
        name: 'user10',
    };
};

export const FAKE_DATABASE_USER_1: () => UserDatabase = () => {
    return {
        userName: FAKE_USER_1().name,
        email: 'abc@polymtl.ca',
        language: 'en',
        password: '123456',
        profilePicture: 'ASDFGT432WERTGYFD',
        theme: 'classic',
        friends: [FAKE_USER_2().id, FAKE_USER_5().id],
        usersBlock: [],
        friendsRequest: [],
    };
};

export const FAKE_DATABASE_USER_2: () => UserDatabase = () => {
    return {
        userName: 'user2',
        email: 'bca@gmail.com',
        language: 'en',
        password: '123456',
        profilePicture: 'ASDFGT432WERTGYFD',
        theme: 'classic',
        friends: [FAKE_USER_1().id, FAKE_USER_9().id],
        usersBlock: [FAKE_USER_4().id],
        friendsRequest: [FAKE_USER_5().id],
    };
};

export const FAKE_PROFILE_1: () => Profile = () => {
    return {
        userName: FAKE_USER_1().name,
        email: 'abc@polymtl.ca',
        language: 'en',
        profilePicture: 'ASDFGT432WERTGYFD',
        theme: 'classic',
        password: '123456',
        token: FAKE_TOKEN(),
        userId: '1a2b3c4d5e6f7a8b9c0d1e2f',
        friends: FAKE_DATABASE_USER_1().friends,
        usersBlock: FAKE_DATABASE_USER_1().usersBlock,
        friendsRequest: FAKE_DATABASE_USER_1().friendsRequest,
    };
};

export const FAKE_PROFILE_2: () => Profile = () => {
    return {
        userName: 'user2',
        email: 'bca@gmail.com',
        language: 'en',
        profilePicture: 'ASDFGT432WERTGYFD',
        theme: 'classic',
        password: '123456',
        token: FAKE_TOKEN(),
        userId: '1a2b3c4d5e6f7a8b9c0d1e2f',
        friends: FAKE_DATABASE_USER_2().friends,
        usersBlock: FAKE_DATABASE_USER_2().usersBlock,
        friendsRequest: FAKE_DATABASE_USER_2().friendsRequest,
    };
};
