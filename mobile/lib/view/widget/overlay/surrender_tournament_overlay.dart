import 'package:Scrabble/logic/end_tournament/end_tournament_cubit.dart';
import 'package:Scrabble/logic/overlay/surrender_tournament_overlay/surrender_tournament_overlay_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/overlay/overlay_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class SurrenderTournamentOverlay extends StatelessWidget {
  const SurrenderTournamentOverlay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final EndTournamentCubit endTournamentCubit = context.watch<EndTournamentCubit>();
    final SurrenderTournamentOverlayCubit surrenderCubit = context.watch<SurrenderTournamentOverlayCubit>();
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    AppLocalizations localizations = AppLocalizations.of(context);

    return OverlayWidget<SurrenderTournamentOverlayCubit, SurrenderTournamentOverlayShow,
            SurrenderTournamentOverlayState>(
        margin: const EdgeInsets.only(top: 200, left: 350, right: 350, bottom: 200),
        onOverlayCancel: surrenderCubit.hide,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Text(localizations.surrenderConfirmTitle,
                style: const TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.red)),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      textStyle: Theme.of(context).textTheme.titleMedium,
                      backgroundColor: ColorExtension.playButtonColor,
                      minimumSize: const Size(90, 60),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                    ),
                    onPressed: () => {
                          surrenderCubit.hide(),
                          endTournamentCubit.surrender(context),
                        },
                    child: Text(localizations.yes,
                        style: const TextStyle(fontSize: 25, color: Colors.white, fontWeight: FontWeight.bold))),
                ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      textStyle: Theme.of(context).textTheme.titleMedium,
                      backgroundColor: ColorExtension.badButtonColor,
                      minimumSize: const Size(90, 60),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                    ),
                    onPressed: surrenderCubit.hide,
                    child: Text(localizations.no,
                        style: const TextStyle(fontSize: 25, color: Colors.white, fontWeight: FontWeight.bold))),
              ],
            ),
          ],
        ));
  }
}
