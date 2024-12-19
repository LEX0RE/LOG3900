import 'package:Scrabble/constants/title.dart';
import 'package:Scrabble/data/models/enums/game_visibilities.dart';
import 'package:Scrabble/data/models/enums/joining_type.dart';
import 'package:Scrabble/data/models/interfaces/lobby/game_info.dart';
import 'package:Scrabble/logic/lobby/joinable_games/joinable_games_cubit.dart';
import 'package:Scrabble/logic/lobby/lobbies/lobbies_cubit.dart';
import 'package:Scrabble/logic/overlay/game_password_overlay/game_password_cubit.dart';
import 'package:Scrabble/logic/overlay/join-request/join_request_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

const double COMPONENT_HEIGHT = 50;
const int MAX_PLAYERS_CLASSIC_GAME = 4;

class JoinableGameComponent extends StatelessWidget {
  final dynamic lobby;
  const JoinableGameComponent({Key? key, required this.lobby}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    AppLocalizations localizations = AppLocalizations.of(context);
    final JoinableGamesCubit joinableGamesCubit = context.watch<JoinableGamesCubit>();
    final JoinRequestCubit joinRequestCubit = context.watch<JoinRequestCubit>();
    final GamePasswordCubit gamePasswordCubit = context.watch<GamePasswordCubit>();
    final LobbiesCubit lobbiesCubit = context.watch<LobbiesCubit>();

    String getDictionaryName(String dictionaryName) {
      switch (dictionaryName) {
        case FRENCH_DICTIONARY_TITLE:
          return localizations.frenchDictionary;
        default:
          return '';
      }
    }

    return Container(
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: themeColors.tableColor,
        border: Border.all(color: theme.dividerColor, width: 1, style: BorderStyle.solid),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Center(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 80,
              height: COMPONENT_HEIGHT,
              alignment: Alignment.center,
              child: Text(lobby.gameConfig.creator!.name,
                  style:
                      TextStyle(fontSize: theme.textTheme.bodyMedium?.fontSize, color: themeColors.generalFontColor)),
            ),
            Container(
              width: 220,
              height: COMPONENT_HEIGHT,
              alignment: Alignment.center,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset('lib/assets/images/timer.png'),
                  Text(
                    ': ${lobby.gameConfig.turnTimer.minute}min${lobby.gameConfig.turnTimer.second}sec ',
                    style:
                        TextStyle(fontSize: theme.textTheme.bodyMedium?.fontSize, color: themeColors.generalFontColor),
                  ),
                  Image.asset('lib/assets/images/dictionary.png', scale: 8),
                  Text(
                    ': ${getDictionaryName(lobby.gameConfig.dictionaryTitle)} ',
                    style:
                        TextStyle(fontSize: theme.textTheme.bodyMedium?.fontSize, color: themeColors.generalFontColor),
                  ),
                ],
              ),
            ),
            Container(
                width: 150,
                height: 50,
                alignment: Alignment.center,
                child: Text(translateStringVisibility(localizations, lobby.visibility),
                    style:
                        TextStyle(fontSize: theme.textTheme.bodyMedium?.fontSize, color: themeColors.generalFontColor),
                    textAlign: TextAlign.center)),
            Container(
              width: 300,
              height: COMPONENT_HEIGHT,
              alignment: Alignment.center,
              child: Text(
                '${lobby.players.length} - ${lobby.virtualPlayerNames.length} - ${lobby.observers.length}',
                style: TextStyle(fontSize: theme.textTheme.bodyMedium?.fontSize, color: themeColors.generalFontColor),
              ),
            ),
            SizedBox(
              width: 75,
              child: Container(
                child: isGame(lobby) || isMaxedOutPlayers(lobby.players.length, lobby.potentialPlayers.length)
                    ? Container()
                    : TextButton(
                        child: Image.asset('lib/assets/images/join_icon.png'),
                        onPressed: () => isPublic(lobby.visibility)
                            ? hasPassword(lobby.visibility)
                                ? gamePasswordCubit.needPassword(lobby.lobbyId, JoiningType.PLAY, isGame(lobby), false)
                                : lobbiesCubit.joinLobby(lobby.lobbyId)
                            : joinRequestCubit.joinLobby(lobby.lobbyId),
                      ),
              ),
            ),
            Container(
              child: isPublic(lobby.visibility)
                  ? TextButton(
                      child: Image.asset(
                        'lib/assets/images/observe_icon.png',
                        height: COMPONENT_HEIGHT,
                        width: 45,
                      ),
                      onPressed: () => hasPassword(lobby.visibility)
                          ? gamePasswordCubit.needPassword(lobby.lobbyId, JoiningType.OBSERVATION, isGame(lobby), false)
                          : isGame(lobby)
                              ? joinableGamesCubit.observeGame(lobby.lobbyId, context)
                              : lobbiesCubit.observeLobby(lobby.lobbyId, context),
                    )
                  : Container(
                      width: 63,
                    ),
            ),
          ],
        ),
      ),
    );
  }

  bool isGame(dynamic lobby) {
    return lobby is GameInfo;
  }

  bool isMaxedOutPlayers(int nPlayers, int nPotentialPlayers) {
    return nPlayers + nPotentialPlayers >= MAX_PLAYERS_CLASSIC_GAME;
  }
}
