import { LobbyOptions } from '@app/classes/lobby/lobby-abstract';
import { LobbyTournament } from '@app/classes/lobby/tournament/tournament-lobby';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { FAKE_USER_1, FAKE_USER_2, FAKE_USER_3, FAKE_USER_4 } from '@app/test/constants/fake-user';
import { FAKE_LOBBY_CHAT_ID_1, FAKE_LOBBY_CREATION, FAKE_LOBBY_ID_1 } from '@app/test/constants/lobby/fake-lobby';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { User } from '@common/interfaces/user/user';
import { expect } from 'chai';
import { SinonStub, SinonStubbedInstance, createStubInstance, restore, stub } from 'sinon';
import { EventEmitter } from 'stream';

describe('LobbyTournament', () => {
    let lobby: LobbyTournament;
    let servicesStub: ServiceStubHelper;
    let lobbyOption: LobbyOptions;
    let eventEmitter: SinonStubbedInstance<EventEmitter>;
    let user1: User;
    let user2: User;
    let user3: User;
    let user4: User;
    let randomInArray: SinonStub<[values: unknown[], numberOfElementsToChose: number], unknown[]>;

    beforeEach(async () => {
        user1 = FAKE_USER_1();
        user2 = FAKE_USER_2();
        user3 = FAKE_USER_3();
        user4 = FAKE_USER_4();
        servicesStub = new ServiceStubHelper();
        randomInArray = stub(MathUtils, 'randomInArray');
        randomInArray.returns([user2, user3, user4, user1]);
        eventEmitter = createStubInstance(EventEmitter);
        lobbyOption = {
            lobbyCreation: FAKE_LOBBY_CREATION(),
            lobbyId: FAKE_LOBBY_ID_1,
            chatId: FAKE_LOBBY_CHAT_ID_1,
            eventEmitter,
        };
        lobby = new LobbyTournament(lobbyOption);
        randomInArray.returns([]);
        await lobby.addPlayer(user1);
        servicesStub.clientSocket.connect();
    });

    afterEach(() => {
        restore();
    });

    it('should create', () => {
        expect(lobby).to.not.be.eql(undefined);
    });

    it('should have the correct info', () => {
        expect(lobby.getInfo()).to.not.be.eql(undefined);
    });
});
