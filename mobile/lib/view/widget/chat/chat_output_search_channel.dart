import 'package:Scrabble/data/models/interfaces/chat/chat.dart';
import 'package:Scrabble/data/models/interfaces/chat/chat_name.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:Scrabble/logic/chat/chat_interaction.dart';
import 'package:Scrabble/logic/chat/chat_manager_bloc.dart';
import 'package:Scrabble/view/widget/chat/chat_output_chat_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ChatOutPutSearchChannelWidget extends StatelessWidget {
  final BoxDecoration boxDecoration;

  const ChatOutPutSearchChannelWidget({Key? key, required this.boxDecoration}) : super(key: key);

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
          List<ChatName> otherChat =
              state.otherChat.where((chat) => containName(chat.name, chatBoxInteraction.state.searchChat)).toList();

          List<Chat> chatList = otherChat.map((chat) => Chat(chat.name, [], const User('', ''), chat.id)).toList();

          return Container(
              decoration: boxDecoration,
              padding: const EdgeInsets.all(20),
              child: ListView.builder(
                  scrollDirection: Axis.vertical,
                  itemCount: chatList.length,
                  itemBuilder: (context, index) =>
                      ChatOutputChatItemWidget(chat: chatList[index], isChatJoined: false)));
        });
  }
}
