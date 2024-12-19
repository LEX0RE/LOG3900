import 'package:Scrabble/data/models/interfaces/game_info/game_update.dart';

// ignore: non_constant_identifier_names
final FAKE_GAME_UPDATE = () => GameUpdate.fromJson({
      'playerInfo': {
        'name': 'Player 1',
        'score': 0,
        'nLetterLeft': 7,
        'userId': '123',
        'turn': true,
      },
      'otherPlayersInfo': [
        {
          'name': 'Player 2',
          'score': 46,
          'nLetterLeft': 7,
          'turn': false,
          'userId': '123',
        },
        {
          'name': 'Player 3',
          'score': -8,
          'nLetterLeft': 4,
          'turn': false,
          'userId': '123',
        },
        {
          'name': 'Player 4',
          'score': 99,
          'nLetterLeft': 2,
          'turn': false,
          'userId': '123',
        },
      ],
      'stash': {
        'nLettersLeft': 100,
      },
    });
