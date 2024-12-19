import 'package:Scrabble/data/models/enums/scrabble_enum.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

enum ActionType {
  PLACE_LETTER,
  HELP,
  HINT,
  TRADE,
  SKIP_TURN,
  STASH,
}

String Function(ActionType) actionTypeToString = (ActionType actionType) {
  switch (actionType) {
    case ActionType.PLACE_LETTER:
      return '!placer';
    case ActionType.HELP:
      return '!aide';
    case ActionType.HINT:
      return '!indice';
    case ActionType.TRADE:
      return '!échanger';
    case ActionType.SKIP_TURN:
      return '!passer';
    case ActionType.STASH:
      return '!réserve';
    default:
      return '';
  }
};

class ActionEnum extends ScrabbleEnum<ActionType> {
  const ActionEnum(ActionType value) : super(value);

  @override
  Map<ActionEnum, String> mapInternationalNames(AppLocalizations localization) => {
        const ActionEnum(ActionType.PLACE_LETTER): localization.placeLetter,
        const ActionEnum(ActionType.HELP): localization.help,
        const ActionEnum(ActionType.HINT): localization.hint,
        const ActionEnum(ActionType.SKIP_TURN): localization.skipTurn,
        const ActionEnum(ActionType.STASH): localization.stash,
        const ActionEnum(ActionType.TRADE): localization.trade,
      };

  factory ActionEnum.fromString(String value) {
    if (value.contains('!placer')) return const ActionEnum(ActionType.PLACE_LETTER);
    if (value.contains('!aide')) return const ActionEnum(ActionType.HELP);
    if (value.contains('!indice')) return const ActionEnum(ActionType.HINT);
    if (value.contains('!échanger')) return const ActionEnum(ActionType.TRADE);
    if (value.contains('!passer')) return const ActionEnum(ActionType.SKIP_TURN);
    if (value.contains('!réserve')) return const ActionEnum(ActionType.STASH);
    return const ActionEnum(ActionType.SKIP_TURN);
  }

  @override
  ActionType fromString(String value) {
    if (value.contains('!placer')) return ActionType.PLACE_LETTER;
    if (value.contains('!aide')) return ActionType.HELP;
    if (value.contains('!indice')) return ActionType.HINT;
    if (value.contains('!échanger')) return ActionType.TRADE;
    if (value.contains('!passer')) return ActionType.SKIP_TURN;
    if (value.contains('!réserve')) return ActionType.STASH;
    return ActionType.SKIP_TURN;
  }

  @override
  String toEnumValueString() {
    switch (value) {
      case ActionType.PLACE_LETTER:
        return '!placer';
      case ActionType.HELP:
        return '!aide';
      case ActionType.HINT:
        return '!indice';
      case ActionType.TRADE:
        return '!échanger';
      case ActionType.SKIP_TURN:
        return '!passer';
      case ActionType.STASH:
        return '!réserve';
      default:
        return '';
    }
  }
}
