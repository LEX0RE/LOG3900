import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/fake/fake_game_update.dart';
import 'package:Scrabble/data/models/interfaces/game_info/game_update.dart';
import 'package:Scrabble/logic/game_info_holder/stash_info/stash_info_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/server_socket_mock.dart';

void main() {
  group('StashInfoCubit', () {
    late StashInfoCubit bloc;
    late MockSocketManagerBloc socketManagerBloc;
    late MockServerSocket serverSocket;
    late GameUpdate gameUpdate;

    setUp(() {
      gameUpdate = FAKE_GAME_UPDATE();
      socketManagerBloc = MockSocketManagerBloc();
      serverSocket = MockServerSocket(socketManagerBloc);

      bloc = StashInfoCubit(socketManagerBloc);
      bloc.reset();
    });

    tearDown(() => bloc.close());

    test('initial state', () {
      expect(bloc.state, StashInfoInitial());
    });

    blocTest('should emit StashInfoUpdated when server emit GAME_UPDATE',
        build: () => bloc,
        act: (StashInfoCubit bloc) => serverSocket.emit(GAME_UPDATE, gameUpdate.toJson()),
        skip: 0,
        expect: () => [StashInfoUpdated(gameUpdate.stash)]);
  });
}
