import 'package:Scrabble/constants/game.dart';
import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';

class LetterTileWidget extends StatelessWidget {
  final CommonLetter letter;
  final double? fontSizeLetter;
  final double? fontSizePoint;

  const LetterTileWidget(this.letter, {super.key, this.fontSizeLetter, this.fontSizePoint});

  @override
  Widget build(BuildContext context) {
    final themeColors = Theme.of(context).extension<ColorExtension>()!;
    return Stack(children: <Widget>[
      Center(
        child: Text(letter.letter == BLANK ? '' : letter.letter.toUpperCase(),
            style: TextStyle(
                color: themeColors.tileFontColor,
                fontWeight: FontWeight.normal,
                decoration: TextDecoration.none,
                fontSize: (fontSizeLetter != null) ? fontSizeLetter : 40.0)),
      ),
      Container(
        alignment: Alignment.bottomRight,
        margin: const EdgeInsets.only(right: 5, bottom: 2),
        child: Text(letter.point.toString(),
            style: TextStyle(
                color: themeColors.tileFontColor,
                fontWeight: FontWeight.bold,
                decoration: TextDecoration.none,
                fontSize: (fontSizePoint != null) ? fontSizePoint : 20.0)),
      )
    ]);
  }
}
