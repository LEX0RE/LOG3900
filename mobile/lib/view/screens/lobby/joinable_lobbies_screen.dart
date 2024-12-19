import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/lobby/joinable_games/joinable_games_cubit.dart';
import 'package:Scrabble/logic/lobby/lobbies/lobbies_cubit.dart';
import 'package:Scrabble/logic/observer/observer_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:Scrabble/view/constants/HUD_interface.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/lobby/joinable_games_table_component.dart';
import 'package:Scrabble/view/widget/overlay/game-password-overlay.dart';
import 'package:Scrabble/view/widget/overlay/join-request-overlay.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class JoinableLobbiesScreen extends StatelessWidget {
  const JoinableLobbiesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    return HUDInterface(
        Scaffold(
          body: MultiBlocProvider(
            providers: [
              BlocProvider(
                create: (context) =>
                    LobbiesCubit(BlocProvider.of<SocketManagerBloc>(context), BlocProvider.of<GamemodeCubit>(context)),
              ),
              BlocProvider(
                create: (blocContext) => JoinableGamesCubit(
                    BlocProvider.of<SocketManagerBloc>(context), BlocProvider.of<GamemodeCubit>(context)),
              ),
            ],
            child: MultiBlocListener(
              listeners: [
                BlocListener<LobbiesCubit, LobbiesState>(
                  listener: (context, state) {
                    if (state is LobbiesConfirmJoinLobby) {
                      BlocProvider.of<RouterManager>(context).navigate(LOBBY_PATH, ROOT_PATH);
                    }
                  },
                ),
                BlocListener<ObserverCubit, ObserverState>(
                    listener: (context, state) => {
                          if (state is ObserverRedirectToObserve)
                            {BlocProvider.of<RouterManager>(context).navigate(OBSERVE_PATH, ROOT_PATH)}
                        }),
              ],
              child: Stack(children: [
                Container(
                  alignment: Alignment.center,
                  color: themeColors.backgroundColor,
                  child: Column(
                    children: const [
                      SizedBox(height: 60),
                      JoinableGamesTableComponent(),
                    ],
                  ),
                ),
                const JoinRequestWaitingOverlay(),
                const JoinRequestDeclinedOverlay(),
                const GamePasswordOverlay(),
              ]),
            ),
          ),
        ),
        context,
        needChat: false,
        previousPath: HOME_PATH);
  }
}
