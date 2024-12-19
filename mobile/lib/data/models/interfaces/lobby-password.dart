import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'lobby-password.g.dart';

@JsonSerializable(explicitToJson: true)
class LobbyPassword extends Serializable<LobbyPassword> {
  final String lobbyId;
  final String password;

  const LobbyPassword(this.lobbyId, this.password);

  @override
  List<Object> get props => [lobbyId, password];

  factory LobbyPassword.fromJson(Map<String, dynamic> json) => _$LobbyPasswordFromJson(json);

  @override
  LobbyPassword fromJson(Map<String, dynamic> json) => _$LobbyPasswordFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$LobbyPasswordToJson(this);
}
