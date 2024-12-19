import 'package:Scrabble/constants/game.dart';
import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_easel.dart';
import 'package:Scrabble/data/models/interfaces/game_info/coordinate.dart';

final FAKE_COORDINATE_1 = () {
  return const Coordinate('A', 1);
};

final FAKE_COORDINATE_2 = () {
  return const Coordinate('B', 2);
};

final FAKE_COORDINATE_3 = () {
  return const Coordinate('C', 3);
};

final FAKE_COORDINATE_4 = () {
  return const Coordinate('D', 4);
};

final FAKE_COORDINATE_5 = () {
  return const Coordinate('E', 5);
};

final FAKE_COORDINATE_6 = () {
  return const Coordinate('F', 6);
};

final FAKE_COMMON_LETTER_1 = () => CommonLetter('e', 1);

final FAKE_COMMON_LETTER_2 = () => CommonLetter('g', 2);

final FAKE_COMMON_LETTER_3 = () => CommonLetter('o', 1);

final FAKE_COMMON_LETTER_4 = () => CommonLetter(BLANK, 0);

final FAKE_COMMON_LETTER_5 = () => CommonLetter('a', 1);

final FAKE_COMMON_LETTER_6 = () => CommonLetter('a', 1);

final FAKE_POSITION_LETTER_1 = () => PositionLetter(
      FAKE_COORDINATE_1(),
      FAKE_COMMON_LETTER_1(),
    );

final FAKE_POSITION_LETTER_2 = () => PositionLetter(
      FAKE_COORDINATE_2(),
      FAKE_COMMON_LETTER_2(),
    );

final FAKE_POSITION_LETTER_3 = () => PositionLetter(
      FAKE_COORDINATE_3(),
      FAKE_COMMON_LETTER_3(),
    );

final FAKE_POSITION_LETTER_4 = () => PositionLetter(
      FAKE_COORDINATE_4(),
      FAKE_COMMON_LETTER_4(),
    );

final FAKE_POSITION_LETTER_5 = () => PositionLetter(
      FAKE_COORDINATE_5(),
      FAKE_COMMON_LETTER_5(),
    );

final FAKE_POSITION_LETTER_6 = () => PositionLetter(
      FAKE_COORDINATE_6(),
      FAKE_COMMON_LETTER_6(),
    );

final FAKE_POSITION_LETTER_LIST_1 = () => [
      FAKE_POSITION_LETTER_1(),
      FAKE_POSITION_LETTER_2(),
      FAKE_POSITION_LETTER_3(),
      FAKE_POSITION_LETTER_4(),
    ];

final FAKE_POSITION_LETTER_INDEX_1 = () => PositionLetterIndex(
      FAKE_POSITION_LETTER_1(),
      0,
    );

final FAKE_POSITION_LETTER_INDEX_2 = () => PositionLetterIndex(
      FAKE_POSITION_LETTER_2(),
      1,
    );

final FAKE_POSITION_LETTER_INDEX_3 = () => PositionLetterIndex(
      FAKE_POSITION_LETTER_3(),
      2,
    );

final FAKE_POSITION_LETTER_INDEX_4 = () => PositionLetterIndex(
      FAKE_POSITION_LETTER_4(),
      3,
    );

final FAKE_POSITION_LETTER_INDEX_5 = () => PositionLetterIndex(
      FAKE_POSITION_LETTER_5(),
      4,
    );

final FAKE_POSITION_LETTER_INDEX_6 = () => PositionLetterIndex(
      FAKE_POSITION_LETTER_6(),
      5,
    );

final FAKE_POSITION_LETTER_INDEX_LIST_1 = () => [
      FAKE_POSITION_LETTER_INDEX_1(),
      FAKE_POSITION_LETTER_INDEX_2(),
      FAKE_POSITION_LETTER_INDEX_3(),
      FAKE_POSITION_LETTER_INDEX_4(),
      FAKE_POSITION_LETTER_INDEX_5(),
      FAKE_POSITION_LETTER_INDEX_6(),
    ];

final FAKE_COMMON_EASEL = () => CommonEasel.fromJson({
      'letters': [
        FAKE_COMMON_LETTER_1().toJson(),
        FAKE_COMMON_LETTER_2().toJson(),
        FAKE_COMMON_LETTER_3().toJson(),
        FAKE_COMMON_LETTER_4().toJson(),
        FAKE_COMMON_LETTER_5().toJson(),
        FAKE_COMMON_LETTER_6().toJson()
      ]
    });
