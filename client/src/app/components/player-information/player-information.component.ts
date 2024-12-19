import { Component, Input } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { EndGameService } from '@app/services/end-game/end-game.service';
import { CommonPlayerInfo } from '@common/interfaces/common-player-info';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-player-information',
    templateUrl: './player-information.component.html',
    styleUrls: ['./player-information.component.scss'],
})
export class PlayerInformationComponent {
    @Input() player: CommonPlayerInfo;
    @Input() isObservationPage: boolean;
    translationsContainer: TranslateContainer;
    private readonly endGameService: EndGameService;

    get win(): boolean {
        return this.endGameService.endGame?.winners.some((winner: CommonPlayerInfo) => winner.userId === this.player.userId) ?? false;
    }

    constructor(translate: TranslateService, endGame: EndGameService) {
        this.endGameService = endGame;
        this.translationsContainer = new TranslateContainer(translate, ['remainingLetters']);
    }

    get letterLeft() {
        return new Array(this.player.nLetterLeft);
    }

    picture(): string {
        return this.player.profilePicture ? this.player.profilePicture : 'assets/images/player.png';
    }
}
