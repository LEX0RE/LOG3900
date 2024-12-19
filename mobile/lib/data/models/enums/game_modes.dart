import 'package:Scrabble/data/models/enums/scrabble_enum.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

enum GameModes {
  CLASSIC,
  TOURNAMENT,
  COOPERATIVE,
}

String Function(GameModes) gameModeToString = (GameModes gameMode) {
  switch (gameMode) {
    case GameModes.CLASSIC:
      return 'classic';
    case GameModes.TOURNAMENT:
      return 'tournament';
    case GameModes.COOPERATIVE:
      return 'cooperative';
    default:
      return '';
  }
};

class GameModesEnum extends ScrabbleEnum<GameModes> {
  const GameModesEnum(GameModes value) : super(value);

  @override
  Map<GameModesEnum, String> mapInternationalNames(AppLocalizations localization) => {
        GameModesEnum(GameModes.CLASSIC): localization.classic,
        GameModesEnum(GameModes.TOURNAMENT): localization.tournament,
        GameModesEnum(GameModes.COOPERATIVE): localization.cooperative,
      };

  factory GameModesEnum.fromString(String value) {
    switch (value) {
      case 'classic':
        return GameModesEnum(GameModes.CLASSIC);
      case 'tournament':
        return GameModesEnum(GameModes.TOURNAMENT);
      case 'cooperative':
        return GameModesEnum(GameModes.COOPERATIVE);
      default:
        return GameModesEnum(GameModes.CLASSIC);
    }
  }

  @override
  GameModes fromString(String value) {
    switch (value) {
      case 'classic':
        return GameModes.CLASSIC;
      case 'tournament':
        return GameModes.TOURNAMENT;
      case 'cooperative':
        return GameModes.COOPERATIVE;
      default:
        return GameModes.CLASSIC;
    }
  }

  @override
  String toEnumValueString() {
    switch (value) {
      case GameModes.CLASSIC:
        return 'classic';
      case GameModes.TOURNAMENT:
        return 'tournament';
      case GameModes.COOPERATIVE:
        return 'cooperative';
      default:
        return 'classic';
    }
  }
}
