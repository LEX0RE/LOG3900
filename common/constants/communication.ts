export const MESSAGE: string = 'message';
export const MESSAGES: string = 'messages';
export const JOIN_AVAILABLE_CHAT: string = 'join_available_chat';
export const LEAVE_AVAILABLE_CHAT: string = 'leave_available_chat';
export const AVAILABLE_CHATS: string = 'available_chats';
export const JOIN_CHAT: string = 'join_chat';
export const LEAVE_CHAT: string = 'leave_chat';
export const DELETE_CHAT: string = 'delete_chat';
export const CREATE_CHAT: string = 'create_chat';
export const NEED_CHAT: string = 'need_chat';
export const REFRESH_CHAT: string = 'refresh_chat';
export const LEAVE_GAME: string = 'leave_game';

export const CONNECTION: string = 'connection';
export const CONNECT: string = 'connect';
export const RECONNECTION: string = 'reconnection';
export const DISCONNECT: string = 'disconnect';

export const JOIN_ROOM: string = 'join_room';
export const ROOM_ASSIGN: string = 'room_assign';
export const SURRENDER_EVENT: string = 'surrender';
export const SURRENDER_TOURNAMENT_EVENT: string = 'surrender_tournament';
export const LEAVE_TOURNAMENT: string = 'leave_tournament';
export const TOURNAMENT_CONTINUE_EVENT: string = 'tournament_continue';
export const GAME_CONTINUE_EVENT: string = 'game_continue';
export const END_GAME: string = 'end_game';

export const GAME_UPDATE: string = 'game_update';
export const BOARD_UPDATE: string = 'game_board_update';
export const EASEL_UPDATE: string = 'easel_update';
export const TIMER: string = 'game_timer';

export const ACTION_SUGGESTION: string = 'action_suggestion';
export const NEW_ACTION_TO_APPROVE: string = 'new_action_to_approve';
export const ACTION_APPROVAL: string = 'action_approved';
export const ACTION_REJECTION: string = 'action_rejected';
export const APPROVALS_LIST_UPDATE: string = 'approvals_list_updated';
export const ACTION_CANCELLATION: string = 'action_cancelled';
export const ACTION_HAS_BEEN_CANCELLED: string = 'action_has_been_cancelled';
export const ACTION_APPROVED_BY_ALL: string = 'action_approved_by_all';
export const ACTION_CONFIRMATION: string = 'action_confirmed';

export const TOURNAMENT_UPDATE: string = 'tournament_update';
export const END_TOURNAMENT: string = 'end_tournament';

export const AVAILABLE_GAMES: string = 'available_games';
export const CREATE_GAME: string = 'create_game';
export const CHANGE_DICTIONARY: string = 'change_dictionary';
export const GAME_CREATION_CONFIRM: string = 'game_creation_confirmation';
export const GET_AVAILABLE_GAME: string = 'give_available_games';
export const JOIN_GAME: string = 'join_game';
export const JOIN_RANDOM_GAME: string = 'join_random_game';
export const CREATE_SOLO_GAME: string = 'create_solo_game';

export const JOIN_GAME_CONFIRMATION_PLAYER: string = 'join_game_confirmation_player';
export const HEY_I_WANNA_JOIN_THIS_GAME: string = 'hey_i_wanna_join_this_game';
export const REJECT_THAT_PLAYER_FROM_JOINING: string = 'reject_that_player_from_joining';
export const YOU_WERE_REJECTED: string = 'you_were_rejected';
export const CANCEL_JOIN_REQUEST: string = 'cancel_join_request';
export const CANCEL_GAME_CREATION: string = 'cancel_game_creation';

export const ADD_OBSERVER_TO_LOBBY: string = 'add_observer_to_lobby';
export const ADD_OBSERVER_TO_GAME: string = 'add_observer_to_game';
export const ADD_OBSERVER_TO_TOURNAMENT: string = 'add_observer_to_tournament';

export const SYSTEM: string = 'system';
export const ID: string = 'id';

export const MIN_PER_ROOM: number = 0;
export const MAX_PER_ROOM: number = 2;
export const MAX_ROOM_PER_USER: number = 2;
export const DEFAULT_ROOM_NUMBER: number = 1;
export const MAX_LENGTH_MESSAGE: number = 512;
export const MAX_TIME_BEFORE_KICK: number = 5000;

export const GOAL_UPDATE: string = 'goal_update';

export const GET_EASEL: string = 'get_easel';

export const SUBSCRIBE_CLASSIC_LOBBIES = 'subscribe_classic_lobbies';
export const UNSUBSCRIBE_CLASSIC_LOBBIES = 'unsubscribe_classic_lobbies';
export const PUBLISH_CLASSIC_LOBBIES = 'publish_classic_lobbies';

export const SUBSCRIBE_CLASSIC_GAMES = 'subscribe_classic_games';
export const UNSUBSCRIBE_CLASSIC_GAMES = 'unsubscribe_classic_games';
export const PUBLISH_CLASSIC_GAMES = 'publish_classic_games';

export const SUBSCRIBE_TOURNAMENT_LOBBIES = 'subscribe_tournament_lobbies';
export const UNSUBSCRIBE_TOURNAMENT_LOBBIES = 'unsubscribe_tournament_lobbies';
export const PUBLISH_TOURNAMENT_LOBBIES = 'publish_tournament_lobbies';

export const SUBSCRIBE_TOURNAMENT_GAMES = 'subscribe_tournament_games';
export const UNSUBSCRIBE_TOURNAMENT_GAMES = 'unsubscribe_tournament_games';
export const PUBLISH_TOURNAMENT_GAMES = 'publish_tournament_games';

export const SUBSCRIBE_COOPERATIVE_LOBBIES = 'subscribe_cooperative_lobbies';
export const UNSUBSCRIBE_COOPERATIVE_LOBBIES = 'unsubscribe_cooperative_lobbies';
export const PUBLISH_COOPERATIVE_LOBBIES = 'publish_cooperative_lobbies';

export const SUBSCRIBE_COOPERATIVE_GAMES = 'subscribe_cooperative_games';
export const UNSUBSCRIBE_COOPERATIVE_GAMES = 'unsubscribe_cooperative_games';
export const PUBLISH_COOPERATIVE_GAMES = 'publish_cooperative_games';

export const JOIN_LOBBY = 'join_lobby';
export const LEAVE_LOBBY = 'leave_lobby';
export const INVITE_FRIEND = 'invite_friend';
export const SEND_INVITATION = 'send_invitation';
export const DECISION_TO_JOIN = 'decision_to_join';
export const NOT_AVAILABLE = 'not_available';
export const PUBLISH_LOBBY_INFO = 'publish_lobby_info';
export const START_GAME = 'start_game';
export const START_TOURNAMENT = 'start_tournament';
export const PUBLISH_TOURNAMENT_INFO = 'publish_tournament_info';

export const REDIRECT_TO_GAME = 'redirect_to_game';
export const REDIRECT_TO_OBSERVE = 'redirect_to_observe';
export const REDIRECT_TO_TOURNAMENT = 'redirect_to_tournament';
export const REDIRECT_TO_HOME = 'redirect_to_home';

export const COMMAND = 'command';

export const HINT_COMMAND_RESULTS = 'hint_command_results';
export const HINT_COMMAND_PARTIAL_RESULTS = 'hint_command_partial_results';
export const HINT_COMMAND_NO_RESULT = 'hint_no_result';
export const RESEARCH_HINT = 'research_hint';
export const GET_SOCIAL = 'get_social';
export const UPDATE_FRIENDS = 'update_friends';
export const UPDATE_FRIENDS_REQUEST = 'update_friends_request';
export const UPDATE_USER_BLOCK = 'update_user_block';
export const SEND_REQUEST = 'send_request';
export const REMOVE_USER_FROM_BLOCK = 'remove_user_from_block';
export const ADD_USER_TO_BLOCK = 'add_user_to_block';
export const REMOVE_FRIEND = 'remove_friend';
export const ACCEPT_FRIEND = 'accept_friend';
export const REFUSE_FRIEND = 'refuse_friend';

export const NEW_TURN = 'new_turn';
export const STOP_OBSERVING_LOBBY = 'stop_observing_lobby';
export const STOP_OBSERVING_GAME = 'stop_observing_game';
export const STOP_OBSERVING_TOURNAMENT = 'stop_observing_tournament';
