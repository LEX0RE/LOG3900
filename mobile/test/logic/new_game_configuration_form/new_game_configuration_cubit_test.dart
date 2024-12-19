import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/data/models/enums/game_visibilities.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_timer.dart';
import 'package:Scrabble/logic/form/new_game_configuration_form/new_game_configuration_cubit.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../mock/app_localization_mock.mocks.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/class_mocks.mocks.dart';

void main() {
  group('NewGameConfigurationCubit', () {
    late NewGameConfigurationCubit cubit;
    late MockFakeAppLocalizations appLocalizations;
    late MockNewGameRepository newGameRepository;
    late MockGamemodeCubit gamemodeCubit;
    const String dictionary = 'English';
    const double turnDurationInt = 173;
    const double turnDurationDouble = 172.8;
    const CommonTimer timer = CommonTimer(2, 53);

    setUp(() {
      appLocalizations = MockFakeAppLocalizations();
      newGameRepository = MockNewGameRepository();
      gamemodeCubit = MockGamemodeCubit();
      when(gamemodeCubit.state).thenReturn(const GamemodeUpdated(GameModesEnum(GameModes.CLASSIC)));

      cubit = NewGameConfigurationCubit(
        appLocalizations,
        newGameRepository,
        gamemodeCubit,
      );
    });

    tearDown(() => cubit.close());

    test('initial state is NewGameConfigurationInitial', () {
      expect(cubit.state, NewGameConfigurationInitial());
    });
    blocTest('setDictionary should emit NewGameConfigurationDictionaryChanged',
        build: () => cubit,
        act: (NewGameConfigurationCubit cubit) => cubit.setDictionary(dictionary),
        expect: () => [NewGameConfigurationDictionaryChanged(dictionary: dictionary)],
        verify: (NewGameConfigurationCubit cubit) => cubit.dictionary == dictionary);
    blocTest('setDictionary should not emit NewGameConfigurationDictionaryChanged when null',
        build: () => cubit, act: (NewGameConfigurationCubit cubit) => cubit.setDictionary(null), expect: () => []);
    blocTest('setTurnDuration should emit NewGameConfigurationTimerChanged',
        build: () => cubit,
        act: (NewGameConfigurationCubit cubit) => cubit.setTurnDuration(turnDurationInt),
        expect: () => [NewGameConfigurationTimerChanged(timer: timer)],
        verify: (NewGameConfigurationCubit cubit) => cubit.timer == timer);
    blocTest('setTurnDuration should round up secondes',
        build: () => cubit,
        act: (NewGameConfigurationCubit cubit) => cubit.setTurnDuration(turnDurationDouble),
        expect: () => [NewGameConfigurationTimerChanged(timer: timer)],
        verify: (NewGameConfigurationCubit cubit) => cubit.timer == timer);
    blocTest('setVisibility should emit NewGameConfigurationVisibilityChanged',
        build: () => cubit,
        act: (NewGameConfigurationCubit cubit) => cubit.setVisibility(true),
        expect: () => [NewGameConfigurationVisibilityChanged(isPublic: true, hasPassword: false)],
        verify: (NewGameConfigurationCubit cubit) => cubit.visibility == GameVisibilities.PUBLIC_NO_PASSWORD);
    //TODO: changer le test quand les parties privées seront implémentées
    blocTest('setVisibility should change visibility',
        build: () => cubit,
        act: (NewGameConfigurationCubit cubit) => cubit.setVisibility(false),
        expect: () => [NewGameConfigurationVisibilityChanged(isPublic: false, hasPassword: false)],
        verify: (NewGameConfigurationCubit cubit) => cubit.visibility == GameVisibilities.PUBLIC_NO_PASSWORD);
    blocTest(
      'submit should emit NewGameConfigurationGameCreated',
      build: () => cubit,
      act: (NewGameConfigurationCubit cubit) {
        cubit.dictionary = dictionary;
        cubit.timer = timer;
        cubit.visibility = GameVisibilities.PRIVATE;
        cubit.submit();
      },
      expect: () => [NewGameConfigurationGameCreated()],
    );
  });
}
