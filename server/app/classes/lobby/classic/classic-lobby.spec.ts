import { LobbyClassic } from '@app/classes/lobby/classic/classic-lobby';
import { LobbyOptions } from '@app/classes/lobby/lobby-abstract';
import { MathUtils } from '@app/classes/utils/math/math-utils';
import { EMPTY, ON_CHANGE } from '@app/constants/events/lobby-manager-events';
import { FAKE_USER_1, FAKE_USER_2, FAKE_USER_3, FAKE_USER_4 } from '@app/test/constants/fake-user';
import { FAKE_LOBBY_CHAT_ID_1, FAKE_LOBBY_CREATION, FAKE_LOBBY_ID_1 } from '@app/test/constants/lobby/fake-lobby';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { GameModes } from '@common/enums/game-modes';
import { GameVisibilities } from '@common/enums/game-visibilities';
import { LobbyClassic as LobbyClassicInfo } from '@common/interfaces/lobby/lobby-classic';
import { User } from '@common/interfaces/user/user';
import { expect } from 'chai';

import { assert, createStubInstance, restore, SinonStub, SinonStubbedInstance, stub } from 'sinon';
import { EventEmitter } from 'stream';

describe('ClassicLobby', () => {
    let lobby: LobbyClassic;
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
        servicesStub.visibilityManagerPublicNoPass.visibility = GameVisibilities.PublicNoPassword;
        randomInArray = stub(MathUtils, 'randomInArray');
        randomInArray.returns([user2, user3, user4, user1]);
        eventEmitter = createStubInstance(EventEmitter);
        lobbyOption = {
            lobbyCreation: FAKE_LOBBY_CREATION(),
            lobbyId: FAKE_LOBBY_ID_1,
            chatId: FAKE_LOBBY_CHAT_ID_1,
            eventEmitter,
        };
        lobby = new LobbyClassic(lobbyOption);
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
        const expected: LobbyClassicInfo = {
            lobbyId: FAKE_LOBBY_ID_1,
            chatId: FAKE_LOBBY_CHAT_ID_1,
            gameConfig: FAKE_LOBBY_CREATION().gameConfig,
            observers: [],
            potentialPlayers: [],
            visibility: GameVisibilities.PublicNoPassword,
            players: [{ ...user1, profilePicture: 'fakePicture' }],
            virtualPlayerNames: [user2, user3, user4].map((user: User) => user.name),
            gameMode: GameModes.Classic,
            playerResponse: [],
        };

        expect(lobby.getInfo()).to.be.eql(expected);
    });

    it('should have the correct info when a player is added a second time', async () => {
        const expected: LobbyClassicInfo = {
            lobbyId: FAKE_LOBBY_ID_1,
            chatId: FAKE_LOBBY_CHAT_ID_1,
            gameConfig: FAKE_LOBBY_CREATION().gameConfig,
            observers: [],
            potentialPlayers: [],
            visibility: GameVisibilities.PublicNoPassword,
            players: [{ ...user1, profilePicture: 'fakePicture' }],
            virtualPlayerNames: [user2, user3, user4].map((user: User) => user.name),
            gameMode: GameModes.Classic,
            playerResponse: [],
        };

        await lobby.addPlayer(user1);
        assert.calledWith(eventEmitter.emit, ON_CHANGE, FAKE_LOBBY_ID_1);
        expect(lobby.getInfo()).to.be.eql(expected);
    });

    it('should have the correct info when a player is added then remove', async () => {
        const expected: LobbyClassicInfo = {
            lobbyId: FAKE_LOBBY_ID_1,
            chatId: FAKE_LOBBY_CHAT_ID_1,
            gameConfig: { ...FAKE_LOBBY_CREATION().gameConfig, creator: { ...user4, profilePicture: 'fakePicture' } as unknown as User },
            observers: [],
            potentialPlayers: [],
            visibility: GameVisibilities.PublicNoPassword,
            players: [{ ...user4, profilePicture: 'fakePicture' }],
            virtualPlayerNames: [user2, user3, user2].map((user: User) => user.name),
            gameMode: GameModes.Classic,
            playerResponse: [],
        };

        await lobby.addPlayer(user4);
        assert.calledWith(eventEmitter.emit, ON_CHANGE, FAKE_LOBBY_ID_1);
        randomInArray.returns([user2]);
        lobby.removePlayer(user1);
        assert.calledWith(eventEmitter.emit, ON_CHANGE, FAKE_LOBBY_ID_1);

        expect(lobby.getInfo()).to.be.eql(expected);
    });

    it('should have emit empty when lobby is empty', () => {
        lobby.removePlayer(user1);
        assert.calledWith(eventEmitter.emit, ON_CHANGE, FAKE_LOBBY_ID_1);
        assert.calledWith(eventEmitter.emit, EMPTY, FAKE_LOBBY_ID_1);
    });

    it('should add observer', async () => {
        await lobby.addObserver(user2);
        assert.calledWith(eventEmitter.emit, ON_CHANGE, FAKE_LOBBY_ID_1);
        expect(lobby.getInfo().observers).to.be.eql([{ ...user2, profilePicture: 'fakePicture' }]);
    });

    it('should remove observer', async () => {
        await lobby.addObserver(user2);
        lobby.removeObserver(user2);
        assert.calledWith(eventEmitter.emit, ON_CHANGE, FAKE_LOBBY_ID_1);
        expect(lobby.getInfo().observers).to.be.eql([]);
    });
});
