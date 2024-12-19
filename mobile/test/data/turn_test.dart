import 'dart:convert';

import 'package:Scrabble/data/models/interfaces/replay/turn.dart';
import 'package:flutter_test/flutter_test.dart';

import '../constants/fake_turn_json.dart';

void main() {
  group('Turn', () {
    test('from json', () {
      expect(Turn.fromJson(FAKE_TURN_JSON()), isNot(throwsA(isNotNull)));
    });

    test('to json', () {
      final turn = Turn.fromJson(FAKE_TURN_JSON());
      final json = turn.encode();
      expect(Turn.fromJson(jsonDecode(json)), isNot(throwsA(isNotNull)));
    });
  });
}
