import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/enums/selection_type.dart';

class ViewLetter extends CommonLetter {
  final int easelViewIndex;
  final int easelLogicIndex;
  final SelectionType selectionType;

  get toCommonLetter => CommonLetter(letter, point);

  ViewLetter(this.easelViewIndex, this.easelLogicIndex, this.selectionType, String letter, int point)
      : super(letter, point);

  static List<CommonLetter> viewToCommon(List<ViewLetter> viewLetters) => viewLetters.map((ViewLetter letter) => CommonLetter(letter.letter, letter.point)).toList();

  static List<ViewLetter> commonToView(List<CommonLetter> commonLetters) => commonLetters
        .asMap()
        .entries
        .map((MapEntry<int, CommonLetter> entry) =>
            ViewLetter(entry.key, entry.key, SelectionType.Unselected, entry.value.letter, entry.value.point))
        .toList();
}
