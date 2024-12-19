import 'package:Scrabble/constants/http_status.dart';
import 'package:Scrabble/constants/uri.dart';
import 'package:Scrabble/data/data_providers/authentication_provider.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/data/models/interfaces/user/user_login.dart';
import 'package:Scrabble/data/repositories/authentication_repository.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_user_interface.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/class_mocks.mocks.dart';

void main() {
  group('AuthenticationRepository', () {
    late AuthenticationRepository repository;
    late AuthenticationProvider authenticationProvider;
    late IdentityHolder identityHolder;
    late MockHttpProxy httpProxy;
    late UserLogin userLogin;
    late UserInterface user;
    late MockResponse responseLogin;
    late MockResponse responseRegister;
    late MockThemeCubit themeCubit;
    late MockLanguageCubit languageCubit;

    setUp(() {
      userLogin = FAKE_USER_LOGIN_INFO();
      user = FAKE_USER_1();
      responseLogin = MockResponse();
      when(responseLogin.body).thenReturn(user.encode());
      responseRegister = MockResponse();
      when(responseRegister.body).thenReturn(user.encode());

      httpProxy = MockHttpProxy();
      themeCubit = MockThemeCubit();
      languageCubit = MockLanguageCubit();
      identityHolder = IdentityHolder(themeCubit, languageCubit);
      identityHolder.setIdentity(FAKE_USER_1());
      authenticationProvider = AuthenticationProvider(identity: identityHolder, proxy: httpProxy);
      repository = AuthenticationRepository(authenticationProvider: authenticationProvider);
      String loginPath = '/api/$AUTHENTICATION_URI/$LOGIN_URI';
      String registerPath = '/api/$AUTHENTICATION_URI/$REGISTER_URI';

      when(httpProxy.post(any, headers: anyNamed('headers'), body: userLogin.encode(), encoding: anyNamed('encoding')))
          .thenAnswer((Invocation invocation) async {
        Uri uri = invocation.positionalArguments[0];
        expect(uri.path, loginPath);
        return responseLogin;
      });

      when(httpProxy.post(any, headers: anyNamed('headers'), body: user.encode(), encoding: anyNamed('encoding')))
          .thenAnswer((Invocation invocation) async {
        Uri uri = invocation.positionalArguments[0];
        expect(uri.path, registerPath);
        return responseRegister;
      });
    });

    test('should return user when login', () {
      when(responseLogin.statusCode).thenReturn(HttpStatus.OK);
      expect(repository.login(userLogin), completion(user));
    });

    test('should throw exception when login', () async {
      when(responseLogin.statusCode).thenReturn(HttpStatus.BAD_REQUEST);
      expect(() => repository.login(userLogin), throwsException);
    });

    test('should return user when register', () {
      when(responseRegister.statusCode).thenReturn(HttpStatus.CREATED);
      expect(repository.register(user), completion(user));
    });

    test('should throw exception when register', () {
      when(responseRegister.statusCode).thenReturn(HttpStatus.BAD_REQUEST);
      expect(() => repository.register(user), throwsException);
    });
  });
}
