import 'package:Scrabble/data/models/interfaces/lobby/common_game_config.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'game_info.g.dart';

@JsonSerializable(explicitToJson: true)
class GameInfo extends Serializable<GameInfo> {
  final CommonGameConfig gameConfig;
  final String visibility;
  final String lobbyId;
  final List<User> players;
  final List<User> observers;
  final List<String> virtualPlayerNames;
  bool isOngoing;

  GameInfo(this.gameConfig, this.visibility, this.lobbyId, this.players, this.observers, this.virtualPlayerNames,
      this.isOngoing);

  @override
  List<Object> get props => [gameConfig, lobbyId, players, observers, virtualPlayerNames];

  factory GameInfo.fromJson(Map<String, dynamic> json) => _$GameInfoFromJson(json);

  @override
  GameInfo fromJson(Map<String, dynamic> json) => _$GameInfoFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$GameInfoToJson(this);
}
