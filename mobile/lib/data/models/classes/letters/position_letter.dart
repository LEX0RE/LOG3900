import 'package:Scrabble/constants/grid.dart';
import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/interfaces/game_info/coordinate.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/vector_2d.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'position_letter.g.dart';

@JsonSerializable(explicitToJson: true)
class PositionLetter extends Serializable<PositionLetter> with EquatableMixin {
  final Coordinate position;
  final CommonLetter letter;

  PositionLetter(this.position, this.letter);

  static List<PositionLetterIndex> toPositionLetterIndex(List<PositionLetter> positionLetter) {
    List<PositionLetterIndex> positionLetterIndex = [];
    positionLetter.asMap().forEach((index, PositionLetter letter) {
      positionLetterIndex.add(PositionLetterIndex(letter, index));
    });
    return positionLetterIndex;
  }

  static List<PositionLetterIndex> toGrid(List<PositionLetter> positionLetter) {
    List<PositionLetterIndex> gridLetter = [];
    positionLetter.forEach((PositionLetter letter) {
      Vector2D position = Vector2D.fromCoordinate(letter.position);
      int index = position.x % NUMBER_TILE_ROW + position.y * NUMBER_TILE_ROW;
      gridLetter.add(PositionLetterIndex(letter, index));
    });
    return gridLetter;
  }

  factory PositionLetter.fromJson(Map<String, dynamic> json) => _$PositionLetterFromJson(json);

  @override
  PositionLetter fromJson(Map<String, dynamic> json) => _$PositionLetterFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$PositionLetterToJson(this);

  @override
  List<Object> get props => [position, letter];
}

extension PositionLetterExtension on List<PositionLetter> {
  List<PositionLetterIndex> toPositionLetterIndex() => PositionLetter.toPositionLetterIndex(this);
  List<PositionLetterIndex> toGrid() => PositionLetter.toGrid(this);
}
