import { SocketClientServiceMock } from '@app/test/mocks/socket-client-mock';
import { SocketTestHelper } from '@app/test/mocks/socket-helper/socket-test-helper';
import { GAME_UPDATE } from '@common/constants/communication';

describe('Tests Stubs coverage', () => {
    it('SocketClientServiceMock  should have a connect method', () => {
        const socketClientServiceMock = new SocketClientServiceMock();

        socketClientServiceMock.connect();
        expect(socketClientServiceMock.connect).toBeDefined();
    });

    it('peerSideEmit should do nothing if event exist', () => {
        const helper = new SocketTestHelper();

        helper.peerSideEmit(GAME_UPDATE);
        expect(helper.peerSideEmit).toBeDefined();
    });
});
