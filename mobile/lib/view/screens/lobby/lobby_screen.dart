import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/logic/game/game_cubit.dart';
import 'package:Scrabble/logic/game_manager/game_manager_cubit.dart';
import 'package:Scrabble/logic/observer/observer_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/tournament/tournament_cubit.dart';
import 'package:Scrabble/view/constants/HUD_interface.dart';
import 'package:Scrabble/view/widget/lobby/lobby.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class LobbyScreen extends StatelessWidget {
  const LobbyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    context.watch<GameCubit>().reset(context);
    context.watch<TournamentCubit>().reset(context);

    return HUDInterface(
        Scaffold(
          body: MultiBlocListener(
            listeners: [
              BlocListener<GameManagerCubit, GameManagerState>(
                listener: (context, state) => {
                  if (state is GameManagerRedirectToGame)
                    context.read<RouterManager>().navigate(GAME_SCREEN_PATH, ROOT_PATH),
                  if (state is GameManagerRedirectToTournament)
                    context.read<RouterManager>().navigate(BRACKET_SCREEN_PATH, ROOT_PATH),
                },
              ),
              BlocListener<ObserverCubit, ObserverState>(
                listener: (context, state) => {
                  if (state is ObserverRedirectToObserve)
                    {
                      BlocProvider.of<RouterManager>(context).navigate(OBSERVE_PATH, ROOT_PATH),
                    },
                },
              ),
            ],
            child: const LobbyWidget(),
          ),
        ),
        context);
  }
}
