import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';

class ScrabbleButtonWidget extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final double? width;
  final double? height;
  final double fontSize;
  final double padding;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final Color? borderColor;
  late final bool Function(BuildContext context) isEnabled;

  ScrabbleButtonWidget(
      {Key? key,
      required this.text,
      required this.onPressed,
      bool Function(BuildContext context)? isEnabled,
      this.width,
      this.height,
      this.fontSize = 20,
      this.padding = 10,
      this.backgroundColor,
      this.foregroundColor,
      this.borderColor})
      : super(key: key) {
    this.isEnabled = isEnabled ?? (_) => true;
  }

  @override
  Widget build(BuildContext context) {
    ColorExtension theme = Theme.of(context).extension<ColorExtension>()!;
    return Container(
      width: width,
      height: height,
      padding: const EdgeInsets.all(0),
      margin: const EdgeInsets.all(0),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          textStyle: Theme.of(context).textTheme.labelMedium,
          elevation: 0,
          backgroundColor: backgroundColor ?? theme.buttonColor,
          foregroundColor: foregroundColor ?? theme.buttonFontColor,
          shadowColor: theme.shadowColor,
          disabledBackgroundColor: theme.disabledButtonColor,
          disabledForegroundColor: theme.disabledButtonFontColor,
          padding: EdgeInsets.all(padding),
          shape: RoundedRectangleBorder(
            side: BorderSide(
              color:
                  this.isEnabled(context) ? borderColor ?? theme.buttonBorderColor! : theme.disabledButtonBorderColor!,
              width: 5,
            ),
            borderRadius: BorderRadius.circular(30),
          ),
        ),
        onPressed: isEnabled(context) ? onPressed : null,
        child: Text(text, style: TextStyle(fontSize: fontSize)),
      ),
    );
  }
}
