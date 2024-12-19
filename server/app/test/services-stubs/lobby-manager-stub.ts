import { LobbyClassic } from '@app/classes/lobby/classic/classic-lobby';
import { LobbyCooperative } from '@app/classes/lobby/cooperative/cooperative-lobby';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { VIRTUAL_PLAYER } from '@app/constants/user/virtual-players';
import { LobbyManager } from '@app/services/lobby/lobby-manager/lobby-manager.service';
import { VisibilityManagerPublicNoPass } from '@app/services/lobby/visibility-manager/public-no-password/public-no-password-manager.service';
import { UsersManager } from '@app/services/users-manager/users-manager';
import { FAKE_USER_2 } from '@app/test/constants/fake-user';
import { FAKE_LOBBY_CHAT_ID_1, FAKE_LOBBY_CREATION, FAKE_LOBBY_ID_1 } from '@app/test/constants/lobby/fake-lobby';
import { User } from '@common/interfaces/user/user';
import { SinonStubbedInstance, createStubInstance, stub } from 'sinon';
import { EventEmitter } from 'stream';

export const FAKE_VIRTUAL = (): User[] => [VIRTUAL_PLAYER[0], VIRTUAL_PLAYER[1], VIRTUAL_PLAYER[2], VIRTUAL_PLAYER[3]];

export const FAKE_LOBBY_1 = (): LobbyClassic => {
    const fake = stub(MathUtils, 'randomInArray').returns(FAKE_VIRTUAL());
    const lobby = new LobbyClassic({
        eventEmitter: createStubInstance(EventEmitter),
        lobbyCreation: FAKE_LOBBY_CREATION(),
        lobbyId: FAKE_LOBBY_ID_1,
        chatId: FAKE_LOBBY_CHAT_ID_1,
    });

    lobby.visibilityManager = createStubInstance(VisibilityManagerPublicNoPass);
    fake.restore();
    return lobby;
};

export const FAKE_COOP_LOBBY_1 = (): LobbyCooperative => {
    const fake = stub(MathUtils, 'randomInArray').returns(FAKE_VIRTUAL());
    const lobby = new LobbyCooperative({
        eventEmitter: createStubInstance(EventEmitter),
        lobbyCreation: FAKE_LOBBY_CREATION(),
        lobbyId: FAKE_LOBBY_ID_1,
        chatId: FAKE_LOBBY_CHAT_ID_1,
    });

    fake.restore();
    return lobby;
};

export const stubLobbyManager = (): SinonStubbedInstance<LobbyManager> => {
    const service = createStubInstance(LobbyManager);

    service.lobbies = new Map();
    const lobby = FAKE_LOBBY_1();

    (lobby['usersManager'] as unknown as SinonStubbedInstance<UsersManager>).getProfilePicture.resolves('fakePicture');
    const fake = stub(MathUtils, 'randomInArray').returns([]);

    lobby.addPlayer(FAKE_USER_2());
    fake.restore();
    service.lobbies.set(FAKE_LOBBY_ID_1, lobby);
    service.eventEmitter = new EventEmitter();

    return service;
};
