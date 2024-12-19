import 'package:Scrabble/constants/array.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/interfaces/game_history/game_info_history.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/profile/game_history/game_history_cubit.dart';
import 'package:Scrabble/logic/profile/replay/replay_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/utils/date.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/scrabble_widget/table.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

const int MAX_NUMBER_OF_REPLAY = 5;

class HistoryTableWidget extends StatefulWidget {
  const HistoryTableWidget({super.key});

  @override
  State<StatefulWidget> createState() => HistoryTableWidgetState();
}

class HistoryTableWidgetState extends State<HistoryTableWidget> {
  late AppLocalizations appLocalizations;
  late ColorExtension colorExtension;
  late IdentityHolder identityHolder;
  late ReplayCubit replayCubit;
  late RouterManager routerManager;

  HistoryTableWidgetState();

  @override
  Widget build(BuildContext context) => BlocBuilder<GameHistoryCubit, GameHistoryState>(
        builder: (context, state) {
          appLocalizations = AppLocalizations.of(context);
          colorExtension = Theme.of(context).extension<ColorExtension>()!;
          identityHolder = context.watch<IdentityHolder>();
          replayCubit = context.watch<ReplayCubit>();
          routerManager = context.watch<RouterManager>();
          return ScrabbleTableWidget(
            nItems: state.gameHistories.length,
            itemBuilder: (rowIndex, columnIndex) => buildRow(rowIndex, columnIndex, state.gameHistories[rowIndex]),
            width: 500,
            height: 400,
            headers: [appLocalizations.date, appLocalizations.time, appLocalizations.outcome, appLocalizations.replay],
            columnWidths: const [1, 1, 1, 1],
            title: appLocalizations.historyTitle,
          );
        },
      );

  Widget buildRow(int rowIndex, int columnIndex, GameInfoHistory info) {
    switch (columnIndex) {
      case 0:
        return Text(
          formatDate(info.beginningDate),
          style: TextStyle(color: colorExtension.tableFontColor),
        );
      case 1:
        return Text(
          formatTime(info.beginningDate),
          style: TextStyle(color: colorExtension.tableFontColor),
        );
      case 2:
        return Text(
          formatOutcome(info.winners),
          style: TextStyle(color: colorExtension.tableFontColor),
        );
      case 3:
        if (rowIndex > MAX_NUMBER_OF_REPLAY) return Container();
        return IconButton(
          onPressed: () => replayCubit.fetchReplay(info.gameId, () => routerManager.navigate(REPLAY_PATH, ROOT_PATH)),
          icon: Image.asset(
            'lib/assets/images/replay_icon.png',
            fit: BoxFit.contain,
            width: 40,
            height: 40,
          ),
        );
    }
    return Container();
  }

  String formatOutcome(List<User> winners) {
    if (winners.indexWhere((winner) => winner.id == identityHolder.identity.userId) != INDEX_NOT_FOUND)
      return appLocalizations.win;

    return appLocalizations.lost;
  }
}
