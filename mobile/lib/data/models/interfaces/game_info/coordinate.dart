import 'package:Scrabble/constants/grid.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/vector_2d.dart';
import 'package:json_annotation/json_annotation.dart';

part 'coordinate.g.dart';

@JsonSerializable(explicitToJson: true)
class Coordinate extends Serializable<Coordinate> {
  final String row;
  final int column;

  const Coordinate(this.row, this.column);

  factory Coordinate.fromString(String string) {
    final String row = RegExp(r'(?<Row>^[A-z](?=[0-9]))').firstMatch(string)?.namedGroup('Row') ?? '';
    final String column = RegExp(r'(?<Column>((?<=[A-z])[0-9]+))').firstMatch(string)?.namedGroup('Column') ?? '';
    return Coordinate(row, int.parse(column));
  }

  factory Coordinate.fromVector2D(Vector2D vector2D) {
    return Coordinate(BOARD_ROW[vector2D.y - 1], vector2D.x);
  }

  static Vector2D toVector2D(Coordinate coordinate) {
    return Vector2D(BOARD_ROW.indexOf(coordinate.row.toUpperCase()) + 1, coordinate.column);
  }

  factory Coordinate.fromJson(Map<String, dynamic> json) => _$CoordinateFromJson(json);

  @override
  Coordinate fromJson(Map<String, dynamic> json) => _$CoordinateFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CoordinateToJson(this);

  @override
  List<Object> get props => [row, column];

  @override
  String toString() => '$row$column';
}
