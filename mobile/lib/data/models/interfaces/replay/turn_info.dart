import 'package:Scrabble/data/models/interfaces/game_info/easel_update.dart';
import 'package:Scrabble/data/models/interfaces/game_info/game_update.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'turn_info.g.dart';

@JsonSerializable(explicitToJson: true)
class TurnInfo extends Serializable<TurnInfo> with EquatableMixin {
  final EaselUpdate easelUpdate;
  final GameUpdate gameUpdate;

  const TurnInfo(this.easelUpdate, this.gameUpdate);

  @override
  List<Object> get props => [easelUpdate, gameUpdate];

  factory TurnInfo.fromJson(Map<String, dynamic> json) => _$TurnInfoFromJson(json);

  @override
  TurnInfo fromJson(Map<String, dynamic> json) => _$TurnInfoFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$TurnInfoToJson(this);
}
