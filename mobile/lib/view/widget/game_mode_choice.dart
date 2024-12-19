import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

const double SIZED_BOX_HEIGHT = 25;

class GameModeChoice extends StatelessWidget {
  const GameModeChoice({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    final AppLocalizations localizations = AppLocalizations.of(context);
    final gamemodeCubit = context.watch<GamemodeCubit>();

    return Container(
        color: themeColors.backgroundColor,
        child: Column(
          children: [
            Column(children: [
              Container(height: 120),
              ScrabbleButtonWidget(
                key: CLASSIC_GAME_BUTTON,
                width: 300,
                height: 80,
                onPressed: () {
                  gamemodeCubit.updateGamemode(const GameModesEnum(GameModes.CLASSIC));
                  context.read<RouterManager>().navigate(JOINABLE_LOBBIES_PATH, ROOT_PATH);
                },
                text: localizations.classicGameModeGame,
              ),
              Container(height: SIZED_BOX_HEIGHT),
              ScrabbleButtonWidget(
                key: TOURNAMENT_BUTTON,
                width: 300,
                height: 80,
                onPressed: () {
                  gamemodeCubit.updateGamemode(const GameModesEnum(GameModes.TOURNAMENT));
                  context.read<RouterManager>().navigate(JOINABLE_LOBBIES_PATH, ROOT_PATH);
                },
                text: localizations.tournamentGameMode,
              ),
              Container(height: SIZED_BOX_HEIGHT),
              ScrabbleButtonWidget(
                key: COOP_GAME_BUTTON,
                width: 300,
                height: 80,
                onPressed: () {
                  gamemodeCubit.updateGamemode(const GameModesEnum(GameModes.COOPERATIVE));
                  context.read<RouterManager>().navigate(JOINABLE_LOBBIES_PATH, ROOT_PATH);
                },
                text: localizations.cooperativeGameModeGame,
              ),
              Container(height: SIZED_BOX_HEIGHT),
            ])
          ],
        ));
  }
}
