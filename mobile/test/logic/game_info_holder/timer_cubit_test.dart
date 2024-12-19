import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/fake/fake_timer.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_timer.dart';
import 'package:Scrabble/logic/game_info_holder/timer/timer_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/server_socket_mock.dart';

void main() {
  group('TimerCubit', () {
    late TimerCubit bloc;
    late MockSocketManagerBloc socketManagerBloc;
    late MockServerSocket serverSocket;
    late CommonTimer timer;

    setUp(() {
      timer = FAKE_TIMER();
      socketManagerBloc = MockSocketManagerBloc();
      serverSocket = MockServerSocket(socketManagerBloc);

      bloc = TimerCubit(
        socketManagerBloc,
      );

      bloc.reset();
    });

    tearDown(() => bloc.close());

    test('initial state', () {
      expect(bloc.state, TimerInitial());
    });

    blocTest(
      'should emit TimerUpdated when server emit TIMER_UPDATE',
      build: () => bloc,
      act: (TimerCubit bloc) => serverSocket.emit(TIMER, timer.toJson()),
      skip: 0,
      expect: () => [TimerUpdated(timer)],
    );
  });
}
