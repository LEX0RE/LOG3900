import 'package:Scrabble/logic/chat/chat_interaction.dart';
import 'package:Scrabble/logic/chat/chat_manager_bloc.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ChatInputForm extends StatelessWidget {
  const ChatInputForm({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final ChatManagerBloc chatManagerBloc = BlocProvider.of<ChatManagerBloc>(context);
    ChatBoxInteraction chatBoxInteraction = BlocProvider.of<ChatBoxInteraction>(context);

    List<Widget> inputValue = [Flexible(flex: 14, child: input(context, chatManagerBloc, chatBoxInteraction))];

    if (chatBoxInteraction.isMessageSection()) {
      inputValue.add(Flexible(
        flex: 2,
        child: sendButton(chatManagerBloc),
      ));
    }

    return SingleChildScrollView(
      child: Container(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 15, bottom: 15),
        decoration: backGroundColor(context),
        child: Container(
            padding: const EdgeInsets.only(left: 10, right: 10),
            decoration: BoxDecoration(
              color: ColorExtension.inputBackgroundColor,
              borderRadius: const BorderRadius.all(Radius.circular(30)),
            ),
            child: Row(
              children: inputValue,
            )),
      ),
    );
  }

  BoxDecoration backGroundColor(BuildContext context) {
    ColorExtension theme = Theme.of(context).extension<ColorExtension>()!;

    double radius = 30;
    return BoxDecoration(
      color: theme.inputSectionColor,
      borderRadius: BorderRadius.only(
        bottomLeft: Radius.circular(radius),
        bottomRight: Radius.circular(radius),
      ),
    );
  }

  Widget input(BuildContext context, ChatManagerBloc chatManagerBloc, ChatBoxInteraction chatBoxInteraction) {
    return TextFormField(
        textAlign: TextAlign.left,
        controller: chatManagerBloc.controller,
        focusNode: chatManagerBloc.focusNode,
        style: TextStyle(
          fontSize: 20,
          color: ColorExtension.inputFontColor,
        ),
        decoration: decoration(context, chatBoxInteraction),
        onChanged: (value) => chatBoxInteraction.setSearchChat(value),
        inputFormatters: chatManagerBloc.formatters,
        onFieldSubmitted: (value) {
          if (chatBoxInteraction.isMessageSection()) chatManagerBloc.add(ChatManagerEventSendMessage(value));
        });
  }

  InputDecoration decoration(BuildContext context, ChatBoxInteraction chatBoxInteraction) {
    return InputDecoration(
      contentPadding: const EdgeInsets.only(left: 10, right: 10, top: 5),
      focusedBorder: InputBorder.none,
      enabledBorder: InputBorder.none,
      errorBorder: InputBorder.none,
      disabledBorder: InputBorder.none,
      hintText: chatBoxInteraction.isMessageSection()
          ? AppLocalizations.of(context).enterYourMessage
          : AppLocalizations.of(context).searchAChannel,
    );
  }

  Widget sendButton(ChatManagerBloc chatManagerBloc) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        elevation: 0,
        backgroundColor: Colors.transparent,
        shadowColor: Colors.transparent,
      ),
      onPressed: () => chatManagerBloc.add(ChatManagerEventSendMessage(chatManagerBloc.controller.text)),
      child: Image.asset(
        'lib/assets/images/chat_send_icon2.png',
      ),
    );
  }

  bool isMessageSection(ChatBoxInteraction chatBoxInteraction) {
    return chatBoxInteraction.state.chatState == ChatState.message;
  }
}
