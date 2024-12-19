import 'dart:async';

import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user_login.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_identity.dart';
import '../../constants/fake_user_interface.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/client_socket_mock.dart';
import '../../mock/client_socket_mock.mocks.dart';

void main() {
  group('SocketManagerBloc', () {
    late MockIdentityHolder identityHolder;
    late MockAuthenticationManagerBloc authenticationManager;
    late MockClientSocket clientSocket;
    late MockSocketIOProxy proxy;
    late SocketManagerBloc bloc;
    late MockFakeHandler handler;

    setUp(() {
      identityHolder = MockIdentityHolder();
      handler = MockFakeHandler();
      authenticationManager = MockAuthenticationManagerBloc();
      proxy = MockSocketIOProxy();
      clientSocket = MockClientSocket(proxy);

      when(identityHolder.stream).thenAnswer((_) => Stream.fromIterable([FAKE_IDENTITY_STATE()]));

      bloc =
          SocketManagerBloc(identityHolder: identityHolder, authenticationManager: authenticationManager, proxy: proxy);
    });

    tearDown(() => bloc.close());

    test('initial state is ChatManagerInitial', () {
      expect(bloc.state, SocketManagerInitial());
    });

    blocTest(
      'should call close when identityHolder emits IdentityNotAvailable',
      setUp: () {
        when(identityHolder.stream)
            .thenAnswer((_) => Stream.fromIterable([FAKE_IDENTITY_STATE(), IdentityNotAvailable()]));
      },
      build: () =>
          SocketManagerBloc(identityHolder: identityHolder, authenticationManager: authenticationManager, proxy: proxy),
      verify: (SocketManagerBloc bloc) => verify(clientSocket.close()).called(greaterThan(1)),
    );

    blocTest(
      'should call connect when identityHolder emits IdentityAvailable',
      setUp: () {
        when(identityHolder.stream).thenAnswer((_) => Stream.fromIterable([FAKE_IDENTITY_STATE()]));
      },
      build: () =>
          SocketManagerBloc(identityHolder: identityHolder, authenticationManager: authenticationManager, proxy: proxy),
      verify: (SocketManagerBloc bloc) => verify(clientSocket.connect()).called(greaterThan(1)),
    );

    blocTest(
      'should add AuthenticationManagerEventLogout when CONNECT_ERROR',
      build: () => bloc,
      act: (SocketManagerBloc bloc) => clientSocket.serverEmit<Serializable>(CONNECT_ERROR, null),
      verify: (SocketManagerBloc bloc) =>
          verify(authenticationManager.add(AuthenticationManagerEventLogout())).called(1),
    );

    blocTest(
      'should send on event SocketManagerSend',
      build: () => bloc,
      act: (SocketManagerBloc bloc) => bloc.add(SocketManagerSend(MESSAGE, 'test')),
      verify: (SocketManagerBloc bloc) => verify(clientSocket.emit(MESSAGE, 'test')).called(1),
    );

    blocTest(
      'should give data to handle when receive event after a SocketManagerAddHandler',
      build: () => bloc,
      act: (SocketManagerBloc bloc) {
        bloc.add(SocketManagerAddHandler(MESSAGE, handler, typeFactory: UserLogin.fromJson));
        bloc.connect(FAKE_IDENTITY());
        clientSocket.serverEmit(MESSAGE, FAKE_USER_LOGIN_INFO());
      },
      verify: (SocketManagerBloc bloc) => verify(handler.call(FAKE_USER_LOGIN_INFO())).called(1),
    );
  });
}
