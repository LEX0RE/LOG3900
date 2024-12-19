import 'package:Scrabble/data/models/interfaces/game_info/common_player_info.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_stash.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'game_update.g.dart';

@JsonSerializable(explicitToJson: true)
class GameUpdate extends Serializable<GameUpdate> with EquatableMixin {
  final CommonPlayerInfo playerInfo;
  final List<CommonPlayerInfo> otherPlayersInfo;
  final CommonStash stash;

  const GameUpdate(this.playerInfo, this.otherPlayersInfo, this.stash);

  factory GameUpdate.fromJson(Map<String, dynamic> json) => _$GameUpdateFromJson(json);

  @override
  List<Object> get props => [playerInfo, otherPlayersInfo, stash];

  @override
  GameUpdate fromJson(Map<String, dynamic> json) => _$GameUpdateFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$GameUpdateToJson(this);
}
