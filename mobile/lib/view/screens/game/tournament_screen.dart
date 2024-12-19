import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/lobby/joinable_games/joinable_games_cubit.dart';
import 'package:Scrabble/logic/overlay/end_tournament_overlay/end_tournament_overlay_cubit.dart';
import 'package:Scrabble/logic/overlay/surrender_tournament_overlay/surrender_tournament_overlay_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:Scrabble/view/constants/HUD_interface.dart';
import 'package:Scrabble/view/widget/bracket/bracket_tree.dart';
import 'package:Scrabble/view/widget/bracket/leave_button.dart';
import 'package:Scrabble/view/widget/overlay/tournament_overlay.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class TournamentScreen extends StatelessWidget {
  const TournamentScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return HUDInterface(
        MultiBlocProvider(
          providers: [
            BlocProvider(
              create: (context) => SurrenderTournamentOverlayCubit(BlocProvider.of<SocketManagerBloc>(context)),
              lazy: false,
            ),
            BlocProvider(
              create: (context) => EndTournamentOverlayCubit(BlocProvider.of<SocketManagerBloc>(context)),
              lazy: false,
            ),
            BlocProvider(
              create: (blocContext) => JoinableGamesCubit(
                  BlocProvider.of<SocketManagerBloc>(context), BlocProvider.of<GamemodeCubit>(context)),
            ),
          ],
          child: Stack(
            children: [
              TournamentOverlay(),
              Scaffold(
                body: Stack(
                  children: [
                    Align(child: BracketTree()),
                    Align(alignment: Alignment.bottomLeft, child: LeaveButton()),
                  ],
                ),
              ),
            ],
          ),
        ),
        context);
  }
}
