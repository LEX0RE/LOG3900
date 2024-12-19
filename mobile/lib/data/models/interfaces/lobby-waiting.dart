import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'lobby-waiting.g.dart';

@JsonSerializable(explicitToJson: true)
class LobbyWaiting extends Serializable<LobbyWaiting> {
  final bool isWaiting;
  final String? lobbyId;

  const LobbyWaiting(this.isWaiting, this.lobbyId);

  @override
  List<Object> get props => [isWaiting];

  factory LobbyWaiting.fromJson(Map<String, dynamic> json) => _$LobbyWaitingFromJson(json);

  @override
  LobbyWaiting fromJson(Map<String, dynamic> json) => _$LobbyWaitingFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$LobbyWaitingToJson(this);
}
