import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_profile.g.dart';

@JsonSerializable(explicitToJson: true)
class UserProfile extends Serializable<UserProfile> {
  final String name;
  final String id;
  final String? profilePicture;

  const UserProfile(this.name, this.id, this.profilePicture);

  @override
  List<Object?> get props => [name, id, profilePicture];

  factory UserProfile.fromJson(Map<String, dynamic> json) => _$UserProfileFromJson(json);

  @override
  UserProfile fromJson(Map<String, dynamic> json) => _$UserProfileFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$UserProfileToJson(this);
}
