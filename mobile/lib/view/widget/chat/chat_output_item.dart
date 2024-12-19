import 'dart:convert';

import 'package:Scrabble/data/models/interfaces/chat/server_message.dart';
import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ChatOutputItemWidget extends StatelessWidget {
  final ServerMessage message;

  const ChatOutputItemWidget({
    Key? key,
    required this.message,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final Identity identity = BlocProvider.of<IdentityHolder>(context).identity;

    return Row(
      children: [
        Flexible(
          flex: 1,
          child: imageOtherPlayer(identity),
        ),
        Expanded(
            flex: 15,
            child: Container(
              padding: const EdgeInsets.all(5),
              alignment: isPlayer(identity) ? Alignment.centerRight : Alignment.centerLeft,
              child: Column(
                verticalDirection: VerticalDirection.down,
                children: [
                  playerNameAndTime(context, identity),
                  playerMessage(context, identity),
                ],
              ),
            )),
      ],
    );
  }

  String formatTime(DateTime time) {
    return "${time.hour}:${time.minute.toString().padLeft(2, '0')}:${time.second.toString().padLeft(2, '0')}";
  }

  Widget imageOtherPlayer(Identity? identity) {
    return !isPlayer(identity)
        ? CircleAvatar(
            radius: 18,
            child: ClipOval(child: Image.memory(base64Decode(message.profilePicture.split(',').last))),
          )
        : Container();
  }

  Widget playerNameAndTime(BuildContext context, Identity? identity) {
    return FractionallySizedBox(
        widthFactor: 0.5,
        child: Container(
            padding: const EdgeInsets.all(5),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: isPlayerCase(context, identity),
            )));
  }

  Widget playerName(BuildContext context) {
    return Text(
      message.user.name,
      style: Theme.of(context).textTheme.titleMedium,
    );
  }

  Widget playerTime(BuildContext context) {
    return Text(
      ' ${formatTime(message.time)}',
      style: Theme.of(context).textTheme.bodySmall,
    );
  }

  Widget playerMessage(BuildContext context, Identity? identity) {
    return FractionallySizedBox(
        widthFactor: 0.5,
        child: Container(
            width: double.infinity,
            alignment: isPlayer(identity) ? Alignment.centerRight : Alignment.centerLeft,
            padding: const EdgeInsets.all(10),
            decoration: backgroundMessage(identity, context),
            child: Text(
              message.content,
              style: Theme.of(context).textTheme.bodySmall,
              softWrap: true,
            )));
  }

  BoxDecoration backgroundMessage(Identity? identity, BuildContext context) {
    double bottomRight = isPlayer(identity) ? 5.0 : 10.0;
    double bottomLeft = !isPlayer(identity) ? 5.0 : 10.0;
    return BoxDecoration(
      color: isPlayer(identity) ? ColorExtension.clientMessageColor : ColorExtension.otherMessageColor,
      borderRadius: BorderRadius.only(
        topRight: const Radius.circular(10),
        topLeft: const Radius.circular(10),
        bottomLeft: Radius.circular(bottomLeft),
        bottomRight: Radius.circular(bottomRight),
      ),
    );
  }

  bool isPlayer(Identity? identity) {
    return identity != null && identity.userId == message.user.id;
  }

  List<Widget> isPlayerCase(BuildContext context, Identity? identity) => isPlayer(identity)
      ? [Flexible(child: playerTime(context))]
      : [Flexible(child: playerName(context)), Flexible(child: playerTime(context))];
}
