import 'dart:convert';

import 'package:Scrabble/data/models/interfaces/user/user_profile.dart';
import 'package:Scrabble/logic/social/social_manager_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class SocialItemFriendsListWidget extends StatelessWidget {
  final UserProfile user;
  final bool? isBLockList;

  const SocialItemFriendsListWidget({
    required this.user,
    this.isBLockList,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    final SocialManagerBloc socialManagerBloc = BlocProvider.of<SocialManagerBloc>(context);

    return Container(
        width: double.infinity,
        margin: EdgeInsets.only(bottom: 10, top: 10),
        child: Row(
          children: [
            Expanded(
                flex: 1,
                child: CircleAvatar(
                  radius: 25,
                  child: ClipOval(child: Image.memory(base64Decode(user.profilePicture!.split(",").last))),
                )),
            Expanded(
                flex: 6,
                child: Text(
                  user.name,
                  style: theme.textTheme.titleMedium,
                )),
            Expanded(
                flex: 1,
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                      side: const BorderSide(
                    color: Colors.transparent,
                  )),
                  onPressed: () {
                    if (isBLockList == true)
                      socialManagerBloc.add(SocialManagerEventRemoveUserToBlock(user.id));
                    else
                      socialManagerBloc.add(SocialManagerEventRemoveFriend(user.id));
                  },
                  child: Image.asset('lib/assets/images/refuse_friend.png'),
                ))
          ],
        ));
  }
}
