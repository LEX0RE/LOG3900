import 'package:Scrabble/constants/login.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/data/models/interfaces/user/user_login.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_user_interface.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/class_mocks.mocks.dart';

void main() {
  group('authenticationManager', () {
    late MockIdentityHolder identityHolder;
    late MockAuthenticationRepository authenticationRepository;
    late AuthenticationManagerBloc bloc;
    late UserLogin userLogin;
    late UserInterface user;

    setUp(() {
      userLogin = FAKE_USER_LOGIN_INFO();
      user = FAKE_USER_1();

      identityHolder = MockIdentityHolder();
      authenticationRepository = MockAuthenticationRepository();
      bloc =
          AuthenticationManagerBloc(authenticationRepository: authenticationRepository, identityHolder: identityHolder);
    });

    tearDown(() => bloc.close());

    test('initial state is AuthenticationManagerInitial', () {
      expect(bloc.state, AuthenticationManagerInitial());
    });

    blocTest('Event login should post on authenticationRepository and set identity',
        build: () => bloc,
        act: (AuthenticationManagerBloc bloc) async {
          when(authenticationRepository.login(userLogin)).thenAnswer((_) => Future.value(user));
          bloc.add(AuthenticationManagerEventLogin(userLogin));
        },
        verify: (AuthenticationManagerBloc bloc) async {
          verify(authenticationRepository.login(userLogin)).called(1);
          verify(identityHolder.setIdentity(user)).called(1);
        });

    blocTest('Event logout should clear identity',
        build: () => bloc,
        act: (AuthenticationManagerBloc bloc) async {
          bloc.add(AuthenticationManagerEventLogout());
        },
        verify: (AuthenticationManagerBloc bloc) async {
          verify(bloc.identityHolder.clearIdentity()).called(1);
        });

    blocTest('Event register should post on authenticationRepository and set identity',
        build: () => bloc,
        act: (AuthenticationManagerBloc bloc) async {
          when(authenticationRepository.register(user)).thenAnswer((_) => Future.value(user));
          bloc.add(AuthenticationManagerEventRegister(user));
        },
        verify: (AuthenticationManagerBloc bloc) async {
          verify(authenticationRepository.register(user)).called(1);
          verify(identityHolder.setIdentity(user)).called(1);
        });

    blocTest('Event login failed',
        build: () => AuthenticationManagerBloc(
            authenticationRepository: MockAuthenticationRepository(), identityHolder: MockIdentityHolder()),
        act: (AuthenticationManagerBloc bloc) async {
          when(bloc.authenticationRepository.login(userLogin)).thenAnswer((_) => Future.error('error'));
          bloc.add(AuthenticationManagerEventLogin(FAKE_USER_LOGIN_INFO()));
        },
        expect: () =>
            [const AuthenticationManagerStateLogFailed(LOADING), const AuthenticationManagerStateLogFailed('error')]);

    blocTest('Event register failed',
        build: () => AuthenticationManagerBloc(
            authenticationRepository: MockAuthenticationRepository(), identityHolder: MockIdentityHolder()),
        act: (AuthenticationManagerBloc bloc) async {
          when(bloc.authenticationRepository.register(user)).thenAnswer((_) => Future.error('error'));
          bloc.add(AuthenticationManagerEventRegister(FAKE_USER_1()));
        },
        expect: () => [const AuthenticationManagerStateRegisterFailed('error')]);
  });
}
