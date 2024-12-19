import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'game_info_history.g.dart';

@JsonSerializable(explicitToJson: true)
class GameInfoHistory extends Serializable<GameInfoHistory> with EquatableMixin {
  final String gameId;
  final List<User> realPlayers;
  final DateTime beginningDate;
  final int duration;
  final List<User> winners;
  final List<User> losers;

  const GameInfoHistory(this.gameId, this.realPlayers, this.beginningDate, this.duration, this.winners, this.losers);

  @override
  List<Object> get props => [gameId, realPlayers, beginningDate, duration, winners, losers];

  factory GameInfoHistory.fromJson(Map<String, dynamic> json) => _$GameInfoHistoryFromJson(json);

  @override
  GameInfoHistory fromJson(Map<String, dynamic> json) => _$GameInfoHistoryFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$GameInfoHistoryToJson(this);
}
