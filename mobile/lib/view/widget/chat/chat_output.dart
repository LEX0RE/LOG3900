import 'package:Scrabble/data/models/interfaces/chat/server_message.dart';
import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/data/models/interfaces/user/user_profile.dart';
import 'package:Scrabble/logic/chat/chat_interaction.dart';
import 'package:Scrabble/logic/chat/chat_manager_bloc.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/lobby/invitation/invitation_manager_bloc.dart';
import 'package:Scrabble/logic/social/social_manager_bloc.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/chat/chat_friend_request.dart';
import 'package:Scrabble/view/widget/chat/chat_invitation.dart';
import 'package:Scrabble/view/widget/chat/chat_output_chat_joined.dart';
import 'package:Scrabble/view/widget/chat/chat_output_item.dart';
import 'package:Scrabble/view/widget/chat/chat_output_search_channel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ChatOutPutWidget extends StatelessWidget {
  const ChatOutPutWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final InvitationManagerBloc invitationManagerBloc = BlocProvider.of<InvitationManagerBloc>(context);
    final SocialManagerBloc socialManagerBloc = BlocProvider.of<SocialManagerBloc>(context);

    return BlocBuilder<InvitationManagerBloc, InvitationManagerState>(builder: (context1, state1) {
      return BlocBuilder<SocialManagerBloc, SocialManagerState>(builder: (context2, state2) {
        List<Widget> list = [];

        bool friendRequestOpen = socialManagerBloc.newFriends.isNotEmpty && socialManagerBloc.friendRequestScreen;

        if (invitationManagerBloc.lobbySendInvitation != null &&
            invitationManagerBloc.lobbySendInvitation.isNotEmpty &&
            !friendRequestOpen)
          list.add(Flexible(
            flex: 1,
            child: ChatInvitation(),
          ));

        if (friendRequestOpen)
          list.add(Flexible(
            flex: 1,
            child: ChatFriendRequest(),
          ));

        list.add(Flexible(flex: 4, child: chatOutputChoice(context)));
        return Column(
          children: list,
        );
      });
    });
  }

  chatOutputChoice(BuildContext context) {
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    ChatManagerBloc chatManagerBloc = BlocProvider.of<ChatManagerBloc>(context);
    ChatBoxInteraction chatBoxInteraction = BlocProvider.of<ChatBoxInteraction>(context);

    BoxDecoration outputDecoration = BoxDecoration(
      color: themeColors.chatColor!.withOpacity(0.86),
      border: Border.all(
        color: Colors.black,
        width: 1,
      ),
    );
    switch (chatBoxInteraction.state.chatState) {
      case ChatState.message:
        return messageSection(context, outputDecoration);
      case ChatState.groupJoined:
        return ChatOutputGroupJoinedWidget(boxDecoration: outputDecoration);
      case ChatState.searchGroup:
        return ChatOutPutSearchChannelWidget(boxDecoration: outputDecoration);
      default:
        return messageSection(context, outputDecoration);
    }
  }

  Widget messageSection(BuildContext context, BoxDecoration outputDecoration) {
    ChatManagerBloc chatManagerBloc = BlocProvider.of<ChatManagerBloc>(context);
    ChatBoxInteraction chatBoxInteraction = BlocProvider.of<ChatBoxInteraction>(context);
    final Identity identity = BlocProvider.of<IdentityHolder>(context).identity;

    return Container(
        child: BlocBuilder<ChatManagerBloc, ChatManagerState>(
      buildWhen: (previous, current) => current is ChatManagerUpdateChat,
      builder: (context, state) {
        if (state is! ChatManagerUpdateChat) {
          return Container(
            decoration: outputDecoration,
          );
        }

        if (chatManagerBloc.changeChatState) {
          chatManagerBloc.changeChatState = false;
          if (chatBoxInteraction.isMessageSection()) chatBoxInteraction.setChatState(ChatState.groupJoined);
        }
        final SocialManagerBloc socialManagerBloc = BlocProvider.of<SocialManagerBloc>(context);

        UserProfile emptyUser = UserProfile('', '', '');
        List<ServerMessage> messages = state.actualChat.serverMessage.where((element) {
          if (identity != null && identity.userId == element.user.id) {
            return true;
          }
          if (socialManagerBloc.userBlock.firstWhere((user) => user.id == element.user.id, orElse: () => emptyUser) !=
              emptyUser) {
            return false;
          }
          return socialManagerBloc.friends.firstWhere((user) => user.id == element.user.id, orElse: () => emptyUser) !=
                  emptyUser ||
              socialManagerBloc.users.firstWhere((user) => user.id == element.user.id, orElse: () => emptyUser) !=
                  emptyUser;
        }).toList();

        return Container(
          decoration: outputDecoration,
          padding: const EdgeInsets.all(20),
          child: ListView.builder(
              scrollDirection: Axis.vertical,
              controller: chatManagerBloc.scrollController,
              itemCount: messages.length,
              itemBuilder: (context, index) => ChatOutputItemWidget(message: messages[index])),
        );
      },
    ));
  }
}
