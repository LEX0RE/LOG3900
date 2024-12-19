import { ALGORITHM, JWT_SECRET } from '@app/constants/database';
import { User } from '@common/interfaces/user/user';
import { verify } from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class TokenManager {
    private blackListToken: Set<string>;
    private connectedUserId: Set<string>;

    constructor() {
        this.blackListToken = new Set<string>();
        this.connectedUserId = new Set<string>();
    }

    addTokenToBlackList(token: string): void {
        this.blackListToken.add(token);
        try {
            const decoded = verify(token, JWT_SECRET, { algorithms: [ALGORITHM] }) as User;

            this.connectedUserId.delete(decoded.id);
            // eslint-disable-next-line no-empty
        } catch (error) {}
    }

    addConnectedUser(userId: string): void {
        this.connectedUserId.add(userId);
    }

    isTokenInBlackList(token: string): boolean {
        return this.blackListToken.has(token);
    }

    isUserConnected(userId: string): boolean {
        return this.connectedUserId.has(userId);
    }
}
