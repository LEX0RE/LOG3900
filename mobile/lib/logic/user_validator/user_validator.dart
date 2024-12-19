import 'package:Scrabble/constants/form.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

String? validatePassword(String? value, AppLocalizations localizations) {
  if (value == null || value.isEmpty) return localizations.pleaseEnterText;
  if (value.length > MAX_LENGTH_PASSWORD) return localizations.passwordTooLong;
  if (value.length < MIN_LENGTH_PASSWORD) return localizations.passwordTooShort;
  return null;
}

String? validateUsername(String? value, AppLocalizations localizations) {
  if (value == null || value.isEmpty) return localizations.pleaseEnterText;
  if (value.length > MAX_LENGTH_USERNAME) return localizations.usernameTooLong;
  if (value.length < MIN_LENGTH_USERNAME) return localizations.usernameTooShort;
  if (!USERNAME_REGEX.hasMatch(value)) return localizations.usernameInvalid;
  return null;
}

String? validateEmail(String? value, AppLocalizations localizations) {
  if (value == null || value.isEmpty) return localizations.pleaseEnterText;
  if (value.length > MAX_LENGTH_EMAIL) return localizations.emailTooLong;

  if (!EMAIL_VALIDATION_REGEX.hasMatch(value)) return localizations.emailInvalid;
  return null;
}
