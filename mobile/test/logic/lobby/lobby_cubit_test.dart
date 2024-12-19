import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/fake/fake_lobby_update.dart';
import 'package:Scrabble/logic/lobby/lobby/lobby_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/server_socket_mock.dart';

void main() {
  group('LobbyCubit', () {
    late LobbyCubit cubit;
    late MockSocketManagerBloc socketManager;
    late MockServerSocket serverSocketMock;

    setUp(() {
      socketManager = MockSocketManagerBloc();
      serverSocketMock = MockServerSocket(socketManager);
      cubit = LobbyCubit(socketManager);
    });

    tearDown(() => cubit.close());

    test('initial state is LobbyInitial', () {
      expect(cubit.state, LobbyInitial());
    });

    blocTest('should send LEAVE_LOBBY when leaveLobby is called',
        build: () => cubit,
        act: (LobbyCubit cubit) => {cubit.leaveLobby()},
        verify: (LobbyCubit cubit) =>
            verify(socketManager.add(SocketManagerSend(LEAVE_LOBBY, cubit.state.lobby.lobbyId))).called(1));
    blocTest('should emit LobbyUpdated and LobbyReady when server emits PUBLISH_LOBBY_INFO with 2 players',
        build: () => cubit,
        act: (LobbyCubit cubit) => serverSocketMock.emit(PUBLISH_LOBBY_INFO, FAKE_LOBBY_CLASSIC_UPDATE().toJson()),
        expect: () => [LobbyReady(FAKE_LOBBY_CLASSIC_UPDATE())]);
  });
}
