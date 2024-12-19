import { FAKE_EVENT } from '@app/test/constants/fake-event';
import { FAKE_SOCKET_ID_PLAYER_1, FAKE_SOCKET_ID_PLAYER_2 } from '@app/test/constants/fake-player';
import { ROOM_ONE } from '@app/test/constants/fake-room-id';
import { SocketClientStub } from '@app/test/services-stubs/socket-manager/socket-client/socket-client-stub';
import { SocketManagerStub } from '@app/test/services-stubs/socket-manager/socket-manager/socket-manager-stub';
import { expect } from 'chai';
import { assert, stub } from 'sinon';

describe('SocketManagerStub ', () => {
    let socketManager: SocketManagerStub;
    let client: SocketClientStub;
    let client2: SocketClientStub;

    beforeEach(() => {
        socketManager = new SocketManagerStub();
        client = new SocketClientStub(FAKE_SOCKET_ID_PLAYER_1, socketManager);
        client2 = new SocketClientStub(FAKE_SOCKET_ID_PLAYER_2, socketManager);

        socketManager['rooms'].set(ROOM_ONE, [client, client2]);
    });

    it('connectClient should do noting if client is not connected', () => {
        const spy = stub(socketManager, 'isConnected').returns(true);

        socketManager.connectClient(client);
        assert.called(spy);
    });

    it('disconnectClient should do noting if client is not connected', () => {
        const spy = stub(socketManager, 'isConnected').returns(false);

        socketManager.disconnectClient(client);
        assert.called(spy);
    });

    it('disconnectClient should remove client from room', () => {
        stub(socketManager, 'isConnected').returns(true);
        socketManager.disconnectClient(client);

        expect(socketManager['rooms'].get(ROOM_ONE)).to.be.eql([client2]);
    });

    it('to should execute function to client in room', () => {
        const spy = stub(client, 'executeFunction');

        socketManager.to(ROOM_ONE, FAKE_EVENT);
        assert.called(spy);
    });

    it('join should add client to room', () => {
        stub(socketManager, 'isConnected').returns(true);

        socketManager['clientsList'].set(FAKE_SOCKET_ID_PLAYER_2, client);

        socketManager.join(FAKE_SOCKET_ID_PLAYER_2, ROOM_ONE);

        expect(socketManager['rooms'].get(ROOM_ONE)).to.have.deep.members([client, client, client2]);
    });

    it('join should not add client to room when client does not exist', () => {
        stub(socketManager, 'isConnected').returns(true);

        socketManager.join(FAKE_SOCKET_ID_PLAYER_2, ROOM_ONE);

        expect(socketManager['rooms'].get(ROOM_ONE)).to.have.deep.members([client, client2]);
    });

    it('leave should remove client from room', () => {
        stub(socketManager, 'isConnected').returns(true);

        socketManager['clientsList'].set(FAKE_SOCKET_ID_PLAYER_1, client);

        socketManager.leave(FAKE_SOCKET_ID_PLAYER_1, ROOM_ONE);

        expect(socketManager['rooms'].get(ROOM_ONE)).to.be.eql([client2]);
    });

    it('leave should not remove client from room when client does not exist', () => {
        stub(socketManager, 'isConnected').returns(true);
        socketManager.leave(FAKE_SOCKET_ID_PLAYER_2, ROOM_ONE);

        expect(socketManager['rooms'].get(ROOM_ONE)).to.be.eql([client, client2]);
    });

    it('getRoomsFromUser should get rooms for user', () => {
        const randomRoom = 'randomRoom';

        stub(socketManager, 'isConnected').returns(true);

        socketManager['rooms'].set(randomRoom, []);
        expect(socketManager.getRoomsFromUser(FAKE_SOCKET_ID_PLAYER_1)).to.be.eql([ROOM_ONE]);
    });

    it('getRoomsFromUser should return empty array when user is not connected', () => {
        const randomSocketId = 'randomSocketId';

        stub(socketManager, 'isConnected').returns(false);
        expect(socketManager.getRoomsFromUser(randomSocketId)).to.be.eql([]);
    });

    it('getRoomSize should return 2', () => {
        const expectedCount = 2;

        expect(socketManager.getRoomSize(ROOM_ONE)).to.be.eql(expectedCount);
    });
});
