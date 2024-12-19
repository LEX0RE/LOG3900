import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/fake/fake_lobby_update.dart';
import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/lobby/lobbies/lobbies_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/server_socket_mock.dart';

void main() {
  group('LobbiesCubit', () {
    late LobbiesCubit cubit;
    late MockSocketManagerBloc socketManager;
    late MockServerSocket serverSocketMock;
    late MockGamemodeCubit gamemodeCubit;

    setUp(() {
      socketManager = MockSocketManagerBloc();
      gamemodeCubit = MockGamemodeCubit();
      when(gamemodeCubit.state).thenReturn(const GamemodeUpdated(GameModesEnum(GameModes.CLASSIC)));
      serverSocketMock = MockServerSocket(socketManager);
      cubit = LobbiesCubit(socketManager, gamemodeCubit);
    });

    tearDown(() => cubit.close());

    test('initial state is JoinableClassicLobbiesInitial', () {
      expect(cubit.state, LobbiesInitial());
    });

    blocTest('should send JOIN_LOBBY when joinLobby is called',
        build: () => cubit,
        act: (LobbiesCubit cubit) => {cubit.joinLobby(FAKE_LOBBY_ID)},
        verify: (LobbiesCubit cubit) =>
            verify(socketManager.add(SocketManagerSend(JOIN_LOBBY, FAKE_LOBBY_ID))).called(1));
    blocTest('should emit JoinableClassicLobbiesUpdated when server emits PUBLISH_CLASSIC_LOBBIES',
        build: () => cubit,
        act: (LobbiesCubit cubit) =>
            serverSocketMock.emit(PUBLISH_CLASSIC_LOBBIES, FAKE_AVAILABLE_CLASSIC_LOBBIES_UPDATE().toJson()),
        expect: () => [LobbiesUpdated(FAKE_AVAILABLE_CLASSIC_LOBBIES_UPDATE().availableLobbies)]);
    blocTest('should emit JoinableClassicLobbiesConfirmJoinLobby when server emits PUBLISH_LOBBY_INFO',
        build: () => cubit,
        act: (LobbiesCubit cubit) => serverSocketMock.emit(PUBLISH_LOBBY_INFO, FAKE_LOBBY_CLASSIC_UPDATE().toJson()),
        expect: () => [LobbiesConfirmJoinLobby(FAKE_LOBBY_CLASSIC_UPDATE())]);
  });
}
