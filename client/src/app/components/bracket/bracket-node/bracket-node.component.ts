import { Component, Input } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { ObserverService } from '@client/src/app/services/observer/observer.service';
import { BracketUser, PlayerGameState } from '@common/interfaces/tournament/bracket-profile';
import { CommonBracket } from '@common/interfaces/tournament/common-bracket';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-bracket-node',
    templateUrl: './bracket-node.component.html',
    styleUrls: ['./bracket-node.component.scss'],
})
export class BracketNodeComponent {
    @Input() node: CommonBracket;
    @Input() reverse: boolean;
    @Input() fillRemaining: boolean;
    translationsContainer: TranslateContainer;
    private observerService: ObserverService;

    constructor(observerService: ObserverService, translate: TranslateService) {
        this.observerService = observerService;
        this.translationsContainer = new TranslateContainer(translate, ['vs', 'observe']);
    }

    fill(): BracketUser[] {
        const playersSeen = [];

        this.node.currentPlayers.forEach((player) => playersSeen.push(player));

        while (this.fillRemaining && playersSeen.length < 2)
            playersSeen.push({ id: '', name: '', profilePicture: '', winner: PlayerGameState.NO_RESULT });

        return playersSeen;
    }

    observeGame(): void {
        this.observerService.observeTournamentGame(this.node.gameId);
    }
}
