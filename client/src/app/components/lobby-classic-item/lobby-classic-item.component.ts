import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { MAX_PLAYERS_CLASSIC_GAME } from '@app/constants/join-game';
import { PRIVATE_GAME, PUBLIC_NO_PASSWORD, PUBLIC_WITH_PASSWORD } from '@app/constants/visibilites';
import { ObserverService } from '@app/services/observer/observer.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { JoiningType } from '@client/src/app/enum/joining-type';
import { NeedPassword } from '@client/src/app/interface/need-password';
import {
    ADD_OBSERVER_TO_GAME,
    ADD_OBSERVER_TO_LOBBY,
    ADD_OBSERVER_TO_TOURNAMENT,
    HEY_I_WANNA_JOIN_THIS_GAME,
    JOIN_LOBBY,
} from '@common/constants/communication';
import { GameModes } from '@common/enums/game-modes';
import { GameVisibilities } from '@common/enums/game-visibilities';
import { Game } from '@common/interfaces/game-info';
import { Lobby } from '@common/interfaces/lobby/lobby';
import { LobbyClassic } from '@common/interfaces/lobby/lobby-classic';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-lobby-classic-item',
    templateUrl: './lobby-classic-item.component.html',
    styleUrls: ['./lobby-classic-item.component.scss'],
})
export class LobbyClassicItemComponent {
    @Input() lobby: Lobby | Game;
    @Input() gameMode: GameModes;
    @Output() newWaitingEvent: EventEmitter<string>;
    @Output() newPasswordEvent: EventEmitter<NeedPassword>;
    translationsContainer: TranslateContainer;
    private readonly socketManager: SocketClientService;

    constructor(socketManager: SocketClientService, observerService: ObserverService, translate: TranslateService) {
        this.socketManager = socketManager;
        this.translationsContainer = new TranslateContainer(translate, []);
        observerService.wakeUp();
        this.newWaitingEvent = new EventEmitter<string>();
        this.newPasswordEvent = new EventEmitter<NeedPassword>();
    }

    get turnTimer(): string {
        return `${this.lobby.gameConfig.turnTimer.minute}:${this.lobby.gameConfig.turnTimer.second.toString().padStart(2, '0')} `;
    }

    get dictionaryTitle(): string {
        return this.lobby.gameConfig.dictionaryTitle;
    }

    get visibility(): string {
        switch (this.lobby.visibility) {
            case GameVisibilities.Private:
                return PRIVATE_GAME;
            case GameVisibilities.PublicNoPassword:
                return PUBLIC_NO_PASSWORD;
            case GameVisibilities.PublicPassword:
                return PUBLIC_WITH_PASSWORD;
            default:
                return '';
        }
    }

    get isPublic(): boolean {
        return this.visibility !== PRIVATE_GAME;
    }

    get nPlayers(): number {
        return this.lobby.players.length;
    }

    get nVirtualPlayers(): number | null {
        if ('virtualPlayerNames' in this.lobby) return (this.lobby as LobbyClassic).virtualPlayerNames.length;
        return null;
    }

    get nObservers(): number {
        return this.lobby.observers.length;
    }

    get creatorName(): string {
        return this.lobby.gameConfig.creator?.name ?? '';
    }

    get lobbyName(): string {
        return this.lobby.lobbyId.toString();
    }

    get nPotentialPlayers(): number {
        if ('potentialPlayers' in this.lobby) return this.lobby.potentialPlayers.length;
        return 0;
    }

    get nPlayerResponse(): number {
        if ('playerResponse' in this.lobby) return this.lobby.playerResponse.length;
        return 0;
    }

    get isMaxedOutPlayers(): boolean {
        return this.nPlayers + this.nPotentialPlayers + this.nPlayerResponse >= MAX_PLAYERS_CLASSIC_GAME;
    }

    get isGame(): boolean {
        return 'isOngoing' in this.lobby;
    }

    get isCooperativeGameMode(): boolean {
        return this.gameMode === GameModes.Cooperative;
    }

    get isTournamentMode(): boolean {
        return this.gameMode === GameModes.Tournament;
    }

    joinLobby(): void {
        if (this.lobby.visibility === GameVisibilities.Private) {
            this.sendWaitingEvent();
            this.socketManager.send(HEY_I_WANNA_JOIN_THIS_GAME, this.lobby.lobbyId);
        } else if (this.lobby.visibility === GameVisibilities.PublicNoPassword) this.socketManager.send(JOIN_LOBBY, this.lobby.lobbyId);
        else this.sendPasswordEvent(JoiningType.Play);
    }

    observeLobby(): void {
        if (this.lobby.visibility !== GameVisibilities.PublicPassword) {
            if (!this.isGame) this.socketManager.send(ADD_OBSERVER_TO_LOBBY, this.lobby.lobbyId);
            else if (this.isTournamentMode) this.socketManager.send(ADD_OBSERVER_TO_TOURNAMENT, this.lobby.lobbyId);
            else this.socketManager.send(ADD_OBSERVER_TO_GAME, this.lobby.lobbyId);
        } else this.sendPasswordEvent(JoiningType.Observation);
    }

    sendWaitingEvent(): void {
        this.newWaitingEvent.emit(this.lobby.lobbyId);
    }

    sendPasswordEvent(joiningType: JoiningType): void {
        this.newPasswordEvent.emit({
            needPassword: true,
            lobbyId: this.lobby.lobbyId,
            joiningType,
            isGame: this.isGame,
            isTournament: this.isTournamentMode,
        });
    }

    isClassicLobby(): boolean {
        return 'virtualPlayerNames' in this.lobby;
    }
}
