import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_stash.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonStash extends Serializable<CommonStash> with EquatableMixin {
  final int nLettersLeft;

  const CommonStash(this.nLettersLeft);

  @override
  List<Object?> get props => [nLettersLeft];

  factory CommonStash.fromJson(Map<String, dynamic> json) => _$CommonStashFromJson(json);

  @override
  CommonStash fromJson(Map<String, dynamic> json) => _$CommonStashFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonStashToJson(this);
}
