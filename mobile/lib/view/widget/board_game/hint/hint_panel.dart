import 'package:Scrabble/logic/game_info_holder/player_info_holder/player_info_holder_cubit.dart';
import 'package:Scrabble/logic/hint_preview/hint_display/hint_display_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/board_game/hint/hint_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HintPanel extends StatelessWidget {
  final double? height;
  final double? width;
  const HintPanel({
    Key? key,
    this.height,
    this.width,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final HintDisplayCubit hintDisplayCubit = context.watch<HintDisplayCubit>();
    final PlayerInfoHolderCubit playerInfoHolderCubit = context.watch<PlayerInfoHolderCubit>();
    final HintDisplayState hintState = hintDisplayCubit.state;
    final theme = Theme.of(context);
    final ColorExtension themeColors = theme.extension<ColorExtension>()!;
    if (!hintDisplayCubit.canOpenHintSection() || !(playerInfoHolderCubit.playerInfo?.turn ?? false))
      return const SizedBox.shrink();
    return SingleChildScrollView(
      child: Container(
        height: height,
        width: width,
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          border: Border.all(color: themeColors.buttonBorderColor!),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          children: [
            Expanded(
              child: Center(
                child: Text(
                  hintState.hintBoxMessage,
                  style: theme.textTheme.headlineSmall,
                  textAlign: TextAlign.center,
                  textScaleFactor: 0.75,
                ),
              ),
            ),
            ...List.generate(
              hintState.hints.length,
              (index) => Expanded(
                child: HintItem(
                  index: index,
                  hint: hintState.hints[index],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
