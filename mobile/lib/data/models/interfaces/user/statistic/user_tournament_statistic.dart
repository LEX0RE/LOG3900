import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_tournament_statistic.g.dart';

@JsonSerializable(explicitToJson: true)
class UserTournamentStatistic extends Serializable<UserTournamentStatistic> {
  final String userId;
  final int nTournamentPlayed;
  final int nPoints;
  final int nFirstPlace;
  final int nSecondPlace;
  final int nThirdPlace;
  final int nFourthPlace;

  const UserTournamentStatistic(this.userId, this.nTournamentPlayed, this.nPoints, this.nFirstPlace, this.nSecondPlace,
      this.nThirdPlace, this.nFourthPlace);

  @override
  List<Object> get props => [userId, nTournamentPlayed, nPoints, nFirstPlace, nSecondPlace, nThirdPlace, nFourthPlace];

  factory UserTournamentStatistic.fromJson(Map<String, dynamic> json) => _$UserTournamentStatisticFromJson(json);

  @override
  UserTournamentStatistic fromJson(Map<String, dynamic> json) => _$UserTournamentStatisticFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$UserTournamentStatisticToJson(this);
}
