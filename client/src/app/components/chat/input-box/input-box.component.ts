import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { SPACE } from '@app/constants/easel';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { MessageSenderService } from '@app/services/messages-sender/messages-sender.service';
import { MESSAGE } from '@common/constants/communication';
import { ActionType } from '@common/enums/action-type';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-input-box',
    templateUrl: './input-box.component.html',
    styleUrls: ['./input-box.component.scss'],
})
export class InputBoxComponent {
    textToSend: string;
    translationsContainer: TranslateContainer;
    textToSearch: string;
    chatBoxInteractionService: ChatBoxInteractionService;
    readonly chatBoxService: MessageSenderService;
    private readonly easel: EaselSelectionService;
    private readonly game: GameUpdaterService;

    // eslint-disable-next-line max-params -- only services
    constructor(
        translate: TranslateService,
        chatBoxService: MessageSenderService,
        easel: EaselSelectionService,
        gameUpdaterService: GameUpdaterService,
        chatBoxInteractionService: ChatBoxInteractionService,
    ) {
        this.textToSend = '';
        this.chatBoxService = chatBoxService;
        this.easel = easel;
        this.game = gameUpdaterService;
        this.translationsContainer = new TranslateContainer(translate, ['typeAMessage', 'searchChannel']);
        this.chatBoxInteractionService = chatBoxInteractionService;
        this.textToSearch = '';
    }

    onEnter(event: Event): void {
        if (this.textToSend && this.textToSend.replace(/\s/g, '') && this.chatBoxInteractionService.actualChat)
            this.chatBoxService.sendToServer(MESSAGE, this.textToSend.trim(), this.chatBoxInteractionService.actualChat.id);
        this.handleHideEaselLetters(event);

        this.textToSend = '';
    }

    searchChannel(event: string): void {
        this.chatBoxInteractionService.setSearchChat = event.trim();
    }

    private handleHideEaselLetters(event: Event): void {
        const commands = this.textToSend.split(SPACE);
        const placeLettersParam = 3;

        if (commands.length < placeLettersParam || commands[0] !== ActionType.PlaceLetters) return;
        const lettersToPlace = commands[2];

        this.easel.cancelHidden();
        for (const character of lettersToPlace) this.easel.selectHiddenByString(character);
        event.stopPropagation();
        this.game.playerInfo.turn = false;
    }
}
