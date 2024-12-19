import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/logic/bracket/bracket_cubit.dart';
import 'package:Scrabble/logic/end_tournament/end_tournament_cubit.dart';
import 'package:Scrabble/logic/game/game_cubit.dart';
import 'package:Scrabble/logic/game_manager/game_manager_cubit.dart';
import 'package:Scrabble/logic/overlay/end_game_overlay/end_game_overlay_cubit.dart';
import 'package:Scrabble/logic/overlay/game_continue_overlay/game_continue_overlay_cubit.dart';
import 'package:Scrabble/logic/overlay/loading_game_overlay/loading_game_overlay_cubit.dart';
import 'package:Scrabble/logic/overlay/surrender_overlay/surrender_overlay_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/widget/overlay/end_game_overlay.dart';
import 'package:Scrabble/view/widget/overlay/game_continue_overlay.dart';
import 'package:Scrabble/view/widget/overlay/loading_game_overlay.dart';
import 'package:Scrabble/view/widget/overlay/surrender_overlay.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class GameOverlay extends StatelessWidget {
  const GameOverlay({super.key});

  @override
  Widget build(BuildContext context) {
    return Builder(
      builder: (context) {
        return MultiBlocListener(
          listeners: [
            BlocListener<GameManagerCubit, GameManagerState>(
              listener: (context, state) {
                if (state is GameManagerRedirectToHome) {
                  BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH);

                  this.hideOverlay(context);
                  BlocProvider.of<GameCubit>(context).reset(context);

                  BlocProvider.of<EndTournamentCubit>(context).reset(dynamic);
                  BlocProvider.of<BracketCubit>(context).clearBracket();
                }
                if (state is GameManagerRedirectToTournament) {
                  BlocProvider.of<RouterManager>(context).navigate(BRACKET_SCREEN_PATH, ROOT_PATH);

                  this.hideOverlay(context);
                  BlocProvider.of<GameCubit>(context).reset(context);
                }
              },
            ),
          ],
          child: Column(
            children: const [
              LoadingGameOverlay(key: LOADING_GAME_SCREEN_KEY),
              EndGameOverlay(),
              GameContinueOverlay(),
              SurrenderOverlay(),
            ],
          ),
        );
      },
    );
  }

  hideOverlay(BuildContext context) {
    BlocProvider.of<EndGameOverlayCubit>(context).hide();
    BlocProvider.of<GameContinueOverlayCubit>(context).hide();
    BlocProvider.of<LoadingGameOverlayCubit>(context).hide(dynamic);
    BlocProvider.of<SurrenderOverlayCubit>(context).hide();
  }
}
