import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/fake/fake_easel_update.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_easel.dart';
import 'package:Scrabble/data/models/interfaces/game_info/easel_update.dart';
import 'package:Scrabble/logic/game_info_holder/easel_letter_holder/easel_letter_holder_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../constants/fake_letters.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/server_socket_mock.dart';

void main() {
  group('EaselLetterHolderCubit', () {
    late EaselLetterHolderCubit bloc;
    late MockSocketManagerBloc socketManagerBloc;
    late MockServerSocket serverSocketMock;
    late EaselUpdate easel;
    late PositionLetterIndex easelPositionLetterIndex;
    late List<PositionLetterIndex> letters;

    setUp(() {
      easel = FAKE_EASEL_UPDATE();
      letters = FAKE_POSITION_LETTER_INDEX_LIST_1();
      socketManagerBloc = MockSocketManagerBloc();
      serverSocketMock = MockServerSocket(socketManagerBloc);

      bloc = EaselLetterHolderCubit(socketManagerBloc);
    });

    tearDown(() => bloc.close());

    test('initial state', () {
      bloc.clear();
      expect(bloc.state, EaselLetterHolderInitial());
    });

    blocTest('should emit EaselLetterHolderUpdated when serverSocket send the boardUpdate',
        setUp: () => bloc.clear(),
        build: () => bloc,
        act: (EaselLetterHolderCubit bloc) => serverSocketMock.emit(EASEL_UPDATE, easel.toJson()),
        expect: () => [EaselLetterHolderUpdated(easel.easel)]);

    blocTest('should add letter en emit updated state',
        build: () => bloc,
        act: (EaselLetterHolderCubit bloc) {
          bloc.easel = FAKE_COMMON_EASEL();
          bloc.addLetter(letters[3]);
        },
        expect: () {
          CommonEasel newEasel = CommonEasel([...letters.toCommonLetters(), letters[3].letter]);
          return [EaselLetterHolderUpdated(newEasel)];
        });

    blocTest('should remove letter en emit updated state',
        build: () => bloc,
        act: (EaselLetterHolderCubit bloc) {
          bloc.easel = FAKE_COMMON_EASEL();
          bloc.removeLetter(letters[3]);
        },
        expect: () {
          letters.removeAt(3);
          CommonEasel newEasel = CommonEasel(letters.toCommonLetters());
          return [EaselLetterHolderUpdated(newEasel)];
        });

    test('isAllowToAddLetter', () {
      bloc.easel = FAKE_COMMON_EASEL();
      expect(bloc.isAllowToAddLetter(null), false);
      expect(bloc.isAllowToAddLetter(letters[0]), true);
      bloc.easel = null;
      expect(bloc.isAllowToAddLetter(letters[0]), false);
    });
  });
}
