import 'package:Scrabble/constants/grid.dart';
import 'package:Scrabble/data/models/interfaces/game_info/coordinate.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'vector_2d.g.dart';

@JsonSerializable(explicitToJson: true)
class Vector2D extends Serializable<Vector2D> with EquatableMixin {
  final int x;
  final int y;

  const Vector2D(this.x, this.y);

  add(Vector2D other) => Vector2D(x + other.x, y + other.y);

  @override
  List<Object> get props => [x, y];

  factory Vector2D.fromJson(Map<String, dynamic> json) => _$Vector2DFromJson(json);

  factory Vector2D.fromCoordinate(Coordinate coordinate) =>
      Vector2D(coordinate.column, BOARD_ROW.indexOf(coordinate.row) + 1);

  @override
  Vector2D fromJson(Map<String, dynamic> json) => _$Vector2DFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$Vector2DToJson(this);

  bool isAdjacent(Vector2D other) =>
      (x == other.x && (y == other.y + 1 || y == other.y - 1)) ||
      (y == other.y && (x == other.x + 1 || x == other.x - 1));
}
