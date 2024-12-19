import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/logic/chat/chat_interaction.dart';
import 'package:Scrabble/logic/chat/chat_manager_bloc.dart';
import 'package:Scrabble/logic/social/social_manager_bloc.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ChatHeaderWidget extends StatelessWidget {
  const ChatHeaderWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final ChatBoxInteraction chatBoxInteraction = BlocProvider.of<ChatBoxInteraction>(context);
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    AppLocalizations localization = AppLocalizations.of(context);

    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: themeColors.inputSectionColor,
        border: Border.all(
          color: Colors.black,
          width: 1,
        ),
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Flexible(child: Container(alignment: Alignment.centerLeft, child: exitButton(context, chatBoxInteraction))),
          Flexible(
              child: BlocBuilder<ChatManagerBloc, ChatManagerState>(
                  buildWhen: (previous, current) => current is ChatManagerUpdateChat,
                  builder: (context, state) {
                    if (state is! ChatManagerUpdateChat) {
                      return Text(
                        'Chat',
                        style: Theme.of(context).textTheme.titleMedium,
                      );
                    }
                    ;
                    return Container(
                        alignment: Alignment.center,
                        child: Text(
                          chatBoxInteraction.isMessageSection() ? state.actualChat.name : localization.searchAChannel,
                          style: Theme.of(context).textTheme.titleMedium,
                        ));
                  })),
          Flexible(
              child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Flexible(child: addFriendButton(context)),
              Flexible(child: optionButton(context, chatBoxInteraction)),
            ],
          )),
        ],
      ),
    );
  }

  Widget exitButton(BuildContext context, ChatBoxInteraction closeChat) {
    ChatManagerBloc chatManagerBloc = BlocProvider.of<ChatManagerBloc>(context);
    return Container(
        child: OutlinedButton(
      onPressed: () {
        closeChat.closeChat();
        chatManagerBloc.notificationCubit.changeOpenChat(false);
      },
      style: OutlinedButton.styleFrom(
          side: const BorderSide(
        color: Colors.transparent,
      )),
      child: Image.asset(
        'lib/assets/images/exit_button.png',
      ),
    ));
  }

  Widget addFriendButton(BuildContext context) {
    return OutlinedButton(
      onPressed: () => {
        BlocProvider.of<SocialManagerBloc>(context).friendRequestScreen =
            !BlocProvider.of<SocialManagerBloc>(context).friendRequestScreen,
        BlocProvider.of<SocialManagerBloc>(context)
            .emit(SocialManagerScreen(BlocProvider.of<SocialManagerBloc>(context).friendRequestScreen))
      },
      style: OutlinedButton.styleFrom(
          side: const BorderSide(
        color: Colors.transparent,
      )),
      child: Stack(
        children: [
          Container(
              alignment: Alignment.center,
              width: double.infinity,
              child: Image.asset(
                'lib/assets/images/add_friend_message.png',
                fit: BoxFit.fill,
                scale: 1,
              )),
          notification(context)
        ],
      ),
    );
  }

  Widget optionButton(BuildContext context, ChatBoxInteraction interfaceChatManager) {
    ChatManagerBloc chatManagerBloc = BlocProvider.of<ChatManagerBloc>(context);
    return OutlinedButton(
      key: CHAT_OPTION_BUTTON,
      onPressed: () {
        interfaceChatManager.setChatState(ChatState.groupJoined);
        chatManagerBloc.notificationCubit.changeOpenMessage(false);
      },
      style: OutlinedButton.styleFrom(
          side: const BorderSide(
        color: Colors.transparent,
      )),
      child: Stack(
        children: [
          Image.asset(
            'lib/assets/images/option_button.png',
          ),
        ],
      ),
    );
  }

  Widget notification(BuildContext context) {
    return BlocBuilder<SocialManagerBloc, SocialManagerState>(builder: (context, state) {
      if (BlocProvider.of<SocialManagerBloc>(context).newFriends == null ||
          BlocProvider.of<SocialManagerBloc>(context).newFriends.isEmpty) return Container();
      return Container(
          alignment: Alignment.topRight,
          child: Container(
              padding: const EdgeInsets.all(5),
              decoration: const BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(30)), color: Colors.red),
              child: Text(
                BlocProvider.of<SocialManagerBloc>(context).newFriends.length.toString(),
                style: Theme.of(context).textTheme.bodySmall,
              )));
    });
  }
}
