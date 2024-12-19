import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/fake/fake_board_update.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/interfaces/game_info/board_update.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_tile.dart';
import 'package:Scrabble/logic/game_info_holder/board_holder/board_holder_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/server_socket_mock.dart';

void main() {
  group('BoardHolderCubit', () {
    late BoardHolderCubit bloc;
    late MockSocketManagerBloc socketManagerBloc;
    late MockServerSocket serverSocketMock;
    late BoardUpdate boardUpdate;

    setUp(() {
      boardUpdate = FAKE_BOARD_UPDATE();
      socketManagerBloc = MockSocketManagerBloc();
      serverSocketMock = MockServerSocket(socketManagerBloc);

      bloc = BoardHolderCubit(socketManagerBloc);
      bloc.clearBoard();
    });

    tearDown(() => bloc.close());

    test('initial state', () {
      expect(bloc.state, BoardHolderInitial());
    });

    blocTest('should emit BoardHolderUpdated when serverSocket send the boardUpdate',
        build: () => bloc,
        act: (BoardHolderCubit bloc) => serverSocketMock.emit(BOARD_UPDATE, boardUpdate.toJson()),
        expect: () => [BoardHolderUpdated(boardUpdate.board.tiles.toPositionLetter().toGrid())]);
  });
}
