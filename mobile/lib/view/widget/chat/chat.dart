import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/logic/chat/chat_interaction.dart';
import 'package:Scrabble/logic/chat/chat_manager_bloc.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/lobby/lobbies/lobbies_cubit.dart';
import 'package:Scrabble/logic/notification/notification_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:Scrabble/view/widget/chat/chat_header.dart';
import 'package:Scrabble/view/widget/chat/chat_input_form.dart';
import 'package:Scrabble/view/widget/chat/chat_output.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class Chat extends StatelessWidget {
  const Chat({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<ChatBoxInteraction>(create: (context) => ChatBoxInteraction()),
        BlocProvider<LobbiesCubit>(
          create: (context) => LobbiesCubit(context.read<SocketManagerBloc>(), context.read<GamemodeCubit>()),
        )
      ],
      child: BlocListener<LobbiesCubit, LobbiesState>(
        listener: (context, state) {
          if (state is LobbiesConfirmJoinLobby) {
            BlocProvider.of<RouterManager>(context).navigate(LOBBY_PATH, ROOT_PATH);
          }
        },
        child: BlocBuilder<ChatBoxInteraction, CloseChatState>(
            builder: (context, state) => Container(
                alignment: Alignment.topLeft,
                child: SingleChildScrollView(
                  child: Container(
                      width: state.isClosed ? 99 : 500,
                      height: state.isClosed ? 70 : 600,
                      padding: EdgeInsets.zero,
                      child: state.isClosed ? chatButton(context) : chatPage()),
                ))),
      ),
    );
  }

  Widget chatButton(BuildContext context) {
    ChatManagerBloc chatManagerBloc = BlocProvider.of<ChatManagerBloc>(context);
    return Container(
        child: BlocBuilder<NotificationCubit, NotificationState>(
      buildWhen: (previous, current) => current is newNotificationState,
      builder: (context, state) {
        if (state is! newNotificationState) {
          return Container(
              alignment: Alignment.topRight,
              child: OutlinedButton(
                key: CHAT_OPEN_BUTTON,
                onPressed: () {
                  BlocProvider.of<ChatBoxInteraction>(context).openChat();
                  if (chatManagerBloc.actualChat != null)
                    chatManagerBloc.notificationCubit.resetNotification(chatManagerBloc.actualChat!.id);
                  chatManagerBloc.notificationCubit.changeOpenChat(true);
                },
                style: OutlinedButton.styleFrom(
                    side: const BorderSide(
                      color: Colors.transparent,
                    ),
                    maximumSize: const Size(100, 100)),
                child: Stack(
                  children: [
                    Image.asset(
                      "lib/assets/images/chat_button.png",
                    ),
                  ],
                ),
              ));
        }
        return Container(
            alignment: Alignment.topRight,
            child: OutlinedButton(
              key: CHAT_OPEN_BUTTON,
              onPressed: () {
                BlocProvider.of<ChatBoxInteraction>(context).openChat();
                if (chatManagerBloc.actualChat != null)
                  chatManagerBloc.notificationCubit.resetNotification(chatManagerBloc.actualChat!.id);
                chatManagerBloc.notificationCubit.changeOpenChat(true);
              },
              style: OutlinedButton.styleFrom(
                  side: const BorderSide(
                    color: Colors.transparent,
                  ),
                  maximumSize: const Size(100, 100)),
              child: Stack(
                children: [
                  Image.asset(
                    "lib/assets/images/chat_button.png",
                  ),
                  if (state.numberOfNewMessages > 0)
                    Container(
                        alignment: Alignment.topRight,
                        child: Container(
                            padding: EdgeInsets.all(5),
                            decoration:
                                BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(30)), color: Colors.red),
                            child: Text(
                              '${state.numberOfNewMessages}',
                              style: Theme.of(context).textTheme.bodySmall,
                            )))
                ],
              ),
            ));
      },
    ));
  }

  Widget chatPage() => Column(
        verticalDirection: VerticalDirection.down,
        children: [
          Expanded(flex: 2, child: ChatHeaderWidget()),
          Expanded(flex: 12, child: ChatOutPutWidget()),
          Expanded(flex: 4, child: ChatInputForm()),
        ],
      );
}
