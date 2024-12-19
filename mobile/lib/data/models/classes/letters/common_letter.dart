import 'package:Scrabble/constants/game.dart';
import 'package:Scrabble/constants/letter_points.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/interfaces/game_info/coordinate.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_letter.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonLetter extends Serializable<CommonLetter> with EquatableMixin {
  final String letter;
  final int point;

  bool get isBlank => letter == BLANK || letter.toUpperCase() == letter;

  const CommonLetter(this.letter, this.point);

  static empty() => const CommonLetter('', ZERO_POINT);

  PositionLetterIndex toPositionLetterIndex(int index, Coordinate coordinate) =>
      PositionLetterIndex(PositionLetter(coordinate, this), index);

  factory CommonLetter.fromJson(Map<String, dynamic> json) => _$CommonLetterFromJson(json);

  @override
  CommonLetter fromJson(Map<String, dynamic> json) => _$CommonLetterFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonLetterToJson(this);

  @override
  List<Object> get props => [letter, point];

  factory CommonLetter.fromString(String letter) {
    switch (letter.toLowerCase()) {
      case 'a':
        return const CommonLetter('a', ONE_POINT);
      case 'b':
        return const CommonLetter('b', THREE_POINTS);
      case 'c':
        return const CommonLetter('c', THREE_POINTS);
      case 'd':
        return const CommonLetter('d', TWO_POINTS);
      case 'e':
        return const CommonLetter('e', ONE_POINT);
      case 'f':
        return const CommonLetter('f', FOUR_POINTS);
      case 'g':
        return const CommonLetter('g', TWO_POINTS);
      case 'h':
        return const CommonLetter('h', FOUR_POINTS);
      case 'i':
        return const CommonLetter('i', ONE_POINT);
      case 'j':
        return const CommonLetter('j', HEIGHT_POINTS);
      case 'k':
        return const CommonLetter('k', TEN_POINTS);
      case 'l':
        return const CommonLetter('l', ONE_POINT);
      case 'm':
        return const CommonLetter('m', TWO_POINTS);
      case 'n':
        return const CommonLetter('n', ONE_POINT);
      case 'o':
        return const CommonLetter('o', ONE_POINT);
      case 'p':
        return const CommonLetter('p', THREE_POINTS);
      case 'q':
        return const CommonLetter('q', HEIGHT_POINTS);
      case 'r':
        return const CommonLetter('r', ONE_POINT);
      case 's':
        return const CommonLetter('s', ONE_POINT);
      case 't':
        return const CommonLetter('t', ONE_POINT);
      case 'u':
        return const CommonLetter('u', ONE_POINT);
      case 'v':
        return const CommonLetter('v', FOUR_POINTS);
      case 'w':
        return const CommonLetter('w', TEN_POINTS);
      case 'x':
        return const CommonLetter('x', TEN_POINTS);
      case 'y':
        return const CommonLetter('y', TEN_POINTS);
      case 'z':
        return const CommonLetter('z', TEN_POINTS);
    }
    return CommonLetter(letter, ZERO_POINT);
  }
}
