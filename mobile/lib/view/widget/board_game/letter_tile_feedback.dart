import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/board_game/letter_tile.dart';
import 'package:flutter/material.dart';

class LetterTileFeedbackWidget extends StatelessWidget {
  final List<CommonLetter> letters;
  final int index;
  final double height;
  final double width;
  final double fontSizeLetter;
  final double fontSizePoints;
  late final BoxDecoration decoration;

  LetterTileFeedbackWidget(
    this.letters,
    this.index,
    BuildContext context, {
    super.key,
    BoxDecoration? decoration,
    this.height = 50,
    this.width = 50,
    this.fontSizeLetter = 40,
    this.fontSizePoints = 20,
  }) {
    final themeColors = Theme.of(context).extension<ColorExtension>()!;
    this.decoration = decoration != null
        ? decoration.copyWith(color: themeColors.tileColor)
        : BoxDecoration(color: themeColors.tileColor, borderRadius: BorderRadius.circular(20));
  }

  @override
  Widget build(BuildContext context) => Container(
      height: height,
      width: width,
      margin: const EdgeInsets.only(right: 8, left: 8, bottom: 15),
      decoration: decoration,
      child: (index < letters.length)
          ? LetterTileWidget(
              letters[index],
              fontSizeLetter: fontSizeLetter,
              fontSizePoint: fontSizePoints,
            )
          : Container());
}
