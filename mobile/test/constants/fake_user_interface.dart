import 'dart:convert';
import 'dart:typed_data';

import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/data/models/interfaces/user/user_login.dart';

const String FAKE_USER_NAME_1 = 'FAKE_USER_NAME_1';
const String FAKE_USER_PASSWORD_1 = 'FAKE_USER_PASSWORD_1';
const String FAKE_USER_EMAIL_1 = 'FAKE_USER_EMAIL_1';
final String FAKE_USER_PROFILE_PICTURE_1 = base64Encode(ByteData(10).buffer.asUint8List());
const String FAKE_USER_THEME_1 = 'classic';
const String FAKE_USER_LANGUAGE_1 = 'english';
const String FAKE_TOKEN_1 = 'FAKE_TOKEN_1';
const String FAKE_USER_ID = 'abc123';

final FAKE_USER_1 = () => UserInterface(FAKE_USER_NAME_1, FAKE_USER_PASSWORD_1, FAKE_USER_EMAIL_1,
    FAKE_USER_PROFILE_PICTURE_1, FAKE_USER_THEME_1, FAKE_USER_LANGUAGE_1, FAKE_TOKEN_1, FAKE_USER_ID, [], [], []);

const String FAKE_USER_NAME_2 = 'FAKE_USER_NAME_2';
const String FAKE_USER_PASSWORD_2 = 'FAKE_USER_PASSWORD_2';
const String FAKE_USER_EMAIL_2 = 'FAKE_USER_EMAIL_2';
final String FAKE_USER_PROFILE_PICTURE_2 = base64Encode(ByteData(20).buffer.asUint8List());
const String FAKE_USER_THEME_2 = 'FAKE_USER_THEME_2';
const String FAKE_USER_LANGUAGE_2 = 'FAKE_USER_LANGUAGE_2';
const String FAKE_USER_ID_2 = 'FAKE_USER_ID_2';

final FAKE_USER_2 = () => UserInterface(FAKE_USER_NAME_2, FAKE_USER_PASSWORD_2, FAKE_USER_EMAIL_2,
    FAKE_USER_PROFILE_PICTURE_2, FAKE_USER_THEME_2, FAKE_USER_LANGUAGE_2, FAKE_TOKEN_1, FAKE_USER_ID, [], [], []);

const String FAKE_USER_NAME_3 = 'FAKE_USER_NAME_3';
const String FAKE_USER_PASSWORD_3 = 'FAKE_USER_PASSWORD_3';
const String FAKE_USER_EMAIL_3 = 'FAKE_USER_EMAIL_3';
final String FAKE_USER_PROFILE_PICTURE_3 = base64Encode(ByteData(30).buffer.asUint8List());
const String FAKE_USER_THEME_3 = 'FAKE_USER_THEME_3';
const String FAKE_USER_LANGUAGE_3 = 'FAKE_USER_LANGUAGE_3';
const String FAKE_USER_ID_3 = 'FAKE_USER_ID_3';

final FAKE_USER_3 = () {
  return UserInterface(FAKE_USER_NAME_3, FAKE_USER_PASSWORD_3, FAKE_USER_EMAIL_3, FAKE_USER_PROFILE_PICTURE_3,
      FAKE_USER_THEME_3, FAKE_USER_LANGUAGE_3, FAKE_TOKEN_1, FAKE_USER_ID, [], [], []);
};

final FAKE_USER_LOGIN_INFO = () {
  return const UserLogin(
    FAKE_USER_NAME_1,
    FAKE_USER_PASSWORD_1,
  );
};

final FAKE_USER_LOGIN_INFO_2 = () {
  return const UserLogin(
    FAKE_USER_NAME_2,
    FAKE_USER_PASSWORD_2,
  );
};

final FAKE_USER_LOGIN_INFO_3 = () {
  return const UserLogin(
    FAKE_USER_NAME_3,
    FAKE_USER_PASSWORD_3,
  );
};
