import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/interfaces/game_info/coordinate.dart';
import 'package:equatable/equatable.dart';

class PositionLetterIndex with EquatableMixin {
  final PositionLetter positionLetter;
  final int index;

  CommonLetter get letter => positionLetter.letter;
  Coordinate get position => positionLetter.position;

  PositionLetterIndex(this.positionLetter, this.index);

  PositionLetterIndex copyWith(CommonLetter letter) => PositionLetterIndex(PositionLetter(position, letter), index);

  static List<PositionLetter> toPositionLetters(List<PositionLetterIndex> positionIndexes) =>
      positionIndexes.map((position) => position.positionLetter).toList();

  static List<CommonLetter> toCommonLetters(List<PositionLetterIndex> positionIndexes) =>
      positionIndexes.map((position) => position.positionLetter.letter).toList();

  @override
  List<Object> get props => [positionLetter, index];
}

extension PositionLetterIndexExtension on List<PositionLetterIndex> {
  List<PositionLetter> toPositionLetters() => PositionLetterIndex.toPositionLetters(this);
  List<CommonLetter> toCommonLetters() => PositionLetterIndex.toCommonLetters(this);
}
