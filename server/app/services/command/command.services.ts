import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { SkipTurn } from '@app/classes/actions/skip-turn/skip-turn';
import { TradeLetter } from '@app/classes/actions/trade-letters/trade-letters';
import { SPACE } from '@app/constants/command-formatting';
import { HINT_IN_PROGRESS, NOT_PLAYER_TURN_ERROR, SYNTAX_ERROR } from '@app/constants/error/error-messages';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { PlacementOrientation } from '@app/interface/placement-orientation';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { CommandFormattingService } from '@app/services/command-formatting/command-formatting.service';
import { GameManager } from '@app/services/game-manager/game-manager.service';
import { Gameplay } from '@app/services/gameplay/gameplay.service';
import { SocketManager } from '@app/services/socket-manager/socket-manager.service';
import { COMMAND } from '@common/constants/communication';
import { ActionType } from '@common/enums/action-type';
import { Orientation } from '@common/enums/orientation';
import { User } from '@common/interfaces/user/user';
import { Container, Service } from 'typedi';

@Service()
export class CommandService {
    private readonly gameplay: Gameplay;
    private commandFormattingService: CommandFormattingService;
    private readonly socketManager: SocketManager;
    private gameManagerService: GameManager;

    constructor() {
        this.gameplay = Container.get(Gameplay);
        this.commandFormattingService = Container.get(CommandFormattingService);
        this.gameManagerService = Container.get(GameManager);
        this.socketManager = Container.get(SocketManager);
        this.socketManager.on(COMMAND, (user: User) => (command: string) => {
            this.handleCommand(command, user);
        });
    }

    private async handleCommand(command: string, user: User): Promise<void> {
        const commands = command.split(SPACE);

        switch (commands[0]) {
            case ActionType.SkipTurn:
                return this.handleSkipTurn(user);
            case ActionType.PlaceLetters:
                return this.handlePlaceLetters(user, commands);
            case ActionType.Trade:
                return this.handleTrade(user, commands);
            // TODO avec les cannaux de discussion
            // case ActionType.Help:
            //     return this.handleHelp(message);
            case ActionType.Hint:
                return this.handleHint(user);
            // case ActionType.Stash:
            //     return this.handleStash(message);
            // default:
            //     return this.handleDefault(message, commands);
        }
    }

    private async handleSkipTurn(user: User): Promise<void> {
        try {
            await this.gameplay.checkIfPlayerTurn(user, new SkipTurn());
        } catch (error: unknown) {
            // eslint-disable-next-line no-console
            console.log(error); // TODO: Handle error
        }
    }

    private async handlePlaceLetters(user: User, commands: string[]): Promise<void> {
        try {
            const placeLettersParam = 3;

            if (commands.length < placeLettersParam) throw new Error(SYNTAX_ERROR);
            const lettersToPlace = this.commandFormattingService.formatLetters(commands[2], ActionType.PlaceLetters);
            const orientation = this.commandFormattingService.formatOrientation(commands[1].slice(INDEX_NOT_FOUND), lettersToPlace.length);
            const orientedPlacement = this.handleOrientedPlacement(commands, orientation);
            const placeLettersAction = new PlaceLetters(lettersToPlace, orientedPlacement.placement, orientedPlacement.orientation);

            await this.gameplay.checkIfPlayerTurn(user, placeLettersAction);
        } catch (error: unknown) {
            // eslint-disable-next-line no-console
            console.log(error); // TODO: Handle error
        }
    }

    private async handleTrade(user: User, commands: string[]): Promise<void> {
        try {
            const tradeParam = 2;

            if (commands.length < tradeParam) throw new Error(SYNTAX_ERROR);
            const lettersToTrade = this.commandFormattingService.formatLetters(commands[1], ActionType.Trade);

            await this.gameplay.checkIfPlayerTurn(user, new TradeLetter(lettersToTrade));
        } catch (error: unknown) {
            // eslint-disable-next-line no-console
            console.log(error); // TODO: Handle error
        }
    }

    // TODO avec les cannaux de discussion
    // eslint-disable-next-line no-unused-vars
    // private handleHelp(user: User): void {
    //     let messageToSend = HELP_COMMAND;
    //     const separator = '\n\n ';

    //     ACTION_TYPE_INFO.forEach((info: string) => (messageToSend += separator + info));
    // }

    private async handleHint(user: User): Promise<void> {
        try {
            const game = this.gameManagerService.getGameByPlayerId(user.id);

            if (game?.activePlayer.id !== user.id) throw new Error(NOT_PLAYER_TURN_ERROR);
            if (game.hintUsed.hintInProgress) throw new Error(HINT_IN_PROGRESS);
            game.hintUsed.hintInProgress = true;
            await this.gameplay.getHint(user.id);
        } catch (error: unknown) {
            // eslint-disable-next-line no-console -- Écrire l'erreur à la console
            console.log(error);
        }
    }

    // TODO avec les cannaux de discussion
    // eslint-disable-next-line no-unused-vars
    // private handleStash(user: User): void {
    //     message.content = this.gameplay.stashInfo(user);
    //     this.messageType = MessageType.SenderOnly;
    // }

    // private handleDefault(message: Message, commands: string[]): void {
    //     message.content = commands[0] ? INVALID_COMMAND.replace('X', commands[0]) : EMPTY_COMMAND;
    //     this.messageType = MessageType.SenderOnly;
    // }

    private handleOrientedPlacement(commands: string[], orientation: Orientation): PlacementOrientation {
        let placement: Vector2D;

        if (orientation === Orientation.None) {
            placement = this.commandFormattingService.formatPlacement(commands[1]);
            orientation = Orientation.Horizontal;
        } else placement = this.commandFormattingService.formatPlacement(commands[1].slice(0, INDEX_NOT_FOUND));
        return { placement, orientation };
    }
}
