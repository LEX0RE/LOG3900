/* eslint-disable @typescript-eslint/no-magic-numbers -- Pour définir plusieurs utilisateurs*/
import { BracketUser, PlayerGameState } from '@common/interfaces/tournament/bracket-profile';
import { CommonBracket } from '@common/interfaces/tournament/common-bracket';

const FAKE_USER: (id: number, winner: PlayerGameState) => BracketUser = (id: number, winner: PlayerGameState) => {
    return {
        id: `${id}`,
        name: `User mmmmmmm ${id}`,
        winner,
        profilePicture: '',
    };
};

const FAKE_BRACKET_NODE_1: () => CommonBracket = () => {
    return {
        children: [],
        currentPlayers: [FAKE_USER(1, PlayerGameState.WINNER), FAKE_USER(2, PlayerGameState.LOSER)],
        isMatchInProgress: false,
        gameId: '1',
    };
};

const FAKE_BRACKET_NODE_2: () => CommonBracket = () => {
    return {
        children: [],
        currentPlayers: [FAKE_USER(3, PlayerGameState.NO_RESULT), FAKE_USER(4, PlayerGameState.LOSER)],
        isMatchInProgress: true,
        gameId: '2',
    };
};

export const FAKE_BRACKET_1: () => CommonBracket = () => {
    return {
        children: [FAKE_BRACKET_NODE_1(), FAKE_BRACKET_NODE_2()],
        currentPlayers: [FAKE_USER(1, PlayerGameState.NO_RESULT)],
        isMatchInProgress: false,
        gameId: '3',
    };
};

export const FAKE_CONSOLATION_BRACKET_1: () => CommonBracket = () => {
    return {
        children: [],
        currentPlayers: [FAKE_USER(2, PlayerGameState.NO_RESULT), FAKE_USER(5, PlayerGameState.NO_RESULT)],
        isMatchInProgress: true,
        gameId: '4',
    };
};
