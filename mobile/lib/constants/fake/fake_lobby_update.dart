import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/data/models/interfaces/lobby/available_lobbies.dart';
import 'package:Scrabble/data/models/interfaces/lobby/common_game_config.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';

// ignore: non_constant_identifier_names
final FAKE_USER_1 = () => User.fromJson({'name': 'user1', 'id': '1'});

// ignore: non_constant_identifier_names
final FAKE_USER_2 = () => User.fromJson({'name': 'user2', 'id': '2'});

// ignore: non_constant_identifier_names
final FAKE_USER_3 = () => User.fromJson({'name': 'user3', 'id': '3'});

// ignore: non_constant_identifier_names
final FAKE_USER_4 = () => User.fromJson({'name': 'user4', 'id': '4'});

final FAKE_COMMON_GAME_CONFIG_2 = () => CommonGameConfig.fromJson({
      'turnTimer': {'minute': 1, 'second': 0},
      'dictionaryTitle': 'français',
      'creator': FAKE_USER_1().toJson()
    });

final FAKE_LOBBY_CLASSIC_UPDATE = () => LobbyInfo.fromJson({
      'gameConfig': {
        'turnTimer': {'minute': 1, 'second': 0},
        'dictionaryTitle': 'français',
        'creator': FAKE_USER_1().toJson()
      },
      'visibility': 'publicNoPassword',
      'lobbyId': '1',
      'chatId': '1',
      'players': [FAKE_USER_1().toJson(), FAKE_USER_2().toJson()],
      'observers': [],
      'virtualPlayerNames': ['virtualPlayer1'],
      'gameMode': gameModeToString(GameModes.CLASSIC),
      'playerResponse': [],
      'potentialPlayers': [FAKE_USER_1().toJson()]
    });

final FAKE_LOBBY_CLASSIC_UPDATE_WITH_ONE_PLAYER = () => LobbyInfo.fromJson({
      'gameConfig': {
        'turnTimer': {'minute': 1, 'second': 0},
        'dictionaryTitle': 'français',
        'creator': FAKE_USER_1().toJson()
      },
      'visibility': 'publicNoPassword',
      'lobbyId': '1',
      'chatId': '1',
      'players': [FAKE_USER_1().toJson()],
      'observers': [],
      'virtualPlayerNames': ['virtualPlayer1'],
      'gameMode': gameModeToString(GameModes.CLASSIC),
      'playerResponse': [],
      'potentialPlayers': [FAKE_USER_1().toJson()]
    });

final FAKE_AVAILABLE_CLASSIC_LOBBIES_UPDATE = () => AvailableLobbies.fromJson({
      'availableLobbies': [
        {
          'gameConfig': {
            'turnTimer': {
              'minute': 1,
              'second': 30,
            },
            'dictionaryTitle': 'français',
            'creator': FAKE_USER_1().toJson()
          },
          'visibility': 'publicNoPassword',
          'lobbyId': '4',
          'chatId': '4',
          'players': [
            FAKE_USER_1().toJson(),
          ],
          'observers': [
            FAKE_USER_3().toJson(),
          ],
          'virtualPlayerNames': [],
          'gameMode': gameModeToString(GameModes.CLASSIC),
          'potentialPlayers': [FAKE_USER_1().toJson()],
          'playerResponse': [],
        },
        {
          'gameConfig': {
            'turnTimer': {
              'minute': 1,
              'second': 30,
            },
            'dictionaryTitle': 'anglais',
            'creator': FAKE_USER_2().toJson()
          },
          'visibility': 'publicNoPassword',
          'lobbyId': '4',
          'chatId': '4',
          'players': [
            FAKE_USER_2().toJson(),
          ],
          'observers': [
            FAKE_USER_4().toJson(),
          ],
          'virtualPlayerNames': [],
          'gameMode': gameModeToString(GameModes.CLASSIC),
          'potentialPlayers': [FAKE_USER_1().toJson()],
          'playerResponse': [],
        }
      ]
    });

const String FAKE_LOBBY_ID = '2';
