import 'package:Scrabble/constants/uri.dart';
import 'package:Scrabble/data/data_providers/data_provider.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:http/http.dart' as http;

class ReplayProvider extends DataProvider {
  ReplayProvider({required IdentityHolder identity, HttpProxy proxy = const HttpProxy()}) : super(identity, proxy);

  Future<http.Response> getReplay(String gameId) async => get('$REPLAY_URI/$gameId');
}
