import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/data_providers/history_provider.dart';
import 'package:Scrabble/data/repositories/statistic_repository.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/profile/statistic/statistic_cubit.dart';
import 'package:Scrabble/view/constants/HUD_interface.dart';
import 'package:Scrabble/view/widget/profile/statistic/game_statistic_widget.dart';
import 'package:Scrabble/view/widget/profile/statistic/tournament_statistic_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class StatisticScreen extends StatelessWidget {
  const StatisticScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => HUDInterface(
        MultiBlocProvider(
          providers: [
            BlocProvider(
              create: (context) => StatisticCubit(
                StatisticRepository(
                  historyProvider: HistoryProvider(
                    identity: BlocProvider.of<IdentityHolder>(context),
                  ),
                ),
              ),
            ),
          ],
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: const [
                GameStatisticTableWidget(),
                TournamentStatisticTableWidget(),
              ],
            ),
          ),
        ),
        context,
        previousPath: PROFILE_PATH,
      );
}
