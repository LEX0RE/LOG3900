import { GameModes } from '@common/enums/game-modes';
import { GameVisibilities } from '@common/enums/game-visibilities';
import { CommonGameConfig2 } from '@common/interfaces/lobby/common-game-config2';
import { LobbyClassic } from '@common/interfaces/lobby/lobby-classic';

export const FAKE_COMMON_CONFIG_1: () => CommonGameConfig2 = () => {
    return {
        dictionaryTitle: 'Dictionary 1',
        turnTimer: {
            minute: 1,
            second: 0,
        },
        creator: {
            id: '1',
            name: 'User 1',
        },
    };
};

export const FAKE_COMMON_CONFIG_2: () => CommonGameConfig2 = () => {
    return {
        dictionaryTitle: 'Dictionary 2',
        turnTimer: {
            minute: 2,
            second: 0,
        },
        creator: {
            id: '2',
            name: 'User 2',
        },
    };
};

export const FAKE_COMMON_CONFIG_3: () => CommonGameConfig2 = () => {
    return {
        dictionaryTitle: 'Dictionary 3',
        turnTimer: {
            minute: 3,
            second: 0,
        },
        creator: {
            id: '3',
            name: 'User 3',
        },
    };
};

export const FAKE_CLASSIC_LOBBY_1: () => LobbyClassic = () => {
    return {
        gameConfig: FAKE_COMMON_CONFIG_1(),
        lobbyId: '1',
        chatId: '1',
        observers: [],
        players: [
            { id: '1', name: 'User 1' },
            { id: '2', name: 'User 2' },
        ],
        potentialPlayers: [],
        visibility: GameVisibilities.PublicNoPassword,
        gameMode: GameModes.Classic,
        virtualPlayerNames: ['Virtual Player 1', 'Virtual Player 2'],
        playerResponse: [],
    };
};

export const FAKE_CLASSIC_LOBBY_2: () => LobbyClassic = () => {
    return {
        gameConfig: FAKE_COMMON_CONFIG_2(),
        lobbyId: '2',
        chatId: '2',
        observers: [],
        players: [
            { id: '3', name: 'User 3' },
            { id: '4', name: 'User 4' },
            { id: '5', name: 'User 5' },
            { id: '6', name: 'User 6' },
        ],
        potentialPlayers: [],
        visibility: GameVisibilities.PublicNoPassword,
        gameMode: GameModes.Classic,
        virtualPlayerNames: [],
        playerResponse: [],
    };
};

export const FAKE_CLASSIC_LOBBY_3: () => LobbyClassic = () => {
    return {
        gameConfig: FAKE_COMMON_CONFIG_3(),
        lobbyId: '3',
        chatId: '3',
        observers: [],
        players: [{ id: '5', name: 'User 5' }],
        potentialPlayers: [],
        visibility: GameVisibilities.PublicNoPassword,
        gameMode: GameModes.Classic,
        virtualPlayerNames: ['Virtual Player 5', 'Virtual Player 6', 'Virtual Player 7'],
        playerResponse: [],
    };
};

export const FAKE_CLASSIC_LOBBIES: () => LobbyClassic[] = () => {
    return [FAKE_CLASSIC_LOBBY_1(), FAKE_CLASSIC_LOBBY_2(), FAKE_CLASSIC_LOBBY_3()];
};
