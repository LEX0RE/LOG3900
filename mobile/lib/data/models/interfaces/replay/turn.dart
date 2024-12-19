import 'package:Scrabble/data/models/interfaces/game_info/board_update.dart';
import 'package:Scrabble/data/models/interfaces/replay/turn_info.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:tuple/tuple.dart';

class Turn extends Serializable<Turn> with EquatableMixin {
  final int turn;
  final List<Tuple2<String, TurnInfo>> infos;
  final BoardUpdate boardUpdate;

  const Turn(this.turn, this.infos, this.boardUpdate);

  @override
  List<Object> get props => [turn, infos, boardUpdate];

  factory Turn.fromJson(Map<String, dynamic> json) => _$TurnFromJson(json);

  @override
  Turn fromJson(Map<String, dynamic> json) => _$TurnFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$TurnToJson(this);
}

Turn _$TurnFromJson(Map<String, dynamic> json) => Turn(
    json['turn'] as int,
    (json['infos'] as List<dynamic>)
        .map((item) => Tuple2<String, TurnInfo>(item[0] as String, TurnInfo.fromJson(item[1] as Map<String, dynamic>)))
        .toList(),
    BoardUpdate.fromJson(json['boardUpdate'] as Map<String, dynamic>));

Map<String, dynamic> _$TurnToJson(Turn instance) => <String, dynamic>{
      'turn': instance.turn,
      'infos': instance.infos.map((tuple) => [tuple.item1, tuple.item2.toJson()]).toList(),
      'boardUpdate': instance.boardUpdate.toJson(),
    };
