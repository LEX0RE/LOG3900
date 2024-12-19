import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/lobby/lobby/lobby_cubit.dart';
import 'package:Scrabble/logic/observer/observer_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/overlay/join-response-overlay.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

const double SPACE_PER_COLUMNS = 200.0;
const double SPACE_BETWEEN_COLUMNS = 100.0;
const double COLUMNS_HEIGHT = 300.0;
const double DIVIDER_WIDTH = 3 * SPACE_PER_COLUMNS + 2 * SPACE_BETWEEN_COLUMNS;
const double SPACE_BETWEEN_ELEMENTS = 40.0;

class LobbyWidget extends StatelessWidget {
  const LobbyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    AppLocalizations localizations = AppLocalizations.of(context);
    final LobbyCubit lobbyCubit = context.watch<LobbyCubit>();
    final LobbyInfo lobbyInfo = lobbyCubit.state.lobby;
    final Identity identity = context.watch<IdentityHolder>().identity;
    final GameModesEnum gameMode = context.watch<GamemodeCubit>().state.gamemode;

    return SingleChildScrollView(
      child: Stack(children: [
        Container(
          alignment: Alignment.center,
          child: Column(
            children: [
              const SizedBox(height: SPACE_BETWEEN_ELEMENTS),
              Text(localizations.lobbyTitle, style: theme.textTheme.headlineLarge),
              const SizedBox(height: SPACE_BETWEEN_ELEMENTS),
              Text('${localizations.gameCreator} : ${lobbyInfo.gameConfig.creator!.name}',
                  style: theme.textTheme.headlineSmall),
              const SizedBox(height: SPACE_BETWEEN_ELEMENTS),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    width: SPACE_PER_COLUMNS,
                    child: Text(localizations.realPlayersColumnTitle, style: theme.textTheme.headlineSmall),
                  ),
                  const SizedBox(width: SPACE_BETWEEN_COLUMNS),
                  SizedBox(
                    width: SPACE_PER_COLUMNS,
                    child: Text(localizations.virtualPlayerColumnTitle, style: theme.textTheme.headlineSmall),
                  ),
                  const SizedBox(width: SPACE_BETWEEN_COLUMNS),
                  SizedBox(
                    width: SPACE_PER_COLUMNS,
                    child: Text(localizations.observersColumnTitle, style: theme.textTheme.headlineSmall),
                  )
                ],
              ),
              const Divider(thickness: 2.5),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    height: COLUMNS_HEIGHT,
                    width: SPACE_PER_COLUMNS,
                    child: ListView.builder(
                      itemCount: lobbyInfo.players.length,
                      itemBuilder: (BuildContext context, int index) {
                        return Text(lobbyInfo.players[index].name);
                      },
                    ),
                  ),
                  const SizedBox(width: SPACE_BETWEEN_COLUMNS),
                  SizedBox(
                    height: COLUMNS_HEIGHT,
                    width: SPACE_PER_COLUMNS,
                    child: ListView.builder(
                      itemCount: lobbyInfo.virtualPlayerNames.length,
                      itemBuilder: (BuildContext context, int index) {
                        return Text(lobbyInfo.virtualPlayerNames[index]);
                      },
                    ),
                  ),
                  SizedBox(
                    height: COLUMNS_HEIGHT,
                    width: SPACE_PER_COLUMNS,
                    child: ListView.builder(
                      itemCount: lobbyInfo.observers.length,
                      itemBuilder: (BuildContext context, int index) {
                        return Text(lobbyInfo.observers[index].name, textAlign: TextAlign.center);
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              // Bouton pour commencer la partie
              BlocBuilder<LobbyCubit, LobbyState>(
                builder: (context, state) {
                  if (state is LobbyReady && lobbyInfo.gameConfig.creator!.id == identity.userId) {
                    return SizedBox(
                      width: 300,
                      height: 80,
                      child: ScrabbleButtonWidget(
                        text: localizations.startGame,
                        onPressed: () {
                          switch (gameMode.value) {
                            case GameModes.CLASSIC:
                              return lobbyCubit.start(START_GAME);
                            case GameModes.TOURNAMENT:
                              return lobbyCubit.start(START_TOURNAMENT);
                            case GameModes.COOPERATIVE:
                              return lobbyCubit.start(START_GAME);
                            default:
                              return lobbyCubit.start(START_GAME);
                          }
                        },
                      ),
                    );
                  }
                  return const SizedBox(
                    width: 300,
                    height: 80,
                  );
                },
              ),
              const SizedBox(height: 10),
              ElevatedButton(
                onPressed: () {
                  BlocProvider.of<RouterManager>(context).navigate(JOINABLE_LOBBIES_PATH, ROOT_PATH);
                  context.read<ObserverCubit>().stopObservingLobby(context);
                  lobbyCubit.leaveLobby();
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: ColorExtension.quitButtonColor,
                  minimumSize: const Size(150, 50),
                  side: BorderSide(
                    width: 2.5,
                    color: ColorExtension.quitButtonBorderColor!,
                  ),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: Text(localizations.leaveLobby, style: theme.textTheme.titleMedium),
              ),
            ],
          ),
        ),
        const JoinResponseOverlay(),
      ]),
    );
  }
}
