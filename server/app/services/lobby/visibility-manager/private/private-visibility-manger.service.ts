import { VisibilityManager } from '@app/interface/visibility-manager';
import { GameVisibilities } from '@common/enums/game-visibilities';
import { User } from '@common/interfaces/user/user';
import { Service } from 'typedi';

@Service()
export class VisibilityManagerPrivate implements VisibilityManager {
    visibility = GameVisibilities.Private;
    // eslint-disable-next-line no-unused-vars
    isAllowedToJoinLobby(user: User, lobbyId: string): boolean {
        return true;
    }
}
