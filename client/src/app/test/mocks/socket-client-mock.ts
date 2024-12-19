import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { DO_NOTHING } from '@app/test/constants/do-nothing-function';

export class SocketClientServiceMock extends SocketClientService {
    override connect = DO_NOTHING;
    override close = DO_NOTHING;
}

export const mockSocketClientService = () =>
    jasmine.createSpyObj('SocketClientService', ['isSocketAlive', 'connect', 'close', 'disconnect', 'on', 'send']);
