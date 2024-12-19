import { Game } from '@app/classes/game/game';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { stubGame } from '@app/test/classes-stubs/game-stub';
import { FAKE_PLAYER_1 } from '@app/test/constants/fake-player';
import { ServiceStubHelper } from '@app/test/service-stubs';
import { expect } from 'chai';
import * as Sinon from 'sinon';

describe('GameManagerService', () => {
    let stubs: ServiceStubHelper;
    let service: GameManager;
    let game: Game;

    beforeEach(() => {
        stubs = new ServiceStubHelper();
        game = stubGame();
        service = new GameManager();
        stubs.socketManager.connectClient(stubs.clientSocket);
    });

    afterEach(() => Sinon.restore());

    it('should create gameManager', () => {
        expect(service.nextId()).to.not.be.eql(undefined);
        expect(service).to.not.be.eql(undefined);
    });

    it('should add game to games', () => {
        service.addGame(game);
        expect(service['games'].get(game.gameId)?.gameId).to.be.eql(game.gameId);
    });

    it('should remove game from games', () => {
        service.addGame(game);
        service.deleteGame(game.gameId);
        expect(service['games'].get(game.gameId)).to.be.eql(undefined);
    });

    it('should get game by id', () => {
        service.addGame(game);
        expect(service.getGame(game.gameId)?.gameId).to.be.eql(game.gameId);
    });

    it('should get game by player id', () => {
        const player = FAKE_PLAYER_1();

        game.players.push(player);
        service.addGame(game);

        expect(service.getGameByPlayerId(player.id)?.gameId).to.be.eql(game.gameId);
    });
});
