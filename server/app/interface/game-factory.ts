import { Game } from '@app/classes/game/game';
import { Lobby } from '@app/classes/lobby/lobby-abstract';
import { Tournament } from '@app/classes/tournament/tournament';

export interface GameFactory {
    createGame(lobby: Lobby): Game | Tournament;
}
