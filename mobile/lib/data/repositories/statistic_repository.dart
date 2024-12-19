import 'dart:convert';

import 'package:Scrabble/constants/http_status.dart';
import 'package:Scrabble/data/data_providers/history_provider.dart';
import 'package:Scrabble/data/models/interfaces/user/statistic/user_game_statistic.dart';
import 'package:Scrabble/data/models/interfaces/user/statistic/user_tournament_statistic.dart';

class StatisticRepository {
  final HistoryProvider historyProvider;

  StatisticRepository({required this.historyProvider});

  Future<UserGameStatistic> getGameStatistics() async {
    final response = await historyProvider.getGameStatistics();
    if (response.statusCode != HttpStatus.OK) throw Exception(response.body.toString());

    return UserGameStatistic.fromJson(jsonDecode(response.body));
  }

  Future<UserTournamentStatistic> getTournamentStatistics() async {
    final response = await historyProvider.getTournamentStatistics();
    if (response.statusCode != HttpStatus.OK) throw Exception(response.body.toString());
    return UserTournamentStatistic.fromJson(jsonDecode(response.body));
  }
}
