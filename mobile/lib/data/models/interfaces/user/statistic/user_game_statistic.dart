import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_game_statistic.g.dart';

@JsonSerializable(explicitToJson: true)
class UserGameStatistic extends Serializable<UserGameStatistic> {
  final String userId;
  final int nPlayedGames;
  final int nWonGames;
  final int meanScore;
  final int meanDuration;

  const UserGameStatistic(this.userId, this.nPlayedGames, this.nWonGames, this.meanScore, this.meanDuration);

  @override
  List<Object> get props => [userId, nPlayedGames, nWonGames, meanScore, meanDuration];

  factory UserGameStatistic.fromJson(Map<String, dynamic> json) => _$UserGameStatisticFromJson(json);

  @override
  UserGameStatistic fromJson(Map<String, dynamic> json) => _$UserGameStatisticFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$UserGameStatisticToJson(this);
}
