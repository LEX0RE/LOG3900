import 'package:Scrabble/data/models/enums/connection_status.dart';
import 'package:Scrabble/logic/profile/game_history/game_history_cubit.dart';
import 'package:Scrabble/logic/utils/date.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/scrabble_widget/table.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LoginTableWidget extends StatelessWidget {
  const LoginTableWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final localization = AppLocalizations.of(context);
    final colorExtension = Theme.of(context).extension<ColorExtension>()!;
    final connections = context.watch<GameHistoryCubit>().state.connections;
    final textContent = (String text) => Text(
          text,
          style: TextStyle(color: colorExtension.tableFontColor),
        );

    return ScrabbleTableWidget(
      nItems: connections.length,
      itemBuilder: (rowIndex, columnIndex) {
        switch (columnIndex) {
          case 0:
            return textContent(
                ConnectionStatusEnum.fromString(connections[rowIndex].status).internationalName(localization));
          case 1:
            return textContent(formatDate(connections[rowIndex].date));
          case 2:
            return textContent(formatTime(connections[rowIndex].date));
          default:
            return Container();
        }
      },
      width: 500,
      height: 400,
      headers: [localization.action, localization.date, localization.time],
      columnWidths: const [1, 1, 1, 1],
      title: localization.loggingDetails,
    );
  }
}
