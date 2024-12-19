import 'dart:convert';

import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/data/models/interfaces/user/user_profile.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/lobby/invitation/invitation_manager_bloc.dart';
import 'package:Scrabble/logic/lobby/lobby/lobby_cubit.dart';
import 'package:Scrabble/logic/social/social_manager_bloc.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class FriendsToJoin extends StatelessWidget {
  const FriendsToJoin({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    final List<UserProfile> friends = BlocProvider.of<SocialManagerBloc>(context).friends;
    final LobbyCubit lobbyCubit = context.watch<LobbyCubit>();
    final LobbyInfo lobbyInfo = lobbyCubit.state.lobby;
    final Identity identity = BlocProvider.of<IdentityHolder>(context).identity!;
    ThemeData theme = Theme.of(context);
    AppLocalizations localizations = AppLocalizations.of(context);

    return lobbyInfo.gameConfig.creator!.id == identity.userId
        ? Container(
            alignment: Alignment.bottomRight,
            child: Container(
                width: 400,
                height: 500,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Flexible(child: Text(localizations.friendsMode, style: theme.textTheme.headlineSmall)),
                    Flexible(
                        child: Container(
                      alignment: Alignment.bottomRight,
                      decoration: BoxDecoration(
                        color: themeColors.buttonColor,
                        border: Border.all(
                          color: themeColors.buttonBorderColor!,
                          width: 5,
                        ),
                        borderRadius: const BorderRadius.all(Radius.circular(30)),
                      ),
                      child: ListView.builder(
                          scrollDirection: Axis.vertical,
                          itemCount: friends.length,
                          itemBuilder: (context, index) => friendItem(friends[index], lobbyInfo.lobbyId, context)),
                    ))
                  ],
                )),
          )
        : Container();
  }

  friendItem(UserProfile user, String lobbyId, BuildContext context) {
    ThemeData theme = Theme.of(context);
    InvitationManagerBloc invitationManagerBloc = BlocProvider.of<InvitationManagerBloc>(context);

    return Container(
        width: double.infinity,
        margin: const EdgeInsets.only(bottom: 10, top: 10),
        child: Row(
          children: [
            Expanded(
                flex: 4,
                child: OutlinedButton(
                    style: OutlinedButton.styleFrom(
                        side: const BorderSide(
                      color: Colors.transparent,
                    )),
                    onPressed: () {
                      invitationManagerBloc.add(InvitationManagerInviteFriendEvent(user.id, lobbyId));
                    },
                    child: Image.asset(
                      'lib/assets/images/invite.png',
                      scale: 10,
                    ))),
            Expanded(
                flex: 2,
                child: CircleAvatar(
                  radius: 20,
                  child: ClipOval(child: Image.memory(base64Decode(user.profilePicture!.split(",").last))),
                )),
            Expanded(
                flex: 10,
                child: Text(
                  user.name,
                  style: theme.textTheme.titleMedium,
                )),
          ],
        ));
  }
}
