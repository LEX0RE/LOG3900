import 'package:Scrabble/data/models/interfaces/game_info/common_tile.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_board.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonBoard extends Serializable<CommonBoard> with EquatableMixin {
  final List<CommonTile> tiles;

  const CommonBoard(this.tiles);

  @override
  List<Object> get props => [tiles];

  factory CommonBoard.fromJson(Map<String, dynamic> json) => _$CommonBoardFromJson(json);

  @override
  CommonBoard fromJson(Map<String, dynamic> json) => _$CommonBoardFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonBoardToJson(this);
}
