import 'package:Scrabble/data/models/interfaces/game_info/common_end_game.dart';
import 'package:Scrabble/data/models/interfaces/replay/turn.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'replay.g.dart';

@JsonSerializable(explicitToJson: true)
class Replay extends Serializable<Replay> {
  final DateTime date;
  final String gameId;
  final List<User> realPlayers;
  final List<Turn> turns;
  final CommonEndGame endGame;

  const Replay(this.date, this.gameId, this.realPlayers, this.turns, this.endGame);

  @override
  List<Object> get props => [date, gameId, realPlayers, turns, endGame];

  factory Replay.fromJson(Map<String, dynamic> json) => _$ReplayFromJson(json);

  @override
  Replay fromJson(Map<String, dynamic> json) => _$ReplayFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ReplayToJson(this);
}
