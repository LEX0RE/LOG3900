import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/constants/title.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/widget/chat/chat.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

// ignore: non_constant_identifier_names
Widget HUDInterface(Widget widget, BuildContext context, {bool? needChat, bool? needLogout, String? previousPath}) {
  List<Widget> widgetList = [widget];
  List<Widget> actionList = [];

  if (needLogout != false) {
    actionList.add(IconButton(
      icon: const Icon(Icons.logout),
      key: LOGIN_OUT_BUTTON,
      onPressed: () {
        BlocProvider.of<AuthenticationManagerBloc>(context).add(AuthenticationManagerEventLogout());
      },
    ));
  }

  if (needChat != false) widgetList.add(Chat());

  return Scaffold(
      appBar: AppBar(
        leading: customBackButton(context, previousPath),
        actions: actionList,
        title: const Center(child: Text(APP_TITLE)),
      ),
      body: Stack(
        children: widgetList,
      ),
      resizeToAvoidBottomInset: false);
}

Widget? customBackButton(BuildContext context, String? previousPath) {
  if (previousPath != null) {
    return BackButton(
      onPressed: () {
        BlocProvider.of<RouterManager>(context).navigate(previousPath, ROOT_PATH);
      },
    );
  }
  return null;
}
