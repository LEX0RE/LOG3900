import 'package:Scrabble/constants/uri.dart';
import 'package:Scrabble/data/data_providers/data_provider.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_creation.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:http/http.dart' as http;

class NewGameProvider extends DataProvider {
  NewGameProvider({required IdentityHolder identity, HttpProxy proxy = const HttpProxy()}) : super(identity, proxy);

  Future<http.Response> createLobby(LobbyCreation gameToCreate) async => post(LOBBY_URI, gameToCreate);
}
