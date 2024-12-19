import 'package:Scrabble/data/models/interfaces/game_info/common_easel.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'easel_update.g.dart';

@JsonSerializable(explicitToJson: true)
class EaselUpdate extends Serializable<EaselUpdate> with EquatableMixin {
  final CommonEasel easel;

  const EaselUpdate(this.easel);

  factory EaselUpdate.fromJson(Map<String, dynamic> json) => _$EaselUpdateFromJson(json);

  @override
  EaselUpdate fromJson(Map<String, dynamic> json) => _$EaselUpdateFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$EaselUpdateToJson(this);

  @override
  List<Object?> get props => [easel];
}

@JsonSerializable(explicitToJson: true)
class UserEaselUpdate extends Serializable<UserEaselUpdate> {
  final CommonEasel easel;
  final String userId;

  const UserEaselUpdate(this.easel, this.userId);

  factory UserEaselUpdate.fromJson(Map<String, dynamic> json) => _$UserEaselUpdateFromJson(json);

  @override
  UserEaselUpdate fromJson(Map<String, dynamic> json) => _$UserEaselUpdateFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$UserEaselUpdateToJson(this);

  @override
  List<Object?> get props => [easel];
}
