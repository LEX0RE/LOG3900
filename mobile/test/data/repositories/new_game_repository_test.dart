import 'dart:convert';

import 'package:Scrabble/constants/http_status.dart';
import 'package:Scrabble/constants/uri.dart';
import 'package:Scrabble/data/data_providers/new_game_provider.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_creation.dart';
import 'package:Scrabble/data/repositories/new_game_configuration_repository.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_lobby_creation.dart';
import '../../constants/fake_user_interface.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/class_mocks.mocks.dart';

void main() {
  group('NewGameRepository', () {
    late NewGameRepository repository;
    late NewGameProvider newGameProvider;
    late IdentityHolder identityHolder;
    late MockHttpProxy httpProxy;
    late LobbyCreation gameInfo;
    late MockResponse responseCreateGame;
    late MockThemeCubit themeCubit;
    late MockLanguageCubit languageCubit;

    setUp(() {
      gameInfo = FAKE_LOBBY_CREATION();
      responseCreateGame = MockResponse();
      when(responseCreateGame.body).thenReturn(jsonEncode(gameInfo.toJson()));

      httpProxy = MockHttpProxy();
      themeCubit = MockThemeCubit();
      languageCubit = MockLanguageCubit();
      identityHolder = IdentityHolder(themeCubit, languageCubit);
      identityHolder.setIdentity(FAKE_USER_1());
      newGameProvider = NewGameProvider(identity: identityHolder, proxy: httpProxy);
      repository = NewGameRepository(newGameProvider: newGameProvider);
      String baseUrl = newGameProvider.baseUrl;
      String lobbyPath = '/api/$LOBBY_URI';

      when(httpProxy.post(any,
              headers: anyNamed('headers'), body: jsonEncode(gameInfo.toJson()), encoding: anyNamed('encoding')))
          .thenAnswer((Invocation invocation) async {
        Uri uri = invocation.positionalArguments[0];
        expect(uri.path, lobbyPath);
        return responseCreateGame;
      });
    });

    test('should return gameInfo when createLobby', () {
      when(responseCreateGame.statusCode).thenReturn(HttpStatus.CREATED);
      expectLater(repository.createLobby(gameInfo), completion(null));
    });

    test('should throw exception when createLobby', () {
      when(responseCreateGame.statusCode).thenReturn(HttpStatus.BAD_REQUEST);
      expectLater(() => repository.createLobby(gameInfo), throwsException);
    });
  });
}
