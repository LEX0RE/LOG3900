import 'dart:convert';

import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/fake/fake_replay.dart';
import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/data/models/interfaces/replay/replay.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:Scrabble/logic/profile/replay/replay_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_user_interface.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/client_socket_mock.mocks.dart';

void main() {
  group('ReplayCubit', () {
    late Replay replay;
    late ReplayCubit bloc;
    late MockReplayRepository repository;
    late MockSocketManagerBloc socketManagerBloc;
    late MockIdentityHolder identityHolder;
    late Identity identity;
    late MockFakeHandler2 onSuccess;
    late MockFakeHandler gameUpdateHandler;
    late MockFakeHandler easelUpdateHandler;
    late MockFakeHandler boardUpdateHandler;

    setUp(() {
      replay = FAKE_REPLAY();
      final userId = replay.turns[0].infos[0].item1;
      identity = Identity(user: User(FAKE_USER_NAME_1, userId), token: FAKE_TOKEN_1);
      onSuccess = MockFakeHandler2();
      gameUpdateHandler = MockFakeHandler();
      easelUpdateHandler = MockFakeHandler();
      boardUpdateHandler = MockFakeHandler();

      identityHolder = MockIdentityHolder();
      socketManagerBloc = MockSocketManagerBloc();
      repository = MockReplayRepository();
      when(repository.getReplay(replay.gameId)).thenAnswer((_) => Future.value(replay));

      when(identityHolder.identity).thenReturn(identity);
      final handlers = <String, List<dynamic Function(dynamic)>>{};
      handlers[GAME_UPDATE] = [gameUpdateHandler];
      handlers[EASEL_UPDATE] = [easelUpdateHandler];
      handlers[BOARD_UPDATE] = [boardUpdateHandler];
      when(socketManagerBloc.handlers).thenReturn(handlers);

      bloc = ReplayCubit(repository, identityHolder, socketManagerBloc);
      bloc.replay = replay;
      bloc.userIdForPointOfView = identity.userId;
    });

    tearDown(() => bloc.close());

    test('initial state is AuthenticationManagerInitial', () {
      expect(bloc.isSelected(bloc.userIdForPointOfView), true);
      expect(bloc.isSelected('fake'), false);
      expect(bloc.state, ReplayInitial());
    });

    blocTest(
      'should call onSuccess and set replay when fetchReplay is called',
      build: () => bloc,
      act: (ReplayCubit bloc) {
        bloc.clearReplay();
        bloc.fetchReplay(replay.gameId, onSuccess);
      },
      skip: 0,
      expect: () => [
        ReplayInitial(),
        ReplayUpdated([
          User(replay.turns[0].infos[0].item2.gameUpdate.playerInfo.name,
              replay.turns[0].infos[0].item2.gameUpdate.playerInfo.userId),
          ...replay.turns[0].infos[0].item2.gameUpdate.otherPlayersInfo
              .map((player) => User(player.name, player.userId)),
        ], replay.turns.length, 0, identity.userId, true, true)
      ],
      verify: (_) {
        verify(onSuccess.call()).called(1);
        verify(gameUpdateHandler.call(jsonDecode(replay.turns[0].infos[0].item2.gameUpdate.encode()))).called(1);
        verify(easelUpdateHandler.call(jsonDecode(replay.turns[0].infos[0].item2.easelUpdate.encode()))).called(1);
        verify(boardUpdateHandler.call(jsonDecode(replay.turns[0].boardUpdate.encode()))).called(1);
      },
    );

    blocTest(
      'should change point of view',
      build: () => bloc,
      act: (ReplayCubit bloc) {
        bloc.setPointOfView(replay.turns[0].infos[1].item1);
      },
      expect: () => [
        ReplayUpdated([
          User(replay.turns[0].infos[1].item2.gameUpdate.playerInfo.name,
              replay.turns[0].infos[1].item2.gameUpdate.playerInfo.userId),
          ...replay.turns[0].infos[1].item2.gameUpdate.otherPlayersInfo
              .map((player) => User(player.name, player.userId)),
        ], replay.turns.length, 0, replay.turns[0].infos[1].item1, true, true)
      ],
      verify: (_) {
        verify(gameUpdateHandler.call(jsonDecode(replay.turns[0].infos[1].item2.gameUpdate.encode()))).called(1);
        verify(easelUpdateHandler.call(jsonDecode(replay.turns[0].infos[1].item2.easelUpdate.encode()))).called(1);
        verify(boardUpdateHandler.call(jsonDecode(replay.turns[0].boardUpdate.encode()))).called(1);
      },
    );
  });
}
