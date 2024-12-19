part of 'helper.dart';

class GoToHelper {
  final WidgetTester tester;
  final Helper helper;

  GoToHelper(this.tester, this.helper);

  Future<void> mainScreen() async {
    app.main();
    await tester.pumpAndSettle();
    await helper.login();
    await tester.pumpAndSettle();
  }

  Future<void> profile() async {
    await helper.goTo.mainScreen();

    await helper.tap.byText('My profile');
    await expectLater(find.byKey(PROFILE_SCREEN), findsOneWidget);
    await tester.pumpAndSettle();
  }

  Future<void> newClassicGame() async {
    await helper.goTo.mainScreen();

    await helper.tap.byKey(CLASSIC_GAME_BUTTON);
    await expectLater(find.byKey(JOINABLE_LOBBIES_SCREEN), findsOneWidget);
    await tester.pumpAndSettle();

    await helper.tap.byKey(CREATE_NEW_GAME_BUTTON);
    await expectLater(find.byKey(GAME_CONFIGURATION_SCREEN), findsOneWidget);
    await tester.pumpAndSettle();
  }

  Future<void> newTournament() async {
    await helper.goTo.mainScreen();

    await helper.tap.byKey(TOURNAMENT_BUTTON);
    await expectLater(find.byKey(JOINABLE_LOBBIES_SCREEN), findsOneWidget);
    await tester.pumpAndSettle();

    await helper.tap.byKey(CREATE_NEW_GAME_BUTTON);
    await expectLater(find.byKey(GAME_CONFIGURATION_SCREEN), findsOneWidget);
    await tester.pumpAndSettle();
  }

  Future<void> history() async {
    await helper.goTo.profile();

    await helper.tap.byText('History');
    await helper.waitServer();
    await expectLater(find.byKey(HISTORY_SCREEN_KEY), findsOneWidget);
    await tester.pumpAndSettle();
    await helper.waitServer();
  }
}
