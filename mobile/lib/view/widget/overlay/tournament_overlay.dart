import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/logic/bracket/bracket_cubit.dart';
import 'package:Scrabble/logic/end_tournament/end_tournament_cubit.dart';
import 'package:Scrabble/logic/game/game_cubit.dart';
import 'package:Scrabble/logic/game_manager/game_manager_cubit.dart';
import 'package:Scrabble/logic/observer/observer_cubit.dart';
import 'package:Scrabble/logic/overlay/end_tournament_overlay/end_tournament_overlay_cubit.dart';
import 'package:Scrabble/logic/overlay/surrender_tournament_overlay/surrender_tournament_overlay_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/widget/overlay/end_tournament_overlay.dart';
import 'package:Scrabble/view/widget/overlay/surrender_tournament_overlay.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class TournamentOverlay extends StatelessWidget {
  const TournamentOverlay({super.key});

  @override
  Widget build(BuildContext context) {
    return Builder(
      builder: (context) {
        return MultiBlocListener(
          listeners: [
            BlocListener<GameManagerCubit, GameManagerState>(
              listener: (context, state) {
                if (state is GameManagerRedirectToGame) {
                  BlocProvider.of<RouterManager>(context).navigate(GAME_SCREEN_PATH, BRACKET_SCREEN_PATH);

                  this.hideOverlay(context);
                }
                if (state is GameManagerRedirectToHome) {
                  BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH);

                  this.hideOverlay(context);
                  BlocProvider.of<GameCubit>(context).reset(context);

                  BlocProvider.of<EndTournamentCubit>(context).reset(dynamic);
                  BlocProvider.of<BracketCubit>(context).clearBracket();
                }
              },
            ),
            BlocListener<ObserverCubit, ObserverState>(
              listener: (context, state) => {
                if (state is ObserverRedirectToObserve)
                  {
                    BlocProvider.of<RouterManager>(context).navigate(OBSERVE_PATH, ROOT_PATH),
                  }
              },
            ),
          ],
          child: Column(
            children: [
              SurrenderTournamentOverlay(),
              EndTournamentOverlay(),
            ],
          ),
        );
      },
    );
  }

  hideOverlay(BuildContext context) {
    BlocProvider.of<SurrenderTournamentOverlayCubit>(context).hide();
    BlocProvider.of<EndTournamentOverlayCubit>(context).hide();
  }
}
