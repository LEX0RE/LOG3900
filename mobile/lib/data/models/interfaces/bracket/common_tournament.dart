import 'package:Scrabble/data/models/interfaces/bracket/common_bracket.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_tournament.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonTournament extends Serializable<CommonTournament> {
  final List<CommonBracket> brackets;

  const CommonTournament(this.brackets);

  @override
  List<Object?> get props => [brackets];

  factory CommonTournament.fromJson(Map<String, dynamic> json) => _$CommonTournamentFromJson(json);

  @override
  CommonTournament fromJson(Map<String, dynamic> json) => _$CommonTournamentFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonTournamentToJson(this);
}
