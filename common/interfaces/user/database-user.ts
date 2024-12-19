export interface UserDatabase {
    userName: string;
    email: string;
    password: string;
    profilePicture: string;
    theme: string;
    language: string;
    friends: string[];
    usersBlock: string[];
    friendsRequest: string[];
}
