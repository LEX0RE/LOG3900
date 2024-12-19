import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'join-response.g.dart';

@JsonSerializable(explicitToJson: true)
class JoinResponse extends Serializable<JoinResponse> {
  final User user;
  final String? lobbyId;

  const JoinResponse(this.user, this.lobbyId);

  @override
  List<Object> get props => [user];

  factory JoinResponse.fromJson(Map<String, dynamic> json) => _$JoinResponseFromJson(json);

  @override
  JoinResponse fromJson(Map<String, dynamic> json) => _$JoinResponseFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$JoinResponseToJson(this);
}
