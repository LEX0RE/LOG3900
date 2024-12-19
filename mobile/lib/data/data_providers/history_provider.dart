import 'package:Scrabble/constants/uri.dart';
import 'package:Scrabble/data/data_providers/data_provider.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:http/http.dart' as http;

class HistoryProvider extends DataProvider {
  HistoryProvider({required IdentityHolder identity, HttpProxy proxy = const HttpProxy()}) : super(identity, proxy);

  Future<http.Response> getHistory() async => get(HISTORY_URI);

  Future<http.Response> getGameStatistics() async => get(GAME_STATISTICS_URI);

  Future<http.Response> getTournamentStatistics() async => get(TOURNAMENT_STATISTICS_URI);
}
