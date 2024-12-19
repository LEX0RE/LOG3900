import 'package:Scrabble/logic/end_game/end_game_cubit.dart';
import 'package:Scrabble/logic/overlay/end_game_overlay/end_game_overlay_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/overlay/overlay_widget.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class EndGameOverlay extends StatelessWidget {
  const EndGameOverlay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final EndGameOverlayCubit overlayCubit = context.watch<EndGameOverlayCubit>();
    final EndGameCubit endGame = context.watch<EndGameCubit>();
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    AppLocalizations localizations = AppLocalizations.of(context);

    return endGame.state.endGame != null
        ? OverlayWidget<EndGameOverlayCubit, EndGameOverlayShow, EndGameOverlayState>(
            margin: const EdgeInsets.only(top: 200, left: 350, right: 350, bottom: 200),
            onOverlayCancel: overlayCubit.hide,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ...endGame.state.endGame!.winners.map(
                  (winner) => Text(winner.name + localizations.wonEndAnnounceLabel,
                      style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold, color: themeColors.titleFontColor)),
                ),
                ...endGame.state.endGame!.losers.map(
                  (loser) => Text(loser.name + localizations.lostEndAnnounceLabel,
                      style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold, color: themeColors.titleFontColor)),
                ),
                ScrabbleButtonWidget(text: localizations.ok, width: 90, height: 60, onPressed: overlayCubit.hide),
              ],
            ))
        : Container();
  }
}
