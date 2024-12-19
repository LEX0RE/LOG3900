import { GameVisibilities } from '@common/enums/game-visibilities';
import { User } from '@common/interfaces/user/user';

export interface VisibilityManager {
    visibility: GameVisibilities;
    isAllowedToJoinLobby(user: User, lobbyId: string): boolean;
}
