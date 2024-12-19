import 'package:Scrabble/data/models/enums/scrabble_enum.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

enum AppTheme { Default, Dark, UnderTheSea }

class ThemeEnum extends ScrabbleEnum<AppTheme> {
  ThemeEnum(AppTheme value) : super(value);

  @override
  Map<ThemeEnum, String> mapInternationalNames(AppLocalizations localization) =>
      {
        ThemeEnum(AppTheme.Default): localization.nameDefaultTheme,
        ThemeEnum(AppTheme.Dark): localization.nameDarkTheme,
        ThemeEnum(AppTheme.UnderTheSea): localization.nameUnderTheSeaTheme,
      };

  factory ThemeEnum.fromString(String value) {
    switch (value) {
      case 'Dark':
        return ThemeEnum(AppTheme.Dark);
      case 'UnderTheSea':
        return ThemeEnum(AppTheme.UnderTheSea);
      case 'Default':
      default:
        return ThemeEnum(AppTheme.Default);
    }
  }

  @override
  AppTheme fromString(String value) {
    switch (value) {
      case 'Dark':
        return AppTheme.Dark;
      case 'UnderTheSea':
        return AppTheme.UnderTheSea;
      case 'Default':
      default:
        return AppTheme.Default;
    }
  }

  @override
  String toEnumValueString() {
    switch (value) {
      case AppTheme.Default:
        return 'Default';
      case AppTheme.Dark:
        return 'Dark';
      case AppTheme.UnderTheSea:
        return 'UnderTheSea';
    }
  }
}
