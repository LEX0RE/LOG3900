import { VisibilityManager } from '@app/interface/visibility-manager';
import { GameVisibilities } from '@common/enums/game-visibilities';
import { User } from '@common/interfaces/user/user';
import { Service } from 'typedi';

@Service()
export class VisibilityManagerPublicNoPass implements VisibilityManager {
    visibility = GameVisibilities.PublicNoPassword;
    // eslint-disable-next-line no-unused-vars -- this is an interface implementation
    isAllowedToJoinLobby(user: User, lobbyId: string): boolean {
        return true;
    }
}
