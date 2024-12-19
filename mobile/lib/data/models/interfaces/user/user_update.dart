import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_update.g.dart';

@JsonSerializable(explicitToJson: true)
class UserUpdate extends Serializable<UserUpdate> {
  final String? userName;
  final String? password;
  final String? email;
  final String? profilePicture;
  final String? theme;
  final String? language;

  const UserUpdate({
    this.userName,
    this.password,
    this.email,
    this.profilePicture,
    this.theme,
    this.language,
  });

  @override
  List<Object?> get props => [
        userName,
        password,
        email,
        profilePicture,
        theme,
        language,
      ];

  @override
  factory UserUpdate.fromJson(Map<String, dynamic> json) => _$UserUpdateFromJson(json);

  @override
  UserUpdate fromJson(Map<String, dynamic> json) => _$UserUpdateFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$UserUpdateToJson(this);
}
