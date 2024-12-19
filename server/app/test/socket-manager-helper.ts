import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { FAKE_EVENT } from '@app/test/constants/fake-event';
import { User } from '@common/interfaces/user/user';
import { SinonStub, stub } from 'sinon';

export class SocketManagerHelper {
    customEventHandler: SinonStub;
    disconnectEventHandler: SinonStub;

    constructor() {
        this.customEventHandler = stub();
        this.disconnectEventHandler = stub();
    }

    addListeners(manager: SocketManager): void {
        // eslint-disable-next-line no-unused-vars
        manager.on(FAKE_EVENT, (user: User) => this.customEventHandler);
        // eslint-disable-next-line no-unused-vars
        manager.onDisconnect((user: User) => this.disconnectEventHandler);
    }
}
