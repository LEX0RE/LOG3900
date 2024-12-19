import 'package:Scrabble/logic/end_tournament/end_tournament_cubit.dart';
import 'package:Scrabble/logic/observer/observer_cubit.dart';
import 'package:Scrabble/logic/overlay/surrender_tournament_overlay/surrender_tournament_overlay_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LeaveButton extends StatelessWidget {
  const LeaveButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final EndTournamentCubit endTournamentCubit = context.watch<EndTournamentCubit>();
    final AppLocalizations localizations = AppLocalizations.of(context);
    final SurrenderTournamentOverlayCubit surrenderCubit = context.watch<SurrenderTournamentOverlayCubit>();

    return Container(
      margin: const EdgeInsets.only(left: 25, bottom: 65),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          textStyle: Theme.of(context).textTheme.titleMedium,
          backgroundColor: ColorExtension.quitButtonColor,
          minimumSize: const Size(150, 50),
          padding: const EdgeInsets.all(10),
          shape: RoundedRectangleBorder(
            side: BorderSide(
              color: ColorExtension.quitButtonBorderColor!,
              width: 2.5,
            ),
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        onPressed: endTournamentCubit.canLeave() ? leave(context) : surrenderCubit.show,
        child: Text(endTournamentCubit.canLeave() ? localizations.leaveGame : localizations.surrender,
            style: const TextStyle(fontSize: 20)),
      ),
    );
  }

  leave(BuildContext context) {
    final EndTournamentCubit endTournamentCubit = context.watch<EndTournamentCubit>();
    final ObserverCubit cubit = context.read<ObserverCubit>();

    return () => {
          cubit.stopObservingTournament(context),
          endTournamentCubit.leave(context),
        };
  }
}
