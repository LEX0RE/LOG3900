import 'package:Scrabble/data/models/enums/scrabble_enum.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

enum ActionResponseType {
  Approved,
  Rejected,
  NoResponse,
}

class ActionResponseEnum extends ScrabbleEnum<ActionResponseType> {
  const ActionResponseEnum(ActionResponseType value) : super(value);

  factory ActionResponseEnum.fromString(String value) {
    switch (value) {
      case 'approved':
        return const ActionResponseEnum(ActionResponseType.Approved);
      case 'rejected':
        return const ActionResponseEnum(ActionResponseType.Rejected);
      case 'noResponse':
        return const ActionResponseEnum(ActionResponseType.NoResponse);
      default:
        return const ActionResponseEnum(ActionResponseType.NoResponse);
    }
  }

  @override
  ActionResponseType fromString(String value) {
    switch (value) {
      case 'approved':
        return ActionResponseType.Approved;
      case 'rejected':
        return ActionResponseType.Rejected;
      case 'noResponse':
        return ActionResponseType.NoResponse;
      default:
        return ActionResponseType.NoResponse;
    }
  }

  @override
  Map<ScrabbleEnum<ActionResponseType>, String> mapInternationalNames(AppLocalizations localization) => {
        const ActionResponseEnum(ActionResponseType.Approved): localization.approved,
        const ActionResponseEnum(ActionResponseType.Rejected): localization.rejected,
        const ActionResponseEnum(ActionResponseType.NoResponse): localization.noResponse,
      };

  @override
  String toEnumValueString() {
    switch (value) {
      case ActionResponseType.Approved:
        return 'approved';
      case ActionResponseType.Rejected:
        return 'rejected';
      case ActionResponseType.NoResponse:
        return 'noResponse';
      default:
        return 'noResponse';
    }
  }
}
