import 'package:Scrabble/data/models/enums/bracket_result.dart';
import 'package:Scrabble/data/models/interfaces/bracket/bracket_user.dart';
import 'package:Scrabble/data/models/interfaces/bracket/common_bracket.dart';

BracketUser FAKE_BRACKET_USER(int id, int winner) {
  return BracketUser(id.toString(), 'User mmmmmmm $id', winner, '');
}

CommonBracket FAKE_BRACKET_NODE_1() {
  return CommonBracket([], [
    FAKE_BRACKET_USER(1, bracketResultToInt(BracketResult.WINNER)),
    FAKE_BRACKET_USER(2, bracketResultToInt(BracketResult.LOSER))
  ], false, '');
}

CommonBracket FAKE_BRACKET_NODE_2() {
  return CommonBracket([], [
    FAKE_BRACKET_USER(3, bracketResultToInt(BracketResult.NO_RESULT)),
    FAKE_BRACKET_USER(4, bracketResultToInt(BracketResult.LOSER))
  ], true, '');
}

CommonBracket FAKE_BRACKET_1() {
  return CommonBracket([FAKE_BRACKET_NODE_1(), FAKE_BRACKET_NODE_2()],
      [FAKE_BRACKET_USER(1, bracketResultToInt(BracketResult.NO_RESULT))], false, '');
}

CommonBracket FAKE_CONSOLATION_BRACKET_1() {
  return CommonBracket([], [
    FAKE_BRACKET_USER(2, bracketResultToInt(BracketResult.NO_RESULT)),
    FAKE_BRACKET_USER(5, bracketResultToInt(BracketResult.NO_RESULT))
  ], true, '');
}
