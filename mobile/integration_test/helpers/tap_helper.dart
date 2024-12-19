part of 'helper.dart';

class TapHelper {
  final WidgetTester tester;
  final Helper helper;

  TapHelper(this.tester, this.helper);

  Future<void> by(Finder finder) async {
    await tester.tap(finder.last);
    await tester.pumpAndSettle();
  }

  Future<void> byOffset(double x, double y) async {
    await tester.tapAt(Offset(x, y));
    await tester.pumpAndSettle();
  }

  Future<void> byText(String text) async {
    await tester.tap(find.text(text).last);
    await tester.pumpAndSettle();
  }

  Future<void> button(String text) async {
    await tester.tap(find.widgetWithText(ElevatedButton, text).last);
    await tester.pumpAndSettle();
  }

  Future<void> byWidgetWithText(Type widgetType, String text) async {
    await tester.tap(find.widgetWithText(widgetType, text).last);
    await tester.pumpAndSettle();
  }

  Future<void> byKey(Key key) async {
    await tester.tap(find.byKey(key).last);
    await tester.pumpAndSettle();
  }
}
