import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'helpers/helper.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('login', () {
    testWidgets('should be able to login logout and login again', (WidgetTester tester) async {
      Helper helper = Helper(tester);
      await helper.goTo.mainScreen();
      await helper.logout();
      await helper.login();
    });
  });
}
