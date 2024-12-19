import 'package:Scrabble/data/models/interfaces/game_info/common_player_info.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_end_game.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonEndGame extends Serializable<CommonEndGame> with EquatableMixin {
  final List<CommonPlayerInfo> winners;
  final List<CommonPlayerInfo> losers;

  const CommonEndGame(this.winners, this.losers);

  @override
  List<Object> get props => [winners, losers];

  factory CommonEndGame.fromJson(Map<String, dynamic> json) => _$CommonEndGameFromJson(json);

  @override
  CommonEndGame fromJson(Map<String, dynamic> json) => _$CommonEndGameFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonEndGameToJson(this);
}
