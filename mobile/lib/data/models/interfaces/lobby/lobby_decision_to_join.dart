import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'lobby_decision_to_join.g.dart';

@JsonSerializable(explicitToJson: true)
class LobbyDecisionToJoin extends Serializable<LobbyDecisionToJoin> {
  final String lobbyId;
  final bool decision;

  const LobbyDecisionToJoin(this.lobbyId, this.decision);

  @override
  List<Object> get props => [lobbyId, decision];

  factory LobbyDecisionToJoin.fromJson(Map<String, dynamic> json) => _$LobbyDecisionToJoinFromJson(json);

  @override
  LobbyDecisionToJoin fromJson(Map<String, dynamic> json) => _$LobbyDecisionToJoinFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$LobbyDecisionToJoinToJson(this);
}
