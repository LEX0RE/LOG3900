import 'dart:convert';

import 'package:Scrabble/data/models/interfaces/lobby/lobby_send_invitation.dart';
import 'package:Scrabble/logic/lobby/invitation/invitation_manager_bloc.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ChatInvitation extends StatelessWidget {
  const ChatInvitation({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final InvitationManagerBloc invitationManagerBloc = BlocProvider.of<InvitationManagerBloc>(context);
    ThemeData theme = Theme.of(context);

    return Container(
      decoration: BoxDecoration(color: theme.primaryColor),
      child: ListView.builder(
          scrollDirection: Axis.vertical,
          itemCount: invitationManagerBloc.lobbySendInvitation.length,
          itemBuilder: (context, index) => invitation(invitationManagerBloc.lobbySendInvitation[index], context)),
    );
  }

  invitation(LobbySendInvitation lobbySendInvitation, BuildContext context) {
    final InvitationManagerBloc invitationManagerBloc = BlocProvider.of<InvitationManagerBloc>(context);
    ThemeData theme = Theme.of(context);

    return Container(
        child: Row(
      children: [
        Flexible(
            child: Row(
          children: [
            Expanded(
                flex: 1,
                child: CircleAvatar(
                  radius: 20,
                  child:
                      ClipOval(child: Image.memory(base64Decode(lobbySendInvitation.profilePicture.split(",").last))),
                )),
            Expanded(
                flex: 1,
                child: Text(
                  lobbySendInvitation.creator.name,
                  style: theme.textTheme.titleMedium,
                )),
          ],
        )),
        Flexible(
            child: Container(
                alignment: Alignment.center,
                child: Image.asset(
                  'lib/assets/images/battle_invitation.png',
                  scale: 1.5,
                ))),
        Flexible(
            child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Flexible(
                child: OutlinedButton(
                    style: OutlinedButton.styleFrom(
                      textStyle: Theme.of(context).textTheme.titleMedium,
                      backgroundColor: ColorExtension.easyButtonColor,
                      shape: RoundedRectangleBorder(
                        side: BorderSide(
                          color: ColorExtension.easyButtonBorderColor!,
                        ),
                        borderRadius: BorderRadius.circular(30),
                      ),
                    ),
                    onPressed: () {
                      invitationManagerBloc
                          .add(InvitationManagerInvitationDecisionEvent(true, lobbySendInvitation.lobbyId));
                    },
                    child: Text(
                      AppLocalizations.of(context).yes,
                      style: theme.textTheme.titleMedium,
                    ))),
            Flexible(
                child: OutlinedButton(
              style: OutlinedButton.styleFrom(
                textStyle: Theme.of(context).textTheme.titleMedium,
                backgroundColor: ColorExtension.badButtonColor,
                shape: RoundedRectangleBorder(
                  side: BorderSide(
                    color: ColorExtension.easyButtonBorderColor!,
                  ),
                  borderRadius: BorderRadius.circular(30),
                ),
              ),
              onPressed: () {
                invitationManagerBloc.add(InvitationManagerInvitationDecisionEvent(false, lobbySendInvitation.lobbyId));
              },
              child: Text(
                AppLocalizations.of(context).no,
                style: theme.textTheme.titleMedium,
              ),
            ))
          ],
        ))
      ],
    ));
  }
}
