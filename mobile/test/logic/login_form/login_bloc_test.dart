import 'package:Scrabble/data/models/interfaces/user/user_login.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/form/login_form/login_bloc.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_user_interface.dart';
import '../../mock/app_localization_mock.mocks.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/class_mocks.mocks.dart';

void main() {
  group('LoginBloc', () {
    late LoginBloc bloc;
    late MockTextEditingController usernameController;
    late MockTextEditingController passwordController;
    late MockFakeAppLocalizations appLocalizations;
    late MockAuthenticationManagerBloc authenticationManager;
    late UserLogin userLogin;

    setUp(() {
      userLogin = FAKE_USER_LOGIN_INFO();
      usernameController = MockTextEditingController();
      passwordController = MockTextEditingController();
      appLocalizations = MockFakeAppLocalizations();
      authenticationManager = MockAuthenticationManagerBloc();

      when(usernameController.text).thenReturn(userLogin.userName);
      when(passwordController.text).thenReturn(userLogin.password);

      bloc = LoginBloc(
          usernameController: usernameController,
          passwordController: passwordController,
          localizations: appLocalizations,
          authenticationManager: authenticationManager);
    });

    tearDown(() => bloc.close());

    test('initial state is LoginInitial', () {
      expect(bloc.state, LoginInitial());
    });

    blocTest(
      'should emit LoginLoading and add AuthenticationManagerEventLogin on LoginEventLogin',
      build: () => bloc,
      act: (LoginBloc bloc) => bloc.add(LoginEventLogin()),
      expect: () => [LoginLoading()],
      verify: (_) {
        verify(authenticationManager.add(AuthenticationManagerEventLogin(userLogin))).called(1);
      },
    );

    test('usernameValidator should validate userName', () {
      expect(bloc.usernameValidator(''), appLocalizations.pleaseEnterText);
      expect(bloc.usernameValidator('a' * 16), appLocalizations.usernameTooLong);
      expect(bloc.usernameValidator('a'), appLocalizations.usernameTooShort);
      expect(bloc.usernameValidator('lala*@#'), appLocalizations.usernameInvalid);
      expect(bloc.usernameValidator('lala'), null);
    });

    test('passwordValidator should validate password', () {
      expect(bloc.passwordValidator(''), appLocalizations.pleaseEnterText);
      expect(bloc.passwordValidator('a' * 31), appLocalizations.passwordTooLong);
      expect(bloc.passwordValidator('a' * 4), appLocalizations.passwordTooShort);
      expect(bloc.passwordValidator('12345678'), null);
    });
  });
}
