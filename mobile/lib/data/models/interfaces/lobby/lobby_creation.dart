import 'package:Scrabble/data/models/interfaces/lobby/common_game_config.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'lobby_creation.g.dart';

@JsonSerializable(explicitToJson: true)
class LobbyCreation extends Serializable<LobbyCreation> {
  final CommonGameConfig gameConfig;
  final String gameMode;
  final String visibility;
  final String password;
  final List<User> invitedFriends;

  const LobbyCreation(this.gameConfig, this.gameMode, this.visibility, this.password, this.invitedFriends);

  @override
  List<Object> get props => [gameConfig, gameMode, visibility, password, invitedFriends];

  factory LobbyCreation.fromJson(Map<String, dynamic> json) => _$LobbyCreationFromJson(json);

  @override
  LobbyCreation fromJson(Map<String, dynamic> json) => _$LobbyCreationFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$LobbyCreationToJson(this);
}
