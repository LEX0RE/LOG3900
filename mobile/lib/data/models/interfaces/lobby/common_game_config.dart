import 'package:Scrabble/data/models/interfaces/game_info/common_timer.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_game_config.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonGameConfig extends Serializable<CommonGameConfig> {
  final CommonTimer turnTimer;
  final String dictionaryTitle;
  final User? creator;

  const CommonGameConfig({required this.turnTimer, required this.dictionaryTitle, this.creator});

  @override
  List<Object?> get props => [turnTimer, dictionaryTitle, creator];

  factory CommonGameConfig.fromJson(Map<String, dynamic> json) => _$CommonGameConfigFromJson(json);

  @override
  CommonGameConfig fromJson(Map<String, dynamic> json) => _$CommonGameConfigFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonGameConfigToJson(this);
}
