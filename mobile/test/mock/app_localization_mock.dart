import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:mockito/annotations.dart';

@GenerateNiceMocks([MockSpec<FakeAppLocalizations>()])
abstract class FakeAppLocalizations implements AppLocalizations {
  @override
  String pleaseEnterText = 'Please enter text';
  @override
  String usernameTooLong = 'Username too long';
  @override
  String usernameTooShort = 'Username too short';
  @override
  String usernameInvalid = 'Username is invalid';
  @override
  String passwordTooLong = 'Password too long';
  @override
  String passwordTooShort = 'Password too short';
  @override
  String passwordsDoNotMatch = 'Passwords do not match';
  @override
  String signUp = 'Sign up';
  @override
  String emailTooLong = 'Email is too long';
  @override
  String emailInvalid = 'Email is invalid';
  @override
  String blankLetterRequired = 'Blank letter is required';
  @override
  String blankLetterTooLong = 'It must be only one letter';
  @override
  String blankLetterInvalid = 'It must be a letter';
  @override
  String frenchDictionary = 'French';
  @override
  String englishDictionary = 'English';
}
