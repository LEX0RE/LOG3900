import 'package:Scrabble/data/models/interfaces/game_info/previewable_hint.dart';
import 'package:Scrabble/logic/hint_preview/hint_display/hint_display_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HintItem extends StatelessWidget {
  final int index;
  final PreviewableHint hint;

  const HintItem({
    Key? key,
    required this.index,
    required this.hint,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final HintDisplayCubit hintDisplayCubit = context.watch<HintDisplayCubit>();
    final isSelected = hintDisplayCubit.isSelectedHint(index);
    final theme = Theme.of(context);
    final ColorExtension themeColors = theme.extension<ColorExtension>()!;
    return GestureDetector(
      onTap: () => hintDisplayCubit.selectHint(index),
      child: Container(
        padding: const EdgeInsets.all(5),
        child: Container(
          decoration: BoxDecoration(
            color: isSelected ? themeColors.clearerButtonHoverColor : themeColors.clearerButtonColor,
            border: Border.all(
              color: themeColors.buttonBorderColor!,
              width: 3,
            ),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(
              child: Text(
            hint.wordHint,
            style: theme.textTheme.bodyMedium,
          )),
        ),
      ),
    );
  }
}
