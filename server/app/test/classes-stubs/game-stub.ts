import { Game } from '@app/classes/game/game';
import { stubBoard } from '@app/test/classes-stubs/board-stub';
import { stubClassicMode } from '@app/test/classes-stubs/classic-mode-stub';
import { stubGameWatchTowerWithOutGame } from '@app/test/classes-stubs/game-watch-tower-stub';
import { stubLetterStash } from '@app/test/classes-stubs/letter-stash-stub';
import { stubPlayer1, stubPlayer2, stubPlayer3, stubPlayer4 } from '@app/test/classes-stubs/player-stub';
import { stubTimer } from '@app/test/classes-stubs/timer-stub';
import { FAKE_GAME_CONFIG, FAKE_GAME_FLAGS, FAKE_GAME_ID } from '@app/test/constants/fake-game';
import { createStubInstance, stub } from 'sinon';
import { EventEmitter } from 'stream';

export const stubGame = (): Game => {
    const game = createStubInstance(Game);

    Object.defineProperty(game, 'gameId', { value: FAKE_GAME_ID, configurable: true });
    Object.defineProperty(game, 'gameConfig', { value: FAKE_GAME_CONFIG(), configurable: true });
    game.players = [stubPlayer1(), stubPlayer2(), stubPlayer3(), stubPlayer4()];
    Object.defineProperty(game, 'activePlayer', { value: stubPlayer1(), configurable: true });
    Object.defineProperty(game, 'otherPlayers', { value: [stubPlayer2(), stubPlayer3(), stubPlayer4()], configurable: true });
    game.gameMode = stubClassicMode();
    game.letterStash = stubLetterStash();
    game.board = stubBoard();
    game.flags = FAKE_GAME_FLAGS();
    game.invalidRuleError = '';
    game.timer = stubTimer();
    game.watchTower = stubGameWatchTowerWithOutGame();
    game.outsideResolveError = stub();
    game.events = new EventEmitter();
    game.hintUsed = { wasUsed: false, hint: [], hintInProgress: false };

    return game as unknown as Game;
};

export const stubGameWithoutWatchTower = (): Game => {
    const game = createStubInstance(Game);

    Object.defineProperty(game, 'gameId', { value: FAKE_GAME_ID });
    Object.defineProperty(game, 'gameConfig', { value: FAKE_GAME_CONFIG() });
    Object.defineProperty(game, 'activePlayer', { value: stubPlayer1(), configurable: true });
    Object.defineProperty(game, 'otherPlayers', { value: [stubPlayer2()], configurable: true });
    game.activePlayerIndex = 0;
    game.players = [stubPlayer1(), stubPlayer2()];
    game.letterStash = stubLetterStash();
    game.board = stubBoard();
    game.flags = FAKE_GAME_FLAGS();
    game.gameMode = stubClassicMode();
    game.invalidRuleError = '';
    game.timer = stubTimer();
    game.outsideResolveError = stub();
    game.events = new EventEmitter();
    game.hintUsed = { wasUsed: false, hint: [], hintInProgress: false };

    return game as unknown as Game;
};
