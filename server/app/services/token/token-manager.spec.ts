import { TokenManager } from '@app/services/token/token-manager';
import { FAKE_TOKEN } from '@app/test/constants/fake-token';
import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { User } from '@common/interfaces/user/user';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('TokenManager', () => {
    let service: TokenManager;
    let fakeToken: string;
    let user: User;

    beforeEach(() => {
        fakeToken = FAKE_TOKEN();
        user = FAKE_USER_1();
        service = new TokenManager();
    });

    it('should be created', () => {
        expect(service).to.not.be.eql(undefined);
    });

    it('should add token to black list', () => {
        expect(service.isTokenInBlackList(fakeToken)).to.be.eql(false);
        service.addTokenToBlackList(fakeToken);
        expect(service.isTokenInBlackList(fakeToken)).to.be.eql(true);
    });

    it('should add user to connected list', () => {
        expect(service.isUserConnected(user.id)).to.be.eql(false);
        service.addConnectedUser(user.id);
        expect(service.isUserConnected(user.id)).to.be.eql(true);
    });
});
