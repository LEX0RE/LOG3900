import 'package:Scrabble/data/models/enums/scrabble_enum.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

enum LanguageType {
  French,
  English,
}

class LanguageEnum extends ScrabbleEnum<LanguageType> {
  LanguageEnum(LanguageType value) : super(value);

  @override
  Map<LanguageEnum, String> mapInternationalNames(
          AppLocalizations localization) =>
      {
        LanguageEnum(LanguageType.French): localization.nameFrench,
        LanguageEnum(LanguageType.English): localization.nameEnglish,
      };

  factory LanguageEnum.fromString(String value) {
    switch (value) {
      case 'fr':
        return LanguageEnum(LanguageType.French);
      case 'en':
      default:
        return LanguageEnum(LanguageType.English);
    }
  }

  @override
  LanguageType fromString(String value) {
    switch (value) {
      case 'en':
        return LanguageType.English;
      case 'fr':
      default:
        return LanguageType.French;
    }
  }

  @override
  String toEnumValueString() {
    switch (value) {
      case LanguageType.French:
        return 'fr';
      case LanguageType.English:
        return 'en';
    }
  }
}
