import 'package:Scrabble/data/models/interfaces/game_history/game_info_history.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'game_histories.g.dart';

@JsonSerializable(explicitToJson: true)
class GameHistories extends Serializable<GameHistories> with EquatableMixin {
  final List<GameInfoHistory> gameHistories;

  const GameHistories(this.gameHistories);

  @override
  List<Object> get props => [gameHistories];

  factory GameHistories.fromJson(Map<String, dynamic> json) => _$GameHistoriesFromJson(json);

  @override
  GameHistories fromJson(Map<String, dynamic> json) => _$GameHistoriesFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$GameHistoriesToJson(this);
}
