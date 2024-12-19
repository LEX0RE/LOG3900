import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/data/models/interfaces/user/user_login.dart';
import 'package:Scrabble/main.dart' as app;
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../test/constants/fake_register_login.dart';
import '../../test/mock/app_localization_mock.mocks.dart';

part 'chat_helper.dart';
part 'expect_helper.dart';
part 'form_helper.dart';
part 'get_to_helper.dart';
part 'tap_helper.dart';

class Helper {
  final WidgetTester tester;
  late final FormHelper form;
  late final TapHelper tap;
  late final MockFakeAppLocalizations localizations;
  late final GoToHelper goTo;
  late final ChatHelper chat;
  late final UserLogin userLogin;
  late final ExpectHelper expect;

  Helper(this.tester, {UserLogin? userLogin}) {
    form = FormHelper(tester, this);
    tap = TapHelper(tester, this);
    goTo = GoToHelper(tester, this);
    chat = ChatHelper(tester, this);
    expect = ExpectHelper(tester, this);
    this.userLogin = userLogin ?? const UserLogin(FAKE_LOGIN_NAME, FAKE_LOGIN_PASSWORD);
    localizations = MockFakeAppLocalizations();
  }

  Future<void> pause() async {
    if (const bool.fromEnvironment('CI', defaultValue: false)) return;
    await tester.pumpAndSettle(const Duration(minutes: 2));
  }

  Future<void> waitServer({Duration duration = const Duration(milliseconds: 800)}) async {
    await tester.pump();
    await tester.pumpAndSettle(duration);
  }

  Future<void> login() async {
    await expectLater(find.byKey(LOGIN_SCREEN), findsOneWidget);
    await form.fillTextField(LOGIN_USERNAME_KEY, userLogin.userName);
    await form.fillTextField(LOGIN_PASSWORD_KEY, userLogin.password);
    await tap.byKey(LOGIN_REGISTER_SUBMIT_BUTTON);
    await waitServer();
    await expectLater(find.byKey(HOME_SCREEN), findsOneWidget);
    await tester.pumpAndSettle();
  }

  Future<void> logout() async {
    await tap.byKey(LOGIN_OUT_BUTTON);
    await expectLater(find.byKey(LOGIN_SCREEN), findsOneWidget);
    await tester.pumpAndSettle();
  }
}
