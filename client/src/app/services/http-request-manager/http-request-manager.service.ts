import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    GAME_STATISTICS_URL,
    GET_DICTIONARY_URL,
    GET_GAME_MODES_URL,
    GET_TURN_TIMES_URL,
    HISTORY_URL,
    LOBBY_URL,
    LOGIN_URL,
    REGISTER_URL,
    REPLAY_URL,
    TOURNAMENT_STATISTICS_URL,
    USER_CONNECTIONS_URL,
    USER_URL,
    VISIBILITY,
} from '@app/constants/http-request-manager';
import { Dictionary, DictionaryWithWords } from '@app/interface/dictionary';
import { ID_TOKEN } from '@common/constants/authentication';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { LobbyCreation } from '@common/interfaces/lobby/lobby-creation';
import { LobbyPassword } from '@common/interfaces/lobby/lobby-password';
import { Profile } from '@common/interfaces/profile';
import { GameHistories } from '@common/interfaces/replay/game-histories';
import { Replay } from '@common/interfaces/replay/replay';
import { UserConnections } from '@common/interfaces/user/user-connections';
import { UserGameStatistic } from '@common/interfaces/user/user-game-statistic';
import { UsersLogin } from '@common/interfaces/user/user-login';
import { UserTournamentStatistic } from '@common/interfaces/user/user-tournament-statistic';
import { UserUpdate } from '@common/interfaces/user/user-update';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpRequestManagerService {
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    getDictionaries(): Observable<Dictionary[]> {
        return this.http.get<Dictionary[]>(GET_DICTIONARY_URL);
    }

    getTurnTimes(): Observable<CommonTimer[]> {
        return this.http.get<CommonTimer[]>(GET_TURN_TIMES_URL);
    }

    getGameStatistics(): Observable<UserGameStatistic> {
        return this.http.get<UserGameStatistic>(GAME_STATISTICS_URL);
    }

    getTournamentStatistics(): Observable<UserTournamentStatistic> {
        return this.http.get<UserTournamentStatistic>(TOURNAMENT_STATISTICS_URL);
    }

    getConnectionSummary(): Observable<UserConnections> {
        return this.http.get<UserConnections>(USER_CONNECTIONS_URL);
    }

    getHistory(): Observable<GameHistories> {
        return this.http.get<GameHistories>(HISTORY_URL);
    }

    getGameModes(): Observable<string[]> {
        return this.http.get<string[]>(GET_GAME_MODES_URL);
    }

    getReplay(gameId: string): Observable<Replay> {
        return this.http.get<Replay>(REPLAY_URL + gameId);
    }

    getDictionary(title: string): Observable<DictionaryWithWords> {
        return this.http.get<DictionaryWithWords>(GET_DICTIONARY_URL + title);
    }

    updateProfile(userUpdate: UserUpdate) {
        return this.http.patch<Profile>(USER_URL, userUpdate);
    }

    createLobby(lobbyCreation: LobbyCreation): Observable<void> {
        return this.http.post<void>(LOBBY_URL, lobbyCreation, {
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention -- library name
                Authorization: 'Bearer ' + localStorage.getItem(ID_TOKEN) ?? '',
            },
        });
    }

    register(user: Profile): Observable<Profile> {
        return this.http.post<Profile>(REGISTER_URL, user);
    }

    login(user: UsersLogin): Observable<Profile> {
        return this.http.post<Profile>(LOGIN_URL, user);
    }

    verifyPassword(lobbyPassword: LobbyPassword): Observable<boolean> {
        return this.http.post<boolean>(VISIBILITY, lobbyPassword);
    }
}
