import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../constants/fake_identity.dart';
import '../../constants/fake_user_interface.dart';
import '../../mock/bloc_mocks.mocks.dart';

void main() {
  group('IdentityHolder', () {
    late Identity identity;
    late IdentityHolder bloc;
    late MockThemeCubit themeCubit;
    late MockLanguageCubit languageCubit;

    setUp(() {
      themeCubit = MockThemeCubit();
      languageCubit = MockLanguageCubit();
      identity = FAKE_IDENTITY();

      bloc = IdentityHolder(themeCubit, languageCubit);
    });

    tearDown(() => bloc.close());

    test('initial state is IdentityInitial', () {
      expect(bloc.state, IdentityInitial());
    });

    blocTest(
      'emit IdentityAvailable on IdentityHolder.setIdentity and store identity in local storage',
      build: () => bloc,
      act: (IdentityHolder bloc) {
        bloc.setIdentity(FAKE_USER_1());
      },
      expect: () => [IdentityAvailable(identity, FAKE_USER_1())],
    );

    blocTest(
      'emit IdentityNotAvailable on IdentityHolder.clearIdentity',
      build: () => bloc,
      act: (IdentityHolder bloc) => bloc.clearIdentity(),
      expect: () => [IdentityNotAvailable()],
    );
  });
}
