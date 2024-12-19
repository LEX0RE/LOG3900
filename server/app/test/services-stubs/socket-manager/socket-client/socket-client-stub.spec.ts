import { FAKE_EVENT } from '@app/test/constants/fake-event';
import { SocketClientStub } from '@app/test/services-stubs/socket-manager/socket-client/socket-client-stub';
import { SocketManagerStub } from '@app/test/services-stubs/socket-manager/socket-manager/socket-manager-stub';
import { assert, stub } from 'sinon';

describe('SocketClient', () => {
    let socketClient: SocketClientStub;
    let manager: SocketManagerStub;
    const socketId = '123';

    beforeEach(() => {
        manager = new SocketManagerStub();
        socketClient = new SocketClientStub(socketId, manager);
    });

    it('executeFunction should execute function if exist', () => {
        const spy = stub();

        // eslint-disable-next-line dot-notation -- Propriété privée
        socketClient['_events'].set(FAKE_EVENT, spy);
        socketClient.executeFunction(FAKE_EVENT);
        assert.called(spy);
    });
});
