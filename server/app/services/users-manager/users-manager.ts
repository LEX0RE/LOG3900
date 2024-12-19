import { ALGORITHM, DATABASE_COLLECTION_USERS, JWT_EXPIRES_IN, JWT_SECRET, SALT_ROUNDS } from '@app/constants/database';
import {
    ALREADY_CONNECTED,
    EMAIL_ALREADY_USED,
    USERNAME_ALREADY_USED,
    USER_NOT_FOUND,
    WRONG_PASSWORD,
    WRONG_USERNAME,
} from '@app/constants/error/error-messages';
import { DatabaseService } from '@app/services/database/database.service';
import { TokenManager } from '@app/services/token/token-manager';
import { Profile } from '@common/interfaces/profile';
import { UserDatabase } from '@common/interfaces/user/database-user';
import { User } from '@common/interfaces/user/user';
import { UsersLogin } from '@common/interfaces/user/user-login';
import { UserUpdate } from '@common/interfaces/user/user-update';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Collection, ObjectId, UpdateFilter, UpdateResult, WithId } from 'mongodb';
import 'reflect-metadata';
import { Container, Service } from 'typedi';

@Service()
export class UsersManager {
    private databaseService: DatabaseService;
    private databaseCollection: string;
    private tokenManager: TokenManager;

    constructor() {
        this.tokenManager = Container.get(TokenManager);
        this.databaseService = Container.get(DatabaseService);
        this.databaseCollection = DATABASE_COLLECTION_USERS;
    }

    get collection(): Collection<UserDatabase> {
        return this.databaseService.database.collection(this.databaseCollection);
    }

    async addUser(user: Profile): Promise<Profile | null> {
        if (await this.getUser(user.userName)) return Promise.reject(USERNAME_ALREADY_USED);
        if (await this.getUserEmail(user.email)) return Promise.reject(EMAIL_ALREADY_USED);
        user.password = await hash(user.password, SALT_ROUNDS);
        await this.collection.insertOne(user);

        const userId = await this.getUserId(user.userName);

        if (!userId) return Promise.reject(USER_NOT_FOUND);

        user.userId = userId;

        const tokenPayload: User = {
            name: user.userName,
            id: userId,
        };

        user.token = this.createToken(tokenPayload);

        return user;
    }

    // eslint-disable-next-line max-lines-per-function
    async validateUser(user: UsersLogin): Promise<Profile | null> {
        const existingUser: WithId<UserDatabase> | null = await this.getUser(user.userName);

        if (existingUser && (await this.isUserAllowedToConnect(existingUser, user))) {
            const token = this.createToken({
                name: existingUser.userName,
                // eslint-disable-next-line no-underscore-dangle -- mongoDB id
                id: existingUser._id.toString(),
            });

            return {
                userName: existingUser.userName,
                email: existingUser.email,
                password: existingUser.password,
                profilePicture: existingUser.profilePicture,
                theme: existingUser.theme,
                language: existingUser.language,
                token,
                // eslint-disable-next-line no-underscore-dangle -- mongoDB id
                userId: existingUser._id.toString(),
                friends: existingUser.friends,
                usersBlock: existingUser.usersBlock,
                friendsRequest: existingUser.friendsRequest,
            };
        }
        return Promise.reject(WRONG_USERNAME);
    }

    async getUser(username: string): Promise<WithId<UserDatabase> | null> {
        return this.collection.findOne({ userName: username }).then((user: WithId<UserDatabase> | null) => user);
    }

    async getUserById(id: string): Promise<WithId<UserDatabase> | null> {
        return this.collection.findOne({ _id: new ObjectId(id) }).then((user: WithId<UserDatabase> | null) => user);
    }

    async getUserEmail(emailUser: string): Promise<WithId<UserDatabase> | null> {
        return this.collection.findOne({ email: emailUser }).then((user: WithId<UserDatabase> | null) => user);
    }

    async getUserId(username: string): Promise<string | undefined> {
        // eslint-disable-next-line no-underscore-dangle -- mongoDB id
        return this.collection.findOne({ userName: username }).then((user: WithId<UserDatabase> | null) => user?._id.toString());
    }

    async getProfilePicture(username: string): Promise<string | undefined> {
        const user: WithId<UserDatabase> | null = await this.getUser(username);

        return user?.profilePicture;
    }

    async updateUser(user: User, userUpdate: UserUpdate): Promise<UpdateResult> {
        const update: UpdateFilter<UserDatabase> = {};

        if (userUpdate.theme) update.$set = { ...update.$set, theme: userUpdate.theme };
        if (userUpdate.userName) update.$set = { ...update.$set, userName: userUpdate.userName };
        if (userUpdate.email) update.$set = { ...update.$set, email: userUpdate.email };
        if (userUpdate.profilePicture) update.$set = { ...update.$set, profilePicture: userUpdate.profilePicture };
        if (userUpdate.language) update.$set = { ...update.$set, language: userUpdate.language };
        if (userUpdate.password) update.$set = { ...update.$set, password: await hash(userUpdate.password, SALT_ROUNDS) };

        if (userUpdate.userName && (await this.getUser(userUpdate.userName))) return Promise.reject(USERNAME_ALREADY_USED);

        return this.collection.updateOne({ _id: new ObjectId(user.id) }, update);
    }

    private async isUserAllowedToConnect(existingUser: WithId<UserDatabase>, user: UsersLogin): Promise<boolean> {
        if (await compare(user.password, existingUser.password)) {
            // eslint-disable-next-line no-underscore-dangle -- mongoDB id
            if (!this.tokenManager.isUserConnected(existingUser._id.toString())) return true;
            return Promise.reject(ALREADY_CONNECTED);
        }
        return Promise.reject(WRONG_PASSWORD);
    }

    private createToken(tokenPayload: User): string {
        this.tokenManager.addConnectedUser(tokenPayload.id);
        return sign(tokenPayload, JWT_SECRET, {
            algorithm: ALGORITHM,
            expiresIn: JWT_EXPIRES_IN,
        });
    }
}
