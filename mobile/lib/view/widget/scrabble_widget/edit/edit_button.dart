import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';

class ScrabbleEditButton extends StatelessWidget {
  final void Function() onPressed;

  const ScrabbleEditButton({
    super.key,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    ColorExtension theme = Theme.of(context).extension<ColorExtension>()!;

    return Container(
      decoration: BoxDecoration(
        shape: BoxShape.rectangle,
        color: theme.buttonColor,
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.black, width: 2),
      ),
      child: IconButton(
        onPressed: onPressed,
        icon: Icon(Icons.edit, color: theme.buttonFontColor!, size: 30),
        disabledColor: theme.disabledButtonColor,
      ),
    );
  }
}
