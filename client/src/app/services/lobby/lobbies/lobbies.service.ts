import { Injectable } from '@angular/core';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { JoiningType } from '@client/src/app/enum/joining-type';
import { LobbyWaiting } from '@client/src/app/interface/lobby-waiting';
import { NeedPassword } from '@client/src/app/interface/need-password';
import {
    ADD_OBSERVER_TO_GAME,
    ADD_OBSERVER_TO_LOBBY,
    ADD_OBSERVER_TO_TOURNAMENT,
    JOIN_LOBBY,
    PUBLISH_CLASSIC_LOBBIES,
    PUBLISH_COOPERATIVE_LOBBIES,
    PUBLISH_TOURNAMENT_LOBBIES,
    REDIRECT_TO_GAME,
    YOU_WERE_REJECTED,
} from '@common/constants/communication';
import { AvailableClassicLobbies } from '@common/interfaces/lobby/available-classic-lobbies';
import { AvailableCooperativeLobbies } from '@common/interfaces/lobby/available-cooperative-lobbies';
import { AvailableTournamentLobbies } from '@common/interfaces/lobby/available-tournament-lobbies';
import { LobbyClassic } from '@common/interfaces/lobby/lobby-classic';
import { LobbyCooperative } from '@common/interfaces/lobby/lobby-cooperative';
import { LobbyTournament } from '@common/interfaces/lobby/lobby-tournament';

@Injectable({
    providedIn: 'root',
})
export class LobbiesService {
    lobbiesClassic: LobbyClassic[];
    lobbiesTournament: LobbyTournament[];
    waitingOnLobby: LobbyWaiting = { isWaiting: false };
    isRejected: boolean = false;
    needPassword: NeedPassword = { needPassword: false };
    passwordValid: boolean = true;
    lobbiesCooperative: LobbyCooperative[];
    private readonly httpManager: HttpRequestManagerService;
    private readonly socketManager: SocketClientService;

    constructor(httpManager: HttpRequestManagerService, socketManager: SocketClientService) {
        this.httpManager = httpManager;
        this.socketManager = socketManager;
        this.lobbiesClassic = [];
        this.lobbiesTournament = [];
        this.lobbiesCooperative = [];
        this.configureSocket();
    }

    // eslint-disable-next-line no-unused-vars
    validatePassword(password: string): void {
        if (!this.needPassword.lobbyId) return;
        this.httpManager.verifyPassword({ lobbyId: this.needPassword.lobbyId, password }).subscribe((passwordValid) => {
            this.passwordValid = passwordValid;
            if (this.passwordValid) {
                this.joinLobby();
                this.needPassword = { needPassword: false };
            }
        });
    }

    private configureSocket(): void {
        this.socketManager.on(PUBLISH_CLASSIC_LOBBIES, (lobbies: AvailableClassicLobbies) => {
            this.lobbiesClassic = lobbies.availableLobbies;
        });
        this.socketManager.on(PUBLISH_COOPERATIVE_LOBBIES, (lobbies: AvailableCooperativeLobbies) => {
            this.lobbiesCooperative = lobbies.availableLobbies;
        });
        this.socketManager.on(PUBLISH_TOURNAMENT_LOBBIES, (lobbies: AvailableTournamentLobbies) => {
            this.lobbiesTournament = lobbies.availableLobbies;
        });
        this.socketManager.on(YOU_WERE_REJECTED, () => {
            this.waitingOnLobby = { isWaiting: false };
            this.isRejected = true;
        });
        this.socketManager.on(REDIRECT_TO_GAME, async () => {
            this.waitingOnLobby = { isWaiting: false };
            this.isRejected = false;
        });
    }

    private joinLobby(): void {
        if (this.needPassword.joiningType === JoiningType.Play) this.socketManager.send(JOIN_LOBBY, this.needPassword.lobbyId);
        else if (!this.needPassword.isGame) this.socketManager.send(ADD_OBSERVER_TO_LOBBY, this.needPassword.lobbyId);
        else if (this.needPassword.isTournament) this.socketManager.send(ADD_OBSERVER_TO_TOURNAMENT, this.needPassword.lobbyId);
        else this.socketManager.send(ADD_OBSERVER_TO_GAME, this.needPassword.lobbyId);
    }
}
