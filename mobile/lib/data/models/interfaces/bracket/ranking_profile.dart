import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user_profile.dart';
import 'package:json_annotation/json_annotation.dart';

part 'ranking_profile.g.dart';

@JsonSerializable(explicitToJson: true)
class RankingProfile extends Serializable<RankingProfile> {
  final int rank;
  final UserProfile user;

  const RankingProfile(this.rank, this.user);

  @override
  List<Object?> get props => [rank, user];

  factory RankingProfile.fromJson(Map<String, dynamic> json) => _$RankingProfileFromJson(json);

  @override
  RankingProfile fromJson(Map<String, dynamic> json) => _$RankingProfileFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$RankingProfileToJson(this);
}
