import { GameModes } from '../../enums/game-modes';
import { GameVisibilities } from '../../enums/game-visibilities';
import { User } from '../user/user';
import { CommonGameConfig2 } from './common-game-config2';

export interface LobbyCreation {
    gameConfig: CommonGameConfig2;
    gameMode: GameModes;
    visibility: GameVisibilities;
    password?: string;
    invitedFriends: User[];
}
