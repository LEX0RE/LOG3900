import 'package:Scrabble/constants/uri.dart';
import 'package:Scrabble/data/data_providers/data_provider.dart';
import 'package:Scrabble/data/models/interfaces/lobby-password.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:http/http.dart' as http;

class VisibilityProvider extends DataProvider {
  VisibilityProvider({required IdentityHolder identity, HttpProxy proxy = const HttpProxy()}) : super(identity, proxy);

  Future<http.Response> verifyPassword(LobbyPassword lobbyPassword) async => post(VISIBILITY_URI, lobbyPassword);
}
