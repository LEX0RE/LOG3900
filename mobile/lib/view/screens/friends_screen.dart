import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/interfaces/user/user_profile.dart';
import 'package:Scrabble/logic/chat/chat_interaction.dart';
import 'package:Scrabble/logic/social/social_box_interaction.dart';
import 'package:Scrabble/logic/social/social_manager_bloc.dart';
import 'package:Scrabble/view/constants/HUD_interface.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/login/tab.dart';
import 'package:Scrabble/view/widget/social/social_item_friends_list.dart';
import 'package:Scrabble/view/widget/social/social_item_friends_request_list.dart';
import 'package:Scrabble/view/widget/social/social_item_users_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class FriendsScreen extends StatelessWidget {
  const FriendsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    GlobalKey _key = GlobalKey();
    Offset _position = Offset.zero;

    final theme = Theme.of(context);
    final localization = AppLocalizations.of(context);
    return HUDInterface(BlocBuilder<SocialInteraction, SocialState>(
      builder: (context, state) {
        return Stack(children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Flexible(
                  flex: 1,
                  child: Container(
                      alignment: Alignment.center,
                      child: Text(
                        localization.friendsMode,
                        style: theme.textTheme.headlineLarge,
                      ))),
              Flexible(flex: 5, child: researchPlayer(context, _key, _position)),
              Flexible(flex: 11, child: list(context))
            ],
          ),
          userList(context)
        ]);
      },
    ), context, previousPath: PROFILE_PATH);
  }

  researchPlayer(BuildContext context, GlobalKey key, Offset position) {
    return SizedBox(
      width: 1100,
      key: key,
      child: input(context, key, position),
    );
  }

  input(BuildContext context, GlobalKey key, Offset position) {
    final socialInteraction = BlocProvider.of<SocialInteraction>(context);

    return Container(
        decoration: BoxDecoration(
          color: ColorExtension.inputBackgroundColor,
          borderRadius: BorderRadius.all(Radius.circular(30)),
        ),
        child: TextFormField(
          textAlign: TextAlign.left,
          style: TextStyle(
            fontSize: 20,
            color: ColorExtension.inputFontColor,
          ),
          onChanged: (value) {
            final RenderBox renderBox = key.currentContext!.findRenderObject() as RenderBox;
            socialInteraction.changePosition(renderBox.localToGlobal(Offset.zero));
            socialInteraction.onChanged(value);
          },
          decoration: InputDecoration(
            contentPadding: EdgeInsets.only(left: 10, right: 10, top: 5),
            enabledBorder: InputBorder.none,
            errorBorder: InputBorder.none,
            hintText: AppLocalizations.of(context).findAPlayer,
            disabledBorder: InputBorder.none,
          ),
        ));
  }

  list(BuildContext context) {
    return BlocBuilder<SocialManagerBloc, SocialManagerState>(
        buildWhen: (previous, current) => current is SocialManagerUpdateSocial,
        builder: (context, state) {
          return Container(
              margin: const EdgeInsets.only(top: 15),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [friendsAndBlock(context), friendsRequestList(context)],
              ));
        });
  }

  friendsRequestList(BuildContext context) {
    final SocialManagerBloc socialManagerBloc = BlocProvider.of<SocialManagerBloc>(context);
    final localizations = AppLocalizations.of(context);

    return Flexible(
        child: Container(
      width: 600,
      child: Column(children: [
        Flexible(child: titleList(localizations.friendsRequest, context)),
        Flexible(
            flex: 6,
            child: Container(
              decoration: boxDecoration(context, false),
              padding: EdgeInsets.all(20),
              child: itemsInList(socialManagerBloc.newFriends, false),
            ))
      ]),
    ));
  }

  friendsAndBlock(BuildContext context) {
    final localizations = AppLocalizations.of(context);
    final socialInteraction = BlocProvider.of<SocialInteraction>(context);
    final SocialManagerBloc socialManagerBloc = BlocProvider.of<SocialManagerBloc>(context);
    final List<UserProfile> list =
        socialInteraction.state.isFriendsList ? socialManagerBloc.friends : socialManagerBloc.userBlock;

    return Flexible(
        child: Container(
      child: Column(children: [
        Flexible(child: titleList(localizations.friendsMode, context)),
        Flexible(
          flex: 1,
          child: Row(
            children: [
              TabWidget(
                  key: FRIENDS_LIST_TAB_BUTTON,
                  text: localizations.friendsMode,
                  isSelected: socialInteraction.state.isFriendsList,
                  onTap: socialInteraction.switchToFriendsList),
              TabWidget(
                  key: BLOCK_LIST_TAB_BUTTON,
                  text: localizations.blockList,
                  isSelected: !socialInteraction.state.isFriendsList,
                  onTap: socialInteraction.switchToBlockList),
            ],
          ),
        ),
        Expanded(
            flex: 5,
            child: Container(
              decoration: boxDecoration(context, true),
              padding: EdgeInsets.all(20),
              child: itemsInList(list, true, isBlockList: !socialInteraction.state.isFriendsList),
            ))
      ]),
    ));
  }

  titleList(String titleName, BuildContext context) {
    final theme = Theme.of(context);

    return Text(
      titleName,
      style: theme.textTheme.headlineLarge,
    );
  }

  itemsInList(List<UserProfile> list, bool isFriendList, {bool? isBlockList}) {
    return ListView.builder(
        scrollDirection: Axis.vertical,
        itemCount: list.length,
        itemBuilder: (context, index) => isFriendList
            ? SocialItemFriendsListWidget(
                user: list[index],
                isBLockList: isBlockList,
              )
            : SocialItemFriendsRequestListWidget(
                user: list[index],
              ));
  }

  boxDecoration(BuildContext context, bool isFriendList) {
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;

    return BoxDecoration(
      color: themeColors.buttonColor,
      border: Border.all(
        color: themeColors.buttonBorderColor!,
        width: 5,
      ),
      borderRadius: isFriendList
          ? const BorderRadius.only(
              bottomLeft: Radius.circular(30),
              bottomRight: Radius.circular(30),
            )
          : const BorderRadius.all(Radius.circular(30)),
    );
  }

  userList(BuildContext context) {
    final socialInteraction = BlocProvider.of<SocialInteraction>(context);
    List<UserProfile> users = BlocProvider.of<SocialManagerBloc>(context)
        .users
        .where((user) => containName(user.name, socialInteraction.state.searchPlayer))
        .toList();

    return (socialInteraction.state.searchPlayer != null && socialInteraction.state.searchPlayer.isNotEmpty)
        ? Positioned(
            left: socialInteraction.state.position.dx,
            top: socialInteraction.state.position.dy - 30,
            child: Container(
                alignment: Alignment.topRight,
                height: 250,
                width: 1100,
                decoration: boxDecoration(context, false),
                child: ListView.builder(
                  scrollDirection: Axis.vertical,
                  itemCount: users.length,
                  itemBuilder: (context, index) => SocialItemUsersListWidget(user: users[index]),
                )))
        : Container();
  }
}
