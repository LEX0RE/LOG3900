import 'package:Scrabble/data/models/interfaces/user/statistic/user_tournament_statistic.dart';
import 'package:Scrabble/logic/profile/statistic/statistic_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/scrabble_widget/table.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class TournamentStatisticTableWidget extends StatelessWidget {
  const TournamentStatisticTableWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final localization = AppLocalizations.of(context);
    final colorExtension = Theme.of(context).extension<ColorExtension>()!;
    final statistic = context.watch<StatisticCubit>().state.tournamentStatistics;
    final textContent = (String text) => Text(
          text,
          style: TextStyle(color: colorExtension.tableFontColor, fontSize: 20),
        );

    final formatPercentage = (int number, UserTournamentStatistic stats) {
      const double aHundred = 100;
      if (stats.nTournamentPlayed == 0) return '00 %';
      final double percent = (number.toDouble() / stats.nTournamentPlayed.toDouble()) * aHundred;

      return '${percent.toStringAsPrecision(2).padLeft(2, '0')} %';
    };

    return ScrabbleTableWidget(
      nItems: statistic.length,
      itemBuilder: (rowIndex, columnIndex) {
        switch (columnIndex) {
          case 0:
            return textContent(statistic[rowIndex].nTournamentPlayed.toString());
          case 1:
            return textContent(statistic[rowIndex].nPoints.toString());
          case 2:
            return textContent(formatPercentage(statistic[rowIndex].nFirstPlace, statistic[rowIndex]));
          case 3:
            return textContent(formatPercentage(statistic[rowIndex].nSecondPlace, statistic[rowIndex]));
          case 4:
            return textContent(formatPercentage(statistic[rowIndex].nThirdPlace, statistic[rowIndex]));
          case 5:
            return textContent(formatPercentage(statistic[rowIndex].nFourthPlace, statistic[rowIndex]));
          default:
            return Container();
        }
      },
      width: 700,
      height: 245,
      headerHeight: 100,
      headerFontSize: 20,
      headers: [
        localization.nTournamentPlayed,
        localization.nPoints,
        localization.nFirstPlace,
        localization.nSecondPlace,
        localization.nThirdPlace,
        localization.nFourthPlace,
      ],
      columnWidths: const [1, 1, 1, 1, 1, 1],
      title: localization.tournamentGameStatistic,
    );
  }
}
