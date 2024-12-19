import 'package:flutter_gen/gen_l10n/app_localizations.dart';

enum GameVisibilities {
  PUBLIC_NO_PASSWORD,
  PUBLIC_PASSWORD,
  PRIVATE,
}

String Function(GameVisibilities) gameVisibilityToString = (GameVisibilities gameVisibility) {
  switch (gameVisibility) {
    case GameVisibilities.PUBLIC_NO_PASSWORD:
      return 'publicNoPassword';
    case GameVisibilities.PUBLIC_PASSWORD:
      return 'publicPassword';
    case GameVisibilities.PRIVATE:
      return 'private';
    default:
      return '';
  }
};

bool Function(String) isPublic = (String visibility) {
  if (visibility == gameVisibilityToString(GameVisibilities.PRIVATE)) return false;
  return true;
};

bool Function(String) hasPassword = (String visibility) {
  if (visibility == gameVisibilityToString(GameVisibilities.PUBLIC_PASSWORD)) return true;
  return false;
};

String translateStringVisibility(AppLocalizations localization, String visibility) {
  switch (visibility) {
    case 'private':
      return localization.private;
    case 'publicPassword':
      return localization.publicPassword;
    case 'publicNoPassword':
    default:
      return localization.publicNoPassword;
  }
}
