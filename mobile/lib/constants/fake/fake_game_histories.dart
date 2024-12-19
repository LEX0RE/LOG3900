import 'package:Scrabble/constants/fake/fake_user.dart';
import 'package:Scrabble/data/models/interfaces/game_history/game_histories.dart';
import 'package:Scrabble/data/models/interfaces/game_history/game_info_history.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_REAL_PLAYERS_1 = () => [FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3(), FAKE_USER_4()];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_REAL_PLAYERS_2 = () => [FAKE_USER_5(), FAKE_USER_6(), FAKE_USER_7(), FAKE_USER_8()];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_REAL_PLAYERS_3 = () => [FAKE_USER_9(), FAKE_USER_1(), FAKE_USER_2(), FAKE_USER_3()];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_REAL_PLAYERS_4 = () => [FAKE_USER_4(), FAKE_USER_5(), FAKE_USER_6(), FAKE_USER_7()];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_WINNERS_1 = () => [FAKE_REAL_PLAYERS_1()[0]];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_WINNERS_2 = () => [FAKE_REAL_PLAYERS_2()[0]];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_WINNERS_3 = () => [FAKE_REAL_PLAYERS_3()[0]];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_WINNERS_4 = () => [FAKE_REAL_PLAYERS_4()[0]];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_LOSERS_1 =
    () => [FAKE_REAL_PLAYERS_1()[1], FAKE_REAL_PLAYERS_1()[2], FAKE_REAL_PLAYERS_1()[3]];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_LOSERS_2 =
    () => [FAKE_REAL_PLAYERS_2()[1], FAKE_REAL_PLAYERS_2()[2], FAKE_REAL_PLAYERS_2()[3]];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_LOSERS_3 =
    () => [FAKE_REAL_PLAYERS_3()[1], FAKE_REAL_PLAYERS_3()[2], FAKE_REAL_PLAYERS_3()[3]];

// ignore: non_constant_identifier_names
final List<User> Function() FAKE_LOSERS_4 =
    () => [FAKE_REAL_PLAYERS_4()[1], FAKE_REAL_PLAYERS_4()[2], FAKE_REAL_PLAYERS_4()[3]];

// ignore: non_constant_identifier_names
final GameInfoHistory Function() FAKE_GAME_INFO_HISTORY_1 = () => GameInfoHistory(
      'gameId1',
      FAKE_REAL_PLAYERS_1(),
      DateTime.now(),
      6000,
      FAKE_WINNERS_1(),
      FAKE_LOSERS_1(),
    );

// ignore: non_constant_identifier_names
final GameInfoHistory Function() FAKE_GAME_INFO_HISTORY_2 = () => GameInfoHistory(
      'gameId2',
      FAKE_REAL_PLAYERS_2(),
      DateTime.now(),
      8000,
      FAKE_WINNERS_2(),
      FAKE_LOSERS_2(),
    );

// ignore: non_constant_identifier_names
final GameInfoHistory Function() FAKE_GAME_INFO_HISTORY_3 = () => GameInfoHistory(
      'gameId3',
      FAKE_REAL_PLAYERS_3(),
      DateTime.now(),
      10000,
      FAKE_WINNERS_3(),
      FAKE_LOSERS_3(),
    );

// ignore: non_constant_identifier_names
final GameInfoHistory Function() FAKE_GAME_INFO_HISTORY_4 = () => GameInfoHistory(
      'gameId4',
      FAKE_REAL_PLAYERS_4(),
      DateTime.now(),
      12000,
      FAKE_WINNERS_4(),
      FAKE_LOSERS_4(),
    );

// ignore: non_constant_identifier_names
final GameHistories Function() FAKE_GAME_HISTORIES = () => GameHistories([
      FAKE_GAME_INFO_HISTORY_1(),
      FAKE_GAME_INFO_HISTORY_2(),
      FAKE_GAME_INFO_HISTORY_3(),
      FAKE_GAME_INFO_HISTORY_4(),
    ]);
