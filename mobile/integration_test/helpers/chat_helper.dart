part of 'helper.dart';

class ChatHelper {
  final WidgetTester tester;
  late final Helper helper;

  ChatHelper(this.tester, this.helper);

  Future<void> sendMessage(String message) async {
    await helper.tap.byKey(CHAT_OPEN_BUTTON);
    await helper.form.fillTextField(CHAT_INPUT_TEXT, message);
    await tester.tapAt(Offset.zero);
    await helper.waitServer();
    expect(find.textContaining(message), findsWidgets);
    await helper.tap.byKey(CHAT_OPEN_BUTTON);
  }
}
