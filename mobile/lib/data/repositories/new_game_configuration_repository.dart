import 'package:Scrabble/constants/http_status.dart';
import 'package:Scrabble/data/data_providers/new_game_provider.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_creation.dart';

class NewGameRepository {
  final NewGameProvider newGameProvider;

  NewGameRepository({required this.newGameProvider});

  Future<void> createLobby(LobbyCreation gameInfo) async {
    final response = await newGameProvider.createLobby(gameInfo);
    if (response.statusCode == HttpStatus.CREATED) return;

    throw Exception(response.body.toString());
  }
}
