import 'package:Scrabble/logic/game_info_holder/player_info_holder/player_info_holder_cubit.dart';
import 'package:Scrabble/logic/overlay/loading_game_overlay/loading_game_overlay_cubit.dart';
import 'package:Scrabble/logic/profile/replay/replay_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/overlay/overlay_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LoadingGameOverlay extends StatelessWidget {
  const LoadingGameOverlay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final AppLocalizations localizations = AppLocalizations.of(context);
    final LoadingGameOverlayCubit overlayCubit = context.watch<LoadingGameOverlayCubit>();
    final ReplayCubit replayCubit = context.watch<ReplayCubit>();
    final PlayerInfoHolderCubit playerInfoCubit = context.watch<PlayerInfoHolderCubit>();
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;

    if (replayCubit.state is ReplayUpdated || playerInfoCubit.state is PlayerInfoHolderUpdated) {
      overlayCubit.hide(dynamic);
    }

    return MultiBlocListener(
      listeners: [
        BlocListener<ReplayCubit, ReplayState>(
          listener: (context, state) {
            if (state is ReplayUpdated) overlayCubit.hide(dynamic);
          },
        ),
        BlocListener<PlayerInfoHolderCubit, PlayerInfoHolderState>(
          listenWhen: (previous, current) => overlayCubit.state is LoadingGameOverlayShow,
          listener: (context, state) {
            if (state is PlayerInfoHolderUpdated) overlayCubit.hide(dynamic);
          },
        ),
      ],
      child: OverlayWidget<LoadingGameOverlayCubit, LoadingGameOverlayShow, LoadingGameOverlayState>(
        removeExternalTap: false,
        show: () => overlayCubit.show(),
        margin: const EdgeInsets.only(top: 300, left: 350, right: 350, bottom: 300),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Text(localizations.loadingGameTitle,
                style: TextStyle(fontSize: 40.0, fontWeight: FontWeight.bold, color: themeColors.titleFontColor)),
          ],
        ),
      ),
    );
  }
}
