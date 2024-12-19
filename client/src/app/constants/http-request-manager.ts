import { environment } from 'src/environments/environment';

export const GET_DICTIONARY_URL = environment.serverUrl + '/dictionaries/';
export const GET_TURN_TIMES_URL = environment.serverUrl + '/turnTimes';
export const GET_GAME_MODES_URL = environment.serverUrl + '/gameModes';
export const HISTORY_URL = environment.serverUrl + '/gameHistory';
export const LOGIN_URL = environment.serverUrl + '/authentication/login';
export const LOGOUT_URL = environment.serverUrl + '/authentication/logout/';
export const REGISTER_URL = environment.serverUrl + '/authentication/register';
export const LOBBY_URL = environment.serverUrl + '/lobby';
export const REPLAY_URL = environment.serverUrl + '/replay/';
export const VISIBILITY = environment.serverUrl + '/visibility';
export const USER_URL = environment.serverUrl + '/user/';
export const USER_CONNECTIONS_URL = environment.serverUrl + '/user/connections';
export const GAME_STATISTICS_URL = environment.serverUrl + '/gameHistory/statistic';
export const TOURNAMENT_STATISTICS_URL = environment.serverUrl + '/gameHistory/statistic/tournament';
