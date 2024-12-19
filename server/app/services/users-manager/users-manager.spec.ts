/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ALREADY_CONNECTED, EMAIL_ALREADY_USED, USERNAME_ALREADY_USED, WRONG_PASSWORD, WRONG_USERNAME } from '@app/constants/error/error-messages';
import { DatabaseService } from '@app/services/database/database.service';
import { TokenManager } from '@app/services/token/token-manager';
import { UsersManager } from '@app/services/users-manager/users-manager';
import { DatabaseStub } from '@app/test/classes-stubs/database-stub';
import { FAKE_DATABASE_USER_1, FAKE_PROFILE_1, FAKE_PROFILE_2, FAKE_USER_1 } from '@app/test/constants/fake-user';
import { Profile } from '@common/interfaces/profile';
import { UserDatabase } from '@common/interfaces/user/database-user';
import * as bcryptjs from 'bcryptjs';
import { expect, use } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { ObjectId } from 'mongodb';
import { assert, createStubInstance, restore, stub } from 'sinon';
import { Container, Token } from 'typedi';

describe('UsersManager', () => {
    let service: UsersManager;
    let fakeUser: UserDatabase;
    let fakeProfile: Profile;
    let fakeProfile2: Profile;

    before(() => use(chaiAsPromised));

    beforeEach(async () => {
        restore();
        fakeUser = FAKE_DATABASE_USER_1();
        fakeProfile = FAKE_PROFILE_1();
        fakeProfile2 = FAKE_PROFILE_2();
        const getStub = stub(Container, 'get');
        const databaseService = createStubInstance(DatabaseService);
        const database = new DatabaseStub<UserDatabase>();

        stub(databaseService, 'database').get(() => database);
        getStub.withArgs(DatabaseService as Token<unknown>).returns(databaseService);

        service = new UsersManager();
        service.collection.insertOne(fakeUser);
    });

    afterEach(() => restore());

    it('should be created', () => {
        expect(service).to.not.be.eql(undefined);
    });

    it('should addUser', async () => {
        stub(service, 'getUser').resolves(null);
        stub(service, 'getUserEmail').resolves(null);
        stub(service, 'createToken' as any).returns(fakeProfile2.token);
        const user = await service.addUser(fakeProfile2);

        expect(user).to.eql(fakeProfile2);
    });

    it('should not addUser if username already used', async () => {
        stub(service, 'getUser').resolves({ ...fakeUser, _id: new ObjectId(FAKE_USER_1().id) });
        stub(service, 'getUserEmail').resolves(null);
        stub(service, 'createToken' as any).returns(fakeProfile2.token);

        await service.addUser(fakeProfile2).catch((error) => {
            expect(error).to.be.eql(USERNAME_ALREADY_USED);
        });
    });

    it('should not addUser if email already used', async () => {
        stub(service, 'getUser').resolves(null);
        stub(service, 'getUserEmail').resolves({ ...fakeUser, _id: new ObjectId(FAKE_USER_1().id) });
        stub(service, 'createToken' as any).returns(fakeProfile2.token);

        await service.addUser(fakeProfile2).catch((error) => {
            expect(error).to.be.eql(EMAIL_ALREADY_USED);
        });
    });

    it('should validateUser correctly', async () => {
        stub(service, 'createToken' as any).returns(fakeProfile2.token);
        stub(service, 'isUserAllowedToConnect' as any).resolves(true);
        stub(service, 'getUser').resolves({ ...fakeUser, _id: new ObjectId(FAKE_USER_1().id) });
        const user = await service.validateUser(fakeUser);

        expect(user).to.eql(fakeProfile);
    });

    it('should not validateUser if username does not exist', async () => {
        stub(service, 'createToken' as any).returns(fakeProfile2.token);
        stub(service, 'isUserAllowedToConnect' as any).resolves(true);
        stub(service, 'getUser').resolves(null);

        await service.validateUser(fakeUser).catch((error) => {
            expect(error).to.be.eql(WRONG_USERNAME);
        });
    });

    it('should getUser', async () => {
        const user = await service.getUser(fakeUser.userName);

        expect(user).to.eql([fakeUser]);
    });

    it('should getUserEmail with email', async () => {
        const user = await service.getUserEmail(fakeUser.email);

        expect(user).to.eql([fakeUser]);
    });

    it('isUserAllowedToConnect should reject promise if wrong password', async () => {
        await service['isUserAllowedToConnect']({ ...fakeUser, _id: new ObjectId(FAKE_USER_1().id) }, fakeUser).catch((error) => {
            expect(error).to.be.eql(WRONG_PASSWORD);
        });
    });

    it('isUserAllowedToConnect should reject promise if user already connected', async () => {
        const tokenManagerStub = createStubInstance(TokenManager);

        service['tokenManager'] = tokenManagerStub as unknown as TokenManager;
        tokenManagerStub.isUserConnected.callsFake(() => true);
        stub(bcryptjs, 'compare' as any).resolves(true);
        await service['isUserAllowedToConnect']({ ...fakeUser, _id: new ObjectId(FAKE_USER_1().id) }, fakeUser).catch((error) => {
            expect(error).to.be.eql(ALREADY_CONNECTED);
        });
        assert.calledOnce(tokenManagerStub.isUserConnected);
    });

    it('isUserAllowedToConnect should return true', async () => {
        const tokenManagerStub = createStubInstance(TokenManager);

        service['tokenManager'] = tokenManagerStub as unknown as TokenManager;
        tokenManagerStub.isUserConnected.callsFake(() => false);
        stub(bcryptjs, 'compare' as any).resolves(true);
        const isUserAllowedToConnect = await service['isUserAllowedToConnect']({ ...fakeUser, _id: new ObjectId(FAKE_USER_1().id) }, fakeUser);

        expect(isUserAllowedToConnect).to.be.eql(true);
        assert.calledOnce(tokenManagerStub.isUserConnected);
    });

    it('createToken should call addConnectedUser', () => {
        const tokenManagerStub = createStubInstance(TokenManager);

        service['tokenManager'] = tokenManagerStub as unknown as TokenManager;
        service['createToken'](FAKE_USER_1());
        assert.calledOnce(tokenManagerStub.addConnectedUser);
    });

    it('should get profilePicture', async () => {
        stub(service, 'getUser').resolves({ ...fakeUser, _id: new ObjectId(FAKE_USER_1().id) });

        const profilePicture = await service.getProfilePicture(FAKE_USER_1().name);

        expect(profilePicture).to.eql(fakeUser.profilePicture);
    });
});
