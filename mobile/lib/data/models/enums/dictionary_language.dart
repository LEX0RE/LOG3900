import 'package:flutter_gen/gen_l10n/app_localizations.dart';

enum DictionaryLanguage {
  French,
  English,
}

String Function(DictionaryLanguage) dictionaryToString = (DictionaryLanguage dictionary) {
  switch (dictionary) {
    case DictionaryLanguage.English:
      return 'English';
    case DictionaryLanguage.French:
    default:
      return 'Français';
  }
};

Map<DictionaryLanguage, String> mapDictionaryNames(AppLocalizations localization) => {
      DictionaryLanguage.French: localization.frenchDictionary,
      DictionaryLanguage.English: localization.englishDictionary,
    };

String convertToCommonDictionary(String newDictionary, AppLocalizations localization) {
  Map<DictionaryLanguage, String> dictionaryNames = mapDictionaryNames(localization);
  DictionaryLanguage dictionary = dictionaryNames.keys
      .firstWhere((key) => dictionaryNames[key] == newDictionary, orElse: () => DictionaryLanguage.French);
  return dictionaryToString(dictionary);
}
