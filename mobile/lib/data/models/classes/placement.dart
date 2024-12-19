import 'package:Scrabble/constants/game.dart';
import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/enums/action_type.dart';
import 'package:Scrabble/data/models/enums/orientation_type.dart';
import 'package:Scrabble/data/models/interfaces/game_info/coordinate.dart';
import 'package:equatable/equatable.dart';

class Placement with EquatableMixin {
  final List<PositionLetter> letters;
  OrientationType orientation;
  Coordinate start;

  Placement(this.letters, this.orientation, this.start);

  factory Placement.copy(Placement placement) => Placement(
        List<PositionLetter>.from(placement.letters),
        placement.orientation,
        placement.start,
      );

  factory Placement.fromCommand(String command) {
    if (command.isEmpty) return Placement([], OrientationType.None, EMPTY_COORDINATE);
    command = command.substring(1);
    final List<String> commandParts = command.split(' ');
    if (commandParts.length < 3) return Placement([], OrientationType.None, EMPTY_COORDINATE);
    final OrientationType orientation = stringToOrientationType(commandParts[1]);
    final Coordinate start = Coordinate.fromString(commandParts[1]);
    List<PositionLetter> letters = [];
    commandParts[2].runes.forEach((int element) {
      final CommonLetter letter = CommonLetter.fromString(String.fromCharCode(element));
      letters.add(PositionLetter(EMPTY_COORDINATE, letter));
    });

    return Placement(letters, orientation, start);
  }

  @override
  List<Object> get props => [letters, orientation, start];

  @override
  String toString() {
    String word = letters.map((PositionLetter positionLetter) => positionLetter.letter.letter).join();
    String actionType = actionTypeToString(ActionType.PLACE_LETTER);
    String orientation = orientationTypeToString(this.orientation);
    String start = this.start.toString();
    return '$actionType $start$orientation $word';
  }
}
