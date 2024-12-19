import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/data/models/interfaces/lobby/game_info.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/lobby/joinable_games/joinable_games_cubit.dart';
import 'package:Scrabble/logic/lobby/lobbies/lobbies_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/lobby/joinable_game_component.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class JoinableGamesTableComponent extends StatelessWidget {
  const JoinableGamesTableComponent({super.key});

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    final ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    final AppLocalizations localizations = AppLocalizations.of(context);
    final List<LobbyInfo> lobbies = context.watch<LobbiesCubit>().state.lobbies;
    final GameModesEnum gamemode = context.watch<GamemodeCubit>().state.gamemode;
    final List<GameInfo> games = context.watch<JoinableGamesCubit>().state.games;

    return Container(
      height: 545,
      width: 950,
      decoration: BoxDecoration(
        color: themeColors.tableColor,
        border: Border.all(width: 4, color: themeColors.tableBorderColor!, style: BorderStyle.solid),
        borderRadius: BorderRadius.circular(10),
      ),
      child: SizedBox(
        height: 545,
        width: 900,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Titre du tableau
            Container(
              height: 50,
              width: 900,
              alignment: Alignment.center,
              child: Text(
                gamemode.internationalName(localizations),
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 22.0,
                  fontFamily: theme.textTheme.titleSmall?.fontFamily,
                  color: theme.textTheme.titleSmall?.color,
                ),
              ),
            ),
            Divider(thickness: 4, color: themeColors.buttonBorderColor),
            // Nom des colonnes
            SizedBox(
                height: 30,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 80,
                      height: 50,
                      alignment: Alignment.center,
                      child: Text(localizations.gameCreator,
                          textAlign: TextAlign.center, style: theme.textTheme.titleSmall),
                    ),
                    Container(
                      width: 200,
                      height: 50,
                      alignment: Alignment.center,
                      child: Text(localizations.gameParameters,
                          textAlign: TextAlign.center, style: theme.textTheme.titleSmall),
                    ),
                    Container(
                        width: 150,
                        height: 50,
                        alignment: Alignment.center,
                        child: Text(localizations.visibility,
                            textAlign: TextAlign.center, style: theme.textTheme.titleSmall)),
                    Container(
                      width: 300,
                      height: 50,
                      alignment: Alignment.center,
                      child: Text(localizations.realPlayersVirtualPlayersObservers,
                          textAlign: TextAlign.center, style: theme.textTheme.titleSmall),
                    ),
                    const SizedBox(width: 120, child: Center()),
                  ],
                )),
            Divider(thickness: 4, color: themeColors.buttonBorderColor),
            // Parties à rejoindre
            SingleChildScrollView(
              child: SizedBox(
                width: 900,
                height: 330,
                child: ListView.builder(
                    itemCount: lobbies.length + games.length,
                    itemBuilder: (BuildContext context, int index) {
                      if (index < lobbies.length) return JoinableGameComponent(lobby: lobbies[index]);
                      return JoinableGameComponent(lobby: games[index - lobbies.length]);
                    }),
              ),
            ),
            const SizedBox(height: 5),
            Divider(thickness: 4, color: themeColors.buttonBorderColor),
            // Bouton pour créer une nouvelle partie
            const SizedBox(height: 10),
            Container(
              width: 900,
              decoration: BoxDecoration(
                color: themeColors.tableColor,
                border: Border.all(color: themeColors.buttonBorderColor!, width: 1.5, style: BorderStyle.solid),
                borderRadius: BorderRadius.circular(10),
              ),
              child: TextButton(
                key: CREATE_NEW_GAME_BUTTON,
                style: TextButton.styleFrom(
                  minimumSize: const Size.fromHeight(50),
                  foregroundColor: theme.textTheme.bodySmall!.color,
                ),
                onPressed: () => context.read<RouterManager>().navigate(NEW_GAME_CONFIGURATION_PATH, ROOT_PATH),
                child: Text(localizations.createNewGame),
              ),
            ),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }
}
