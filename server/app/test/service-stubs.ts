import { AuthenticationController } from '@app/controllers/authentication/authentication.controller';
import { DictionariesController } from '@app/controllers/dictionaries/dictionaries.controller';
import { GameHistoryController } from '@app/controllers/game-history/game-history.controller';
import { GameModesController } from '@app/controllers/game-modes/game-modes.controller';
import { LobbyController } from '@app/controllers/lobby/lobby.controller';
import { ReplayController } from '@app/controllers/replay/replay.controller';
import { TurnTimesController } from '@app/controllers/turn-times/turn-times.controller';
import { UserController } from '@app/controllers/user/user-controller';
import { VisibilityController } from '@app/controllers/visibility/visibility.controller';
import { ChatManager2 } from '@app/services/chat-manager2/chat-manager2.service';
import { CommandFormattingService } from '@app/services/command-formatting/command-formatting.service';
import { CommandService } from '@app/services/command/command.services';
import { DatabaseService } from '@app/services/database/database.service';
import { DictionaryService } from '@app/services/dictionary/dictionary.service';
import { EndGameManager } from '@app/services/end-game-manager/end-game-manager.service';
import { GameFactoryClassic } from '@app/services/game-factory/classic-game-factory/classic-game-factory.service';
import { GameFactoryCooperative } from '@app/services/game-factory/cooperative-game-factory/cooperative-game-factory.service';
import { GameHistoryDatabase } from '@app/services/game-history-manager/game-history-database/game-history-database.service';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { Gameplay } from '@app/services/gameplay/gameplay.service';
import { LobbyManager } from '@app/services/lobby/lobby-manager/lobby-manager.service';
import { VisibilityManagerPrivate } from '@app/services/lobby/visibility-manager/private/private-visibility-manger.service';
import { VisibilityManagerPublicNoPass } from '@app/services/lobby/visibility-manager/public-no-password/public-no-password-manager.service';
import { VisibilityManagerPublicPass } from '@app/services/lobby/visibility-manager/public-with-password/public-with-password-manager.service';
import { ObserverManager } from '@app/services/observer-manager/observer-manager';
import { ReplayDatabaseManager } from '@app/services/replay-manager/replay-database-manager/replay-database-manager.service';
import { ScrabbleAlgo } from '@app/services/scrabble-algorithm/scrabble-algorithm.service';
import { SocialManager } from '@app/services/social-manager/social-manager.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { TurnTimesService } from '@app/services/turn-times/turn-times.service';
import { UsersManager } from '@app/services/users-manager/users-manager';
import { VirtualPlayerNameService } from '@app/services/virtual-player-name/virtual-player-name.service';
import { stubChatFilter } from '@app/test/services-stubs/chat-filter-stub';
import { stubDictionaryService } from '@app/test/services-stubs/dictionary-stub';
import { stubGameManager } from '@app/test/services-stubs/game-manager-stub';
import { stubGameplay } from '@app/test/services-stubs/gameplay-stub';
import { stubLobbyManager } from '@app/test/services-stubs/lobby-manager-stub';
import { SocketClientStub } from '@app/test/services-stubs/socket-manager/socket-client/socket-client-stub';
import { SocketManagerStub } from '@app/test/services-stubs/socket-manager/socket-manager/socket-manager-stub';
import { createStubInstance, restore, SinonStub, SinonStubbedInstance, stub } from 'sinon';
import { Container, Token } from 'typedi';

export class ServiceStubHelper {
    clientSocket!: SocketClientStub;
    getStub!: SinonStub<[id: Token<unknown>], unknown>;
    socketManager!: SocketManagerStub;
    gameManager!: SinonStubbedInstance<GameManager>;
    gameplay!: SinonStubbedInstance<Gameplay>;
    chatFilter!: SinonStubbedInstance<CommandService>;
    scrabbleAlgo!: SinonStubbedInstance<ScrabbleAlgo>;
    dictionaryService!: SinonStubbedInstance<DictionaryService>;
    endGameManager!: SinonStubbedInstance<EndGameManager>;
    turnTimesService!: SinonStubbedInstance<TurnTimesService>;
    commandFormattingService!: SinonStubbedInstance<CommandFormattingService>;
    virtualPlayerName!: SinonStubbedInstance<VirtualPlayerNameService>;
    databaseService!: SinonStubbedInstance<DatabaseService>;
    chatManager2!: SinonStubbedInstance<ChatManager2>;
    socialManager!: SinonStubbedInstance<SocialManager>;
    usersManager!: SinonStubbedInstance<UsersManager>;
    lobbyManager!: SinonStubbedInstance<LobbyManager>;
    visibilityManagerPrivate!: SinonStubbedInstance<VisibilityManagerPrivate>;
    visibilityManagerPublicNoPass!: SinonStubbedInstance<VisibilityManagerPublicNoPass>;
    visibilityManagerPublicPass!: SinonStubbedInstance<VisibilityManagerPublicPass>;
    gameFactoryClassic!: SinonStubbedInstance<GameFactoryClassic>;
    gameFactoryCooperative!: SinonStubbedInstance<GameFactoryCooperative>;
    gameHistoryDatabase!: SinonStubbedInstance<GameHistoryDatabase>;
    replayDatabaseManager!: SinonStubbedInstance<ReplayDatabaseManager>;
    observerManager!: SinonStubbedInstance<ObserverManager>;

    constructor() {
        this.stubAllService();
    }

    // eslint-disable-next-line max-lines-per-function -- construit tous les stubs services
    stubAllService(): void {
        restore();

        this.getStub = stub(Container, 'get');

        this.socketManager = new SocketManagerStub();
        this.getStub.withArgs(SocketManager as Token<unknown>).returns(this.socketManager);
        this.clientSocket = this.socketManager.createClient();

        this.gameManager = stubGameManager();
        this.getStub.withArgs(GameManager as Token<unknown>).returns(this.gameManager);

        this.chatFilter = stubChatFilter();
        this.getStub.withArgs(CommandService as Token<unknown>).returns(this.chatFilter);

        this.scrabbleAlgo = createStubInstance(ScrabbleAlgo);
        this.getStub.withArgs(ScrabbleAlgo as Token<unknown>).returns(this.scrabbleAlgo);

        this.dictionaryService = stubDictionaryService();
        this.getStub.withArgs(DictionaryService as Token<unknown>).returns(this.dictionaryService);

        this.endGameManager = createStubInstance(EndGameManager);
        this.getStub.withArgs(EndGameManager as Token<unknown>).returns(this.endGameManager);

        this.gameplay = stubGameplay();
        this.getStub.withArgs(Gameplay as Token<unknown>).returns(this.gameplay);

        this.turnTimesService = createStubInstance(TurnTimesService);
        this.getStub.withArgs(TurnTimesService as Token<unknown>).returns(this.turnTimesService);

        this.commandFormattingService = createStubInstance(CommandFormattingService);
        this.getStub.withArgs(CommandFormattingService as Token<unknown>).returns(this.commandFormattingService);

        this.virtualPlayerName = createStubInstance(VirtualPlayerNameService);
        this.getStub.withArgs(VirtualPlayerNameService as Token<unknown>).returns(this.virtualPlayerName);

        this.databaseService = createStubInstance(DatabaseService);
        this.getStub.withArgs(DatabaseService as Token<unknown>).returns(this.databaseService);

        this.chatManager2 = createStubInstance(ChatManager2);
        this.getStub.withArgs(ChatManager2 as Token<unknown>).returns(this.chatManager2);

        this.socialManager = createStubInstance(SocialManager);
        this.getStub.withArgs(SocialManager as Token<unknown>).returns(this.socialManager);

        this.usersManager = createStubInstance(UsersManager);
        this.getStub.withArgs(UsersManager as Token<unknown>).returns(this.usersManager);

        this.replayDatabaseManager = createStubInstance(ReplayDatabaseManager);
        this.getStub.withArgs(ReplayDatabaseManager as Token<unknown>).returns(this.replayDatabaseManager);

        this.lobbyManager = stubLobbyManager();
        this.getStub.withArgs(LobbyManager as Token<unknown>).returns(this.lobbyManager);

        this.visibilityManagerPrivate = createStubInstance(VisibilityManagerPrivate);
        this.getStub.withArgs(VisibilityManagerPrivate as Token<unknown>).returns(this.visibilityManagerPrivate);

        this.visibilityManagerPublicNoPass = createStubInstance(VisibilityManagerPublicNoPass);
        this.getStub.withArgs(VisibilityManagerPublicNoPass as Token<unknown>).returns(this.visibilityManagerPublicNoPass);

        this.visibilityManagerPublicPass = createStubInstance(VisibilityManagerPublicPass);
        this.getStub.withArgs(VisibilityManagerPublicPass as Token<unknown>).returns(this.visibilityManagerPublicPass);

        this.gameFactoryClassic = createStubInstance(GameFactoryClassic);
        this.getStub.withArgs(GameFactoryClassic as Token<unknown>).returns(this.gameFactoryClassic);

        this.gameFactoryCooperative = createStubInstance(GameFactoryCooperative);
        this.getStub.withArgs(GameFactoryCooperative as Token<unknown>).returns(this.gameFactoryCooperative);

        this.observerManager = createStubInstance(ObserverManager);
        this.getStub.withArgs(ObserverManager as Token<unknown>).returns(this.observerManager);

        this.getStub.withArgs(UserController as Token<unknown>).callsFake(() => new UserController());
        this.gameHistoryDatabase = createStubInstance(GameHistoryDatabase);
        this.getStub.withArgs(GameHistoryDatabase as Token<unknown>).returns(this.gameHistoryDatabase);
        this.getStub.withArgs(GameModesController as Token<unknown>).callsFake(() => new GameModesController());
        this.getStub.withArgs(LobbyController as Token<unknown>).callsFake(() => new LobbyController());
        this.getStub.withArgs(DictionariesController as Token<unknown>).callsFake(() => new DictionariesController());
        this.getStub.withArgs(TurnTimesController as Token<unknown>).callsFake(() => new TurnTimesController());
        this.getStub.withArgs(GameHistoryController as Token<unknown>).callsFake(() => new GameHistoryController());
        this.getStub.withArgs(AuthenticationController as Token<unknown>).callsFake(() => new AuthenticationController());
        this.getStub.withArgs(ReplayController as Token<unknown>).callsFake(() => new ReplayController());
        this.getStub.withArgs(VisibilityController as Token<unknown>).callsFake(() => new VisibilityController());
    }
}
