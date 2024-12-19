import 'dart:convert';

import 'package:Scrabble/constants/http_status.dart';
import 'package:Scrabble/data/data_providers/visibility_provider.dart';
import 'package:Scrabble/data/models/interfaces/lobby-password.dart';

class VisibilityRepository {
  final VisibilityProvider visibilityProvider;

  VisibilityRepository({required this.visibilityProvider});

  Future<bool> verifyPassword(LobbyPassword lobbyPassword) async {
    final response = await visibilityProvider.verifyPassword(lobbyPassword);
    if (response.statusCode != HttpStatus.OK) throw Exception(response.body.toString());

    return jsonDecode(response.body) as bool;
  }
}
