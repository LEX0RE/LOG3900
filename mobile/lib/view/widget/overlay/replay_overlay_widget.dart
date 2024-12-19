import 'package:Scrabble/logic/profile/replay/replay_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ReplayOverlayWidget extends StatefulWidget {
  const ReplayOverlayWidget({Key? key}) : super(key: key);

  @override
  ReplayOverlayWidgetState createState() => ReplayOverlayWidgetState();
}

class ReplayOverlayWidgetState extends State<ReplayOverlayWidget> {
  late ColorExtension themeColors;
  late ReplayCubit replayCubit;

  ReplayOverlayWidgetState();

  @override
  Widget build(BuildContext context) {
    themeColors = Theme.of(context).extension<ColorExtension>()!;

    return BlocBuilder<ReplayCubit, ReplayState>(
      builder: (context, state) {
        replayCubit = context.watch<ReplayCubit>();
        return Stack(children: [
          playerButtons(),
          playbackButtons(),
        ]);
      },
    );
  }

  Positioned playerButtons() => Positioned(
        bottom: 20,
        right: 0,
        child: Container(
          color: themeColors.backgroundColor,
          width: 320,
          height: 150,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  playerButton(0),
                  playerButton(1),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  playerButton(2),
                  playerButton(3),
                ],
              ),
            ],
          ),
        ),
      );

  Widget playerButton(int index) {
    final pointOfViews = replayCubit.state.pointOfViews;
    if (index >= pointOfViews.length) return const SizedBox(width: 130, height: 60);

    return ScrabbleButtonWidget(
      text: pointOfViews[index].name,
      onPressed: () => replayCubit.setPointOfView(pointOfViews[index].id),
      height: 60,
      width: 130,
      fontSize: 12,
      isEnabled: (context) {
        final replayCubit = context.watch<ReplayCubit>();
        return !replayCubit.isSelected(replayCubit.state.pointOfViews[index].id);
      },
    );
  }

  Positioned playbackButtons() => Positioned(
        bottom: 170,
        right: 0,
        child: Container(
          width: 330,
          height: 130,
          color: themeColors.backgroundColor,
          child: Container(
            width: 280,
            height: 90,
            color: themeColors.backgroundColor,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                previousTurnButton(),
                nextTurnButton(),
              ],
            ),
          ),
        ),
      );

  Widget nextTurnButton() => ScrabbleButtonWidget(
        text: '>',
        onPressed: () => replayCubit.nextTurn(),
        fontSize: 65,
        padding: 0,
        isEnabled: (context) {
          final replayCubit = context.watch<ReplayCubit>();
          return !replayCubit.isLastTurn();
        },
      );

  Widget previousTurnButton() => ScrabbleButtonWidget(
        text: '<',
        onPressed: () => replayCubit.previousTurn(),
        fontSize: 65,
        padding: 0,
        isEnabled: (context) {
          final replayCubit = context.watch<ReplayCubit>();
          return !replayCubit.isFirstTurn();
        },
      );
}
