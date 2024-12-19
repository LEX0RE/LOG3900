import { Component, Input } from '@angular/core';
import { IdentityService } from '@app/services/identity/identity.service';
import { BracketUser, PlayerGameState } from '@common/interfaces/tournament/bracket-profile';
@Component({
    selector: 'app-bracket-player',
    templateUrl: './bracket-player.component.html',
    styleUrls: ['./bracket-player.component.scss'],
})
export class BracketPlayerComponent {
    @Input() user: BracketUser;
    @Input() eliminated: boolean;
    private readonly identity: IdentityService;

    // eslint-disable-next-line max-params -- only services
    constructor(identity: IdentityService) {
        this.identity = identity;
    }

    picture(): string {
        if (!this.user.name) return '';
        return this.user.profilePicture ? this.user.profilePicture : 'assets/images/player.png';
    }

    isSelf(): boolean {
        return this.user.id === this.identity.getUser()?.userId ?? false;
    }

    isEliminated(): boolean {
        return this.user.winner === PlayerGameState.LOSER;
    }
}
