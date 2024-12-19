import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/logic/end_game/end_game_cubit.dart';
import 'package:Scrabble/logic/overlay/surrender_overlay/surrender_overlay_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/overlay/overlay_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class SurrenderOverlay extends StatelessWidget {
  const SurrenderOverlay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final EndGameCubit endGameCubit = context.watch<EndGameCubit>();
    final SurrenderOverlayCubit surrenderCubit = context.watch<SurrenderOverlayCubit>();
    final AppLocalizations localizations = AppLocalizations.of(context);
    final ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;

    return OverlayWidget<SurrenderOverlayCubit, SurrenderOverlayShow, SurrenderOverlayState>(
      margin: const EdgeInsets.only(top: 200, left: 350, right: 350, bottom: 200),
      onOverlayCancel: surrenderCubit.hide,
      child: SurrenderOverlayChild(
        localizations: localizations,
        themeColors: themeColors,
        surrenderCubit: surrenderCubit,
        endGameCubit: endGameCubit,
        routerManager: context.read<RouterManager>(),
      ),
    );
  }
}

class SurrenderOverlayChild extends StatelessWidget {
  const SurrenderOverlayChild({
    super.key,
    required this.localizations,
    required this.themeColors,
    required this.surrenderCubit,
    required this.endGameCubit,
    required this.routerManager,
  });

  final AppLocalizations localizations;
  final ColorExtension themeColors;
  final SurrenderOverlayCubit surrenderCubit;
  final EndGameCubit endGameCubit;
  final RouterManager routerManager;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        Text(localizations.surrenderConfirmTitle,
            style: const TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold, color: Colors.red)),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                  textStyle: Theme.of(context).textTheme.titleMedium,
                  backgroundColor: themeColors.buttonColor,
                  minimumSize: const Size(90, 60),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30),
                  ),
                ),
                onPressed: () {
                  surrenderCubit.hide();
                  endGameCubit.surrender();
                  routerManager.navigate(HOME_PATH, ROOT_PATH);
                },
                child: Text(localizations.yes,
                    style: const TextStyle(fontSize: 25, color: Colors.white, fontWeight: FontWeight.bold))),
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                  textStyle: Theme.of(context).textTheme.titleMedium,
                  backgroundColor: themeColors.buttonColor,
                  minimumSize: const Size(90, 60),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30),
                  ),
                ),
                onPressed: () => surrenderCubit.hide(),
                child: Text(localizations.no,
                    style: const TextStyle(fontSize: 25, color: Colors.white, fontWeight: FontWeight.bold))),
          ],
        ),
      ],
    );
  }
}
