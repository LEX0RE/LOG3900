import { Injectable } from '@angular/core';
import { DELAY_LETTER_RESET } from '@app/constants/easel';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { COMMAND } from '@common/constants/communication';
import { ActionType } from '@common/enums/action-type';
import { Orientation } from '@common/enums/orientation';
import { Coordinate } from '@common/interfaces/coordinate';
@Injectable({
    providedIn: 'root',
})
export class CommandConversionService {
    private readonly easelSelectionService: EaselSelectionService;
    private readonly gameUpdateService: GameUpdaterService;
    private readonly socketManager: SocketClientService;

    constructor(easelSelectionService: EaselSelectionService, gameUpdateService: GameUpdaterService, socketManager: SocketClientService) {
        this.easelSelectionService = easelSelectionService;
        this.gameUpdateService = gameUpdateService;
        this.socketManager = socketManager;
    }

    sendPlaceLetter(initialPosition: Coordinate, orientation: Orientation, letters: string): void {
        const command = this.formatCommand(initialPosition, orientation, letters);

        this.socketManager.send(COMMAND, command);
        this.gameUpdateService.playerInfo.turn = false;
        this.easelSelectionService.cancelHidden();
        letters.split('').forEach((character: string) => this.easelSelectionService.selectHiddenByString(character));
        setTimeout(() => this.easelSelectionService.cancelHidden(), DELAY_LETTER_RESET);
    }

    sendTradeLetter(): void {
        const lettersToTrade: string = this.easelSelectionService.tradeLetters;

        if (!lettersToTrade) return;
        const command = `${ActionType.Trade} ${lettersToTrade.toLowerCase()}`;

        this.socketManager.send(COMMAND, command);
        this.easelSelectionService.cancelTrade();
    }

    sendSkipTurn(): void {
        this.socketManager.send(COMMAND, ActionType.SkipTurn);
    }

    sendHint(): void {
        this.socketManager.send(COMMAND, ActionType.Hint);
    }

    sendHelp(): void {
        this.socketManager.send(COMMAND, ActionType.Help);
    }

    formatCommand(initialPosition: Coordinate, orientation: Orientation, letters: string): string {
        return `${ActionType.PlaceLetters} ${initialPosition.row}${initialPosition.column}${orientation} ${letters}`;
    }

    formatTradeCommand(): string {
        const lettersToTrade: string = this.easelSelectionService.tradeLetters;

        if (!lettersToTrade) return '';
        return `${ActionType.Trade} ${lettersToTrade.toLowerCase()}`;
    }
}
