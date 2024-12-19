import 'package:Scrabble/logic/overlay/game_continue_overlay/game_continue_overlay_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/overlay/overlay_widget.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class GameContinueOverlay extends StatelessWidget {
  const GameContinueOverlay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final GameContinueOverlayCubit cubit = context.watch<GameContinueOverlayCubit>();
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    AppLocalizations localizations = AppLocalizations.of(context);

    return OverlayWidget<GameContinueOverlayCubit, GameContinueOverlayShow, GameContinueOverlayState>(
        margin: const EdgeInsets.only(top: 200, left: 350, right: 350, bottom: 200),
        onOverlayCancel: cubit.hide,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Text(localizations.gameContinueText,
                style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold, color: themeColors.titleFontColor)),
            ScrabbleButtonWidget(text: localizations.ok, width: 90, height: 60, onPressed: cubit.hide),
          ],
        ));
  }
}
