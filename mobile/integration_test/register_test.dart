import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/main.dart' as app;
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import '../test/constants/fake_register_login.dart';
import 'helpers/helper.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('register', () {
    testWidgets('should be able to register', (WidgetTester tester) async {
      Helper helper = Helper(tester);
      app.main();
      await tester.pumpAndSettle();

      await helper.tap.byKey(SIGN_UP_TAB_BUTTON);
      await helper.form.fillTextField(REGISTER_USERNAME_KEY, FAKE_REGISTER_NAME);
      await helper.form.fillTextField(REGISTER_PASSWORD_KEY, FAKE_REGISTER_PASSWORD);
      await helper.form.fillTextField(REGISTER_EMAIL_KEY, FAKE_REGISTER_EMAIL);
      await helper.tap.byKey(REGISTER_PREVIOUS_PROFILE_BUTTON);
      await helper.tap.byKey(REGISTER_PREVIOUS_PROFILE_BUTTON);
      await helper.tap.byKey(REGISTER_NEXT_PROFILE_BUTTON);

      await helper.tap.byKey(LOGIN_REGISTER_SUBMIT_BUTTON);
      await expectLater(find.byKey(HOME_SCREEN), findsOneWidget);
    });
  });
}
