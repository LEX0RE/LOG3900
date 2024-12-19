import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user_profile.dart';
import 'package:json_annotation/json_annotation.dart';

part 'social.g.dart';

@JsonSerializable()
class Social extends Serializable<Social> {
  final List<UserProfile> allUser;
  final List<UserProfile> friends;
  final List<UserProfile> usersBlock;
  final List<UserProfile> friendsRequest;

  const Social(this.allUser, this.friends, this.usersBlock, this.friendsRequest);

  @override
  List<Object> get props => [allUser, friends, usersBlock, friendsRequest];

  factory Social.fromJson(Map<String, dynamic> json) => _$SocialFromJson(json);

  @override
  Social fromJson(Map<String, dynamic> json) => _$SocialFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$SocialToJson(this);
}
