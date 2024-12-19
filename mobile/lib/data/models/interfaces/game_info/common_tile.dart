import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/interfaces/game_info/coordinate.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_tile.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonTile extends Serializable<CommonTile> with EquatableMixin {
  final Coordinate coordinate;
  final CommonLetter letter;

  const CommonTile(this.coordinate, this.letter);

  @override
  List<Object> get props => [coordinate, letter];

  static List<PositionLetter> toPositionLetter(List<CommonTile> tiles) =>
      tiles.map((CommonTile tile) => PositionLetter(tile.coordinate, tile.letter)).toList();

  factory CommonTile.fromJson(Map<String, dynamic> json) => _$CommonTileFromJson(json);

  @override
  CommonTile fromJson(Map<String, dynamic> json) => _$CommonTileFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonTileToJson(this);
}

extension CommonTileExtension on List<CommonTile> {
  List<PositionLetter> toPositionLetter() => CommonTile.toPositionLetter(this);
}
