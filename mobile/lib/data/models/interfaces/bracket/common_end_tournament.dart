import 'package:Scrabble/data/models/interfaces/bracket/ranking_profile.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_end_tournament.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonEndTournament extends Serializable<CommonEndTournament> {
  final List<RankingProfile> players;

  const CommonEndTournament(this.players);

  @override
  List<Object> get props => [players];

  factory CommonEndTournament.fromJson(Map<String, dynamic> json) => _$CommonEndTournamentFromJson(json);

  @override
  CommonEndTournament fromJson(Map<String, dynamic> json) => _$CommonEndTournamentFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonEndTournamentToJson(this);
}
