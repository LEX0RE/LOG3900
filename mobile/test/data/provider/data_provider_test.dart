import 'package:Scrabble/data/data_providers/data_provider.dart';
import 'package:Scrabble/environments/environment.dart' as Env;
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_identity.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/class_mocks.mocks.dart';

class ConcreteDataProvider extends DataProvider {
  ConcreteDataProvider({required IdentityHolder identity, required HttpProxy proxy}) : super(identity, proxy);
}

void main() {
  group('DataProvider', () {
    late ConcreteDataProvider dataProvider;
    late MockIdentityHolder identityHolder;
    late MockHttpProxy proxy;
    const String TEST_URL = 'testUrl';

    setUp(() {
      identityHolder = MockIdentityHolder();
      when(identityHolder.identity).thenReturn(FAKE_IDENTITY());
      proxy = MockHttpProxy();
      dataProvider = ConcreteDataProvider(identity: identityHolder, proxy: proxy);
    });

    test('should return the correct baseUrl', () {
      expect(dataProvider.baseUrl, Env.Environnement.SERVER_URL);
    });

    test('should call get on get', () {
      dataProvider.get(TEST_URL);
      verify(proxy.get(Uri.parse('${dataProvider.baseUrl}/$TEST_URL'), headers: anyNamed('headers'))).called(1);
    });

    test('should call post on post', () {
      dataProvider.post(TEST_URL, FAKE_IDENTITY());
      verify(proxy.post(Uri.parse('${dataProvider.baseUrl}/$TEST_URL'),
              body: anyNamed('body'), headers: anyNamed('headers')))
          .called(1);
    });

    test('should call put on put', () {
      dataProvider.put(TEST_URL, FAKE_IDENTITY());
      verify(proxy.put(Uri.parse('${dataProvider.baseUrl}/$TEST_URL'),
              body: anyNamed('body'), headers: anyNamed('headers')))
          .called(1);
    });

    test('should call delete on delete', () {
      dataProvider.delete(TEST_URL);
      verify(proxy.delete(Uri.parse('${dataProvider.baseUrl}/$TEST_URL'), headers: anyNamed('headers'))).called(1);
    });

    test('should call patch on patch', () {
      dataProvider.patch(TEST_URL, FAKE_IDENTITY());
      verify(proxy.patch(Uri.parse('${dataProvider.baseUrl}/$TEST_URL'),
              body: anyNamed('body'), headers: anyNamed('headers')))
          .called(1);
    });
  });
}
