import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/classes/placement.dart';
import 'package:Scrabble/data/models/enums/orientation_type.dart';
import 'package:Scrabble/logic/game_info_holder/board_holder/board_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/placement/placement_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_letters.dart';
import '../../constants/fake_placement.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/server_socket_mock.dart';

void main() {
  group('PlacementCubit', () {
    late PlacementCubit bloc;
    late MockSocketManagerBloc socketManagerBloc;
    late MockBlankLetterFormCubit blankLetterFormCubit;
    late MockCommandSenderCubit commandSenderCubit;
    late MockEaselLetterHolderCubit easelLetterHolderCubit;
    late MockServerSocket serverSocket;
    late MockBoardHolderCubit boardHolderCubit;
    late Placement placement;
    late PositionLetterIndex letter;
    late PositionLetterIndex blankLetter;
    const String blankFormSubmitted = 'a';

    setUp(() {
      placement = FAKE_PLACEMENT_1();
      letter = FAKE_POSITION_LETTER_INDEX_1();
      blankLetter = FAKE_POSITION_LETTER_INDEX_4();
      socketManagerBloc = MockSocketManagerBloc();
      blankLetterFormCubit = MockBlankLetterFormCubit();
      boardHolderCubit = MockBoardHolderCubit();
      commandSenderCubit = MockCommandSenderCubit();
      easelLetterHolderCubit = MockEaselLetterHolderCubit();
      serverSocket = MockServerSocket(socketManagerBloc);
      when(boardHolderCubit.state).thenReturn(BoardHolderInitial());

      bloc = PlacementCubit(
        socketManagerBloc,
        blankLetterFormCubit,
        easelLetterHolderCubit,
        commandSenderCubit,
        boardHolderCubit,
      );
      bloc.reset(null);
    });

    tearDown(() => bloc.close());

    test('initial state', () {
      expect(bloc.state, PlacementInitial());
    });

    blocTest('should add to placement',
        build: () => bloc,
        act: (PlacementCubit bloc) {
          bloc.add(letter);
        },
        expect: () => [
              PlacementUpdated(Placement(
                [letter.positionLetter],
                OrientationType.None,
                letter.position,
              ))
            ]);

    blocTest('should ask to show blank form when adding a blank to placement',
        build: () => bloc,
        act: (PlacementCubit bloc) {
          bloc.add(blankLetter);
        },
        verify: (_) {
          verify(blankLetterFormCubit.show(onSubmit: anyNamed('onSubmit'), onCancel: anyNamed('onCancel'))).called(1);
        });

    blocTest('should add to placement when blank form is submitted',
        setUp: () => when(blankLetterFormCubit.show(onSubmit: anyNamed('onSubmit'), onCancel: anyNamed('onCancel')))
                .thenAnswer((Invocation invocation) {
              final onSubmit = invocation.namedArguments[const Symbol('onSubmit')];
              onSubmit(blankFormSubmitted);
            }),
        build: () => bloc,
        act: (PlacementCubit bloc) {
          bloc.add(blankLetter);
        },
        expect: () => [
              PlacementUpdated(Placement(
                [PositionLetter(blankLetter.position, CommonLetter(blankFormSubmitted.toUpperCase(), 0))],
                OrientationType.None,
                blankLetter.position,
              ))
            ]);

    blocTest('should not add to placement when blank form is cancelled and put back to easel',
        setUp: () => when(blankLetterFormCubit.show(onSubmit: anyNamed('onSubmit'), onCancel: anyNamed('onCancel')))
                .thenAnswer((Invocation invocation) {
              final onCancel = invocation.namedArguments[const Symbol('onCancel')];
              onCancel();
            }),
        build: () => bloc,
        act: (PlacementCubit bloc) {
          bloc.add(blankLetter);
        },
        verify: (_) {
          verify(easelLetterHolderCubit.addLetter(blankLetter)).called(1);
        });

    test('should send placement', () {
      bloc.emit(PlacementUpdated(placement));
      bloc.sendPlacement();
      verify(commandSenderCubit.sendCommand(placement)).called(1);
    });
  });
}
