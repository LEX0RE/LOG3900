import 'dart:typed_data';

import 'package:Scrabble/constants/avatars.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/logic/form/register_form/register_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_user_interface.dart';
import '../../mock/app_localization_mock.mocks.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/class_mocks.mocks.dart';

void main() {
  group('RegisterBloc', () {
    late RegisterBloc bloc;
    late MockTextEditingController usernameController;
    late MockTextEditingController passwordController;
    late MockTextEditingController emailController;
    late MockImagePicker imagePicker;
    late MockAssetBundle assetBundle;
    late MockFakeAppLocalizations appLocalizations;
    late MockAuthenticationManagerBloc authenticationManager;
    late ByteData byteData;
    late Uint8List image;
    late UserInterface user;

    setUp(() {
      usernameController = MockTextEditingController();
      passwordController = MockTextEditingController();
      emailController = MockTextEditingController();
      appLocalizations = MockFakeAppLocalizations();
      authenticationManager = MockAuthenticationManagerBloc();
      imagePicker = MockImagePicker();
      assetBundle = MockAssetBundle();
      byteData = ByteData(10);
      image = byteData.buffer.asUint8List();
      user = FAKE_USER_1();

      when(assetBundle.load(any)).thenAnswer((_) => Future.value(byteData));

      when(usernameController.text).thenReturn(user.userName);
      when(passwordController.text).thenReturn(user.password);
      when(emailController.text).thenReturn(user.email);

      bloc = RegisterBloc(
          localizations: appLocalizations,
          authenticationManager: authenticationManager,
          usernameController: usernameController,
          emailController: emailController,
          passwordController: passwordController,
          imagePicker: imagePicker,
          assets: assetBundle);
    });

    tearDown(() => bloc.close());

    test('initial state', () {
      expect(bloc.state, RegisterStateProfilePictureChanged(image: image));
      verify(assetBundle.load(AVATARS[1])).called(1);
    });

    blocTest(
      'nextPredefined should emit RegisterStateProfilePictureChanged in right order',
      build: () => bloc,
      act: (RegisterBloc bloc) {
        for (int i = 0; i < AVATARS.length; i++) {
          bloc.nextPredefined();
        }
      },
      verify: (_) {
        for (int i = 1; i < AVATARS.length - 1; i++) {
          verify(assetBundle.load(AVATARS[i])).called(greaterThanOrEqualTo(1));
        }
        verify(assetBundle.load(AVATARS[0])).called(1);
      },
    );

    blocTest(
      'previousPredefined should emit RegisterStateProfilePictureChanged in right order',
      build: () => bloc,
      act: (RegisterBloc bloc) {
        for (int i = 0; i < AVATARS.length; i++) {
          bloc.previousPredefined();
        }
      },
      verify: (_) {
        verify(assetBundle.load(AVATARS[0])).called(1);
        for (int i = AVATARS.length - 1; i > 1; i--) {
          verify(assetBundle.load(AVATARS[i])).called(greaterThanOrEqualTo(1));
        }
      },
    );

    blocTest(
      'should emit RegisterLoading and add AuthenticationManagerEventRegister on RegisterEventRegister',
      build: () => bloc,
      act: (RegisterBloc bloc) => bloc.submit(),
      expect: () => [RegisterLoading()],
      verify: (_) => verify(authenticationManager.add(any)).called(1),
    );

    test('usernameValidator should validate userName', () {
      expect(bloc.usernameValidator(null), appLocalizations.pleaseEnterText);
      expect(bloc.usernameValidator(''), appLocalizations.pleaseEnterText);
      expect(bloc.usernameValidator('a' * 16), appLocalizations.usernameTooLong);
      expect(bloc.usernameValidator('a'), appLocalizations.usernameTooShort);
      expect(bloc.usernameValidator('lala*@#'), appLocalizations.usernameInvalid);
      expect(bloc.usernameValidator('lala'), null);
    });

    test('passwordValidator should validate password', () {
      expect(bloc.usernameValidator(null), appLocalizations.pleaseEnterText);
      expect(bloc.passwordValidator(''), appLocalizations.pleaseEnterText);
      expect(bloc.passwordValidator('a' * 31), appLocalizations.passwordTooLong);
      expect(bloc.passwordValidator('a' * 4), appLocalizations.passwordTooShort);
      expect(bloc.passwordValidator(user.password), null);
    });

    test('emailValidator should validate email', () {
      expect(bloc.emailValidator(null), appLocalizations.pleaseEnterText);
      expect(bloc.emailValidator(''), appLocalizations.pleaseEnterText);
      expect(bloc.emailValidator('a'), appLocalizations.emailInvalid);
      expect(bloc.emailValidator('a@a'), appLocalizations.emailInvalid);
      expect(bloc.emailValidator('abc@gmail.com'), null);
      expect(
          bloc.emailValidator(
              'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwdfgdsdfdfffffffffffffffffffffwwwwwwwwwwwwwwwwwwerdcdcvbvva@a.com'),
          appLocalizations.emailTooLong);
    });
  });
}
