import 'package:Scrabble/data/models/interfaces/bracket/bracket_user.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_bracket.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonBracket extends Serializable<CommonBracket> {
  final List<CommonBracket> children;
  final List<BracketUser> currentPlayers;
  final bool isMatchInProgress;
  final String gameId;

  const CommonBracket(this.children, this.currentPlayers, this.isMatchInProgress, this.gameId);

  @override
  List<Object?> get props => [children, currentPlayers, isMatchInProgress, gameId];

  factory CommonBracket.fromJson(Map<String, dynamic> json) => _$CommonBracketFromJson(json);

  @override
  CommonBracket fromJson(Map<String, dynamic> json) => _$CommonBracketFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonBracketToJson(this);
}
