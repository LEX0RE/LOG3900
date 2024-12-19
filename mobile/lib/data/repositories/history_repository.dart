import 'dart:convert';

import 'package:Scrabble/constants/http_status.dart';
import 'package:Scrabble/data/data_providers/history_provider.dart';
import 'package:Scrabble/data/data_providers/user_provider.dart';
import 'package:Scrabble/data/models/interfaces/game_history/game_histories.dart';
import 'package:Scrabble/data/models/interfaces/user/statistic/user_connections.dart';

class HistoryRepository {
  final HistoryProvider historyProvider;
  final UserProvider userProvider;

  HistoryRepository({required this.historyProvider, required this.userProvider});

  Future<GameHistories> getHistory() async {
    final response = await historyProvider.getHistory();
    if (response.statusCode != HttpStatus.OK) throw Exception(response.body.toString());

    Map<String, dynamic> jsonBody = jsonDecode(response.body);
    return GameHistories.fromJson(jsonBody);
  }

  Future<UserConnections> getConnectionSummary() async {
    final response = await userProvider.getConnectionSummary();
    if (response.statusCode != HttpStatus.OK) throw Exception(response.body.toString());
    return UserConnections.fromJson(jsonDecode(response.body));
  }
}
