part of 'helper.dart';

class FormHelper {
  final WidgetTester tester;
  final Helper helper;

  FormHelper(this.tester, this.helper);

  Future<void> fillTextField(Key key, String text) async {
    expect(find.byKey(key), findsOneWidget);
    await tester.tap(find.byKey(key));
    await tester.enterText(find.byKey(key), text);
    await tester.testTextInput.receiveAction(TextInputAction.done);
    await tester.pumpAndSettle();
  }

  Future<void> selectDropdownItem(Key key, String item) async {
    await helper.tap.byKey(key);
    await helper.tap.byText(item);
    await tester.pumpAndSettle();
  }
}
