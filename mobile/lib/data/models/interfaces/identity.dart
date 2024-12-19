import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'identity.g.dart';

@JsonSerializable(explicitToJson: true)
class Identity extends Serializable<Identity> {
  final String token;
  final User user;

  String get name => user.name;
  String get userId => user.id;

  const Identity({
    required this.user,
    required this.token,
  });

  @override
  List<Object> get props => [user, token];

  factory Identity.fromJson(Map<String, dynamic> json) => _$IdentityFromJson(json);

  @override
  Identity fromJson(Map<String, dynamic> json) => _$IdentityFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$IdentityToJson(this);
}
