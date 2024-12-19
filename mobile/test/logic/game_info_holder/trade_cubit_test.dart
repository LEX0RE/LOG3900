import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/fake/fake_easel_update.dart';
import 'package:Scrabble/constants/game.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/classes/trade.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_easel.dart';
import 'package:Scrabble/data/models/interfaces/game_info/easel_update.dart';
import 'package:Scrabble/logic/game_info_holder/easel_letter_holder/easel_letter_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/trade/trade_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_letters.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/server_socket_mock.dart';

void main() {
  group('TradeCubit', () {
    late TradeCubit bloc;
    late MockSocketManagerBloc socketManagerBloc;
    late MockServerSocket serverSocket;
    late MockEaselLetterHolderCubit easelLetterHolderCubit;
    late MockCommandSenderCubit commandSenderCubit;
    late CommonEasel easel;
    late EaselUpdate easelUpdate;

    setUp(() {
      easel = FAKE_COMMON_EASEL();
      easelUpdate = FAKE_EASEL_UPDATE();
      socketManagerBloc = MockSocketManagerBloc();
      easelLetterHolderCubit = MockEaselLetterHolderCubit();
      commandSenderCubit = MockCommandSenderCubit();
      serverSocket = MockServerSocket(socketManagerBloc);

      when(easelLetterHolderCubit.state).thenReturn(EaselLetterHolderUpdated(easel));

      bloc = TradeCubit(
        socketManagerBloc,
        easelLetterHolderCubit,
        commandSenderCubit,
      );
    });

    tearDown(() => bloc.close());

    test('initial state', () {
      expect(bloc.state, TradeInitial());
    });

    blocTest('should emit TradeUpdated when adding indexes',
        build: () => bloc,
        act: (TradeCubit bloc) {
          bloc.toggleToTrade(0);
          bloc.toggleToTrade(0);
          bloc.toggleToTrade(0);
        },
        expect: () => [
              TradeUpdated(const [0]),
              TradeUpdated(const []),
              TradeUpdated(const [0]),
            ]);

    blocTest('should send the trade',
        build: () => bloc,
        act: (TradeCubit bloc) {
          bloc.toggleToTrade(0);
          bloc.sendTrade();
        },
        verify: (_) {
          verify(commandSenderCubit.sendCommand(Trade([PositionLetter(EMPTY_COORDINATE, easel.letters[0])]))).called(1);
        });

    blocTest('should emit TradeInitial when serverSocket send the EASEL_UPDATE',
        build: () => bloc,
        act: (TradeCubit bloc) => serverSocket.emit(EASEL_UPDATE, easelUpdate.toJson()),
        expect: () => [TradeInitial()]);
  });
}
