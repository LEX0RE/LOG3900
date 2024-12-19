import 'package:Scrabble/logic/authentication/authentication_page/authentication_page_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('AuthenticationPageCubit', () {
    late AuthenticationPageCubit bloc;

    setUp(() {
      bloc = AuthenticationPageCubit();
    });

    tearDown(() => bloc.close());

    test('initial state is AuthenticationPageLogin', () {
      expect(bloc.state, AuthenticationPageLogin());
    });

    blocTest('switchToLogin emits AuthenticationPageLogin',
        build: () => bloc,
        act: (AuthenticationPageCubit cubit) => cubit.switchToLogin(),
        expect: () => [AuthenticationPageLogin()]);
    blocTest('switchToRegister emits AuthenticationPageRegister',
        build: () => bloc,
        act: (AuthenticationPageCubit cubit) => cubit.switchToRegister(),
        expect: () => [AuthenticationPageRegister()]);
  });
}
