import 'dart:convert';

import 'package:Scrabble/data/models/interfaces/user/user_profile.dart';
import 'package:Scrabble/logic/social/social_manager_bloc.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ChatFriendRequest extends StatelessWidget {
  const ChatFriendRequest({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final SocialManagerBloc socialManagerBloc = BlocProvider.of<SocialManagerBloc>(context);
    ThemeData theme = Theme.of(context);

    return Container(
      decoration: BoxDecoration(color: theme.primaryColor),
      child: ListView.builder(
          scrollDirection: Axis.vertical,
          itemCount: socialManagerBloc.newFriends.length,
          itemBuilder: (context, index) => invitation(socialManagerBloc.newFriends[index], context)),
    );
  }

  invitation(UserProfile user, BuildContext context) {
    final SocialManagerBloc socialManagerBloc = BlocProvider.of<SocialManagerBloc>(context);
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
                  child: ClipOval(child: Image.memory(base64Decode(user.profilePicture!.split(",").last))),
                )),
            Expanded(
                flex: 1,
                child: Text(
                  user.name,
                  style: theme.textTheme.titleMedium,
                )),
          ],
        )),
        Flexible(
            child: Container(
                alignment: Alignment.center,
                child: Text(
                  "⨁",
                  style: theme.textTheme.titleLarge,
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
                      socialManagerBloc.add(SocialManagerEventAcceptFriend(user.id));
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
                socialManagerBloc.add(SocialManagerEventRefuseFriend(user.id));
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
