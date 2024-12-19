import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import '../test/constants/fake_chat.dart';
import 'helpers/helper.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('chat', () {
    testWidgets('should be able to see sent messages', (WidgetTester tester) async {
      Helper helper = Helper(tester);
      await helper.goTo.mainScreen();
      await helper.chat.sendMessage(FAKE_MESSAGE_1);
      await helper.chat.sendMessage(FAKE_MESSAGE_2);
      await helper.chat.sendMessage(FAKE_MESSAGE_3);
    });
  }, skip: true);
  // TODO: Fix this test when chat is merged the feature is not on this branch
}
