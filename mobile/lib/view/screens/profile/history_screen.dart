import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/data_providers/history_provider.dart';
import 'package:Scrabble/data/data_providers/user_provider.dart';
import 'package:Scrabble/data/repositories/history_repository.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/profile/game_history/game_history_cubit.dart';
import 'package:Scrabble/view/constants/HUD_interface.dart';
import 'package:Scrabble/view/widget/profile/history_table_widget.dart';
import 'package:Scrabble/view/widget/profile/login_table_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => HUDInterface(
        MultiBlocProvider(
          providers: [
            BlocProvider(
              create: (context) => GameHistoryCubit(
                HistoryRepository(
                  historyProvider: HistoryProvider(
                    identity: BlocProvider.of<IdentityHolder>(context),
                  ),
                  userProvider: UserProvider(
                    identity: BlocProvider.of<IdentityHolder>(context),
                  ),
                ),
              ),
            )
          ],
          child: Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: const [
                LoginTableWidget(),
                HistoryTableWidget(),
              ],
            ),
          ),
        ),
        context,
        previousPath: PROFILE_PATH,
      );
}
