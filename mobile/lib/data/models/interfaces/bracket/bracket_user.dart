import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'bracket_user.g.dart';

@JsonSerializable(explicitToJson: true)
class BracketUser extends Serializable<BracketUser> with EquatableMixin {
  final String id;
  final String name;
  final int winner;
  final String? profilePicture;

  const BracketUser(this.id, this.name, this.winner, this.profilePicture);

  @override
  List<Object?> get props => [id, name, winner, profilePicture];

  factory BracketUser.fromJson(Map<String, dynamic> json) => _$BracketUserFromJson(json);

  @override
  BracketUser fromJson(Map<String, dynamic> json) => _$BracketUserFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$BracketUserToJson(this);
}
