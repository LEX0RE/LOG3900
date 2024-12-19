import 'dart:convert';

import 'package:Scrabble/constants/http_status.dart';
import 'package:Scrabble/data/data_providers/replay_provider.dart';
import 'package:Scrabble/data/models/interfaces/replay/replay.dart';

class ReplayRepository {
  final ReplayProvider replayProvider;

  ReplayRepository({required this.replayProvider});

  Future<Replay> getReplay(String gameId) async {
    final response = await replayProvider.getReplay(gameId);
    if (response.statusCode != HttpStatus.OK) throw Exception(response.body.toString());
    Map<String, dynamic> jsonBody = jsonDecode(response.body);
    return Replay.fromJson(jsonBody);
  }
}
