import 'package:Scrabble/logic/profile/replay/replay_cubit.dart';
import 'package:Scrabble/view/screens/observe_screen.dart';
import 'package:Scrabble/view/widget/board_game/leave_button.dart';
import 'package:Scrabble/view/widget/board_game/scrabble_player.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class PlayerColumn extends StatelessWidget {
  const PlayerColumn({super.key});
  @override
  Widget build(BuildContext context) {
    final ReplayCubit replayCubit = context.watch<ReplayCubit>();

    return Center(
        child: Column(children: [
      Flexible(flex: 7, child: ScrabblePlayer()),
      Flexible(flex: 2, child: Container()),
      if (!isObservationPage(context)) LeaveButton(justLeave: (replayCubit.state is ReplayUpdated)),
    ]));
  }

  bool isObservationPage(BuildContext context) {
    if (context.findAncestorWidgetOfExactType<ObserveScreen>() != null) {
      return true;
    }
    return false;
  }
}
