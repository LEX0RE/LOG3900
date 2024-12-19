import 'package:Scrabble/logic/utils/dynamic_checking.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../constants/fake_chat.dart';

void main() {
  group('isNullEmptyOrFalse', () {
    test('isNullEmptyOrFalse should return true', () {
      expect(isNullEmptyOrFalse(null), true);
      expect(isNullEmptyOrFalse(false), true);
      expect(isNullEmptyOrFalse(''), true);
      expect(isNullEmptyOrFalse([]), true);
      expect(isNullEmptyOrFalse({}), true);
    });

    test('isNullEmptyOrFalse should return false', () {
      expect(isNullEmptyOrFalse('test'), false);
      expect(isNullEmptyOrFalse(true), false);
      expect(isNullEmptyOrFalse(FAKE_CHAT_1()), false);
    });
  });
}
