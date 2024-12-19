import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/data/models/enums/game_visibilities.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_timer.dart';
import 'package:Scrabble/data/models/interfaces/lobby/common_game_config.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';

const User EMPTY_USER = User('', '');
const CommonGameConfig EMPTY_COMMON_GAME_CONFIG2 =
    CommonGameConfig(turnTimer: CommonTimer(0, 0), dictionaryTitle: '', creator: EMPTY_USER);
final LobbyInfo EMPTY_LOBBY_CLASSIC = LobbyInfo(
    EMPTY_COMMON_GAME_CONFIG2,
    gameVisibilityToString(GameVisibilities.PUBLIC_NO_PASSWORD),
    '',
    '',
    [],
    [],
    [],
    gameModeToString(GameModes.CLASSIC),
    [],
    []);
final LobbyInfo EMPTY_LOBBY_TOURNAMENT = LobbyInfo(
    EMPTY_COMMON_GAME_CONFIG2,
    gameVisibilityToString(GameVisibilities.PUBLIC_NO_PASSWORD),
    '',
    '',
    [],
    [],
    [],
    gameModeToString(GameModes.TOURNAMENT),
    [],
    []);

LobbyInfo EMPTY_LOBBY = LobbyInfo(
    EMPTY_COMMON_GAME_CONFIG2,
    gameVisibilityToString(GameVisibilities.PUBLIC_NO_PASSWORD),
    '',
    '',
    [],
    [],
    [],
    gameModeToString(GameModes.TOURNAMENT),
    [],
    []);

const int N_MINIMUM_PLAYERS_LOBBY = 2;
