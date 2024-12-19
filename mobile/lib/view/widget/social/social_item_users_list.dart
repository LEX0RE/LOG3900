import 'dart:convert';

import 'package:Scrabble/data/models/interfaces/user/user_profile.dart';
import 'package:Scrabble/logic/social/social_manager_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class SocialItemUsersListWidget extends StatelessWidget {
  final UserProfile user;

  const SocialItemUsersListWidget({
    required this.user,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    final SocialManagerBloc socialManagerBloc = BlocProvider.of<SocialManagerBloc>(context);

    return Container(
        width: double.infinity,
        margin: const EdgeInsets.only(bottom: 10, top: 10),
        child: Row(
          children: [
            Expanded(
                flex: 2,
                child: OutlinedButton(
                    style: OutlinedButton.styleFrom(
                        side: const BorderSide(
                      color: Colors.transparent,
                    )),
                    onPressed: () {
                      socialManagerBloc.add(SocialManagerEventSendRequest(user.id));
                    },
                    child: CircleAvatar(
                        radius: 18,
                        backgroundColor: Colors.transparent,
                        child: ClipOval(child: Image.asset('lib/assets/images/join_group_button.png'))))),
            Expanded(
                flex: 2,
                child: CircleAvatar(
                  radius: 25,
                  child: ClipOval(child: Image.memory(base64Decode(user.profilePicture!.split(",").last))),
                )),
            Expanded(
                flex: 20,
                child: Text(
                  user.name,
                  style: theme.textTheme.titleMedium,
                )),
            Expanded(
                flex: 2,
                child: OutlinedButton(
                    style: OutlinedButton.styleFrom(
                        side: const BorderSide(
                      color: Colors.transparent,
                    )),
                    onPressed: () {
                      socialManagerBloc.add(SocialManagerEventAddUserToBlock(user.id));
                    },
                    child: CircleAvatar(
                        radius: 18,
                        backgroundColor: Colors.transparent,
                        child: ClipOval(child: Image.asset('lib/assets/images/block_button.png')))))
          ],
        ));
  }
}
