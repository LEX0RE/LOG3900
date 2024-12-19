part of 'helper.dart';

class ExpectHelper {
  final WidgetTester tester;
  final Helper helper;

  ExpectHelper(this.tester, this.helper);

  buttonEnable(String text) {
    expect(tester.widget<ElevatedButton>(find.widgetWithText(ElevatedButton, text).last).enabled, true);
  }

  buttonDisabled(String text) {
    expect(tester.widget<ElevatedButton>(find.widgetWithText(ElevatedButton, text).last).enabled, false);
  }
}
