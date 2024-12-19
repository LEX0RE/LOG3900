import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_login.g.dart';

@JsonSerializable(explicitToJson: true)
class UserLogin extends Serializable<UserLogin> with EquatableMixin {
  final String userName;
  final String password;

  const UserLogin(this.userName, this.password);

  @override
  List<Object> get props => [userName, password];

  factory UserLogin.fromJson(Map<String, dynamic> json) => _$UserLoginFromJson(json);

  @override
  UserLogin fromJson(Map<String, dynamic> json) => _$UserLoginFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$UserLoginToJson(this);
}
