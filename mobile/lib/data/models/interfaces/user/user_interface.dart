import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_interface.g.dart';

@JsonSerializable(explicitToJson: true)
class UserInterface extends Serializable<UserInterface> {
  final String userName;
  final String password;
  final String email;
  final String profilePicture;
  final String theme;
  final String language;
  final List<String> friends;
  final List<String> usersBlock;
  final List<String> friendsRequest;
  final String token;
  final String userId;

  const UserInterface(
    this.userName,
    this.password,
    this.email,
    this.profilePicture,
    this.theme,
    this.language,
    this.token,
    this.userId,
    this.friends,
    this.usersBlock,
    this.friendsRequest,
  );

  @override
  List<Object> get props =>
      [userName, password, email, profilePicture, theme, language, token, userId, friends, usersBlock, friendsRequest];

  @override
  factory UserInterface.fromJson(Map<String, dynamic> json) => _$UserInterfaceFromJson(json);

  @override
  UserInterface fromJson(Map<String, dynamic> json) => _$UserInterfaceFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$UserInterfaceToJson(this);
}
