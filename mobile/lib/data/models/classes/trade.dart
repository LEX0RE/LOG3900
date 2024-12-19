import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/enums/action_type.dart';
import 'package:equatable/equatable.dart';

class Trade with EquatableMixin {
  final List<PositionLetter> letters;

  const Trade(this.letters);

  @override
  List<Object?> get props => [letters];

  @override
  String toString() {
    String word = letters.map((PositionLetter positionLetter) => positionLetter.letter.letter).join();
    String actionType = actionTypeToString(ActionType.TRADE);
    return '$actionType $word';
  }
}
