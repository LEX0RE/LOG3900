import 'package:Scrabble/logic/profile/statistic/statistic_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/scrabble_widget/table.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class GameStatisticTableWidget extends StatelessWidget {
  const GameStatisticTableWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final localization = AppLocalizations.of(context);
    final colorExtension = Theme.of(context).extension<ColorExtension>()!;
    final statistic = context.watch<StatisticCubit>().state.gameStatistics;
    final textContent = (String text) => Text(
          text,
          style: TextStyle(color: colorExtension.tableFontColor, fontSize: 20),
        );

    return ScrabbleTableWidget(
      nItems: statistic.length,
      itemBuilder: (rowIndex, columnIndex) {
        switch (columnIndex) {
          case 0:
            return textContent(statistic[rowIndex].nPlayedGames.toString());
          case 1:
            return textContent(statistic[rowIndex].nWonGames.toString());
          case 2:
            return textContent(statistic[rowIndex].meanScore.toStringAsFixed(2));
          case 3:
            return textContent(formatDuration(statistic[rowIndex].meanDuration));
          default:
            return Container();
        }
      },
      width: 700,
      height: 210,
      headerHeight: 80,
      headerFontSize: 20,
      headers: [localization.nPlayedGames, localization.nWonGames, localization.meanScore, localization.meanDuration],
      columnWidths: const [1, 1, 1, 1],
      title: localization.userGameStatistic,
    );
  }

  String formatDuration(int duration) {
    Duration d = Duration(milliseconds: duration);
    return "${d.inHours.toString().padLeft(2, '0')} h ${d.inMinutes.remainder(60).toString().padLeft(2, '0')} m ${d.inSeconds.remainder(60).toString().padLeft(2, '0')} s";
  }
}
