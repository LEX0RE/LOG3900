import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/logic/end_game/end_game_cubit.dart';
import 'package:Scrabble/logic/overlay/surrender_overlay/surrender_overlay_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LeaveButton extends StatelessWidget {
  final bool justLeave;

  const LeaveButton({Key? key, this.justLeave = false}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final AppLocalizations localization = AppLocalizations.of(context);
    final EndGameCubit endGameCubit = context.watch<EndGameCubit>();
    final SurrenderOverlayCubit surrenderCubit = context.watch<SurrenderOverlayCubit>();

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          textStyle: Theme.of(context).textTheme.titleMedium,
          backgroundColor: ColorExtension.quitButtonColor,
          minimumSize: const Size(200, 60),
          shape: RoundedRectangleBorder(
            side: BorderSide(
              color: ColorExtension.quitButtonBorderColor!,
              width: 2.5,
            ),
            borderRadius: BorderRadius.circular(30),
          ),
        ),
        onPressed: justLeave
            ? () => BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH)
            : endGameCubit.canLeave()
                ? leave(context)
                : () => surrenderCubit.show(),
        child: Text(endGameCubit.canLeave() || justLeave ? localization.leaveGame : localization.surrender,
            style: const TextStyle(fontSize: 25, color: Colors.white, fontWeight: FontWeight.bold)),
      ),
    );
  }

  leave(BuildContext context) {
    final EndGameCubit endGameCubit = context.watch<EndGameCubit>();

    return () => endGameCubit.leave(context);
  }
}
