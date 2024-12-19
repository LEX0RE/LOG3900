import 'package:Scrabble/constants/keys.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'helpers/helper.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('chat for a game', () {
    testWidgets('should add user to a new chat when creating a game', (WidgetTester tester) async {
      Helper helper = Helper(tester);
      await helper.goTo.newClassicGame();
      await helper.tap.byKey(CREATE_GAME_BUTTON);
      await helper.tap.byKey(CHAT_OPEN_BUTTON);
      await helper.tap.byKey(CHAT_OPTION_BUTTON);
      expect(find.textContaining(helper.userLogin.userName), findsWidgets);
    });
  });
}
