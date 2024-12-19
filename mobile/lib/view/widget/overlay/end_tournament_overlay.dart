import 'package:Scrabble/data/models/interfaces/bracket/ranking_profile.dart';
import 'package:Scrabble/logic/end_tournament/end_tournament_cubit.dart';
import 'package:Scrabble/logic/overlay/end_tournament_overlay/end_tournament_overlay_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/overlay/overlay_widget.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class EndTournamentOverlay extends StatelessWidget {
  const EndTournamentOverlay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final EndTournamentOverlayCubit overlayCubit = context.read<EndTournamentOverlayCubit>();
    final EndTournamentCubit endTournament = context.watch<EndTournamentCubit>();
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    AppLocalizations localizations = AppLocalizations.of(context);

    if (endTournament.state is EndTournamentUpdated && overlayCubit.state is EndTournamentOverlayInitial) {
      overlayCubit.show(dynamic);
    }

    return endTournament.state.endTournament != null
        ? OverlayWidget<EndTournamentOverlayCubit, EndTournamentOverlayShow, EndTournamentOverlayState>(
            margin: const EdgeInsets.only(top: 200, left: 350, right: 350, bottom: 200),
            onOverlayCancel: overlayCubit.hide,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ...endTournament.state.endTournament!.players.map(
                  (RankingProfile player) => Text('${player.rank}: ${player.user.name}',
                      style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold, color: themeColors.titleFontColor)),
                ),
                ScrabbleButtonWidget(text: localizations.ok, width: 90, height: 60, onPressed: overlayCubit.hide),
              ],
            ))
        : Container();
  }
}
