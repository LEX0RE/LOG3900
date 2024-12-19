import 'package:Scrabble/data/models/interfaces/game_info/common_board.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'board_update.g.dart';

@JsonSerializable(explicitToJson: true)
class BoardUpdate extends Serializable<BoardUpdate> with EquatableMixin {
  final CommonBoard board;

  const BoardUpdate(this.board);

  @override
  List<Object> get props => [board];

  factory BoardUpdate.fromJson(Map<String, dynamic> json) => _$BoardUpdateFromJson(json);

  @override
  BoardUpdate fromJson(Map<String, dynamic> json) => _$BoardUpdateFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$BoardUpdateToJson(this);
}
