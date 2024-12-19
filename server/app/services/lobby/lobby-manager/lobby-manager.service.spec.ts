import { LobbyManager } from '@app/services/lobby/lobby-manager/lobby-manager.service';
import { FAKE_USER_2 } from '@app/test/constants/fake-user';
import { FAKE_LOBBY_CREATION, FAKE_LOBBY_ID_1 } from '@app/test/constants/lobby/fake-lobby';
import { RESPONSE_DELAY, delay } from '@app/test/delay';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { JOIN_LOBBY, LEAVE_LOBBY } from '@common/constants/communication';
import { expect } from 'chai';
import { restore, stub } from 'sinon';
import { v4 as idGenerator } from 'uuid';

describe('LobbyManagerService', () => {
    let service: LobbyManager;
    let stubs: ServiceStubHelper;

    beforeEach(async () => {
        stubs = new ServiceStubHelper();
        stubs.visibilityManagerPrivate.isAllowedToJoinLobby.returns(true);
        stubs.visibilityManagerPublicNoPass.isAllowedToJoinLobby.returns(true);
        stubs.visibilityManagerPublicPass.isAllowedToJoinLobby.returns(true);
        stub(idGenerator, 'call' as never).returns(FAKE_LOBBY_ID_1);
        service = new LobbyManager();
        stubs.socketManager.connectClient(stubs.clientSocket);
        await service.createLobby(FAKE_LOBBY_CREATION(), FAKE_USER_2());
    });

    afterEach(() => restore());

    it('should be created', () => {
        expect(service).to.not.be.eql(undefined);
    });

    it('should create a lobby', async () => {
        expect(service.lobbies.size).to.be.equal(1);
    });

    it('should add user to lobby on JOIN_LOBBY', async () => {
        const lobbyId = service.lobbies.values().next().value.lobbyId;

        stubs.clientSocket.emit(JOIN_LOBBY, lobbyId);
        await delay(RESPONSE_DELAY);
        expect(service.lobbies.values().next().value.players.length).to.be.equal(2);
    });

    it('should remove user from lobby on disconnect', () => {
        const lobbyId = service.lobbies.values().next().value.lobbyId;

        stubs.clientSocket.emit(JOIN_LOBBY, lobbyId);
        stubs.clientSocket.disconnect();
        expect(service.lobbies.values().next().value.players.length).to.be.equal(1);
    });

    it('should leave lobby on LEAVE_LOBBY', async () => {
        const lobbyId = service.lobbies.values().next().value.lobbyId;

        stubs.clientSocket.emit(JOIN_LOBBY, lobbyId);
        stubs.clientSocket.emit(LEAVE_LOBBY, lobbyId);
        expect(service.lobbies.values().next().value.players.length).to.be.equal(1);
    });

    it('should delete lobby', () => {
        const lobbyId = service.lobbies.values().next().value.lobbyId;

        service.deleteLobby(lobbyId);
        expect(service.lobbies.size).to.be.equal(0);
    });
});
