import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { CommandFormattingService } from '@app/services/command-formatting/command-formatting.service';
import { CommandService } from '@app/services/command/command.services';
import { FAKE_TRADE } from '@app/test/constants/fake-gameplay';
import { FAKE_PLACE_ACTION } from '@app/test/constants/fake-hints';
import { FAKE_USER_1 } from '@app/test/constants/fake-user';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { COMMAND } from '@common/constants/communication';
import { expect } from 'chai';
import { assert, restore } from 'sinon';

describe('CommandService', () => {
    let service: CommandService;
    let stubs: ServiceStubHelper;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        service = new CommandService();
        service['commandFormattingService'] = new CommandFormattingService();
        stubs.socketManager.connectClient(stubs.clientSocket);
    });

    afterEach(() => restore());

    it('should be created', () => {
        expect(service).to.not.be.eql(undefined);
    });

    it('should play place letters', () => {
        stubs.clientSocket.emit(COMMAND, '!placer E3v james');
        assert.calledWith(stubs.gameplay.checkIfPlayerTurn, FAKE_USER_1(), FAKE_PLACE_ACTION());
    });

    it('should play skip turn', () => {
        stubs.clientSocket.emit(COMMAND, new SkipTurn().toString());
        assert.calledWith(stubs.gameplay.checkIfPlayerTurn, FAKE_USER_1(), new SkipTurn());
    });

    it('should play trade', () => {
        stubs.clientSocket.emit(COMMAND, '!échanger james');

        assert.calledWith(stubs.gameplay.checkIfPlayerTurn, FAKE_USER_1(), FAKE_TRADE());
    });
});
