import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/class_mocks.mocks.dart';

void main() {
  group('RouterManager', () {
    late RouterManager bloc;
    late MockBuildContext context;
    late MockAuthenticationManagerBloc authenticationManager;
    late MockNavigatorProxy navigatorProxy;

    setUp(() {
      context = MockBuildContext();
      authenticationManager = MockAuthenticationManagerBloc();
      navigatorProxy = MockNavigatorProxy();

      bloc = RouterManager(context, authenticationManager, navigatorProxy: navigatorProxy);
    });

    tearDown(() => bloc.close());

    test('initial state', () {
      expect(bloc.state, RouterManagerInitial());
    });

    blocTest(
      'navigate should call pushNamedAndRemoveUntil',
      build: () => bloc,
      act: (RouterManager bloc) => bloc.navigate('/test', '/'),
      verify: (RouterManager bloc) => verify(navigatorProxy.pushNamedAndRemoveUntil(context, '/test', any)).called(1),
    );

    blocTest(
      'should navigate to login when on event AuthenticationManagerStateLoggedOut',
      setUp: () => when(authenticationManager.stream)
          .thenAnswer((_) => Stream.fromIterable([AuthenticationManagerStateLoggedOut()])),
      build: () => RouterManager(context, authenticationManager, navigatorProxy: navigatorProxy),
      verify: (RouterManager bloc) =>
          verify(navigatorProxy.pushNamedAndRemoveUntil(context, LOGIN_PATH, any)).called(1),
    );
  });
}
