import 'package:Scrabble/constants/fake/fake_replay.dart';
import 'package:Scrabble/constants/http_status.dart';
import 'package:Scrabble/constants/uri.dart';
import 'package:Scrabble/data/data_providers/replay_provider.dart';
import 'package:Scrabble/data/models/interfaces/replay/replay.dart';
import 'package:Scrabble/data/repositories/replay_repository.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_user_interface.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/class_mocks.mocks.dart';

void main() {
  group('ReplayRepository', () {
    late ReplayRepository repository;
    late ReplayProvider provider;
    late IdentityHolder identityHolder;
    late MockHttpProxy httpProxy;
    late Replay replay;
    late MockResponse response;
    late MockThemeCubit themeCubit;
    late MockLanguageCubit languageCubit;

    setUp(() {
      replay = FAKE_REPLAY();
      response = MockResponse();
      when(response.body).thenReturn(replay.encode());

      httpProxy = MockHttpProxy();
      themeCubit = MockThemeCubit();
      languageCubit = MockLanguageCubit();
      identityHolder = IdentityHolder(themeCubit, languageCubit);
      identityHolder.setIdentity(FAKE_USER_1());
      provider = ReplayProvider(identity: identityHolder, proxy: httpProxy);
      repository = ReplayRepository(replayProvider: provider);
      String uriPath = '/api/$REPLAY_URI/${replay.gameId}';

      when(httpProxy.get(
        any,
        headers: anyNamed('headers'),
      )).thenAnswer((Invocation invocation) async {
        Uri uri = invocation.positionalArguments[0];
        expect(uri.path, uriPath);
        return response;
      });
    });

    test('should return replay when getReplay', () {
      when(response.statusCode).thenReturn(HttpStatus.OK);
      expectLater(repository.getReplay(replay.gameId), completion(replay));
    });

    test('should throw exception when getReplay', () {
      when(response.statusCode).thenReturn(HttpStatus.BAD_REQUEST);
      expectLater(() => repository.getReplay(replay.gameId), throwsException);
    });
  });
}
