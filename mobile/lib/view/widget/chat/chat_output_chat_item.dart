import 'package:Scrabble/constants/game_user.dart';
import 'package:Scrabble/data/models/interfaces/chat/chat.dart';
import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/logic/chat/chat_interaction.dart';
import 'package:Scrabble/logic/chat/chat_manager_bloc.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/notification/notification_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ChatOutputChatItemWidget extends StatelessWidget {
  final Chat chat;
  final bool? isChatJoined;
  final bool? isMainChat;
  const ChatOutputChatItemWidget({super.key, required this.chat, this.isChatJoined, this.isMainChat});

  @override
  Widget build(BuildContext context) {
    final ChatManagerBloc chatManagerBloc = BlocProvider.of<ChatManagerBloc>(context);
    ChatBoxInteraction chatBoxInteraction = BlocProvider.of<ChatBoxInteraction>(context);
    Identity? identity = BlocProvider.of<IdentityHolder>(context).identity;
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;

    List<Widget> outputWidget = [
      chatButton(this.chat, context, chatBoxInteraction, chatManagerBloc, isChatJoined: isChatJoined)
    ];

    if (isChatJoined != false && isMainChat != true && chat.creator.id != GAME_USER.id) {
      outputWidget.add(quitCanal(
          chatManagerBloc,
          () => chatManagerBloc
              .add(ChatManagerEventLeaveChat(chat.id, identity != null && identity.userId == chat.creator.id)),
          context));
    }

    outputWidget.add(notificationOrAddButton(context, chatManagerBloc, chat, isChatJoined: isChatJoined));

    return Container(
        padding: const EdgeInsets.all(5),
        margin: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
        color: themeColors.inputSectionColor,
        child: Stack(
          children: outputWidget,
        ));
  }

  Widget chatButton(
      Chat chat, BuildContext context, ChatBoxInteraction chatBoxInteraction, ChatManagerBloc chatManagerBloc,
      {bool? isChatJoined}) {
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;

    return TextButton(
        style: TextButton.styleFrom(
          backgroundColor: themeColors.inputSectionColor,
          foregroundColor: Colors.black,
          shape: const StadiumBorder(),
        ),
        onPressed: () => {
              if (isChatJoined != false)
                {
                  chatManagerBloc.setActualChat(chat),
                  chatBoxInteraction.setChatState(ChatState.message),
                  chatManagerBloc.notificationCubit.chatNotifications?[chat.id] = 0,
                  chatManagerBloc.notificationCubit.updateNumberNotification(),
                  chatManagerBloc.notificationCubit.changeOpenMessage(true),
                }
            },
        child: Container(
          alignment: Alignment.center,
          child: Text(chat.name),
        ));
  }

  Widget notificationOrAddButton(BuildContext context, ChatManagerBloc chatManagerBloc, Chat chat,
      {bool? isChatJoined}) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
      alignment: const Alignment(0.7, 0),
      child: (isChatJoined != false)
          ? notificationWidget(context, chatManagerBloc, chat.id)
          : addChatButton(context, chatManagerBloc, chat),
    );
  }

  Widget notificationWidget(BuildContext context, ChatManagerBloc chatManagerBloc, String chatId) {
    return Container(
        child: BlocBuilder<NotificationCubit, NotificationState>(
      buildWhen: (previous, current) => current is newNotificationState,
      builder: (context, state) {
        if (state is! newNotificationState) return Container();
        if (state.chatNotifications[chatId] > 0) {
          return Container(
              padding: const EdgeInsets.all(5),
              decoration: const BoxDecoration(
                color: Colors.red,
                borderRadius: BorderRadius.all(Radius.circular(30)),
              ),
              child: Text(
                '${state.chatNotifications[chatId]}',
                style: Theme.of(context).textTheme.bodySmall,
              ));
        }
        return Container();
      },
    ));
  }

  Widget addChatButton(BuildContext context, ChatManagerBloc chatManagerBloc, Chat chat) {
    return Container(
        alignment: const Alignment(0.8, 0),
        child: SizedBox(
            height: 35,
            width: 50,
            child: TextButton(
              onPressed: () => {chatManagerBloc.add(ChatManagerEventJoinChat(chat.id))},
              child: Image.asset(
                'lib/assets/images/join_group_button.png',
                scale: 1,
              ),
            )));
  }
}

Widget quitCanal(ChatManagerBloc chatManagerBloc, Function()? onPressed, BuildContext context) {
  ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
  return Container(
    alignment: Alignment.topRight,
    child: SizedBox(
      height: 29,
      width: 29,
      child: TextButton(
          style: TextButton.styleFrom(
              backgroundColor: ColorExtension.inputFontColor,
              foregroundColor: themeColors.generalFontColor,
              shape: const StadiumBorder()),
          onPressed: onPressed,
          child: Text('X', style: Theme.of(context).textTheme.bodySmall)),
    ),
  );
}
