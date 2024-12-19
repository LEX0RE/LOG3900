import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/data/models/interfaces/user/user_login.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'helpers/helper.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('replay', () {
    testWidgets('should be able to watch a replay', (WidgetTester tester) async {
      Helper helper = Helper(tester, userLogin: const UserLogin('ReplayTester', '12345678'));
      await helper.goTo.history();

      await helper.tap.byOffset(1125.9, 376.6);

      await helper.waitServer();
      await expectLater(find.byKey(REPLAY_SCREEN_KEY), findsOneWidget);

      await testPlayerButtons(helper);
      await testPlaybackButtons(helper);
    });
  });
}

Future<void> testPlaybackButtons(Helper helper) async {
  helper.expect.buttonDisabled('<');
  helper.expect.buttonEnable('>');
  for (var i = 0; i < 10; i++) {
    await helper.tap.button('>');
  }

  helper.expect.buttonEnable('<');
  helper.expect.buttonDisabled('>');

  for (var i = 0; i < 10; i++) {
    await helper.tap.button('<');
  }

  helper.expect.buttonDisabled('<');
  helper.expect.buttonEnable('>');
}

Future<void> testPlayerButtons(Helper helper) async {
  const String player1 = 'ReplayTester';
  const String player2 = 'Test8bab63c8-ca';
  const String player3 = 'EtymologyEnthusiastExtraordinaire';
  const String player4 = 'Testb1cff104-dc';

  await helper.tap.button(player2);
  helper.expect.buttonDisabled(player2);
  await helper.tap.button(player4);
  helper.expect.buttonDisabled(player4);
  helper.expect.buttonEnable(player2);
  helper.expect.buttonEnable(player3);
  helper.expect.buttonEnable(player1);
  await helper.tap.button(player3);
  helper.expect.buttonEnable(player4);
  helper.expect.buttonEnable(player2);
  helper.expect.buttonDisabled(player3);
  helper.expect.buttonEnable(player1);
  await helper.tap.button(player1);
  helper.expect.buttonEnable(player4);
  helper.expect.buttonEnable(player2);
  helper.expect.buttonEnable(player3);
  helper.expect.buttonDisabled(player1);
}
