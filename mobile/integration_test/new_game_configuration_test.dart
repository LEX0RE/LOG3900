import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'helpers/helper.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('create new game', () {
    testWidgets('should be able to create a game', (WidgetTester tester) async {
      Helper helper = Helper(tester);
      await helper.goTo.newClassicGame();
    });
    testWidgets('should be able to create a tournament', (WidgetTester tester) async {
      Helper helper = Helper(tester);
      await helper.goTo.newTournament();
    });
  });
}
