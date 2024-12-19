import 'package:Scrabble/data/models/interfaces/lobby/common_game_config.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'lobby_info.g.dart';

@JsonSerializable(explicitToJson: true)
class LobbyInfo extends Serializable<LobbyInfo> {
  final CommonGameConfig gameConfig;
  final String visibility;
  final String lobbyId;
  final String chatId;
  final List<User> players;
  final List<User> observers;
  final List<String> playerResponse;
  final List<String> virtualPlayerNames;
  final String gameMode;
  final List<User> potentialPlayers;

  const LobbyInfo(this.gameConfig, this.visibility, this.lobbyId, this.chatId, this.players, this.observers,
      this.virtualPlayerNames, this.gameMode, this.potentialPlayers, this.playerResponse);

  @override
  List<Object> get props => [
        gameConfig,
        visibility,
        lobbyId,
        chatId,
        players,
        observers,
        virtualPlayerNames,
        gameMode,
        potentialPlayers,
        playerResponse
      ];

  factory LobbyInfo.fromJson(Map<String, dynamic> json) => _$LobbyInfoFromJson(json);

  @override
  LobbyInfo fromJson(Map<String, dynamic> json) => _$LobbyInfoFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$LobbyInfoToJson(this);
}
