import 'package:Scrabble/constants/form.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

String? validatePassword(String? value, AppLocalizations localizations) {
  if (value == null || value.isEmpty) return localizations.pleaseEnterText;
  if (value.length > MAX_LENGTH_PASSWORD_LOBBY) return localizations.passwordTooLong;
  if (value.length < MIN_LENGTH_PASSWORD_LOBBY) return localizations.passwordTooShort;
  return null;
}

String? validatePasswordGame(String? value) {
  if (value == null || value.isEmpty) return 'Empty!';
  return null;
}
