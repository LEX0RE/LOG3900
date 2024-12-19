/* eslint-disable max-lines */

import { Server } from '@app/server';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { TokenManager } from '@app/services/token/token-manager';
import { UserToSocketManager } from '@app/services/user-to-socket-manager/user-to-socket-manager';
import { FAKE_EVENT } from '@app/test/constants/fake-event';
import { FAKE_TOKEN } from '@app/test/constants/fake-token';
import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { delay, RESPONSE_DELAY } from '@app/test/delay';
import { doNothing } from '@app/test/do-nothing-function';
import { SocketManagerHelper } from '@app/test/socket-manager-helper';
import { CONNECTION } from '@common/constants/communication';
import { User } from '@common/interfaces/user/user';
import { expect } from 'chai';
import { createServer, Server as HttpServer } from 'http';
import { AddressInfo } from 'net';
import { assert, createStubInstance, restore, SinonStubbedInstance, spy } from 'sinon';
import * as ioServer from 'socket.io';
import { io as ioClient, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

describe('SocketManager', () => {
    let httpServer: HttpServer;
    let socketService: SocketManager;
    let serverSocket: ioServer.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>;
    let clientSocket: Socket;
    let tokenManager: SinonStubbedInstance<TokenManager>;
    let user: User;
    let urlString: string;
    const room = 'test room';
    const event = 'test event';
    const helper = new SocketManagerHelper();

    before((done: Mocha.Done) => {
        user = FAKE_USER_1();
        httpServer = createServer();
        socketService = new SocketManager();
        socketService.init({ server: httpServer } as unknown as Server);
        tokenManager = createStubInstance(TokenManager);
        tokenManager.isTokenInBlackList.returns(false);
        socketService['tokenManager'] = tokenManager as unknown as TokenManager;
        socketService['userToSocketId'] = new UserToSocketManager();

        httpServer.listen(() => {
            const port = (httpServer.address() as AddressInfo).port;

            urlString = `http://localhost:${port}`;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any, max-nested-callbacks -- Membre privé et initialisation des paramètres
            socketService['sio'].on(CONNECTION, (socket: any) => {
                serverSocket = socket;
            });

            clientSocket = ioClient(urlString, {
                transports: ['websocket'],
                upgrade: false,
                forceNew: true,
                auth: { key: FAKE_TOKEN() },
            });
            clientSocket.connect();

            clientSocket.on('connect', done);
        });
    });

    beforeEach(() => {
        tokenManager = createStubInstance(TokenManager);
        tokenManager.isTokenInBlackList.returns(false);
        socketService['tokenManager'] = tokenManager as unknown as TokenManager;
        socketService['userToSocketId'] = new UserToSocketManager();

        socketService['userToSocketId']['socketIdToUser'].set(clientSocket.id, user);
        socketService['userToSocketId']['userIdToSocketId'].set(user.id, clientSocket.id);
    });

    afterEach(() => {
        restore();
        serverSocket.leave(room);
        clientSocket.off(event);
        serverSocket.removeAllListeners();
    });

    after(() => {
        socketService['sio'].close();
        clientSocket.close();
        httpServer.close();
    });

    it('should the connection work to receive from testing server', (done: Mocha.Done) => {
        clientSocket.on('hello', (arg: string) => {
            expect(arg).to.be.eql('world');
            done();
        });
        serverSocket.emit('hello', 'world');
    });

    it('should the connection work (with ack) with testing server', (done: Mocha.Done) => {
        serverSocket.on('hi', (arg: string) => {
            expect(arg).to.be.eql('ack');
            done();
        });
        clientSocket.emit('hi', 'ack');
    });

    it('should have a socket representing the client on the server', () => {
        const clientCount = socketService['sio'].engine.clientsCount;
        const expectedCount = 1;

        expect(clientCount).to.be.eql(expectedCount);

        expect(serverSocket).to.not.be.eql(undefined);
    });

    it('should call sio.on with an event', () => {
        const spyOn = spy(socketService['sio'], 'on');

        socketService.on(event, doNothing);
        assert.calledOnce(spyOn);
    });

    it('should call sio.on with on disconnect', () => {
        const spyOn = spy(socketService['sio'], 'on');

        socketService.onDisconnect(() => doNothing);
        assert.calledOnce(spyOn);
    });

    it('should call emit with data when using send', () => {
        const data = 1234;

        const spyEmit = spy(socketService['sio'], 'emit');

        socketService.send(event, data);
        assert.calledOnce(spyEmit);
        assert.calledWith(spyEmit, event, data);
    });

    it('should call emit without data when using send if data is undefined', () => {
        const spyEmit = spy(socketService['sio'], 'emit');

        socketService.send(event);
        assert.calledOnce(spyEmit);
        assert.calledWith(spyEmit, event);
    });

    it('should call emit with data when using sendPrivate', () => {
        const data = 1234;
        const spyEmit = spy(serverSocket, 'emit');

        socketService.sendPrivate(event, user.id, data);
        assert.calledOnce(spyEmit);
        assert.calledWith(spyEmit, event, data);
    });

    it('should call emit without data when using sendPrivate if data is undefined', () => {
        const spyEmit = spy(serverSocket, 'emit');

        socketService.sendPrivate(event, user.id);
        assert.calledOnce(spyEmit);
        assert.calledWith(spyEmit, event);
    });

    it('should call emit without data when using to if data is undefined', (done: Mocha.Done) => {
        serverSocket.join(room);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Permet de pouvoir recevoir n'importe quel évènement
        clientSocket.on(event, (arg: any) => {
            expect(arg).to.be.eql(undefined);
            done();
        });

        socketService.to(event, room);
    });

    it('should call socket.join if the socket is connected to the server', () => {
        const spyJoin = spy(serverSocket, 'join');

        socketService.join(user.id, room);
        assert.calledOnce(spyJoin);
        assert.calledWith(spyJoin, room);
    });

    it('should not call socket.join if the socket is not connected to the server', () => {
        const fakeId = 'Nothing Good';
        const spyJoin = spy(serverSocket, 'join');

        socketService.join(fakeId, room);
        assert.notCalled(spyJoin);
    });

    it('should call socket.leave if the socket is connected to the server', () => {
        const spyLeave = spy(serverSocket, 'leave');

        socketService.leave(user.id, room);
        assert.calledOnce(spyLeave);
        assert.calledWith(spyLeave, room);
    });

    it('should not call socket.leave if the socket is not connected to the server', () => {
        const fakeId = 'Nothing Good';
        const spyLeave = spy(serverSocket, 'leave');

        socketService.leave(fakeId, room);
        assert.notCalled(spyLeave);
    });

    it('should call room.get and return array of client in room when calling getUsersFromRoom', () => {
        serverSocket.join(room);

        const spyGet = spy(socketService['sio'].sockets.adapter.rooms, 'get');

        socketService.getUsersFromRoom(room);
        assert.calledOnce(spyGet);
        assert.calledWith(spyGet, room);
        expect(socketService.getUsersFromRoom(room)).to.be.eql([serverSocket.id]);
    });

    it('should call room.get and return an empty array when calling getUsersFromRoom if no user in room', () => {
        const roomFake = 'Not a good room id';

        const spyGet = spy(socketService['sio'].sockets.adapter.rooms, 'get');

        socketService.getUsersFromRoom(roomFake);
        assert.calledOnce(spyGet);
        assert.calledWith(spyGet, roomFake);
        expect(socketService.getUsersFromRoom(roomFake)).to.be.eql([]);
    });

    it("should call room.get and return an empty array when calling getUsersFromRoom if room didn't exist", () => {
        const roomFake = 'Not a good room id';

        const spyGet = spy(socketService['sio'].sockets.adapter.rooms, 'get');

        socketService.getUsersFromRoom(roomFake);
        assert.calledOnce(spyGet);
        assert.calledWith(spyGet, roomFake);
        expect(socketService.getUsersFromRoom(roomFake)).to.be.eql([]);
    });

    it('should call room.get and return array of client in room when calling getRoomsFromUser', () => {
        serverSocket.join(room);

        const spyGet = spy(socketService['sio'].sockets.sockets, 'get');

        socketService.getRoomsFromUser(user.id);
        assert.calledOnce(spyGet);
        assert.calledWith(spyGet, serverSocket.id);
        expect(socketService.getRoomsFromUser(user.id)).to.be.eql([serverSocket.id, room]);
    });

    it('should call room.get and return an empty array when calling getRoomsFromUser if no user in room', () => {
        const spyGet = spy(socketService['sio'].sockets.sockets, 'get');

        socketService.getRoomsFromUser(user.id);
        assert.calledOnce(spyGet);
        assert.calledWith(spyGet, serverSocket.id);
        expect(socketService.getRoomsFromUser(user.id)).to.be.eql([serverSocket.id]);
    });

    it("should call room.get and return an empty array when calling getRoomsFromUser if room didn't exist", () => {
        const result = socketService.getRoomsFromUser('serverSocket.id');

        expect(result).to.be.eql([]);
    });

    it('should not call socket.leave if the socket is not connected to the server', () => {
        const fakeId = 'Nothing Good';
        const spyLeave = spy(serverSocket, 'leave');

        socketService.leave(fakeId, room);
        assert.notCalled(spyLeave);
    });

    it('isConnected should return true if the socket is connected to the server', () => {
        const returnValue = true;

        expect(socketService.isConnected(user.id)).to.eql(returnValue);
    });

    it('isConnected should return false if the socket is not connected to the server', () => {
        const returnValue = false;
        const fakeId = 'Nothing Good';

        expect(socketService.isConnected(fakeId)).to.eql(returnValue);
    });

    it('getRoomSize should return size of the room if it exists', () => {
        const roomId = 'room test';

        serverSocket.join(roomId);

        expect(socketService.getRoomSize(roomId)).to.eql(1);
    });

    it('getRoomSize should be same size if same person connects multiple times', () => {
        const roomId = 'room test';

        serverSocket.join(roomId);
        serverSocket.join(roomId);
        serverSocket.join(roomId);

        expect(socketService.getRoomSize(roomId)).to.eql(1);
    });

    it('getRoomSize should return 0 if room does not exist', () => {
        const roomId = 'room test1';

        expect(socketService.getRoomSize(roomId)).to.eql(0);
    });

    it('on call event handler when client emits', async () => {
        serverSocket.removeAllListeners();
        clientSocket.removeAllListeners();
        clientSocket.disconnect();
        tokenManager.isTokenInBlackList.returns(false);
        helper.addListeners(socketService);
        clientSocket = ioClient(urlString, {
            transports: ['websocket'],
            upgrade: false,
            forceNew: true,
            auth: { key: FAKE_TOKEN() },
        });
        clientSocket.connect();
        clientSocket.emit(FAKE_EVENT);
        await delay(RESPONSE_DELAY);
        assert.calledOnce(helper.customEventHandler);
    });

    it('disconnect call handler when client disconnect', async () => {
        serverSocket.removeAllListeners();
        clientSocket.removeAllListeners();
        clientSocket.disconnect();
        tokenManager.isTokenInBlackList.returns(false);
        helper.addListeners(socketService);
        clientSocket = ioClient(urlString, {
            transports: ['websocket'],
            upgrade: false,
            forceNew: true,
            auth: { key: FAKE_TOKEN() },
        });
        clientSocket.connect();
        await delay(RESPONSE_DELAY);
        clientSocket.disconnect();
        await delay(RESPONSE_DELAY);
        assert.called(helper.disconnectEventHandler);
    });
});
