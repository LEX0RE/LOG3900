import 'package:Scrabble/data/models/interfaces/chat/chat.dart';
import 'package:Scrabble/logic/chat/chat_interaction.dart';
import 'package:Scrabble/logic/chat/chat_manager_bloc.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/chat/chat_output_chat_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ChatOutputGroupJoinedWidget extends StatelessWidget {
  final BoxDecoration boxDecoration;

  const ChatOutputGroupJoinedWidget({Key? key, required this.boxDecoration}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ChatBoxInteraction chatBoxInteraction = BlocProvider.of<ChatBoxInteraction>(context);

    return BlocBuilder<ChatManagerBloc, ChatManagerState>(
        buildWhen: (previous, current) => current is ChatManagerUpdateChat,
        builder: (context, state) {
          if (state is! ChatManagerUpdateChat) {
            return Container(
              decoration: boxDecoration,
            );
          }
          String mainChatId = state.chatJoined[0].id;
          List<Chat> chatJoined =
              state.chatJoined.where((chat) => containName(chat.name, chatBoxInteraction.state.searchChat)).toList();

          return Container(
            decoration: boxDecoration,
            padding: const EdgeInsets.all(20),
            child: ListView.builder(
                scrollDirection: Axis.vertical,
                itemCount: chatJoined.length + 2,
                itemBuilder: (context, index) => (index < chatJoined.length)
                    ? ChatOutputChatItemWidget(
                        chat: chatJoined[index], isMainChat: chatJoined[index].id == mainChatId ? true : false)
                    : addOrSearchButton(index - chatJoined.length, chatBoxInteraction, context)),
          );
        });
  }

  addOrSearchButton(int index, ChatBoxInteraction chatBoxInteraction, BuildContext context) {
    ChatManagerBloc chatManagerBloc = BlocProvider.of<ChatManagerBloc>(context);
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;

    if (index == 0) {
      if (chatBoxInteraction.state.needNewChat) {
        return Container(
            padding: const EdgeInsets.all(5),
            color: themeColors.inputSectionColor,
            margin: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
            child: Stack(
              children: [
                TextFormField(
                    decoration: const InputDecoration(border: InputBorder.none),
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 20,
                    ),
                    onFieldSubmitted: (value) {
                      chatManagerBloc.add(ChatManagerEventCreateChat(value));
                      chatBoxInteraction.setNeedNewChat(false);
                    }),
                quitCanal(chatManagerBloc, () => chatBoxInteraction.setNeedNewChat(false), context)
              ],
            ));
      } else {
        return addButton(chatBoxInteraction);
      }
    }
    return searchButton(chatBoxInteraction);
  }

  Widget addButton(ChatBoxInteraction chatBoxInteraction) => Container(
        padding: const EdgeInsets.all(20),
        alignment: Alignment.center,
        child: OutlinedButton(
          style: OutlinedButton.styleFrom(
              side: const BorderSide(
            color: Colors.transparent,
          )),
          onPressed: () => {chatBoxInteraction.setNeedNewChat(true)},
          child: Image.asset(
            'lib/assets/images/add_group.png',
            scale: 2,
          ),
        ),
      );

  Widget searchButton(ChatBoxInteraction chatBoxInteraction) => Container(
      alignment: Alignment.center,
      child: OutlinedButton(
        style: OutlinedButton.styleFrom(
            side: const BorderSide(
          color: Colors.transparent,
        )),
        onPressed: () => {chatBoxInteraction.setChatState(ChatState.searchGroup)},
        child: Image.asset(
          'lib/assets/images/search_group.png',
          scale: 2,
        ),
      ));
}
