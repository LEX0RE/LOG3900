import { GameModes } from '@common/enums/game-modes';
import { LobbyClassic } from '@common/interfaces/lobby/lobby-classic';

// eslint-disable-next-line max-lines-per-function -- this is a test file
export const FAKE_LOBBY_INFO_CLASSIC: () => LobbyClassic = () => {
    return {
        gameConfig: {
            dictionaryTitle: 'English',
            turnTimer: { minute: 3, second: 45 },
            creator: {
                id: '1',
                name: 'Player 1',
            },
        },
        lobbyId: '1',
        players: [
            { id: '1', name: 'Player 1' },
            { id: '2', name: 'Player 2' },
            { id: '3', name: 'Player 3' },
        ],
        observers: [
            { id: '4', name: 'Player 4' },
            { id: '5', name: 'Player 5' },
        ],
        virtualPlayerNames: ['bot1'],
        gameMode: GameModes.Classic,
    };
};
