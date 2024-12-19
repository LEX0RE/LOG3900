import 'package:Scrabble/data/models/interfaces/lobby/game_info.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'available_lobbies.g.dart';

@JsonSerializable(explicitToJson: true)
class AvailableLobbies extends Serializable<AvailableLobbies> with EquatableMixin {
  final List<LobbyInfo> availableLobbies;

  const AvailableLobbies(this.availableLobbies);

  @override
  List<Object> get props => [availableLobbies];

  factory AvailableLobbies.fromJson(Map<String, dynamic> json) => _$AvailableLobbiesFromJson(json);

  @override
  AvailableLobbies fromJson(Map<String, dynamic> json) => _$AvailableLobbiesFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$AvailableLobbiesToJson(this);
}

@JsonSerializable(explicitToJson: true)
class AvailableGames extends Serializable<AvailableGames> with EquatableMixin {
  final List<GameInfo> availableGames;

  const AvailableGames(this.availableGames);

  @override
  List<Object> get props => [availableGames];

  factory AvailableGames.fromJson(Map<String, dynamic> json) => _$AvailableGamesFromJson(json);

  @override
  AvailableGames fromJson(Map<String, dynamic> json) => _$AvailableGamesFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$AvailableGamesToJson(this);
}
