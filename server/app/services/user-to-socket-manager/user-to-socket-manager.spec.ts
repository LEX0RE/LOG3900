import { UserToSocketManager } from '@app/services/user-to-socket-manager/user-to-socket-manager';
import { FAKE_SOCKET_ID_PLAYER_1 } from '@app/test/constants/fake-player';
import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { User } from '@common/interfaces/user/user';
import { expect } from 'chai';

describe('UserToSocketManager', () => {
    let service: UserToSocketManager;
    let fakeUser: User;
    let fakeSocketId: string;

    beforeEach(() => {
        fakeUser = FAKE_USER_1();
        fakeSocketId = FAKE_SOCKET_ID_PLAYER_1;
        service = new UserToSocketManager();
    });

    it('should be created', () => {
        expect(service).to.not.be.eql(undefined);
    });

    it('should map socketId to user', () => {
        service.mapSocketIdToUser(fakeUser, fakeSocketId);
        service.mapSocketIdToUser(fakeUser, fakeSocketId);
        expect(service.getSocketIdFromUserId(fakeUser.id)).to.be.eql(fakeSocketId);
        service.removeSocketIdFromUser(fakeUser, fakeSocketId);
        expect(service.getSocketIdFromUserId(fakeUser.id)).to.be.eql(null);
    });
});
